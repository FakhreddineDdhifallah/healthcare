import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// import { Button } from "@/components/ui/button";

import { AppointmentModal } from "./AppointmentModal";

// Mock des composants et hooks
jest.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogTitle: ({ children }: { children: React.ReactNode }) => (
    <h1>{children}</h1>
  ),
  DialogDescription: ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  ),
}));

jest.mock("./forms/AppointmentForm", () => ({
  AppointmentForm: ({ type }: { type: string }) => <form>{type} Form</form>,
}));

describe("AppointmentModal", () => {
  const mockSetOpen = jest.fn();

  it("renders the button and opens the modal", async () => {
    render(
      <AppointmentModal
        patientId="patient123"
        userId="user123"
        type="schedule"
        title="Schedule Appointment"
        description="Description of appointment"
      />
    );

    // Vérifier que le bouton est bien rendu avec le texte approprié
    const button = screen.getByRole("button", { name: /schedule/i });
    expect(button).toBeInTheDocument();

    // Simuler le clic sur le bouton
    fireEvent.click(button);

    // Vérifier que le modal s'ouvre (le contenu du dialog est visible)
    await waitFor(() => {
      expect(screen.getByText("Schedule Appointment")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Please fill in the following details to schedule appointment"
        )
      ).toBeInTheDocument();
    });
  });

  it("renders the cancel button and opens the modal with the correct text", async () => {
    render(
      <AppointmentModal
        patientId="patient123"
        userId="user123"
        type="cancel"
        title="Cancel Appointment"
        description="Description of cancel appointment"
      />
    );

    // Vérifier que le bouton est bien rendu avec le texte approprié
    const button = screen.getByRole("button", { name: /cancel/i });
    expect(button).toBeInTheDocument();

    // Simuler le clic sur le bouton
    fireEvent.click(button);

    // Vérifier que le modal s'ouvre avec le texte de cancel
    await waitFor(() => {
      expect(screen.getByText("Cancel Appointment")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Please fill in the following details to cancel appointment"
        )
      ).toBeInTheDocument();
    });
  });

  it("should call setOpen when the modal is opened", async () => {
    render(
      <AppointmentModal
        patientId="patient123"
        userId="user123"
        type="schedule"
        title="Schedule Appointment"
        description="Description of appointment"
      />
    );

    const button = screen.getByRole("button", { name: /schedule/i });
    fireEvent.click(button);

    // Test si `setOpen` est appelé avec l'ouverture du modal
    await waitFor(() => {
      expect(mockSetOpen).toHaveBeenCalledTimes(1);
    });
  });
});
