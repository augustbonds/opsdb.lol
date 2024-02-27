// pages/typee/[typeeId]/vote.js or vote.tsx for TypeScript
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { VoteData, getDeModality, getSensoryModality, possibleTypes } from "./typeCalculator";
import VoteForm from "./voteForm";

const VotePage = ({ params }: { params: { typeeId: string } }) => {
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
      <VoteForm handleSubmit={handleSubmit} handleChange={handleChange} voteData={voteData}></VoteForm>
    </div>
  );
};

export default VotePage;
