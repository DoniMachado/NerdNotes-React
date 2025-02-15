import axios from "axios";
import { render, defaultProps } from "../test-utils.jsx";
import { screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { logRoles, waitFor, within } from "@testing-library/dom";
import { RatingDialog } from "../../Componentes";
import "@testing-library/jest-dom";

describe("Test Components", () => {
  test("Test RatingDialog Component 1", async () => {
    const cancelAction = jest.fn();
    const confirmAction = jest.fn();
    const closeAction = jest.fn();

    const { container } = render(
      <RatingDialog
        id={1}
        type={"movie"}
        ratingDialogOpen={true}
        ratingDialogTitle={"Title Teste"}
        rating={3}
        ratingDialogCancelButton={"Cancel"}
        ratingDialogCancelButtonAction={cancelAction}
        ratingDialogConfirmButton={"Confirm"}
        ratingDialogConfirmButtonAction={confirmAction}
        ratingDialogCloseAction={closeAction}
      />,
      {
        providerProps: defaultProps,
      }
    );
    logRoles(container);
    const dialogTitleElement = screen.getByText("Title Teste");
    const dialogCancelButtonElement = screen.getByText("Cancel");
    const dialogConfirmButtonElement = screen.getByText("Confirm");
    expect(dialogTitleElement).toBeInTheDocument();
    expect(dialogCancelButtonElement).toBeInTheDocument();
    expect(dialogConfirmButtonElement).toBeInTheDocument();
  });

  test("Test RatingDialog Component 2", async () => {
    const cancelAction = jest.fn();
    const confirmAction = jest.fn();
    const closeAction = jest.fn();

    const { container } = render(
      <RatingDialog
        id={1}
        type={"movie"}
        ratingDialogOpen={true}
        ratingDialogTitle={"Title Teste"}
        rating={3}
        ratingDialogCancelButton={"Cancel"}
        ratingDialogCancelButtonAction={cancelAction}
        ratingDialogConfirmButton={"Confirm"}
        ratingDialogConfirmButtonAction={confirmAction}
        ratingDialogCloseAction={closeAction}
      />,
      {
        providerProps: defaultProps,
      }
    );
    logRoles(container);
    const dialogTitleElement = screen.getByText("Title Teste");
    const dialogCancelButtonElement = screen.getByText("Cancel");
    const dialogConfirmButtonElement = screen.getByText("Confirm");

    fireEvent.click(dialogCancelButtonElement);

    expect(dialogTitleElement).toBeInTheDocument();
    expect(dialogCancelButtonElement).toBeInTheDocument();
    expect(dialogConfirmButtonElement).toBeInTheDocument();
    expect(cancelAction).toHaveBeenCalledTimes(1);
  });

  test("Test RatingDialog Component 3", async () => {
    const cancelAction = jest.fn();
    const confirmAction = jest.fn();
    const closeAction = jest.fn();

    const { container } = render(
      <RatingDialog
        id={1}
        type={"movie"}
        ratingDialogOpen={true}
        ratingDialogTitle={"Title Teste"}
        rating={3}
        ratingDialogCancelButton={"Cancel"}
        ratingDialogCancelButtonAction={cancelAction}
        ratingDialogConfirmButton={"Confirm"}
        ratingDialogConfirmButtonAction={confirmAction}
        ratingDialogCloseAction={closeAction}
      />,
      {
        providerProps: defaultProps,
      }
    );
    logRoles(container);
    const dialogTitleElement = screen.getByText("Title Teste");
    const dialogCancelButtonElement = screen.getByText("Cancel");
    const dialogConfirmButtonElement = screen.getByText("Confirm");

    fireEvent.click(dialogConfirmButtonElement);

    expect(dialogTitleElement).toBeInTheDocument();
    expect(dialogCancelButtonElement).toBeInTheDocument();
    expect(dialogConfirmButtonElement).toBeInTheDocument();
    expect(confirmAction).toHaveBeenCalledTimes(1);
  });
});
