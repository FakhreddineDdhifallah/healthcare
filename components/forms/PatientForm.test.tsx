import "@testing-library/jest-dom"; // Importer jest-dom pour ajouter les matchers étendus
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom"; // Si tu utilises react-router pour la navigation

import { createUser } from "@/lib/actions/patient.actions"; // Mock de la fonction createUser

import { PatientForm } from "./PatientForm"; // Import direct du composant

// Mocking la fonction createUser
jest.mock("@/lib/actions/patient.actions", () => ({
  createUser: jest.fn(),
}));

describe("PatientForm", () => {
  it("should render the form with inputs and button", () => {
    render(
      <Router>
        <PatientForm />
      </Router>
    );

    // Vérifie que le formulaire se charge correctement
    expect(screen.getByLabelText(/Full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone number/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Get Started/i })
    ).toBeInTheDocument();
  });

  it("should call createUser on form submission with valid inputs", async () => {
    const mockCreateUser = createUser as jest.Mock;
    mockCreateUser.mockResolvedValueOnce({ $id: "123" }); // Simule une réponse réussie

    render(
      <Router>
        <PatientForm />
      </Router>
    );

    // Remplir le formulaire avec des données valides
    userEvent.type(screen.getByLabelText(/Full name/i), "John Doe");
    userEvent.type(screen.getByLabelText(/Email/i), "johndoe@example.com");
    userEvent.type(screen.getByLabelText(/Phone number/i), "(555) 123-4567");

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole("button", { name: /Get Started/i }));

    await waitFor(() => expect(mockCreateUser).toHaveBeenCalledTimes(1));
    expect(mockCreateUser).toHaveBeenCalledWith({
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "(555) 123-4567",
    });
  });

  it("should show validation errors if form is invalid", async () => {
    render(
      <Router>
        <PatientForm />
      </Router>
    );

    // Soumettre le formulaire sans remplir les champs
    fireEvent.click(screen.getByRole("button", { name: /Get Started/i }));

    // Vérifier que les messages d'erreur sont affichés
    expect(
      await screen.findByText(/Full name is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Phone number is required/i)
    ).toBeInTheDocument();
  });

  it("should show loading state when form is submitting", async () => {
    const mockCreateUser = createUser as jest.Mock;
    mockCreateUser.mockResolvedValueOnce({ $id: "123" }); // Simule une réponse réussie

    render(
      <Router>
        <PatientForm />
      </Router>
    );

    // Remplir le formulaire avec des données valides
    userEvent.type(screen.getByLabelText(/Full name/i), "John Doe");
    userEvent.type(screen.getByLabelText(/Email/i), "johndoe@example.com");
    userEvent.type(screen.getByLabelText(/Phone number/i), "(555) 123-4567");

    // Cliquer pour soumettre
    fireEvent.click(screen.getByRole("button", { name: /Get Started/i }));

    // Vérifier que le bouton devient "loading" pendant la soumission
    expect(
      screen.getByRole("button", { name: /Get Started/i })
    ).toHaveTextContent("Loading...");
  });
});
