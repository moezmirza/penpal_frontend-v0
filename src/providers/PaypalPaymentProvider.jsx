import { PayPalScriptProvider } from "@paypal/react-paypal-js"

function PayPalPaymentProvider({ children }) {
    return <PayPalScriptProvider options={{ clientId: "AfEbAVREGRyV444bUg8Ug0b4ZLXuQQfs9ajpM5H2HKKF3PR1yLkEdNcSBFXfG8xi1JtlIr9AjQaXHJE9" }}>
        {children}
    </PayPalScriptProvider>

}
export default PayPalPaymentProvider