import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { PasskeyModal } from "@/components/PasskeyModal";
import * as utils from "@/lib/utils"; // Import pour mocker encryptKey et decryptKey

// Mocking des modules externes
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("@/lib/utils", () => ({
  encryptKey: jest.fn(),
  decryptKey: jest.fn(),
}));

describe("PasskeyModal", () => {
  const mockPush = jest.fn();
  const mockSetOpen = jest.fn();

  beforeEach(() => {
    // Reset mock avant chaque test
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (utils.decryptKey as jest.Mock).mockReturnValue("valid-passkey");
    (utils.encryptKey as jest.Mock).mockReturnValue("encrypted-passkey");
  });

  it("should render modal correctly", () => {
    render(<PasskeyModal />);

    // Vérifie si le modal est bien rendu
    expect(screen.getByText("Admin Access Verification")).toBeInTheDocument();
    expect(
      screen.getByText("To access the admin page, please enter the passkey.")
    ).toBeInTheDocument();
  });

  it("should close modal when passkey is correct", async () => {
    render(<PasskeyModal />);

    // Simule la saisie du passkey
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "valid-passkey" },
    });

    // Simule le clic sur le bouton de validation
    fireEvent.click(screen.getByText("Enter Admin Passkey"));

    // Vérifie que la fonction de validation a été appelée
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/admin");
      expect(mockSetOpen).toHaveBeenCalledWith(false); // Vérifie que le modal se ferme
    });
  });

  it("should show error message for incorrect passkey", async () => {
    render(<PasskeyModal />);

    // Simule la saisie d'un passkey incorrect
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "wrong-passkey" },
    });

    // Simule le clic sur le bouton de validation
    fireEvent.click(screen.getByText("Enter Admin Passkey"));

    // Vérifie que le message d'erreur s'affiche
    await waitFor(() => {
      expect(
        screen.getByText("Invalid passkey. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("should handle modal close", () => {
    render(<PasskeyModal />);

    // Simule le clic sur l'icône de fermeture
    fireEvent.click(screen.getByAltText("close"));

    // Vérifie que la modal se ferme
    expect(mockSetOpen).toHaveBeenCalledWith(false);
    expect(mockPush).toHaveBeenCalledWith("/"); // Vérifie que l'utilisateur est redirigé vers "/"
  });
});
