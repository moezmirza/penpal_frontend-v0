import React from "react";
import Pagination from "./Pagination";
import { formatDate } from "../../../utils/sharedState";

const PurchaseTable = ({ page, setPage, totalPages, purchases, className }) => {
  console.log('purchases-totalPages', totalPages);


  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <div className={`relative sm:rounded-lg ${className}`}>
      {purchases?.length > 0 && (
        <>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-gray-800">
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {purchases && purchases.map((item) => (
            <tr key={item.id} className="odd:bg-gray-900 text-white odd:dark:bg-gray-900 even:bg-gray-700 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4">{formatDate(item.paidAt)}</td>
              <td className="px-6 py-4">{item.status}</td>
              <td className="px-6 py-4">{`$${item.totalPrice}`}</td>
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

export default PurchaseTable;
