import axios from "axios";
import { render, defaultProps } from "../test-utils.jsx";
import { screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { logRoles, within } from "@testing-library/dom";
import { Protected } from "../../Componentes";
import "@testing-library/jest-dom";

describe("Test Components", () => {
  test("Test Protected Component 1", async () => {
    const { container } = render(
      <BrowserRouter>
        <Protected />
      </BrowserRouter>,
      { providerProps: defaultProps }
    );

    expect(container).toBeInTheDocument();
  });

  test("Test Protected Component 2", async () => {
    const cloneProps = { ...defaultProps };
    cloneProps.authorizeProviderProps.isAuthorized = false;

    const { container } = render(
      <BrowserRouter>
        <Protected />
      </BrowserRouter>,
      { providerProps: { ...cloneProps } }
    );

    expect(container).toBeInTheDocument();
    expect(window.location.pathname).toBe("/login");
  });
});
