import React from "react";
import css from "./BagStyle.module.scss";
import Order from "./Build/Order/Order";
import Titles from "./Build/Titles/Titles";
import { motion } from "framer-motion";

export const BagSection = () => {
  const datas = new Array(3).fill(1);
  return (
    <section className={css.bagSection}>
      <div className={css.bagSection__titleSection}>
        <h1 className={css.bagSection__titleSection__title}>SHOPPING BAG</h1>
      </div>
      <motion.div
        className={css.bagSection__ordersSection}
        initial={{
          opacity: 0,
          transitionDuration: "0.2s",
          x: -30,
          transition: { x: "1s", opacity: "1s" },
        }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Titles />
        <div className={css.bagSection__ordersSection__orders}>
          {datas?.map((el, idx) => (
            <Order key={idx} />
          ))}
        </div>
        <div className={css.bagSection__ordersSection__totalSection}>
          <div className={css.bagSection__ordersSection__totalSection__total}>
            <h3>TOTAL PRICE </h3>
            <p>USD 320.00</p>
          </div>
        </div>

        <div className={css.bagSection__ordersSection__main_button_section}>
          <button>Go to checkout</button>
          <p>Shipping & taxes calculated a checkout</p>
        </div>
      </motion.div>
    </section>
  );
};
