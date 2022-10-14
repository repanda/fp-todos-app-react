import DarkThemeToggle from "../DarkThemeToggle/DarkThemeToggle.view";
import SocialLinks from "../SocialLinks/SocialLinks.view";

import "./Header.style.scss";

type Props = {
  darkModeFlag: boolean;
  toggleDarkMode: () => void;
};
const Header = ({ darkModeFlag, toggleDarkMode }: Props) => {
  return (
    <header className="Header">
      <DarkThemeToggle
        darkModeFlag={darkModeFlag}
        toggleDarkMode={toggleDarkMode}
      />
      <SocialLinks />
    </header>
  );
};

Header.defaultProps = {
  darkModeFlag: false,
};

export default Header;
