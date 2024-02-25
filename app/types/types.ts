export interface Vote {
    id: string;
}

export interface Typee {
    id: string;
    name: string;
    votes: Vote[];
}