import React from 'react';
import newsletter from "../Menu.module.scss";

export const Newsletter = () => {
  return (
    <div className={newsletter.menu_section}>
      <h3>NEWSLETTER</h3>
      <div className={newsletter.menu_section__navbar_btns}>
        <p>Carefully curated online design store.</p>
        <p>Featuring simple. Beautiful</p>
        <p>and thought fuly designed products</p>
      </div>
      <p className={newsletter.menu_section__text}>Carefully curated online design store. Featuring simple. Beautiful and thought fuly designed products</p>
    </div>
  )
}