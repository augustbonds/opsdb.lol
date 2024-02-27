import opTypes from "./op_types.json";

export interface VoteData {
    observerOrDecider: string;
    diOrDe: string;
    oiOrOe: string;
    nOrS: string;
    fOrT: string;
    sleepOrPlay: string;
    consumeOrBlast: string;
    infoOrEnergy: string;
    iOrE: string;
    fOrMS: string;
    fOrMDe: string;
}

export function possibleTypes(voteData: VoteData) {
    var filteredTypes = [...opTypes];
    if (voteData.observerOrDecider == "Observer") {
        filteredTypes = filteredTypes.filter(
            (item) => item.charAt(0) == "N" || item.charAt(0) == "S"
        );
    }
    if (voteData.observerOrDecider == "Decider") {
        filteredTypes = filteredTypes.filter(
            (item) => item.charAt(0) == "T" || item.charAt(0) == "F"
        );
    }
    if (voteData.diOrDe == "Di") {
        filteredTypes = filteredTypes.filter(
            (item) =>
                item.substring(0, 5).includes("Ti") ||
                item.substring(0, 5).includes("Fi")
        );
    }
    if (voteData.diOrDe == "De") {
        filteredTypes = filteredTypes.filter(
            (item) =>
                item.substring(0, 5).includes("Te") ||
                item.substring(0, 5).includes("Fe")
        );
    }
    if (voteData.oiOrOe == "Oi") {
        filteredTypes = filteredTypes.filter(
            (item) =>
                item.substring(0, 5).includes("Si") ||
                item.substring(0, 5).includes("Ni")
        );
    }
    if (voteData.oiOrOe == "Oe") {
        filteredTypes = filteredTypes.filter(
            (item) =>
                item.substring(0, 5).includes("Se") ||
                item.substring(0, 5).includes("Ne")
        );
    }
    if (voteData.consumeOrBlast == "Consume") {
        filteredTypes = filteredTypes.filter((item) => {
            const indexOfC = item.indexOf("C");
            const indexOfB = item.indexOf("B");
            return indexOfC < indexOfB;
        });
    }
    if (voteData.consumeOrBlast == "Blast") {
        filteredTypes = filteredTypes.filter((item) => {
            const indexOfC = item.indexOf("C");
            const indexOfB = item.indexOf("B");
            return indexOfC > indexOfB;
        });
    }
    if (voteData.sleepOrPlay == "Sleep") {
        filteredTypes = filteredTypes.filter((item) => {
            const indexOfS = item.indexOf("S");
            const indexOfP = item.indexOf("P");
            return indexOfS < indexOfP;
        });
    }
    if (voteData.sleepOrPlay == "Play") {
        filteredTypes = filteredTypes.filter((item) => {
            const indexOfS = item.indexOf("S");
            const indexOfP = item.indexOf("P");
            return indexOfS > indexOfP;
        });
    }
    if (voteData.nOrS == "N") {
        filteredTypes = filteredTypes.filter((item) =>
            item.substring(0, 5).includes("N")
        );
    }
    if (voteData.nOrS == "S") {
        filteredTypes = filteredTypes.filter((item) =>
            item.substring(0, 5).includes("S")
        );
    }
    if (voteData.fOrT == "F") {
        filteredTypes = filteredTypes.filter((item) =>
            item.substring(0, 5).includes("F")
        );
    }
    if (voteData.fOrT == "T") {
        filteredTypes = filteredTypes.filter((item) =>
            item.substring(0, 5).includes("T")
        );
    }
    if (voteData.iOrE == "E") {
        filteredTypes = filteredTypes.filter(
            (item) =>
                item.charAt(item.length - 2) == "C" ||
                item.charAt(item.length - 2) == "S"
        );
    }
    if (voteData.iOrE == "I") {
        filteredTypes = filteredTypes.filter(
            (item) =>
                item.charAt(item.length - 2) == "B" ||
                item.charAt(item.length - 2) == "P"
        );
    }
    if (voteData.infoOrEnergy == "Info") {
        filteredTypes = filteredTypes.filter(
            (item) =>
                item.charAt(item.length - 2) == "S" ||
                item.charAt(item.length - 2) == "P"
        );
    }
    if (voteData.infoOrEnergy == "Energy") {
        filteredTypes = filteredTypes.filter(
            (item) =>
                item.charAt(item.length - 2) == "B" ||
                item.charAt(item.length - 2) == "C"
        );
    }

    console.debug(`Only ${filteredTypes.length}/${opTypes.length} left!`);
    if (filteredTypes.length < 3) {
        filteredTypes.forEach((type) => console.debug(type));
    }
    return filteredTypes;
}

export function getSensoryModality(voteData: VoteData): string {
    if (voteData.fOrMS == "F") {
        return "F";
    }
    if (voteData.fOrMS == "M") {
        return "M";
    }
    return "X";
}

export function getDeModality(voteData: VoteData): string {
    if (voteData.fOrMDe == "F") {
        return "F";
    }
    if (voteData.fOrMDe == "M") {
        return "M";
    }
    return "X";
}