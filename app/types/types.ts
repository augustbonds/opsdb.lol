export interface StoredVote {
    id: string;
    author: TypeeCreator;
    typeeId: String;
    observerOrDecider: string;
    diOrDe: string
    oiOrOe: string
    nOrS: string
    fOrT: string
    sleepOrPlay: string
    consumeOrBlast: string
    infoOrEnergy: string
    iOrE: string
    fOrMS: string
    fOrMDe: string
}

export interface Typee {
    id: string;
    name: string;
    createdBy: TypeeCreator;
    votes?: StoredVote[];
}

export interface TypeeCreator {
    id: string;
    username: string;
}