import React from "react";
import { render } from "@testing-library/react";
import {
  AuthorizeContext,
  ThemeContext,
  LanguageContext,
  GlobalComponentsContext,
  AuthorizeProvider,
  ThemeProvider,
  LanguageProvider,
  GlobalComponentsProvider,
} from "../Contexts/index.js";

const defaultProps = {
  languageProviderProps: {
    language: "pt-BR",
    setLanguage: jest.fn(),
    getTranslation: jest.fn(),
  },
  authorizeProviderProps: {
    sessionID: "",
    accountID: "",
    isAuthorized: true,
    token: process.env.REACT_APP_PRIVATE_API_TOKEN,
    LogOut: jest.fn(),
    LogIn: jest.fn(),
  },
  themeProviderProps: {
    theme: "light-theme",
    setTheme: jest.fn(),
    toggleTheme: jest.fn(),
    isDarkTheme: jest.fn(() => false),
  },
  globalComponentsProviderProps: {
    showAlert: jest.fn(),
    closeAlert: jest.fn(),
    showDialog: jest.fn(),
    closeDialog: jest.fn(),
  },
};

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <LanguageContext.Provider value={providerProps.languageProviderProps}>
      <AuthorizeContext.Provider value={providerProps.authorizeProviderProps}>
        <ThemeContext.Provider value={providerProps.themeProviderProps}>
          <GlobalComponentsContext.Provider
            value={providerProps.globalComponentsProviderProps}
          >
            {ui}
          </GlobalComponentsContext.Provider>
        </ThemeContext.Provider>
      </AuthorizeContext.Provider>
    </LanguageContext.Provider>,
    renderOptions
  );
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, defaultProps };
