import axios from "axios";
import { render, defaultProps } from "../test-utils.jsx";
import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { logRoles, waitFor, within } from "@testing-library/dom";
import { CustomAlert } from "../../Componentes";
import "@testing-library/jest-dom";

describe("Test Components", () => {
  test("Test CustomAlert Component 1", async () => {
    const closeAlert = jest.fn();

    const { container } = render(
      <CustomAlert
        alertOpen={true}
        timeoutDuration={100}
        alertMessage={"Mensagem Teste"}
        alertVariant={"standard"}
        alertSeverity={"info"}
        alertHorizontal={"center"}
        alertVertical={"bottom"}
        closeAlert={closeAlert}
      />,
      {
        providerProps: defaultProps,
      }
    );
    logRoles(container);
    const alertElement = screen.getByText("Mensagem Teste");
    expect(alertElement).toBeInTheDocument();
    await waitFor(() => {
      expect(closeAlert).toHaveBeenCalledTimes(1);
    });
  });
});
