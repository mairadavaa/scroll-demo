import React from 'react';
import css from "./OrderStyle.module.scss";

const Order = () => {
  return (
    <div className={css.orderedProductSection}>
        <div className={css.orderedProductSection__imgSection}>
            <img src="https://github.com/bilguun111101/product-section/blob/main/front-end/src/components/Products/Product/product.png" alt="" />
        </div>
        <div className={css.orderedProductSection__documentSection}>
            <div className={css.orderedProductSection__documentSection__content}>
                <h4>Black cute mask - hand made</h4>
                <p>M | USD 650.00</p>
            </div>
            <button>remove</button>
        </div>
    </div>
  )
}

export default Order