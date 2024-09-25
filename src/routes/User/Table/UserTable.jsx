import React from "react";
import Pagination from "./Pagination";
import Button from "../../../components/Button";

const UserTable = ({ page, setPage, totalPages, listing, className, setPopup, setSelectedUser }) => {

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <div className={`relative sm:rounded-lg ${className}`}>
        <h2 style={{fontSize: '18px', fontWeight: 600}}>Users Listing</h2>
      {listing?.length > 0 && (
        <>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-gray-800">
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Referral Balance</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listing && listing.map((item) => (
            <tr key={item.id} className="odd:bg-gray-900 text-white odd:dark:bg-gray-900 even:bg-gray-700 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4">{item?.firstName + item?.lastName}</td>
              <td className="px-6 py-4">{item.email}</td>
              <td className="px-6 py-4">{`$${item?.referralBalance ?? 0}`}</td>
              <td className="px-6 py-4"><Button onClick={() => {setPopup(true); setSelectedUser(item)}} title="Add Referral" loading={false} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pageCount={totalPages} onPageChange={handlePageClick} currentPage={page} />
        </>
      )}
    </div>
  );
};

export default UserTable;
