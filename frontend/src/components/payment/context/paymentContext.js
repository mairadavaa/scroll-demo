import { createContext, useContext, useState } from "react";

const Payment = createContext();

export const PaymentProvider = ({ children }) => {
  const [openPocket, setOpenPocket] = useState(false);
  return (
    <Payment.Provider value={{ openPocket, setOpenPocket }}>
      {children}
    </Payment.Provider>
  );
};

export const usePaymentContext = () => useContext(Payment);
