function AssociatedUsersInfo({ createdBy, updatedBy, paidBy }) {
    return <div className="mr-auto flex flex-col gap-y-6 w-full ">
        <h1 className="bg-fr-blue-200 text-white py-3 px-4 rounded text-lg md:text-xl px-6">
            Associated Users Info </h1>
        <div className="border rounded-lg">
            <div className="bg-white flex justify-between flex-col md:flex-row gap-y-12  py-3 md:px-12 px-6  w-full ">
                <div className="flex flex-col  gap-y-2 basis-1/3">
                    <p className="text-lg font-semibold mb-1 underline">
                        {createdBy ? "Created By" : "Updated By"}
                    </p>
                    <UserBasicInfo user={createdBy ? createdBy : updatedBy} />
                </div>
                <div className="flex flex-col  gap-y-2 basis-1/3">
                    <p className="text-lg font-semibold mb-1 underline">
                        Paid By
                    </p>
                    <UserBasicInfo user={paidBy} />

                </div>
            </div>
        </div>
    </div>
}

function UserBasicInfo({ user }) {
    return user ?
        <>
            <p className="">
                <span className="font-semibold mr-2">Full name:</span>
                {user.firstName}  {user.lastName}
            </p>
            <p className="">
                <span className="font-semibold mr-2"> Email:</span>
                {user.email}
            </p>
            <p className="">
                <span className="font-semibold mr-2">Send email:</span>
                <a
                    href={`mailto:${user.email}`}
                    target="__blank"
                    className="text-blue-600 underline mr-1 cursor-pointer"
                >
                    Click here
                </a>
            </p>
        </>
        :
        <p>Hasn't been paid yet</p>


}

export default AssociatedUsersInfo