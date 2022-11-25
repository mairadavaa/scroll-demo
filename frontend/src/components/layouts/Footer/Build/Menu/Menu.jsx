import React from 'react';
import menu from "../Menu.module.scss";
import clx from "classnames";

export const Menu = () => {
  return (
    <div className={menu.menu_section}>
        <h3>Menu</h3>
        <div className={clx(menu.menu_section__navbar_btns, menu.forever_active)}>
            <a href="">About us</a>
            <a href="">Products</a>
            <a href="">Account</a>
            <a href="">Log out</a>
            <div className={menu.menu_section__navbar_btns__language_btns}>
                <button>ENG</button>
                <p>&nbsp;/&nbsp;</p>
                <button>MN</button>
            </div>
        </div>
    </div>
  )
}