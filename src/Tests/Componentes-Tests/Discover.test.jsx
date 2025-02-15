import axios from "axios";
import { render, defaultProps } from "../test-utils.jsx";
import { screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { logRoles, waitFor, within } from "@testing-library/dom";
import { Discover } from "../../Componentes";
import { CONTENT_TYPE_MOVIE, getOrders, getGenres } from "../../Utils";
import "@testing-library/jest-dom";

describe("Test Components", () => {
  test("Test Discover Component 1", async () => {
    const { container } = render(
      <BrowserRouter>
        <Discover
          type={CONTENT_TYPE_MOVIE}
          title={"title"}
          genres={getGenres(CONTENT_TYPE_MOVIE)}
          orders={getOrders(CONTENT_TYPE_MOVIE)}
        />
      </BrowserRouter>,
      {
        providerProps: defaultProps,
      }
    );
    logRoles(container);
    const titleElement = screen.getByText("title");
    expect(titleElement).toBeInTheDocument();
  });
});
