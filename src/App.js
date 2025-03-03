import React, { useState } from "react";
import CountryList from "./components/CountryList";
import Modal from './components/modal/Modal.js';

function App() {
  const [countries, setCountries] = useState([]);
  const [isAddCountryModalOpen, setIsAddCountryModalOpen] = useState(false);
  const [isDeleteCountryModalOpen, setIsDeleteCountryModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [newCountryName, setNewCountryName] = useState("");

  // Open the add country modal
  const openAddCountryModal = () => {
    setIsAddCountryModalOpen(true);
  };

  // Close the add country modal
  const closeAddCountryModal = () => {
    setIsAddCountryModalOpen(false);
    setNewCountryName("");
  };

  // Add a new country
  const addCountry = () => {
    if (newCountryName.trim() !== "") {
      const newCountry = {
        id: Date.now(),
        name: newCountryName,
        states: [],
      };
      setCountries([...countries, newCountry]);
      closeAddCountryModal();
    } else {
      alert("Country name cannot be empty!");
    }
  };

  // Open the delete country modal
  const openDeleteCountryModal = (country) => {
    setSelectedCountry(country);
    setIsDeleteCountryModalOpen(true);
  };

  // Close the delete country modal
  const closeDeleteCountryModal = () => {
    setIsDeleteCountryModalOpen(false);
    setSelectedCountry(null);
  };

  // Handle deleting a country
  const deleteCountry = () => {
    const updatedCountries = countries.filter((c) => c.id !== selectedCountry.id);
    setCountries(updatedCountries);
    closeDeleteCountryModal();
  };

  // Handle editing a country
  const editCountry = (id, newName) => {
    const updatedCountries = countries.map((c) =>
      c.id === id ? { ...c, name: newName } : c
    );
    setCountries(updatedCountries);
  };

  // Styling
  const appStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "20px",
    fontSize: "32px",
    fontWeight: "bold",
  };

  const buttonStyle = {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "10px 20px",
    margin: "5px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  };

  const addButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#27ae60",
  };

  const addButtonHoverStyle = {
    backgroundColor: "#219653",
  };

  return (
    <div style={appStyle}>
      <h1 style={headingStyle}>Country, State, and City Management</h1>
      <button
        style={addButtonStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = addButtonHoverStyle.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = addButtonStyle.backgroundColor)}
        onClick={openAddCountryModal}
      >
        Add Country
      </button>

      {/* Add Country Modal */}
      <Modal
        isOpen={isAddCountryModalOpen}
        onClose={closeAddCountryModal}
        title="Add Country"
      >
        <input
          type="text"
          placeholder="Enter country name"
          value={newCountryName}
          onChange={(e) => setNewCountryName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#3498db",
          }}
          onClick={addCountry}
        >
          Add
        </button>
      </Modal>

      {/* Delete Country Modal */}
      <Modal
        isOpen={isDeleteCountryModalOpen}
        onClose={closeDeleteCountryModal}
        title="Delete Country"
      >
        <p style={{ marginBottom: "15px", fontSize: "16px" }}>
          Are you sure you want to delete <strong>{selectedCountry?.name}</strong>?
        </p>
        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#e74c3c",
            marginRight: "10px",
          }}
          onClick={deleteCountry}
        >
          Yes, Delete
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#95a5a6",
          }}
          onClick={closeDeleteCountryModal}
        >
          Cancel
        </button>
      </Modal>

      <CountryList
        countries={countries}
        editCountry={editCountry}
        openDeleteCountryModal={openDeleteCountryModal}
      />
    </div>
  );
}

export default App;