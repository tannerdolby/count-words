const fs = require("fs");

interface FrequencyMap {
    [key: string]: number;
}

/**
 * A utility class for scanning a document and recording
 * the frequency of each word found in a hash table.
 */
class WordFrequencies {
    frequencies: FrequencyMap;
    wordList: string[];
    wordRegex = /(\w+\'\w+)|(\w+)/;

    constructor() {
        this.frequencies = {
            "numberOfWords": 0,
        };
        this.wordList = [];
    }

    /**
     * Count the frequency of every from an input string.
     * @param {string} filePath A local filepath representing a document to be scanned.
     * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
     * @return {FrequencyMap} A hash table containing all word frequencies.
     */
    countWordsInStr(strToCheck: string): FrequencyMap {
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
     * Count the frequency of words in a given string
     * @param {string} document A string representing the text content to scan. 
     * @return {FrequencyMap} A hash table sorted in ascending order (a-z) containing all words and their frequencies.
     */
    countWords(document: string): FrequencyMap {
        const words: string[] = document.split(" ")
            .sort((a: string, b:string) => {
                let lowA = a.toLowerCase(), lowB = b.toLowerCase();
                if (lowA == lowB) return 0;
                return lowA < lowB ? -1 : 1;
            })
            .map((word: string) => {
                let cleanWord = word.match(this.wordRegex)[0];
                this.frequencies[cleanWord] = 0;
                this.wordList.push(word);
                return cleanWord;
            });
        
        this.frequencies["numberOfWords"] = words.length;

        words.forEach((word: string) => {
            this.frequencies[word] += 1;
        });

        return this.frequencies;
    }

    printFrequencies() {      
        for (const key in this.frequencies) {
            console.log(`${key}: ${this.frequencies[key]}`);
        }
    }
};

let wf = new WordFrequencies();
let frequenciesOne = wf.countWordsInFile("./words.md");
console.log("Ex 1: ", frequenciesOne); // {"numberOfWords": 113, "Hello": 1, ... n}
let frequenciesTwo = wf.countWordsInStr(`Hello, world! This is some test text to outline the capabilities of counting the occurence of each word in a given text document. I am going to repeat I a bunch of times to show how repeating I can be very annoying to read.`);
console.log("Ex 2: ", frequenciesTwo); // {"Hello": 1, ... n}
wf.printFrequencies(); // Hello: 1