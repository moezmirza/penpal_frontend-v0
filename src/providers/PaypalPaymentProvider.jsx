import { PayPalScriptProvider } from "@paypal/react-paypal-js"

function PayPalPaymentProvider({ children }) {
    return <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
        {children}
    </PayPalScriptProvider>

}
export default PayPalPaymentProvider