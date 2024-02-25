export interface Vote {
    id: string;
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