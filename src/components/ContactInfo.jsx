import { UpdateMarker } from "../routes/Customer/Customer";
import { emailProvidersLinkMap } from "../utils/sharedState";

function ContactInfo({
  firstName,
  lastName,
  inmateNumber,
  emailProvider,
  mailingAddress,
  updatedFields,
  isAdminUpdateEndpoint
}) {

  const showUpdatedDetails = (field) => {
    return updatedFields?.includes(field) && isAdminUpdateEndpoint
  }

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
              E-Mail/Messaging Options
            </p>
            <p className="">
              <span className="font-semibold mr-2">Email Provider:</span>
              {emailProvider} {showUpdatedDetails("institutionalEmailProvider") && <UpdateMarker />}
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
              {(showUpdatedDetails("firstName") ||
                showUpdatedDetails("lastName")) && (
                  <UpdateMarker />
                )}
            </p>
            <p>
              <span className="font-semibold mr-2">DOC/Inmate #:</span>
              {inmateNumber}
              {(showUpdatedDetails("inmateNumber") &&
                <UpdateMarker />
              )}
            </p>
            <p>
              <span className="font-semibold mr-2">Mailing Address:</span>
              {mailingAddress}
              {(showUpdatedDetails("mailingAddress") &&
                <UpdateMarker />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
