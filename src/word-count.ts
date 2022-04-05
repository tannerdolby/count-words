const fs = require("fs");

type FrequencyObject = {
    frequency: number,
    usage: number
};

interface FrequencyMap {
    [key: string]: FrequencyObject;
}

/**
 * A class for counting the frequency of words in a given string or file.
 */
class WordFrequencies {
    frequencies: FrequencyMap;
    sortedFrequencyList: Array<FrequencyMap>;
    wordList: Array<string>;
    sortedUniqueWordList: Array<string>;
    unsortedUniqueWordList: Array<string>;
    wordRegex: RegExp;
    words: number;
    uniqueWords: number;

    constructor() {
        this.frequencies = {};
        this.sortedFrequencyList = [];
        this.wordList = [];
        this.sortedUniqueWordList = [];
        this.unsortedUniqueWordList = [];
        this.wordRegex = /(\w+\'\w+)|(\w+)/;
        this.words = 0;
        this.uniqueWords = 0;
    }

    /**
     * Count the frequency of every from an input string.
     * @param {string} filePath A local filepath representing a document to be scanned.
     * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
     * @return {FrequencyMap} A hash table containing all word frequencies.
     */
    countWordsInString(strToCheck: string): FrequencyMap {
        return this.countWords(strToCheck);
    };

    /**
     * Count the frequency of every word from a specified local file.
     * @param {string} filePath A local filepath representing a document to be scanned.
     * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
     * @return {FrequencyMap} A hash table sorted in ascending order (a-z) containing all words and their frequencies.
     */
    countWordsInFile(filePath: string, encoding: string="utf8"): FrequencyMap {
        let doc = fs.readFileSync(filePath, encoding);
        return this.countWords(doc);
    };

    /**
     * Count the frequency of words in a given string or file
     * @param {string} document A string representing the text content to scan. 
     * @return {FrequencyMap} A hash table sorted in ascending order (a-z) containing all words and their frequencies.
     */
    countWords(doc: string): FrequencyMap {
        let words: string[] = doc.split(/\s+/).map((word, index) => {
            const cleanWordObj: RegExpMatchArray | null = word.match(this.wordRegex);
            const cleanWord = cleanWordObj && cleanWordObj[0] != undefined ? cleanWordObj[0] : "";
            this.frequencies[cleanWord] = {"frequency": 0, "usage": 0};
            return cleanWord;
        });

        this.words = words.length;
        this.unsortedUniqueWordList = [...new Set(words)];
        
        words = words.sort((a, b) => a.localeCompare(b));

        words.forEach((word: string) => {
            this.wordList.push(word);
            this.sortedUniqueWordList.push(word);
            const wordData: FrequencyObject = this.frequencies[word];
            wordData.frequency += 1;
            wordData.usage = parseFloat(((wordData.frequency / this.words) * 100).toFixed(2));
        });

        this.sortedUniqueWordList = [...new Set(this.sortedUniqueWordList)];
        this.uniqueWords = this.sortedUniqueWordList.length;
        this.sortedFrequencyList = this.sortByFrequency();

        return this.frequencies;
    }

    /**
     * Returns a list of word objects in descending order based on frequency.
     * @return {Array<FrequencyMap>} An array of word objects.
     */
    private sortByFrequency(): Array<FrequencyMap> {
        this.doesScanDataExist();
        let frequencyList: Array<FrequencyObject> = [];

        for (const key in this.frequencies) {
            let wordData: FrequencyMap = {};
            wordData[key] = this.frequencies[key];
            frequencyList.push(this.frequencies[key]);
        }
        
        frequencyList.sort((a: FrequencyObject, b: FrequencyObject) => {
            if (a.frequency == b.frequency) return 0;
            return a.frequency > b.frequency ? -1 : 1;
        });

        return frequencyList.map(wordObj => {
            return this.searchMapForKey(wordObj);
        });
    }

    /**
     * Search the frequency table for a given word based on the provided `FrequencyObject`.
     * @param {FrequencyObject} wordPair An object representing a words frequency. E.g. `{"frequency": 1, usage: "2.27%"}`
     * @return {FrequencyMap} A completed word object where the key equals the word and value equals the FrequencyObject.
     */
    searchMapForKey(pair: FrequencyObject): FrequencyMap  {
        let foundWord: FrequencyMap = {};
        for (const key in this.frequencies) {
            if (this.frequencies[key] == pair) {
                foundWord[key] = pair;
                return foundWord;
            }
        }
        return foundWord;
    }

    getNthWord(target: number): FrequencyMap | undefined {
        this.doesScanDataExist();
        const key: string = this.unsortedUniqueWordList[target];
        return this.sortedFrequencyList.find(wordObj => Object.keys(wordObj).includes(key));
    }

    printFrequencies(): String {
        this.doesScanDataExist();
        let frequencies = "";
        for (const key in this.frequencies) {
            frequencies += `${key}: { frequency: ${this.frequencies[key].frequency}, usage: ${this.frequencies[key].usage} }`;
        }
        return frequencies;
    }

    doesScanDataExist(): void | Error {
        if (!this.hasScanRun()) throw Error("No data available. Make sure to run countWordsIn");
        return;
    }

    hasScanRun(): boolean {
        return Object.keys(this.frequencies).length > 0 ? true : false;
    }
};

const doc = `Hello, World. This is some example text that 
repeats the word test. Usually a test covers multiple topics
but the real test is to learn something by the end of a test.`;

const wf = new WordFrequencies();

const frequencies = wf.countWordsInString(doc);
const frequencyList = wf.sortedFrequencyList;
console.log("foo", wf.printFrequencies());

console.log(frequencies);
console.log(frequencyList);
console.log(wf);

console.log(wf.getNthWord(1));