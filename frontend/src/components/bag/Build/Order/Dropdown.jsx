import React from "react";
import dropdown from "./OrderStyle.module.scss";

const Dropdown = (props) => {
  return (
    <ul className={dropdown.drop_text}>
      <li>XXL</li>
      <li>XS</li>
      <li>XL</li>
    </ul>
  );
};

export default Dropdown;
