import React from "react";
import { Menu, Location, Newsletter, SocialLinks } from "./Build";
import css from "./FooterStyle.module.scss";
import logo from "./logo.png";

export const Footer = () => {
  return (
    <div className={css.footer_section}>
      <div className={css.footer_section__document_section}>
        <Menu />
        <Newsletter />
        <Location />
        <SocialLinks />
      </div>
      <div className={css.footer_section__introduction_section}>
        <img src={logo} alt="" />
        <p>@2022 Mepo Af. Website designed by Surneke</p>
      </div>
    </div>
  );
};
