"use client"
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState, FormEvent } from "react";

const AddTypeeForm: React.FC = () => {
  const { user } = useUser();
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      const response = await fetch("/api/typees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        alert("Typee added successfully!");
        setName(""); // Reset form
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Failed to add Typee", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Typee Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add Typee</button>
    </form>
  );
};

export default AddTypeeForm;
