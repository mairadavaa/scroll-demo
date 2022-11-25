import { PaymentProvider } from "./context/paymentContext";
import { Payment } from "./Payment";
import React from "react";

export const PaymentSection = () => {
  return (
    <PaymentProvider>
      <Payment />
    </PaymentProvider>
  );
};
