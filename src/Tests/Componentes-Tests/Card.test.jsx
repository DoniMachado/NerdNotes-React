import axios from "axios";
import { render, defaultProps } from "../test-utils.jsx";
import { screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { logRoles, waitFor, within } from "@testing-library/dom";
import { Card } from "../../Componentes";
import "@testing-library/jest-dom";

describe("Test Components", () => {
  test("Test Card Component 1", async () => {
    const AddGenreFilter = jest.fn();

    const { container } = render(
      <BrowserRouter>
        <Card
          id={3}
          type={"movie"}
          image={"image"}
          title={"title"}
          description={"description"}
          release_date={"2024-04-10"}
          genres={[28, 12, 16]}
          vote_average={3.5}
          vote_count={4000}
          popularity={3}
          AddGenreFilter={AddGenreFilter}
        />
      </BrowserRouter>,
      {
        providerProps: defaultProps,
      }
    );
    logRoles(container);
    const titleElement = screen.getByText("title");
    const descriptionElement = screen.getByText("description");
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  test("Test Card Component 2", async () => {
    const AddGenreFilter = jest.fn();

    const { container } = render(
      <BrowserRouter>
        <Card
          id={3}
          type={"movie"}
          image={"image"}
          title={"title"}
          description={"description"}
          release_date={"2024-04-10"}
          genres={[28, 12, 16]}
          vote_average={3.5}
          vote_count={4000}
          popularity={3}
          AddGenreFilter={AddGenreFilter}
        />
      </BrowserRouter>,
      {
        providerProps: defaultProps,
      }
    );
    logRoles(container);
    const titleElement = screen.getByText("title");
    const descriptionElement = screen.getByText("description");

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();

    fireEvent.click(titleElement);
    expect(window.location.pathname).toBe("/details/movie/3");
  });
});
