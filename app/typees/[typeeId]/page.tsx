"use client"
import { Typee } from "@/app/types/types";
import { useEffect, useState } from "react";

export default function TypeePage({ params }: { params: { typeeId: string }}) {
  const typeeId = params.typeeId;
  const [typee, setTypee] = useState<Typee | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeeId) {
      setIsLoading(true);
      fetch(`/api/typees/${typeeId}`)
        .then((res) => res.json())
        .then((data) => {
          setTypee(data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [typeeId]);
  if (isLoading) return <p>Loading...</p>;
  if (!typee) return <p>Typee not found.</p>;

  return (
    <div>
      <h1>{typee.name}</h1>
      <p>Created by: {typee?.createdBy.name}</p>
      <h2>Votes</h2>
      {typee.votes?.map((vote) => (
        <p key={vote.id}>
          {vote.author?.name || 'Anonymous'}: {JSON.stringify(vote)}
        </p>
      ))}
    </div>
  );
}
