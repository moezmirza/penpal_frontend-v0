import { emailProvidersLinkMap } from "../utils/sharedState";

function ContactInfo({
  firstName,
  lastName,
  inmateNumber,
  emailProvider,
  mailingAddress,
}) {
  return (
    <div className="mr-auto flex flex-col gap-y-6 w-full ">
      <h1 className="bg-fr-blue-200 text-white py-3 px-4 rounded text-lg md:text-xl px-6">
        How to contact {firstName}
      </h1>
      <div className="border rounded-lg">
        <div className="bg-white flex justify-between flex-col md:flex-row gap-y-12  py-3 md:px-12 px-6  w-full ">
          <div className="flex flex-col  gap-y-2 basis-1/3">
            <p className="text-lg font-semibold mb-1 underline">
              {" "}
              Email Forwarding Option
            </p>
            <p className="">
              <span className="font-semibold mr-2">Email Provider:</span>
              {emailProvider}
            </p>
            <p>
              <a
                href={emailProvidersLinkMap[emailProvider]}
                target="__blank"
                className="text-blue-600 underline mr-1 cursor-pointer "
              >
                Click here
              </a>
              to email
            </p>
          </div>
          <div className="flex flex-col  gap-y-2 basis-1/3">
            <p className="text-lg font-semibold mb-1 underline">
              Postal Mail Option
            </p>
            <p>
              <span className="font-semibold mr-2">Name:</span>
              {firstName} {lastName}
            </p>
            <p>
              <span className="font-semibold mr-2">Inmate #:</span>
              {inmateNumber}
            </p>
            <p>
              <span className="font-semibold mr-2">Mailing Address:</span>
              {mailingAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
