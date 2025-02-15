import axios from "axios";
import { render, defaultProps } from "../test-utils.jsx";
import { screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { logRoles, within } from "@testing-library/dom";
import { Unprotected } from "../../Componentes";
import "@testing-library/jest-dom";

describe("Test Components", () => {
  test("Test Unprotected Component 1", async () => {
    const { container } = render(
      <BrowserRouter>
        <Unprotected />
      </BrowserRouter>,
      { providerProps: defaultProps }
    );

    expect(container).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");
  });

  test("Test Unprotected Component 2", async () => {
    const cloneProps = { ...defaultProps };
    cloneProps.authorizeProviderProps.isAuthorized = false;

    const { container } = render(
      <BrowserRouter>
        <Unprotected />
      </BrowserRouter>,
      { providerProps: { ...cloneProps } }
    );

    expect(container).toBeInTheDocument();
  });
});
