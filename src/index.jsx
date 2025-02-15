import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ThemeProvider,
  AuthorizeProvider,
  LanguageProvider,
  GlobalComponentsProvider,
} from "./Contexts/index.js";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <LanguageProvider>
    <AuthorizeProvider>
      <ThemeProvider>
        <GlobalComponentsProvider>
          <App />
        </GlobalComponentsProvider>
      </ThemeProvider>
    </AuthorizeProvider>
  </LanguageProvider>
);
