import opTypes from "./op_types.json";

export interface Vote {
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

const produceConsensusString = (arr: string[]): string => {
    if (arr.length === 0) return "Impossible type";

    let resultChars = arr[0].split("");

    for (let i = 0; i < arr[0].length; i++) {
        // Assume the character is consistent, until proven otherwise.
        let isConsistent = true;
        let isUpperCase = false;

        if (resultChars[i].match(/[A-Za-z]/)) {
            // Check if it's a letter
            for (let j = 1; j < arr.length; j++) {
                // Check if any character is uppercase in any of the strings
                if (arr[j][i] !== arr[j][i].toLowerCase()) {
                    isUpperCase = true;
                }
                // If any character differs from the first string
                if (arr[j][i] !== resultChars[i]) {
                    isConsistent = false;
                    break;
                }
            }

            // Replace with 'X' or 'x' based on case
            if (!isConsistent) {
                resultChars[i] = isUpperCase ? "X" : "x";
            }
        }
        // Non-letter characters are kept as is.
    }

    return resultChars.join("");
};

export const computeTypeString = (voteData: Vote) => {
    // Implement your computation logic here
    // Example: concatenate all values
    const types = possibleTypes(voteData);
    const type = produceConsensusString(types);
    // const mbtiType = getMbtiType(voteData);
    const sensoryModality = getSensoryModality(voteData);
    const deModality = getDeModality(voteData);
    if (type === "Impossible type") {
        return type;
    }
    return `${sensoryModality}${deModality} ${type}`;
};

export function possibleTypes(voteData: Vote) {
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
            const indexOfC = item.slice(-7).indexOf("C");
            const indexOfB = item.slice(-7).indexOf("B");
            return indexOfC < indexOfB;
        });
    }
    if (voteData.consumeOrBlast == "Blast") {
        filteredTypes = filteredTypes.filter((item) => {
            const indexOfC = item.slice(-7).indexOf("C");
            const indexOfB = item.slice(-7).indexOf("B");
            return indexOfC > indexOfB;
        });
    }
    if (voteData.sleepOrPlay == "Sleep") {
        filteredTypes = filteredTypes.filter((item) => {
            const indexOfS = item.slice(-7).indexOf("S");
            const indexOfP = item.slice(-7).indexOf("P");
            return indexOfS < indexOfP;
        });
    }
    if (voteData.sleepOrPlay == "Play") {
        filteredTypes = filteredTypes.filter((item) => {
            const indexOfS = item.slice(-7).indexOf("S");
            const indexOfP = item.slice(-7).indexOf("P");
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

export function getSensoryModality(voteData: Vote): string {
    if (voteData.fOrMS == "F") {
        return "F";
    }
    if (voteData.fOrMS == "M") {
        return "M";
    }
    return "X";
}

export function getDeModality(voteData: Vote): string {
    if (voteData.fOrMDe == "F") {
        return "F";
    }
    if (voteData.fOrMDe == "M") {
        return "M";
    }
    return "X";
}
