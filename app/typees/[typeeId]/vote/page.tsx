// pages/typee/[typeeId]/vote.js or vote.tsx for TypeScript
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Vote, computeTypeString } from "./typeCalculator";
import VoteForm from "./voteForm";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

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

  const [computedType, setComputedType] = useState<string | null>("");
  const [typeeName, setTypeeName] = useState("");

  const computeNewType = useCallback(computeTypeString, []);
  useEffect(() => {
    const newValue = computeNewType(vote);
    setComputedType(newValue);
  }, [vote, computeNewType]);

  const router = useRouter();

  useEffect(() => {
    fetch(`/api/typees/${typeeId}`)
      .then((res) => res.json())
      .then((data) => {
        setTypeeName(data.name);
      });
  }, [typeeId]);
  
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <div>
        <p>You need to be logged in to vote</p>
        <Link href="/api/auth/login">
          <button className="inline-flex items-center text-white bg-gray-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
            Login
          </button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!computeTypeString(vote)){
      alert("Cannot submit impossible type");
      return;
    }
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
      router.push(`/typees/${typeeId}`);
    } else {
      console.error("There was an error submitting the vote.");
      alert("There was an error submitting your vote");
      // Handle errors or show an error message
    }
  };

  // Form with inputs for each voting criteria
  return (
    <div>
      <p>
        Voting for: <Link href={`/typees/${typeeId}`}>{typeeName}</Link>
      </p>
      <p>Type: {computedType? computedType : "Impossible Type"}</p>
      <VoteForm
        handleSubmit={handleSubmit}
        vote={vote}
        setVoteData={setVoteData}
      ></VoteForm>
    </div>
  );
};

export default VotePage;
