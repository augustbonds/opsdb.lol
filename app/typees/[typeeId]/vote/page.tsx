// pages/typee/[typeeId]/vote.js or vote.tsx for TypeScript
"use client";
import React, { useCallback, useEffect, useState } from "react";
import opTypes from "./op_types.json";

interface VoteData {
  observerOrDecider: string;
  diOrDe: string;
  oiOrOe: string;
  nOrS: string;
  fOrT: string;
  sleepOrPlay: string;
  consumeOrBlast: string;
  infoOrEnergy: string;
  iOrE: string;
  fOrMS: string;
  fOrMDe: string;
}

const VoteForm = ({ params }: { params: { typeeId: string } }) => {
  const typeeId = params.typeeId;
  const [voteData, setVoteData] = useState<VoteData>({
    observerOrDecider: "",
    diOrDe: "",
    oiOrOe: "",
    nOrS: "",
    fOrT: "",
    sleepOrPlay: "",
    consumeOrBlast: "",
    infoOrEnergy: "",
    iOrE: "",
    fOrMS: "",
    fOrMDe: "",
  });

  const [computedType, setComputedType] = useState("");
  const [typeeName, setTypeeName] = useState("");

  // Placeholder function for computation logic
  const computeNewType = useCallback((voteData: VoteData): string => {
    // Implement your computation logic here
    // Example: concatenate all values
    const types = possibleTypes(voteData);
    const type = produceConsensusString(types);
    // const mbtiType = getMbtiType(voteData);
    const sensoryModality = getSensoryModality(voteData);
    const deModality = getDeModality(voteData);
    if (type === "Impossible type") {
      return type;
    }
    return `${sensoryModality}${deModality} ${type}`;
  }, []);

  useEffect(() => {
    const newValue = computeNewType(voteData);
    setComputedType(newValue);
  }, [voteData, computeNewType]);

  useEffect(() => {
    fetch(`/api/typees/${typeeId}`)
      .then((res) => res.json())
      .then((data) => {
        setTypeeName(data.name);
      });
  }, [typeeId]);

  const produceConsensusString = (arr: string[]): string => {
    if (arr.length === 0) return "Impossible type";

    let resultChars = arr[0].split("");

    for (let i = 0; i < arr[0].length; i++) {
      // Assume the character is consistent, until proven otherwise.
      let isConsistent = true;
      let isUpperCase = false;

      if (resultChars[i].match(/[A-Za-z]/)) {
        // Check if it's a letter
        for (let j = 1; j < arr.length; j++) {
          // Check if any character is uppercase in any of the strings
          if (arr[j][i] !== arr[j][i].toLowerCase()) {
            isUpperCase = true;
          }
          // If any character differs from the first string
          if (arr[j][i] !== resultChars[i]) {
            isConsistent = false;
            break;
          }
        }

        // Replace with 'X' or 'x' based on case
        if (!isConsistent) {
          resultChars[i] = isUpperCase ? "X" : "x";
        }
      }
      // Non-letter characters are kept as is.
    }

    return resultChars.join("");
  };

  function possibleTypes(voteData: VoteData) {
    var filteredTypes = [...opTypes];
    if (voteData.observerOrDecider == "Observer") {
      filteredTypes = filteredTypes.filter(
        (item) => item.charAt(0) == "N" || item.charAt(0) == "S"
      );
    }
    if (voteData.observerOrDecider == "Decider") {
      filteredTypes = filteredTypes.filter(
        (item) => item.charAt(0) == "T" || item.charAt(0) == "F"
      );
    }
    if (voteData.diOrDe == "Di") {
      filteredTypes = filteredTypes.filter(
        (item) =>
          item.substring(0, 5).includes("Ti") ||
          item.substring(0, 5).includes("Fi")
      );
    }
    if (voteData.diOrDe == "De") {
      filteredTypes = filteredTypes.filter(
        (item) =>
          item.substring(0, 5).includes("Te") ||
          item.substring(0, 5).includes("Fe")
      );
    }
    if (voteData.oiOrOe == "Oi") {
      console.log(filteredTypes);
      filteredTypes = filteredTypes.filter(
        (item) =>
          item.substring(0, 5).includes("Si") ||
          item.substring(0, 5).includes("Ni")
      );
    }
    if (voteData.oiOrOe == "Oe") {
      filteredTypes = filteredTypes.filter(
        (item) =>
          item.substring(0, 5).includes("Se") ||
          item.substring(0, 5).includes("Ne")
      );
    }
    if (voteData.consumeOrBlast == "Consume") {
      filteredTypes = filteredTypes.filter((item) => {
        const indexOfC = item.indexOf("C");
        const indexOfB = item.indexOf("B");
        return indexOfC < indexOfB;
      });
    }
    if (voteData.consumeOrBlast == "Blast") {
      filteredTypes = filteredTypes.filter((item) => {
        const indexOfC = item.indexOf("C");
        const indexOfB = item.indexOf("B");
        return indexOfC > indexOfB;
      });
    }
    if (voteData.sleepOrPlay == "Sleep") {
      filteredTypes = filteredTypes.filter((item) => {
        const indexOfS = item.indexOf("S");
        const indexOfP = item.indexOf("P");
        return indexOfS < indexOfP;
      });
    }
    if (voteData.sleepOrPlay == "Sleep") {
      filteredTypes = filteredTypes.filter((item) => {
        const indexOfS = item.indexOf("S");
        const indexOfP = item.indexOf("P");
        return indexOfS > indexOfP;
      });
    }
    if (voteData.nOrS == "N") {
      filteredTypes = filteredTypes.filter((item) =>
        item.substring(0, 5).includes("N")
      );
    }
    if (voteData.nOrS == "S") {
      filteredTypes = filteredTypes.filter((item) =>
        item.substring(0, 5).includes("S")
      );
    }
    if (voteData.fOrT == "F") {
      filteredTypes = filteredTypes.filter((item) =>
        item.substring(0, 5).includes("F")
      );
    }
    if (voteData.fOrT == "T") {
      filteredTypes = filteredTypes.filter((item) =>
        item.substring(0, 5).includes("T")
      );
    }
    if (voteData.iOrE == "E") {
      filteredTypes = filteredTypes.filter(
        (item) =>
          item.charAt(item.length - 2) == "C" ||
          item.charAt(item.length - 2) == "S"
      );
    }
    if (voteData.iOrE == "I") {
      filteredTypes = filteredTypes.filter(
        (item) =>
          item.charAt(item.length - 2) == "B" ||
          item.charAt(item.length - 2) == "P"
      );
    }
    if (voteData.infoOrEnergy == "Info") {
      filteredTypes = filteredTypes.filter(
        (item) =>
          item.charAt(item.length - 2) == "S" ||
          item.charAt(item.length - 2) == "P"
      );
    }
    if (voteData.infoOrEnergy == "Energy") {
      filteredTypes = filteredTypes.filter(
        (item) =>
          item.charAt(item.length - 2) == "B" ||
          item.charAt(item.length - 2) == "C"
      );
    }

    console.log(`Only ${filteredTypes.length}/${opTypes.length} left!`);
    if (filteredTypes.length < 3){
      filteredTypes.forEach((type) => console.log(type));
    }
    return filteredTypes;
  }

  function getSensoryModality(voteData: VoteData): string {
    if (voteData.fOrMS == "F") {
      return "F";
    }
    if (voteData.fOrMS == "M") {
      return "M";
    }
    return "X";
  }

  function getDeModality(voteData: VoteData): string {
    if (voteData.fOrMDe == "F") {
      return "F";
    }
    if (voteData.fOrMDe == "M") {
      return "M";
    }
    return "X";
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

        {/* FOrMS */}
        <div>
          <label htmlFor="fOrMS">F or M Sensory:</label>
          <select name="fOrMS" onChange={handleChange} value={voteData.fOrMS}>
            <option value="">Select...</option>
            <option value="F">F</option>
            <option value="M">M</option>
          </select>
        </div>

        {/* FOrMDe */}
        <div>
          <label htmlFor="fOrMDe">F or M De:</label>
          <select name="fOrMDe" onChange={handleChange} value={voteData.fOrMDe}>
            <option value="">Select...</option>
            <option value="F">F</option>
            <option value="M">M</option>
          </select>
        </div>

        <button type="submit">Submit Vote</button>
      </form>
    </div>
  );
};

export default VoteForm;
