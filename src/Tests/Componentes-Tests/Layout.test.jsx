import axios from "axios";
import { render, defaultProps } from "../test-utils.jsx";
import { screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { logRoles, within } from "@testing-library/dom";
import { Layout } from "../../Componentes";
import "@testing-library/jest-dom";

describe("Test Components", () => {
  test("Test Layout Component 1", async () => {
    const { container } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>,
      { providerProps: defaultProps }
    );
    logRoles(container);
    const layoutElement = container.querySelector("[id*=layout]");
    const headerElement = screen.getByRole("banner");
    const mainElement = screen.getByRole("main");
    const footerElement = screen.getByRole("contentinfo");

    expect(layoutElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
    expect(headerElement).toBeInTheDocument();
  });
});
