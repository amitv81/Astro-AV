import React, { useState } from "react";

export default function BirthForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    place: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date of Birth:</label>
      <input
        type="date"
        name="date"
        value={"1981-07-24"}
        onChange={handleChange}
        required
      />

      <label>Time of Birth:</label>
      <input
        type="time"
        name="time"
        value={"05:00"}
        onChange={handleChange}
        required
      />

      <label>Place of Birth:</label>
      <input
        type="text"
        name="place"
        value={"Gwalior, India"}
        onChange={handleChange}
        placeholder="e.g. Delhi, India"
        required
      />

      <button type="submit">Generate Chart</button>
    </form>
  );
}
