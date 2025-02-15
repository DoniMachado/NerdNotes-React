import axios from "axios";
import { render, defaultProps } from "../test-utils.jsx";
import { screen } from "@testing-library/react";
import { logRoles } from "@testing-library/dom";
import { Footer } from "../../Componentes";
import "@testing-library/jest-dom";

describe("Test Components", () => {
  test("Test Footer Component 1", async () => {
    const { container } = render(<Footer />, { providerProps: defaultProps });
    logRoles(container);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });
});
