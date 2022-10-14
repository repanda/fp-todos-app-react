import "./DarkThemeToggle.style.scss";

type Props = {
  darkModeFlag: boolean;
  toggleDarkMode: () => void;
};
const DarkThemeToggle = ({ darkModeFlag, toggleDarkMode }: Props) => {
  const getElementClasses = `DarkThemeToggle ${
    darkModeFlag ? "DarkThemeToggle--isActive" : ""
  }`;

  return (
    <div className={getElementClasses} onClick={toggleDarkMode}>
      {darkModeFlag ? (
        <span>إيقاف الوضع الليلي</span>
      ) : (
        <span>تفعيل الوضع الليلي</span>
      )}
    </div>
  );
};

export default DarkThemeToggle;
