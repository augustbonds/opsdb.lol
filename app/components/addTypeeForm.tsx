"use client";
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
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            htmlFor="name"
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          >
            Typee Name
          </label>
        </div>
        <div className="md:w-1/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="name"
            type="text"
            placeholder="Who do you want to add?"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add Typee
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTypeeForm;
