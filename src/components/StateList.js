import React, { useState } from "react";
import CityList from "./CityList";
import Modal from "./Modal.js";

function StateList({ country }) {
  const [states, setStates] = useState(country.states);
  const [isAddStateModalOpen, setIsAddStateModalOpen] = useState(false);
  const [isEditStateModalOpen, setIsEditStateModalOpen] = useState(false);
  const [isDeleteStateModalOpen, setIsDeleteStateModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [newStateName, setNewStateName] = useState("");
  const [updatedStateName, setUpdatedStateName] = useState("");

  // Open the add state modal
  const openAddStateModal = () => {
    setIsAddStateModalOpen(true);
  };

  // Close the add state modal
  const closeAddStateModal = () => {
    setIsAddStateModalOpen(false);
    setNewStateName("");
  };

  // Add a new state
  const addState = () => {
    if (newStateName.trim() !== "") {
      const newState = {
        id: Date.now(),
        name: newStateName,
        cities: [],
      };
      setStates([...states, newState]);
      closeAddStateModal();
    } else {
      alert("State name cannot be empty!");
    }
  };

  // Open the edit state modal
  const openEditStateModal = (state) => {
    setSelectedState(state);
    setUpdatedStateName(state.name);
    setIsEditStateModalOpen(true);
  };

  // Close the edit state modal
  const closeEditStateModal = () => {
    setIsEditStateModalOpen(false);
    setSelectedState(null);
    setUpdatedStateName("");
  };

  // Handle editing a state
  const handleEditState = () => {
    if (updatedStateName.trim() !== "") {
      const updatedStates = states.map((s) =>
        s.id === selectedState.id ? { ...s, name: updatedStateName } : s
      );
      setStates(updatedStates);
      closeEditStateModal();
    } else {
      alert("State name cannot be empty!");
    }
  };

  // Open the delete state modal
  const openDeleteStateModal = (state) => {
    setSelectedState(state);
    setIsDeleteStateModalOpen(true);
  };

  // Close the delete state modal
  const closeDeleteStateModal = () => {
    setIsDeleteStateModalOpen(false);
    setSelectedState(null);
  };

  // Handle deleting a state
  const handleDeleteState = () => {
    const updatedStates = states.filter((s) => s.id !== selectedState.id);
    setStates(updatedStates);
    closeDeleteStateModal();
  };

  // Styling
  const stateItemStyle = {
    backgroundColor: "lightgray",
    padding: "15px",
    margin: "15px 0 0 20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const Header = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const stateNameStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "10px",
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
      <button style={buttonStyle} onClick={openAddStateModal}>
        Add State
      </button>

      {states.map((state) => (
        <div key={state.id} style={stateItemStyle}>
          <div style={Header}>
            <h3 style={stateNameStyle}>{state.name}</h3>
            <div>
              <button style={editButtonStyle} onClick={() => openEditStateModal(state)}>
                Edit
              </button>
              <button style={deleteButtonStyle} onClick={() => openDeleteStateModal(state)}>
                Delete
              </button>
            </div>
          </div>
          <CityList state={state} />
        </div>
      ))}

      {/* Add State Modal */}
      <Modal
        isOpen={isAddStateModalOpen}
        onClose={closeAddStateModal}
        title="Add State"
      >
        <input
          type="text"
          placeholder="Enter state name"
          value={newStateName}
          onChange={(e) => setNewStateName(e.target.value)}
          style={{ width: "90%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#27ae60",
          }}
          onClick={addState}
        >
          Add
        </button>
      </Modal>

      {/* Edit State Modal */}
      <Modal
        isOpen={isEditStateModalOpen}
        onClose={closeEditStateModal}
        title="Edit State"
      >
        <input
          type="text"
          placeholder="Enter new state name"
          value={updatedStateName}
          onChange={(e) => setUpdatedStateName(e.target.value)}
          style={{ width: "90%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#27ae60",
          }}
          onClick={handleEditState}
        >
          Save
        </button>
      </Modal>

      {/* Delete State Modal */}
      <Modal
        isOpen={isDeleteStateModalOpen}
        onClose={closeDeleteStateModal}
        title="Delete State"
      >
        <p style={{ marginBottom: "15px", fontSize: "16px" }}>
          Are you sure you want to delete <strong>{selectedState?.name}</strong>?
        </p>
        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#e74c3c",
            marginRight: "10px",
          }}
          onClick={handleDeleteState}
        >
          Yes, Delete
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#95a5a6",
          }}
          onClick={closeDeleteStateModal}
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
}

export default StateList;