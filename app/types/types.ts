export interface Vote {
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
}

export interface Typee {
    id: string;
    name: string;
    createdBy: TypeeCreator;
    votes?: Vote[];
}

export interface TypeeCreator {
    id: string;
    name: string;
}