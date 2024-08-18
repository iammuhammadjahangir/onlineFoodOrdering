import { Icon } from "@iconify/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageDropDown = () => {
  const { i18n } = useTranslation();

  const [isDialogueOpen, setIsDialogueOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language
  );

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setSelectedLanguage(lng);
    setIsDialogueOpen(false);
  };

  // Map language keys to their respective icons
  const languageIcons = {
    en: "us",
    ur: "pk",
  };

  // Define language options with only language keys
  const languageOptions = [
    { key: "en", value: "en", text: "English" },
    { key: "ur", value: "ur", text: "Urdu" },
  ];

  return (
    <div className="lang-menu">
      <div
        className="selected-lang"
        onClick={() => {
          setIsDialogueOpen((prev) => !prev);
        }}
      >
        <Icon
          icon={`flag:${
            languageIcons[selectedLanguage as keyof typeof languageIcons]
          }-4x3`}
        />
        {selectedLanguage === "en" ? "English" : "Urdu"}
      </div>
      <dialog open={isDialogueOpen}>
        <ul>
          {languageOptions.map((language) => (
            <li key={language.key}>
              <Icon
                icon={`flag:${
                  languageIcons[language.key as keyof typeof languageIcons]
                }-4x3`}
              />
              <a
                href="#"
                onClick={() => {
                  changeLanguage(language.value);
                }}
              >
                {language.text}
              </a>
            </li>
          ))}
        </ul>
      </dialog>
    </div>
  );
};

export default LanguageDropDown;
