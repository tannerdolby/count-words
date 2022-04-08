const fs = require("fs").promises;

type FrequencyObject = {
    frequency: number,
    usage: number
};

type FrequencyMap = {
    [key: string]: FrequencyObject;
}

interface WordTable {
    frequencies: FrequencyMap;
    wordList: Array<string>;
    uniqueWordList: Array<string>;
    sortedUniqueWordList: Array<string>;
    sortedFrequencyList: Array<FrequencyMap>;
    wordCount: number;
    uniqueWordCount: number;
    getNthWord: Function;
    printFrequencies: Function;
};

const wordRegex = /(\w+\'\w+)|(\w+)/;

/**
 * Count the frequency of words in a given string.
 * @param {string} document A string representing the text content to scan. 
 * @return {WordTable} A hash map populated with word count data.
 */
function countWords(doc: string): WordTable {
    const wordTable: WordTable = {
        frequencies: {},
        wordList: [],
        uniqueWordList: [],
        sortedUniqueWordList: [],
        sortedFrequencyList: [],
        wordCount: 0,
        uniqueWordCount: 0,
        getNthWord(target: number): FrequencyMap | undefined {
            const key: string = this.wordList[target];
            return this.sortedFrequencyList.find(wordObj => Object.keys(wordObj).includes(key));
        },
        printFrequencies(): string {
            let frequencyStr = "";
            for (const key in this.frequencies) {
                frequencyStr += `${key}: { frequency: ${this.frequencies[key].frequency}, usage: ${this.frequencies[key].usage} }\n`;
            }
            return frequencyStr.slice(0, frequencyStr.length-1);
        }
    };

    let words: string[] = doc.split(/\s+/).map(word => {
        const cleanWordObj: RegExpMatchArray | null = word.match(wordRegex);
        const cleanWord = cleanWordObj && cleanWordObj[0] ? cleanWordObj[0] : "";
        wordTable.frequencies[cleanWord] = {"frequency": 0, "usage": 0};
        wordTable.wordList.push(cleanWord);
        return cleanWord;
    });

    wordTable.wordCount = words.length;
    wordTable.uniqueWordList = [...new Set(words)];
    
    words = words.sort((a, b) => a.localeCompare(b));

    words.forEach((word: string) => {
        // wordTable.wordList.push(word);
        wordTable.sortedUniqueWordList.push(word);
        const wordData: FrequencyObject = wordTable.frequencies[word];
        wordData.frequency += 1;
        wordData.usage = parseFloat(((wordData.frequency / wordTable.wordCount) * 100).toFixed(1));
    });

    wordTable.sortedUniqueWordList = [...new Set(wordTable.sortedUniqueWordList)];
    wordTable.uniqueWordCount = wordTable.sortedUniqueWordList.length;
    wordTable.sortedFrequencyList = sortByFrequency(wordTable.frequencies);

    return wordTable;
}

/**
 * Count the frequency of words in a given local file containing text content.
 * @param {string} filePath A local filepath representing a document to be scanned.
 * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
 * @return {WordTable} A hash map containing word data.
 */
async function countWordsInFile(filepath: string, encoding: string="utf8"): Promise<WordTable> {
    const data = await fs.readFile(filepath, encoding);
    return countWords(Buffer.from(data).toString());
};

function searchByValue(frequencies: FrequencyMap, pair: FrequencyObject): FrequencyMap  {
    const foundWord: FrequencyMap = {};
    for (const key in frequencies) {
        if (frequencies[key] == pair) {
            foundWord[key] = pair;
            return foundWord;
        }
    }
    return foundWord;
}

function sortByFrequency(frequencies: FrequencyMap): Array<FrequencyMap> {
    const frequencyList: Array<FrequencyObject> = [];
    for (const key in frequencies) {
        const wordData: FrequencyMap = {};
        wordData[key] = frequencies[key];
        frequencyList.push(wordData[key]);
    }
    
    frequencyList.sort((a: FrequencyObject, b: FrequencyObject) => {
        if (a.frequency == b.frequency) return 0;
        return a.frequency > b.frequency ? -1 : 1;
    });

    return frequencyList.map(wordObj => {
        return searchByValue(frequencies, wordObj);
    });
}

module.exports = {countWords, countWordsInFile};
