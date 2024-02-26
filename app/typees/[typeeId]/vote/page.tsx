// pages/typee/[typeeId]/vote.js or vote.tsx for TypeScript
"use client";
import React, { useEffect, useState } from "react";

const VoteForm = ({ params }: { params: { typeeId: string } }) => {
  const typeeId = params.typeeId;
  const [voteData, setVoteData] = useState({
    observerOrDecider: "",
    diOrDe: "",
    oiOrOe: "",
    nOrS: "",
    fOrT: "",
    sleepOrPlay: "",
    consumeOrBlast: "",
    infoOrEnergy: "",
    iOrE: "",
  });

  const [computedType, setComputedType] = useState("")
  const [typeeName, setTypeeName] = useState("");

  useEffect(() => {
    const newValue = computeNewType(voteData);
    setComputedType(newValue);
  }, [JSON.stringify(voteData)])

  useEffect(() => {
    fetch(`/api/typees/${typeeId}`)
    .then((res) => res.json())
    .then((data) => {
      setTypeeName(data.name);
    })
  }, [typeeId])

  // Placeholder function for computation logic
  function computeNewType(voteData: Object) {
    // Implement your computation logic here
    // Example: concatenate all values
    return Object.values(voteData).filter(Boolean).join(", ");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`/api/typees/${typeeId}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...voteData, typeeId }),
    });

    if (response.ok) {
      console.log("Vote submitted successfully!");
      // Redirect or show a success message
    } else {
      console.error("There was an error submitting the vote.");
      // Handle errors or show an error message
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVoteData({
      ...voteData,
      [e.target.name]: e.target.value,
    });
  };

  // Form with inputs for each voting criteria
  return (
    <div>
      <p>Voting for: {typeeName}</p>
      <p>Type: {computedType}</p>
    <form onSubmit={handleSubmit}>
      {/* ObserverOrDecider */}
      <div>
        <label htmlFor="observerOrDecider">Observer or Decider:</label>
        <select
          name="observerOrDecider"
          onChange={handleChange}
          value={voteData.observerOrDecider}
        >
          <option value="">Select...</option>
          <option value="Observer">Observer</option>
          <option value="Decider">Decider</option>
        </select>
      </div>

      {/* DiOrDe */}
      <div>
        <label htmlFor="diOrDe">Di or De:</label>
        <select name="diOrDe" onChange={handleChange} value={voteData.diOrDe}>
          <option value="">Select...</option>
          <option value="Di">Di</option>
          <option value="De">De</option>
        </select>
      </div>

      {/* OiOrOe */}
      <div>
        <label htmlFor="oiOrOe">Oi or Oe:</label>
        <select name="oiOrOe" onChange={handleChange} value={voteData.oiOrOe}>
          <option value="">Select...</option>
          <option value="Oi">Oi</option>
          <option value="Oe">Oe</option>
        </select>
      </div>

      {/* NOrS */}
      <div>
        <label htmlFor="nOrS">N or S:</label>
        <select name="nOrS" onChange={handleChange} value={voteData.nOrS}>
          <option value="">Select...</option>
          <option value="N">N</option>
          <option value="S">S</option>
        </select>
      </div>

      {/* FOrT */}
      <div>
        <label htmlFor="fOrT">F or T:</label>
        <select name="fOrT" onChange={handleChange} value={voteData.fOrT}>
          <option value="">Select...</option>
          <option value="F">F</option>
          <option value="T">T</option>
        </select>
      </div>

      {/* SleepOrPlay */}
      <div>
        <label htmlFor="sleepOrPlay">Sleep or Play:</label>
        <select
          name="sleepOrPlay"
          onChange={handleChange}
          value={voteData.sleepOrPlay}
        >
          <option value="">Select...</option>
          <option value="Sleep">Sleep</option>
          <option value="Play">Play</option>
        </select>
      </div>

      {/* ConsumeOrBlast */}
      <div>
        <label htmlFor="consumeOrBlast">Consume or Blast:</label>
        <select
          name="consumeOrBlast"
          onChange={handleChange}
          value={voteData.consumeOrBlast}
        >
          <option value="">Select...</option>
          <option value="Consume">Consume</option>
          <option value="Blast">Blast</option>
        </select>
      </div>

      {/* InfoOrEnergy */}
      <div>
        <label htmlFor="infoOrEnergy">Info or Energy:</label>
        <select
          name="infoOrEnergy"
          onChange={handleChange}
          value={voteData.infoOrEnergy}
        >
          <option value="">Select...</option>
          <option value="Info">Info</option>
          <option value="Energy">Energy</option>
        </select>
      </div>

      {/* IOrE */}
      <div>
        <label htmlFor="iOrE">I or E:</label>
        <select name="iOrE" onChange={handleChange} value={voteData.iOrE}>
          <option value="">Select...</option>
          <option value="I">I</option>
          <option value="E">E</option>
        </select>
      </div>

      <button type="submit">Submit Vote</button>
    </form>
    </div>
  );
};

export default VoteForm;
