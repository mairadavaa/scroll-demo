import React from "react";
import css from "../../BagStyle.module.scss";

const Titles = () => {
  return (
    <div className={css.bagSection__ordersSection__titles}>
      <div className={css.bagSection__ordersSection__titles__product}>
        <h4>Products</h4>
      </div>
      <div className={css.bagSection__ordersSection__titles__title}>
        <h4>Color</h4>
        <h4>Size</h4>
        <h4>QTY</h4>
        <h4>Price</h4>
        <h4>Action</h4>
      </div>
    </div>
  );
};

export default Titles;
