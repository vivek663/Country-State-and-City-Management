import React, { useState } from "react";
import Modal from "./Modal.js";

function CityList({ state }) {
  const [cities, setCities] = useState(state.cities);
  const [isAddCityModalOpen, setIsAddCityModalOpen] = useState(false);
  const [isDeleteCityModalOpen, setIsDeleteCityModalOpen] = useState(false);
  const [isEditCityModalOpen, setIsEditCityModalOpen] = useState(false); // New state for edit modal
  const [selectedCity, setSelectedCity] = useState(null);
  const [newCityName, setNewCityName] = useState("");
  const [editCityName, setEditCityName] = useState(""); // New state for edited city name

  const buttonStyle = {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "4px 8px",
    margin: "5px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  };

  const deleteButtonStyle = {
    height: "30px",
    ...buttonStyle,
    backgroundColor: "#e74c3c",
  };

  const addButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#27ae60",
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f1c40f",
  };

  const Header = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "40px",
    marginTop: "10px",
    backgroundColor: "#9da0a7",
    padding: "10px",
    borderRadius: "5px",
  };

  // Open the add city modal
  const openAddCityModal = () => {
    setIsAddCityModalOpen(true);
  };

  // Close the add city modal
  const closeAddCityModal = () => {
    setIsAddCityModalOpen(false);
    setNewCityName("");
  };

  // Add a new city
  const addCity = () => {
    if (newCityName.trim() !== "") {
      const newCity = {
        id: Date.now(),
        name: newCityName,
      };
      setCities([...cities, newCity]);
      closeAddCityModal();
    } else {
      alert("City name cannot be empty!");
    }
  };

  // Open the edit city modal
  const openEditCityModal = (city) => {
    setSelectedCity(city);
    setEditCityName(city.name); // Set the current city name in the input field
    setIsEditCityModalOpen(true);
  };

  // Close the edit city modal
  const closeEditCityModal = () => {
    setIsEditCityModalOpen(false);
    setSelectedCity(null);
    setEditCityName("");
  };

  // Handle updating the city name
  const handleEditCity = () => {
    if (editCityName.trim() !== "") {
      const updatedCities = cities.map((city) =>
        city.id === selectedCity.id ? { ...city, name: editCityName } : city
      );
      setCities(updatedCities);
      closeEditCityModal();
    } else {
      alert("City name cannot be empty!");
    }
  };

  // Open the delete city modal
  const openDeleteCityModal = (city) => {
    setSelectedCity(city);
    setIsDeleteCityModalOpen(true);
  };

  // Close the delete city modal
  const closeDeleteCityModal = () => {
    setIsDeleteCityModalOpen(false);
    setSelectedCity(null);
  };

  // Handle deleting a city
  const handleDeleteCity = () => {
    const updatedCities = cities.filter((c) => c.id !== selectedCity.id);
    setCities(updatedCities);
    closeDeleteCityModal();
  };

  return (
    <div>
      <button onClick={openAddCityModal} style={buttonStyle}>
        Add City
      </button>

      {cities.map((city) => (
        <div key={city.id} style={Header}>
          <p><i>{city.name}</i></p>
          <div>
            <button style={editButtonStyle} onClick={() => openEditCityModal(city)}>
              Edit
            </button>
            <button onClick={() => openDeleteCityModal(city)} style={deleteButtonStyle}>
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Add City Modal */}
      <Modal isOpen={isAddCityModalOpen} onClose={closeAddCityModal} title="Add City">
        <input
          type="text"
          placeholder="Enter city name"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
          style={{ width: "90%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button onClick={addCity} style={addButtonStyle}>
          Add
        </button>
      </Modal>

      {/* Edit City Modal */}
      <Modal isOpen={isEditCityModalOpen} onClose={closeEditCityModal} title="Edit City">
        <input
          type="text"
          placeholder="Enter new city name"
          value={editCityName}
          onChange={(e) => setEditCityName(e.target.value)}
          style={{ width: "90%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button onClick={handleEditCity} style={editButtonStyle}>
          Save Changes
        </button>
      </Modal>

      {/* Delete City Modal */}
      <Modal isOpen={isDeleteCityModalOpen} onClose={closeDeleteCityModal} title="Delete City">
        <p>
          Are you sure you want to delete <strong>{selectedCity?.name}</strong>?
        </p>
        <button
          onClick={handleDeleteCity}
          style={{...buttonStyle,
            backgroundColor: "#e74c3c",
            marginRight: "10px",}}>
          Yes, Delete
        </button>
        <button
          onClick={closeDeleteCityModal}
          style={{...buttonStyle,
            backgroundColor: "#95a5a6",}}>
          Cancel
        </button>
      </Modal>
    </div>
  );
}

export default CityList;