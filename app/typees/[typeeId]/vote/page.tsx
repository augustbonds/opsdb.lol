// pages/typee/[typeeId]/vote.js or vote.tsx for TypeScript
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Vote, computeTypeString } from "./typeCalculator";
import VoteForm from "./voteForm";
import Link from "next/link";

const VotePage = ({ params }: { params: { typeeId: string } }) => {
  const typeeId = params.typeeId;
  const [vote, setVoteData] = useState<Vote>({
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

  const computeNewType = useCallback(computeTypeString, []);

  useEffect(() => {
    const newValue = computeNewType(vote);
    setComputedType(newValue);
  }, [vote, computeNewType]);

  useEffect(() => {
    fetch(`/api/typees/${typeeId}`)
      .then((res) => res.json())
      .then((data) => {
        setTypeeName(data.name);
      });
  }, [typeeId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`/api/typees/${typeeId}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...vote }),
    });

    if (response.ok) {
      console.log("Vote submitted successfully!");
      // Redirect or show a success message
    } else {
      console.error("There was an error submitting the vote.");
      // Handle errors or show an error message
    }
  };

  // Form with inputs for each voting criteria
  return (
    <div>
      <p>
        Voting for: <Link href={`/typees/${typeeId}`}>{typeeName}</Link>
      </p>
      <p>Type: {computedType}</p>
      <VoteForm
        handleSubmit={handleSubmit}
        vote={vote}
        setVoteData={setVoteData}
      ></VoteForm>
    </div>
  );
};

export default VotePage;
