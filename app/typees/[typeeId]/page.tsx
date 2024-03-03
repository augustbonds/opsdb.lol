"use client";
import { StoredVote, Typee } from "@/app/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Vote, computeTypeString } from "./vote/typeCalculator";

export default function TypeePage({ params }: { params: { typeeId: string } }) {
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

  var votes = typee.votes || [];

  return (
    <div className="">
      <h1>{typee.name}</h1>
      <p>Created by: {typee?.createdBy.username}</p>
      <VoteBars votes={votes} />
      <Link href={`/typees/${typeeId}/vote`}>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Vote!
        </button>
      </Link>
      <VoteList votes={votes}></VoteList>
    </div>
  );
}

interface VoteBarProps {
  labelTop: string;
  labelBottom: string;
  percentage: number;
}

const VoteBar: React.FC<VoteBarProps> = ({
  labelTop,
  labelBottom,
  percentage,
}) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-purple-500 font-semibold">{labelTop}</span>
      <div className="w-10 bg-gray-300 h-32 relative">
        <div
          className="bg-purple-500 absolute"
          style={{ width: "100%", height: `${(1 - percentage) * 100}%`, top: 0 }}
        ></div>
        <div
          className="bg-blue-500 absolute"
          style={{ width: "100%", height: `${percentage * 100}%`, bottom: 0 }}
        ></div>
      </div>
      <span className="text-blue-500 font-semibold">{labelBottom}</span>
    </div>
  );
};

interface VoteBarsProps {
  votes: Vote[];
}

const VoteBars: React.FC<VoteBarsProps> = ({ votes }) => {
  const totalCount = votes.length;

  const calculatePercentage = (filterCondition: (vote: any) => boolean) => {
    return votes.filter(filterCondition).length / totalCount;
  };

  return (
    <div>
      <h2>Votes</h2>
      <div className="flex flex-wrap gap-4">
        <VoteBar
          labelTop="Decider"
          labelBottom="Observer"
          percentage={calculatePercentage(
            (vote) => vote.observerOrDecider == "Observer"
          )}
        />
        <VoteBar
          labelTop="De"
          labelBottom="Di"
          percentage={calculatePercentage((vote) => vote.diOrDe == "Di")}
        />
        <VoteBar
          labelTop="Oe"
          labelBottom="Oi"
          percentage={calculatePercentage((vote) => vote.oiOrOe == "Oi")}
        />
        <VoteBar
          labelTop="S"
          labelBottom="N"
          percentage={calculatePercentage((vote) => vote.nOrS == "N")}
        />
        <VoteBar
          labelTop="F"
          labelBottom="T"
          percentage={calculatePercentage((vote) => vote.fOrT == "T")}
        />
        <VoteBar
          labelTop="Sleep"
          labelBottom="Play"
          percentage={calculatePercentage((vote) => vote.sleepOrPlay == "Play")}
        />
        <VoteBar
          labelTop="Consume"
          labelBottom="Blast"
          percentage={calculatePercentage(
            (vote) => vote.consumeOrBlast == "Blast"
          )}
        />
        <VoteBar
          labelTop="Info"
          labelBottom="Energy"
          percentage={calculatePercentage(
            (vote) => vote.infoOrEnergy == "Energy"
          )}
        />
        <VoteBar
          labelTop="Introvert"
          labelBottom="Extrovert"
          percentage={calculatePercentage((vote) => vote.iOrE == "Extrovert")}
        />
        <VoteBar
          labelTop="F S"
          labelBottom="M S"
          percentage={calculatePercentage((vote) => vote.fOrMS == "M")}
        />
        <VoteBar
          labelTop="F De"
          labelBottom="M De"
          percentage={calculatePercentage((vote) => vote.fOrMDe == "M")}
        />
      </div>
    </div>
  );
};

interface VoteListProps {
  votes: StoredVote[];
}

const VoteList: React.FC<VoteListProps> = ({ votes }) => {
  return (
    <div>
      <h1>What other people think</h1>
      <ul>
        {votes.map((vote) => (
          <li key={vote.id}>{computeTypeString(vote)} voted by: {vote.author.username}</li>
        ))}
      </ul>
    </div>
  );
};
