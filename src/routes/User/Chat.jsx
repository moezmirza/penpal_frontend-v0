import React, { useEffect, useRef, useState } from "react";
import { useGet } from "../../api/useGet";
import { useSelector } from "react-redux";
import fileDownload from "js-file-download";
import axios from "axios";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { usePut } from "../../api/usePut";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../services/firebase";
import { usePost } from "../../api/usePost";
import { useLocation } from "react-router-dom";

function Chat() {
  const [searchText, setSearchText] = useState("");
  const [userChats, setUserChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showChatWindow, setShowChatWindow] = useState(false);
  const currChatInd = useRef();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const newCustomerChat = location.state?.data;
  const get = useGet();
  const post = usePost();
  const put = usePut();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchChat = async () => {
      setLoading(true);
      setError("");
      const { success, data, error } = await get("/user/chat");
      if (success) {
        if (newCustomerChat) {
          const chatInd = data?.findIndex(
            (chat) => chat.receiver._id == newCustomerChat._id
          );
          if (chatInd == -1) {
            const chatObj = {
              messages: [],
              sender: currentUser._id,
              receiver: {
                _id: newCustomerChat._id,
                firstName: newCustomerChat.firstName,
                lastName: newCustomerChat.lastName,
                profilePic: newCustomerChat?.profilePic || "",
              },
            };
            console.log("userChats", data);
            const updatedUserChats = [...data];
            currChatInd.current = 0;
            updatedUserChats.unshift(chatObj);
            setUserChats(updatedUserChats);
          } else {
            currChatInd.current = chatInd;
            setUserChats(data);
          }
        } else {
          setUserChats(data);
        }

        setLoading(false);
        setError("");
      } else {
        setLoading(false);
        // setError("Error loading chats");
      }
    };
    fetchChat();
  }, []);
  const handleChatClick = async (chatIndex) => {
    if (window.innerWidth < 786) {
      // only for mobile
      setShowChatWindow(true);
    }
    const clickedChat = userChats[chatIndex];
    const lastMsg = clickedChat.messages[clickedChat.messages.length - 1];
    lastMsg.unread = false;
    const updatedChats = [...userChats];
    updatedChats[chatIndex] = clickedChat;

    currChatInd.current = chatIndex;
    setUserChats(updatedChats);
    const { success, data, error } = await put(`/user/chat?id=${lastMsg._id}`, {
      unread: false,
    });
    if (success) {
      console.log("update read status");
    }
  };
  const handleSendMsg = async (msg, chatIndex) => {
    setError("");
    if (Object.keys(msg).length != 0) {
      const receiver = userChats[chatIndex].receiver;
      const newMsg = {
        haveSend: true,
      };
      if (msg.text) {
        newMsg.messageText = msg.text;
      } else {
        const newFile = msg.file;
        console.log("uploading file...", newFile);
        const chatFileRef = ref(
          storage,
          `files/${v4()}penpal-fileName${newFile.name}`
        );
        const snapshot = await uploadBytes(chatFileRef, newFile);
        const downloadUrl = await getDownloadURL(snapshot.ref);

        newMsg.fileLink = downloadUrl;
      }

      const { data, success, error } = await post(
        `/user/chat?id=${receiver._id}`,
        newMsg
      );
      if (success) {
        console.log("msg sent data", data);
        const currChats = [...userChats];
        console.log("currChats", currChats);

        currChats[chatIndex].messages.push(newMsg);
        setUserChats(currChats);
      } else {
        setError("Error sending message");
      }
    }
  };
  const includesCaseInsensitive = (str, substring) => {
    return str.toLowerCase().includes(substring.toLowerCase());
  };

  const currChat = userChats[currChatInd.current];
  const filteredChats = userChats?.filter(
    (chat) =>
      includesCaseInsensitive(chat.receiver.firstName, searchText) ||
      includesCaseInsensitive(chat.receiver.lastName, searchText)
  );
  return (
    <div className="py-3 md:py-6 px-2 md:py-4 h-screen">
      <div className="rounded flex bg-c-basic border border-2 border-black h-[90%] relative w-full">
        <LoadingSpinner isLoading={loading} />
        {error && (
          <p className="text-lg text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            {error}
          </p>
        )}
        {(window.innerWidth > 768 || !showChatWindow) && (
          <div
            id="people-window"
            className="flex  md:basis-[30%] w-full flex-col gap-y-4 bg-white p-4 md:p-6 border-r "
          >
            <div className="text-lg">Recent Chats</div>
            <input
              name="state"
              type="text"
              placeholder="Searh here..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 "
            />

            <div id="chats" className="flex flex-col h-[80%] overflow-y-auto">
              {filteredChats.map((chat, index) => (
                <ChatCell
                  key={index}
                  index={index}
                  name={`${chat.receiver.firstName} ${chat.receiver.lastName}`}
                  imageUrl={chat.receiver.profilePic}
                  lastMsg={chat.messages[chat.messages.length - 1] || {}}
                  onChatClick={handleChatClick}
                />
              ))}
            </div>
          </div>
        )}
        {(window.innerWidth > 768 || showChatWindow) && (
          <ChatWindow
            currChat={currChat}
            onSendMsg={handleSendMsg}
            currChatInd={currChatInd}
            onShowChatWindow={setShowChatWindow}
          />
        )}
      </div>
    </div>
  );
}

