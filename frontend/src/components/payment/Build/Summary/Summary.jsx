import React from 'react';
import clx from "classnames";
import Order from '../Order/Order';
import { motion } from 'framer-motion';
import sum from "../../styles/Summary.module.scss";

const Summary = props => {
    const { switchSections, datas , switchBtn} = props;
  return (
    <motion.div 
        className={clx(sum.bagSection__SummarySection)}
        initial={{ opacity: 1, x: 0, transitionDuration: '0.1s', transition: { x: 0.2 } }}
        exit={{ x: '100%' }}
        animate={switchSections && { opacity: 1, x: '-100%' }}
    >
        <div className={sum.bagSection__SummarySection__container}>
            <h1 className={sum.title}>Summary</h1>
            <div className={sum.ordersSection}>
                <h3 className={sum.ordersSection__title}>Product</h3>
                <div className={sum.ordersSection__productsSection}>
                    {datas?.map((el, idx) => <Order />)}
                </div>
            </div>
            <div className={sum.bagSection__SummarySection__container__shipping}>
                <p>Shipping: </p>
                <p>USD 18.00</p>
            </div>
            <div className={sum.bagSection__SummarySection__container__shipping}>
                <p>Estimated taxes: </p>
                <p>USD 560.00</p>
            </div>
            <div className={sum.bagSection__SummarySection__container__shipping}>
                <h3>Subtotal: </h3>
                <h3>USD 1800.00</h3>
            </div>
            <div className={clx(sum.bagSection__SummarySection__container__continueToPaymentSection, switchSections && sum.removeBtn)}>
                <button onClick={switchBtn}>Continue to payment</button>
                <div>
                    <p>Secure payment via Stripe</p>
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default Summary