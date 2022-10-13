import React from "react";
import DarkThemeToggle from "../DarkThemeToggle/DarkThemeToggle.view";
import SocialLinks from "../SocialLinks/SocialLinks.view";

import "./Header.style.scss";

type Props = {
  darkModeFlag: boolean;
  toogleDarkMode: () => void;
};
const Header = ({ darkModeFlag, toogleDarkMode }: Props) => {
  return (
    <header className="Header">
      <DarkThemeToggle
        darkModeFlag={darkModeFlag}
        toogleDarkMode={toogleDarkMode}
      />
      <SocialLinks />
    </header>
  );
};

Header.defaultProps = {
  darkModeFlag: false,
};

export default Header;