function ChatWindow({ currChat, onSendMsg, currChatInd, onShowChatWindow }) {
  return (
    currChat != null && (
      <div className="h-full md:basis-[70%] w-full flex flex-col justify-between">
        <div className="flex gap-x-2 border-b-2 py-2 items-center cursor-pointer">
          <img
            src="/assets/icons/sideArrow.svg"
            alt=""
            className="h-6 mx-4 my-2 md:hidden"
            onClick={() => onShowChatWindow(false)}
          />
          <img
            src={currChat.receiver?.profilePic || "/assets/default.jpg"}
            alt=""
            className="rounded-full h-12  mx-2"
          />
          <div className="text-lg">
            {currChat.receiver?.firstName} {currChat.receiver?.lastName}{" "}
          </div>
        </div>

        <Conversation
          key={currChat.messages.length}
          conversation={currChat.messages || []}
        />

        <ChatBox onSendMsg={onSendMsg} chatIndex={currChatInd.current} />
      </div>
    )
  );
}

function ChatCell({ index, name, lastMsg, imageUrl, onChatClick }) {
  const { haveSend, messageText, fileLink, unread } = lastMsg;
  const handleClick = () => {
    onChatClick(index);
  };
  return (
    <div
      className={`flex border-b-2  cursor-pointer py-2 ${
        index == 0 && "border-y-2 pt-2"
      } ${unread && !haveSend ? "bg-blue-100 border-black" : ""}
  `}
      id="person"
      onClick={handleClick}
    >
      <img
        src={imageUrl || "/assets/default.jpg"}
        alt=""
        className="rounded-full h-16 mx-2 "
      />
      <div>
        <p className="mb-2">{name}</p>
        {messageText && (
          <p className="text-gray-500 ">
            {messageText.length > 30
              ? `${messageText.slice(0, 30)}...`
              : messageText}
          </p>
        )}
        {fileLink && <p className="text-gray-600">File attached</p>}
      </div>
    </div>
  );
}

function Conversation({ conversation }) {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [conversation]);

  return (
    <div
      ref={containerRef}
      className="p-4 flex flex-col flex-grow gap-y-4 overflow-y-auto"
    >
      {conversation.map((msg, index) => (
        <Message
          haveSend={msg.haveSend}
          text={msg.messageText}
          fileLink={msg.fileLink}
          key={index}
        />
      ))}
    </div>
  );
}

function Message({ haveSend, text, fileLink }) {
  const handleDownloadFile = async () => {
    console.log("fileLink", fileLink);
    const fileName = fileLink.split("penpal-fileName")[1].split("?")[0];
    console.log("initial split", fileName);
    console.log("file name", fileName);
    const result = await axios.get(fileLink, {
      responseType: "blob",
    });
    console.log("result", result);
    console.log("donwloadlinkData", result.data);
    fileDownload(result.data, fileName);
  };
  return (
    <div
      className={`bg-${
        haveSend ? "fr-blue-200 ml-auto text-white" : "gray-200 mr-auto"
      } p-2 rounded w-fit md:max-w-[50%]  text-sm md:text-base px-3 rounded-lg`}
    >
      {text !== "" && <p>{text}</p>}
      {fileLink && (
        <div className="flex p-2 items-center gap-x-4">
          <p>Donwload file</p>

          <img
            src={`/assets/icons/download-${haveSend ? "white" : "dark"}.svg`}
            alt=""
            className="h-6 cursor-pointer"
            onClick={handleDownloadFile}
          />
        </div>
      )}
    </div>
  );
}
function ChatBox({ onSendMsg, chatIndex }) {
  const [inputVal, setInputVal] = useState("");
  const imageRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [sending, setSending] = useState(false);

  const handleFileChange = () => {
    console.log("imageChange handler", imageRef.current.files);
    setSelectedFile(imageRef.current.files[0]);
  };
  const handleSendMsg = async () => {
    let msg = {};
    if (selectedFile) {
      setSelectedFile(null);
      msg.file = selectedFile;
    } else {
      setInputVal("");
      msg.text = inputVal;
    }
    setSending(true);
    await onSendMsg(msg, chatIndex);
    setSending(false);
  };

  console.log("imageRef length", imageRef.current?.files.length);
  return (
    <div className="flex  gap-x-2 px-2 md:px-4 mb-2">
      {selectedFile ? (
        <div className="w-10/12 flex gap-x-6 justify-between">
          <p className="">{selectedFile.name}</p>
          <button
            onClick={() => {
              setSelectedFile(null);
            }}
            className="text-xl px-4 py-1.5 rounded bg-fr-blue-200 text-white"
          >
            x
          </button>
        </div>
      ) : (
        <textarea
          type="text"
          value={inputVal}
          placeholder="Type a message..."
          onChange={(e) => setInputVal(e.target.value)}
          className="bg-transparent block mt-1 w-10/12 rounded-md py-1 md:py-2 px-2 border border-gray-400 outline-none focus:border-gray-700 resize-none "
          rows={1}
        ></textarea>
      )}
      <input
        ref={imageRef}
        type="file"
        accept="image/*,application/pdf,application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain"
        hidden
        onChange={handleFileChange}
      />
      <button
        className="bg-fr-blue-200 text-white px-2 md:px-4 md:py-2 rounded"
        title="Upload file"
        onClick={() => imageRef.current.click()}
        disabled={sending}
      >
        <img src="/assets/icons/file.svg" alt="" className="h-6" />
      </button>
      <button
        className={`bg-fr-blue-200 text-white text-sm md:text-base px-${
          sending ? "3 md:px-4" : "2 md:px-8"
        } md:py-2 rounded w-fit `}
        title="send message"
        onClick={handleSendMsg}
        disabled={sending}
      >
        {sending ? "sending..." : "send"}
      </button>
    </div>
  );
}
export default Chat;
