import axios from "axios";
import { render, defaultProps } from "../test-utils.jsx";
import { screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { logRoles, waitFor, within } from "@testing-library/dom";
import { CustomDialog } from "../../Componentes";
import "@testing-library/jest-dom";

describe("Test Components", () => {
  test("Test CustomDialog Component 1", async () => {
    const cancelAction = jest.fn();
    const confirmAction = jest.fn();
    const closeAction = jest.fn();

    const { container } = render(
      <CustomDialog
        dialogOpen={true}
        dialogTitle={"Title Teste"}
        dialogMessage={"Mensagem Teste"}
        dialogCancelButton={"Cancel"}
        dialogCancelButtonAction={cancelAction}
        dialogConfirmButton={"Confirm"}
        dialogConfirmButtonAction={confirmAction}
        dialogCloseAction={closeAction}
      />,
      {
        providerProps: defaultProps,
      }
    );
    logRoles(container);
    const dialogTitleElement = screen.getByText("Title Teste");
    const dialogMessageElement = screen.getByText("Mensagem Teste");
    const dialogCancelButtonElement = screen.getByText("Cancel");
    const dialogConfirmButtonElement = screen.getByText("Confirm");
    expect(dialogTitleElement).toBeInTheDocument();
    expect(dialogMessageElement).toBeInTheDocument();
    expect(dialogCancelButtonElement).toBeInTheDocument();
    expect(dialogConfirmButtonElement).toBeInTheDocument();
  });

  test("Test CustomDialog Component 2", async () => {
    const cancelAction = jest.fn();
    const confirmAction = jest.fn();
    const closeAction = jest.fn();

    const { container } = render(
      <CustomDialog
        dialogOpen={true}
        dialogTitle={"Title Teste"}
        dialogMessage={"Mensagem Teste"}
        dialogCancelButton={"Cancel"}
        dialogCancelButtonAction={cancelAction}
        dialogConfirmButton={"Confirm"}
        dialogConfirmButtonAction={confirmAction}
        dialogCloseAction={closeAction}
      />,
      {
        providerProps: defaultProps,
      }
    );
    logRoles(container);
    const dialogTitleElement = screen.getByText("Title Teste");
    const dialogMessageElement = screen.getByText("Mensagem Teste");
    const dialogCancelButtonElement = screen.getByText("Cancel");
    const dialogConfirmButtonElement = screen.getByText("Confirm");

    fireEvent.click(dialogCancelButtonElement);

    expect(dialogTitleElement).toBeInTheDocument();
    expect(dialogMessageElement).toBeInTheDocument();
    expect(dialogCancelButtonElement).toBeInTheDocument();
    expect(dialogConfirmButtonElement).toBeInTheDocument();
    expect(cancelAction).toHaveBeenCalledTimes(1);
  });

  test("Test CustomDialog Component 3", async () => {
    const cancelAction = jest.fn();
    const confirmAction = jest.fn();
    const closeAction = jest.fn();

    const { container } = render(
      <CustomDialog
        dialogOpen={true}
        dialogTitle={"Title Teste"}
        dialogMessage={"Mensagem Teste"}
        dialogCancelButton={"Cancel"}
        dialogCancelButtonAction={cancelAction}
        dialogConfirmButton={"Confirm"}
        dialogConfirmButtonAction={confirmAction}
        dialogCloseAction={closeAction}
      />,
      {
        providerProps: defaultProps,
      }
    );
    logRoles(container);
    const dialogTitleElement = screen.getByText("Title Teste");
    const dialogMessageElement = screen.getByText("Mensagem Teste");
    const dialogCancelButtonElement = screen.getByText("Cancel");
    const dialogConfirmButtonElement = screen.getByText("Confirm");

    fireEvent.click(dialogConfirmButtonElement);

    expect(dialogTitleElement).toBeInTheDocument();
    expect(dialogMessageElement).toBeInTheDocument();
    expect(dialogCancelButtonElement).toBeInTheDocument();
    expect(dialogConfirmButtonElement).toBeInTheDocument();
    expect(confirmAction).toHaveBeenCalledTimes(1);
  });
});
