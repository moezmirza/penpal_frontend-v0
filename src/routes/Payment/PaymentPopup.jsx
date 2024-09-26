import React from 'react';
import PaymentReceipt from '../../components/PaymentReciept';
import { PendingDuesDetails } from '../Customer/CreateCustomer';

const Paynow = ({ duesInfo, onStripePay, id, onClosePopup, onReferralPay }) => {

    return (
        < div className={`left-1/2 bg-white shadow-lg rounded-lg p-6 -translate-x-1/2  z-50 w-11/12 md:w-1/2 top-1/4 fixed`}>
            <div className='flex w-8/12 ml-auto items-start'>
                <h1 className="text-xl md:text-3xl  underline font-bold text-gray-800 mb-6 text-center">Pending Dues</h1>
                <img src="/assets/icons/xMarkGray.svg" alt="" className='h-5 md:h-8 ml-auto cursor-pointer' onClick={onClosePopup} />
            </div>

            <PendingDuesDetails onReferralPay={onReferralPay} duesInfo={duesInfo} id={id} onStripePay={onStripePay} renewal={true} />
        </div >
    );
};

export default Paynow;
