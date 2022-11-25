import classes from "../../assets/styles/header.module.scss";


import { MenuHorzintial } from "./menuHorzintal";

export const Header = () => {

  return (
    <header className={classes.header}>
      <MenuHorzintial headermenu={header_text} headermenu2={header_text2} />
    </header>
  );
};

const header_text = [
  {title_1: "ABOUT", path_1:"/", 
   title_2: "PRODUCT", path_2:"/products",
   title_3: "CONTACT", path_3:"/contact",
  },
];

const header_text2 = [
  {
    title_5: "ENG/",
    title_6: "MON",
    title_7: "BAG",
    title_8: "LOGIN",
  },
];
