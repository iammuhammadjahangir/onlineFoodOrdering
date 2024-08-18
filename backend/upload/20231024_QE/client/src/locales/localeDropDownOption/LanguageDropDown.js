import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "semantic-ui-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  const languageOptions = [
    { key: "en", value: "en", text: "English" },
    { key: "ur", value: "ur", text: "Urdu" },
  ];

  return (
    <div>
      <Dropdown
        button
        className="icon"
        floating
        labeled
        icon="world"
        options={languageOptions}
        defaultValue={i18n.language}
        onChange={(event, data) => changeLanguage(data.value)}
      />
    </div>
  );
};

export default LanguageSwitcher;
