import { Vote, computeTypeString } from "@/app/typees/[typeeId]/vote/typeCalculator";
import prisma from "../../db";
import { StoredVote } from "@/app/types/types";

function calculateCommunityChoices(votes: StoredVote[] | null): Vote {
    
    let questionTallies: Record<string, Record<string, number>> = {
      observerOrDecider: {},
      diOrDe: {},
      oiOrOe: {},
      nOrS: {},
      fOrT: {},
      sleepOrPlay: {},
      consumeOrBlast: {},
      infoOrEnergy: {},
      iOrE: {},
      fOrMS: {},
      fOrMDe: {},
    };
  
    votes?.forEach(vote => {
      Object.keys(questionTallies).forEach(question => {
        const answer = vote[question as keyof Vote];
        if (answer) {
          questionTallies[question][answer] = (questionTallies[question][answer] || 0) + 1;
        }
      });
    });
  
    let communityChoice: Vote = {
        sleepOrPlay: "",
        observerOrDecider: "",
        diOrDe: "",
        oiOrOe: "",
        nOrS: "",
        fOrT: "",
        consumeOrBlast: "",
        infoOrEnergy: "",
        iOrE: "",
        fOrMS: "",
        fOrMDe: ""
    };
    if (!votes){
        return communityChoice;
    }
    Object.keys(questionTallies).forEach(question => {
      const answers = questionTallies[question];
      const totalCount = Object.values(answers).reduce((acc, count) => acc + count, 0);
  
      if (totalCount === 0) {
        communityChoice[question as keyof Vote] = "";
      } else {
        const maxAnswer = Object.keys(answers).reduce((a, b) => answers[a] > answers[b] ? a : answers[a] == answers[b] ? "" : b);
        communityChoice[question as keyof Vote] = maxAnswer;
      }
    });
  
    return communityChoice;
  }

export const GET = async function handle(req: Request,
    { params }: { params: { typeeId: string } }) {

    const typeeId = params.typeeId;

    try {
        const typee = await prisma.typee.findUnique({
            where: { id: typeeId },
            include: {
                createdBy: true,
                votes: {
                    include: {
                        author: true
                    }
                }
            }
        });

        if (typee == null){
            return Response.json({ error: `Typee with id ${typeeId} not found` }, { status: 404 });        }

        const communityChoice = calculateCommunityChoices(typee.votes as StoredVote[]);
        const communityTypeString = computeTypeString(communityChoice);

        const reshapedTypee = {
            id: typee.id,
            name: typee.name,
            createdBy: {
                id: typee.createdBy.id,
                username: typee.createdBy.username
            },
            communityVote: communityTypeString,
            votes: typee.votes?.map(vote => ({
                id: vote.id,
                author: { id: vote.author!.id, username: vote.author!.username },
                typeeId: vote.typeeId,
                observerOrDecider: vote.observerOrDecider,
                diOrDe: vote.diOrDe, 
                oiOrOe: vote.oiOrOe, 
                nOrS: vote.nOrS,
                fOrT: vote.fOrT,
                sleepOrPlay: vote.sleepOrPlay, 
                consumeOrBlast: vote.consumeOrBlast,
                infoOrEnergy: vote.infoOrEnergy,
                iOrE: vote.iOrE,
                fOrMS: vote.fOrMS,
                fOrMDe: vote.fOrMDe
            }))
        };

        return Response.json(reshapedTypee);
    } catch (error) {
        console.error(`failed to get typee ${typeeId} from prisma`);
        return Response.json({ error: `Failed to fetch typee with id ${typeeId}` }, { status: 500 });
    }
}