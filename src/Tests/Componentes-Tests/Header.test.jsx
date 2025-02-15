import axios from "axios";
import { render, defaultProps } from "../test-utils.jsx";
import { screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { logRoles, within } from "@testing-library/dom";
import { Header } from "../../Componentes";
import "@testing-library/jest-dom";

describe("Test Components", () => {
  test("Test Header Component 1", async () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      { providerProps: defaultProps }
    );
    logRoles(container);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });

  test("Test Header Component 2", async () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      { providerProps: defaultProps }
    );

    const themeIconElement = container.querySelector(
      "[class*=header_theme_icon]"
    );

    fireEvent.click(themeIconElement);

    expect(themeIconElement).toBeInTheDocument();
    expect(defaultProps.themeProviderProps.toggleTheme).toHaveBeenCalledTimes(
      1
    );
  });

  test("Test Header Component 3", async () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      { providerProps: defaultProps }
    );

    const languageSelectElement = container.querySelector(
      "[class*=header_language]"
    );

    const innerInput = container.querySelector(
      "[class*=MuiSelect-nativeInput]"
    );

    fireEvent.change(innerInput, {
      target: { value: "en-US" },
    });

    expect(languageSelectElement).toBeInTheDocument();
    expect(innerInput).toBeInTheDocument();
    expect(
      defaultProps.languageProviderProps.setLanguage
    ).toHaveBeenCalledTimes(1);
  });
});
