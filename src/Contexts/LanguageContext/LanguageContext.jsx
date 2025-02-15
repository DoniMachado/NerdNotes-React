import React, { useEffect, createContext, useState } from "react";

import translationPTBR from "./languages/language_pt_BR.jsx";
import translationENUS from "./languages/language_en_US.jsx";
import translationESES from "./languages/language_es_ES.jsx";

const LanguageContext = createContext();

//pt-BR
//es-ES
//en-US

const getLanguage = () => {
  const language = localStorage.getItem("language");
  if (!language) {
    localStorage.setItem("pt-BR", "language");
    return "pt-BR";
  } else {
    return language;
  }
};

const loadTranslations = (lang) => {
  let translations = null;
  switch (lang) {
    case "en-US":
      translations = translationENUS;
      break;

    case "es-ES":
      translations = translationESES;
      break;

    case "pt-BR":
    default:
      translations = translationPTBR;
      break;
  }

  return new Map(Object.entries(translations));
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getLanguage);
  const [translations, setTranslations] = useState(null);

  function getTranslation(key) {
    if (translations && translations.has(key)) return translations.get(key);
    else return key;
  }

  useEffect(() => {
    localStorage.setItem("language", language);
    setTranslations(loadTranslations(language));
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        getTranslation,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
