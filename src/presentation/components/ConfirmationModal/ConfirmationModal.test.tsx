import { render, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import { ThemeProvider } from "styled-components";
import { ConfirmationModal } from "./ConfirmationModal";
import { theme } from "@src/presentation/styles/theme";

describe("ConfirmationModal component", () => {
  const mockTitle = "Delete Item";
  const mockDescription = "Are you sure you want to delete this item?";
  const handleConfirm = vi.fn();
  const handleCancel = vi.fn();

  it("should render modal with correct title and description", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ConfirmationModal
          title={mockTitle}
          description={mockDescription}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </ThemeProvider>
    );

    expect(getByText(mockTitle)).toBeTruthy();
    expect(getByText(mockDescription)).toBeTruthy();
  });

  it("should call onCancel when close button is clicked", () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <ConfirmationModal
          title={mockTitle}
          description={mockDescription}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </ThemeProvider>
    );

    const closeButton = getByLabelText("close");
    fireEvent.click(closeButton);

    expect(handleCancel).toHaveBeenCalled();
  });

  it("should call onCancel when cancel button is clicked", () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <ConfirmationModal
          title={mockTitle}
          description={mockDescription}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </ThemeProvider>
    );

    const cancelButton = getByLabelText("cancel");
    fireEvent.click(cancelButton);

    expect(handleCancel).toHaveBeenCalled();
  });

  it("should call onConfirm when confirm button is clicked", () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <ConfirmationModal
          title={mockTitle}
          description={mockDescription}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </ThemeProvider>
    );

    const confirmButton = getByLabelText("confirm");
    fireEvent.click(confirmButton);

    expect(handleConfirm).toHaveBeenCalled();
  });
});
