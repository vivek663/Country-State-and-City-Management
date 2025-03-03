import React, { useState } from "react";
import Modal from "./modal/Modal.js";

function CityList({ state }) {
  const [cities, setCities] = useState(state.cities);
  const [isAddCityModalOpen, setIsAddCityModalOpen] = useState(false);
  const [isDeleteCityModalOpen, setIsDeleteCityModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [newCityName, setNewCityName] = useState("");

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
      <button onClick={openAddCityModal}>Add City</button>

      {cities.map((city) => (
        <div key={city.id} style={{ marginLeft: "40px", marginTop: "10px" }}>
          <p>
            {city.name}
            <button onClick={() => openDeleteCityModal(city)}>Delete</button>
          </p>
        </div>
      ))}

      {/* Add City Modal */}
      <Modal
        isOpen={isAddCityModalOpen}
        onClose={closeAddCityModal}
        title="Add City"
      >
        <input
          type="text"
          placeholder="Enter city name"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
          style={{ width: "90%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button onClick={addCity}>Add</button>
      </Modal>

      {/* Delete City Modal */}
      <Modal
        isOpen={isDeleteCityModalOpen}
        onClose={closeDeleteCityModal}
        title="Delete City"
      >
        <p>Are you sure you want to delete <strong>{selectedCity?.name}</strong>?</p>
        <button onClick={handleDeleteCity}
        style={{
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
            fontSize: "16px",
            marginRight: "10px",
            transition: "background-color 0.3s ease",
          }}
          >Yes, Delete</button>
        <button onClick={closeDeleteCityModal}
         style={{
            backgroundColor: "#95a5a6",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
            fontSize: "14px",
            transition: "background-color 0.3s ease",
          }}
          >Cancel</button>
      </Modal>
    </div>
  );
}

export default CityList;