import React from 'react';
import PaymentReceipt from '../../components/PaymentReciept';
import { PendingDuesDetails } from '../Customer/CreateCustomer';

const Paynow = ({ duesInfo, onPaynow, id, onClosePopup }) => {


    return (
        < div className="mx-auto bg-white shadow-lg rounded-lg p-6  z-50 w-6/12 top-1/4 fixed" >
            <div className='flex w-8/12 ml-auto items-start'>
                <h1 className="text-3xl underline font-bold text-gray-800 mb-6 text-center">Pending Dues</h1>
                <img src="/assets/icons/xMarkGray.svg" alt="" className='h-8 ml-auto cursor-pointer' onClick={onClosePopup} />
            </div>
            <PendingDuesDetails duesInfo={duesInfo} id={id} onPaynow={onPaynow} renewal={true} />
        </div >
    );
};

export default Paynow;
