import React from "react";

import "./DarkThemeToggle.style.scss";
import { saveToDB } from "../../helpers";

type Props = {
  darkModeFlag: boolean;
  toogleDarkMode: () => void;
};
const DarkThemeToggle = ({ darkModeFlag, toogleDarkMode }: Props) => {
  const getElementClasses = `DarkThemeToggle ${
    darkModeFlag ? "DarkThemeToggle--isActive" : ""
  }`;

  return (
    <div className={getElementClasses} onClick={toogleDarkMode}>
      {darkModeFlag ? (
        <span>إيقاف الوضع الليلي</span>
      ) : (
        <span>تفعيل الوضع الليلي</span>
      )}
    </div>
  );
};

export default DarkThemeToggle;
