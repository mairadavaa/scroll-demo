import React from 'react';
import social_links from "../Menu.module.scss";

// logos 
import fb from "./fb.png";
import instagram from "./instagram.png";

export const SocialLinks = () => {
  return (
    <div className={social_links.menu_section}>
      <h3>SOCIAL LINKS</h3>
      <div className={social_links.menu_section__social_logos}>
        <a href="">
          <img src={instagram} alt="instagram" />
        </a>
        <a href="">
          <img src={fb} alt="facebook" />
        </a>
      </div>
    </div>
  )
}