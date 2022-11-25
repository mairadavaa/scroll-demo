import React from 'react';
import location from "../Menu.module.scss";

export const Location = () => {
  return (
    <div className={location.menu_section}>
      <h3>Location</h3>
      <div className={location.menu_section__navbar_btns}>
        <p>Ulaanbaatar, Mongolia .34</p>
        <p>district</p>
        <p>apartment 35.</p>
      </div>
      <p className={location.menu_section__text}>Ulaanbaatar, Mongolia .34 district apartment 35.</p>
    </div>
  )
}