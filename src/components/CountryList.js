import React, { useState } from "react";
import StateList from "./StateList";
import Modal from "./Modal.js";

function CountryList({ countries, editCountry, openDeleteCountryModal }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [updatedCountryName, setUpdatedCountryName] = useState("");

  // Open the edit modal
  const openEditModal = (country) => {
    setSelectedCountry(country);
    setUpdatedCountryName(country.name);
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCountry(null);
    setUpdatedCountryName("");
  };

  // Handle editing a country
  const handleEditCountry = () => {
    if (updatedCountryName.trim() !== "") {
      editCountry(selectedCountry.id, updatedCountryName);
      closeEditModal();
    } else {
      alert("Country name cannot be empty!");
    }
  };

  // Styling
  const countryItemStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const countryNameStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "15px",
  };

  const buttonStyle = {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  };

  const Header = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f1c40f",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#e74c3c",
  };

  return (
    <div>
      {countries.map((country) => (
        <div key={country.id} style={countryItemStyle}>
          <div style={Header}>
            <h2 style={countryNameStyle}>{country.name}</h2>
            <div>
              <button style={editButtonStyle} onClick={() => openEditModal(country)}>
                Edit
              </button>
              <button style={deleteButtonStyle} onClick={() => openDeleteCountryModal(country)}>
                Delete
              </button>
            </div>
          </div>
          <StateList country={country} />
        </div>
      ))}

      {/* Edit Country Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Country"
      >
        <input
          type="text"
          placeholder="Enter new country name"
          value={updatedCountryName}
          onChange={(e) => setUpdatedCountryName(e.target.value)}
          style={{ width: "90%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#27ae60",
          }}
          onClick={handleEditCountry}
        >
          Save
        </button>
      </Modal>
    </div>
  );
}

export default CountryList;