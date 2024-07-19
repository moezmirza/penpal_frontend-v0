import React, { useEffect, useRef, useState } from "react";
import { get } from "../../api/get";
import { useSelector } from "react-redux";
import fileDownload from "js-file-download";
import axios from "axios";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { put } from "../../api/put";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../services/firebase";
import { post } from "../../api/post";
import { useLocation } from "react-router-dom";

function Chat() {
  const [searchText, setSearchText] = useState("");
  const authToken = useSelector((state) => state.auth.token);
  const [userChats, setUserChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const currChatInd = useRef();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const newCustomerChat = location.state?.data;
  console.log("currentUser", currentUser);
  console.log("newChatCus", newCustomerChat);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  console.log("newChat", newCustomerChat);
  useEffect(() => {
    const fetchChat = async () => {
      setLoading(true);
      setError("");
      console.log("authtoken", authToken);
      const { success, data, error } = await get("/user/chat", authToken);
      if (success) {
        console.log("data", data);

        if (newCustomerChat) {
          const chatInd = data?.findIndex(
            (chat) => chat.receiver._id == newCustomerChat._id
          );
          console.log("chatInd----here", chatInd);
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
            console.log("upadatedUserChats", updatedUserChats);
            setUserChats(updatedUserChats);
          } else {
            currChatInd.current = chatInd;
            setUserChats(data);
          }
        } else {
          console.log("inside here");
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
  }, [authToken]);
  const handleChatClick = async (chatIndex) => {
    const clickedChat = userChats[chatIndex];
    console.log("clicked Chat", clickedChat);
    const lastMsg = clickedChat.messages[clickedChat.messages.length - 1];
    lastMsg.unread = false;
    const updatedChats = [...userChats];
    updatedChats[chatIndex] = clickedChat;

    console.log("updateChat", updatedChats);
    currChatInd.current = chatIndex;
    console.log("currChatInd", currChatInd);
    setUserChats(updatedChats);
    const { success, data, error } = await put(
      `/user/chat?id=${lastMsg._id}`,
      {
        unread: false,
      },
      authToken
    );
    if (success) {
      console.log("update read status");
    }
  };
  const handleSendMsg = async (msg, chatIndex) => {
    console.log("msg", msg, chatIndex);
    setError("");
    if (Object.keys(msg).length != 0) {
      console.log("about to send msg");
      const receiver = userChats[chatIndex].receiver;
      const newMsg = {
        haveSend: true,
      };
      if (msg.text) {
        newMsg.messageText = msg.text;
      } else {
        const newFile = msg.file;
        console.log("uploading file...", newFile);
        const chatFileRef = ref(storage, `files/${newFile.name}¬pal${v4()}`);
        const snapshot = await uploadBytes(chatFileRef, newFile);
        const downloadUrl = await getDownloadURL(snapshot.ref);

        newMsg.fileLink = downloadUrl;
      }

      const { data, success, error } = await post(
        `/user/chat?id=${receiver._id}`,
        newMsg,
        authToken
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
    <div className="py-6 px-4 h-screen">
      <div className="rounded flex bg-c-basic border border-2 border-black h-[90%] relative">
        {loading && <LoadingSpinner />}
        {error && (
          <p className="text-lg text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            {" "}
            {error}
          </p>
        )}
        <div
          id="people-window"
          className="flex  basis-[30%] flex-col gap-y-4 bg-white p-6 border-r "
        >
          <div className="text-lg">Recent Chats</div>
          <input
            name="state"
            type="text"
            placeholder="Searh here..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className=" bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 "
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
        <div id="chat-window" className="py-2 w-full basis-[70%]  ">
          {currChat != null && (
            <div className="w-full h-full">
              <div className="flex gap-x-2 border-b-2 py-2 items-center">
                <img
                  src={currChat.receiver?.profilePic || "/assets/default.jpg"}
                  alt=""
                  className="rounded-full h-12  mx-2"
                />
                <div className="text-lg">
                  {currChat.receiver?.firstName} {currChat.receiver?.lastName}{" "}
                </div>
              </div>

              <Conversation conversation={currChat.messages || []} />

              <ChatBox
                onSendMsg={handleSendMsg}
                chatIndex={currChatInd.current}
              />
            </div>
          )}
        </div>
      </div>
    </div>
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
  console.log("new converse", conversation);

  const containerRef = useRef(null);

  useEffect(() => {
    console.log("this called again yo");
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [conversation]);

  return (
    <div
      ref={containerRef}
      className="p-4 flex flex-col gap-y-4 h-[80%] overflow-y-auto"
    >
      {conversation.map((msg, index) => (
        <Message
          haveSend={msg.haveSend}
          text={msg.messageText}
          fileLink={msg.fileLink}
        />
      ))}
    </div>
  );
}

function Message({ haveSend, text, fileLink }) {
  const fileName = v4().slice(0, 10);
  const handleDownloadFile = async () => {
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
      } p-2 rounded w-fit max-w-[50%] px-3 rounded-lg`}
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
    <div className="flex gap-x-2 mx-4 items-center  w-[95%]">
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
        <input
          type="text"
          value={inputVal}
          placeholder="Type a message..."
          onChange={(e) => setInputVal(e.target.value)}
          className=" bg-transparent block mt-1 w-10/12 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700 "
        />
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
        className="bg-fr-blue-200 text-white px-4 py-2 rounded"
        title="Upload file"
        onClick={() => imageRef.current.click()}
        disabled={sending}
      >
        <img src="/assets/icons/file.svg" alt="" className="h-6" />
      </button>
      <button
        className={`bg-fr-blue-200 text-white px-${
          sending ? "4" : "8"
        } py-2 rounded w-fit`}
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
