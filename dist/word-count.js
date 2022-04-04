"use strict";
const fs = require("fs");
/**
 * A utility class for scanning a document and recording
 * the frequency of each word found in a hash table.
 */
class WordFrequencies {
    constructor() {
        this.frequencies = {};
        this.wordList = [];
        this.wordRegex = /(\w+\'\w+)|(\w+)/;
        this.totalWords = 0;
    }
    /**
     * Count the frequency of every from an input string.
     * @param {string} filePath A local filepath representing a document to be scanned.
     * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
     * @return {FrequencyMap} A hash table containing all word frequencies.
     */
    countWordsInStr(strToCheck) {
        return this.countWords(strToCheck);
    }
    ;
    /**
     * Count the frequency of every word from a specified local file.
     * @param {string} filePath A local filepath representing a document to be scanned.
     * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
     * @return {FrequencyMap} A hash table sorted in ascending order (a-z) containing all words and their frequencies.
     */
    countWordsInFile(filePath, encoding = "utf8") {
        let doc = fs.readFileSync(filePath, encoding);
        return this.countWords(doc);
    }
    ;
    /**
     * Count the frequency of words in a given string
     * @param {string} document A string representing the text content to scan.
     * @return {FrequencyMap} A hash table sorted in ascending order (a-z) containing all words and their frequencies.
     */
    countWords(document) {
        const words = document.split(" ")
            .sort((a, b) => {
            let lowA = a.toLowerCase(), lowB = b.toLowerCase();
            if (lowA == lowB)
                return 0;
            return lowA < lowB ? -1 : 1;
        })
            .map((word) => {
            let cleanWordObj = word.match(this.wordRegex);
            let cleanWord = cleanWordObj[0] != undefined ? cleanWordObj[0] : "";
            this.frequencies[cleanWord] = { "frequency": 0, "usage": 0 };
            this.wordList.push(word);
            return cleanWord;
        });
        this.totalWords = words.length;
        words.forEach((word) => {
            let wordData = this.frequencies[word];
            wordData.frequency += 1;
            wordData.usage = Number(((wordData.frequency / this.totalWords) * 100).toFixed(1));
        });
        return this.frequencies;
    }
    /**
     * Returns a list of word objects in descending order based on frequency.
     * @return {Array<FrequencyMap>} An array of word objects.
     */
    sortByFrequency(frequencyTable) {
        let wordList = [];
        for (const key in frequencyTable) {
            let wordData = {};
            wordData[key] = frequencyTable[key];
            wordList.push(frequencyTable[key]);
        }
        wordList.sort((a, b) => {
            if (a.frequency == b.frequency)
                return 0;
            return a.frequency > b.frequency ? -1 : 1;
        });
        return wordList.map(wordObj => {
            return this.searchMapForKey(wordObj);
        });
    }
    getNthWord(target) {
        if (Object.keys(this.frequencies).length > 0 && this.wordList.length > 0) {
            let wordObj = {};
            let word = this.wordList[target];
            console.log(this.wordList);
            wordObj[word] = this.frequencies[word];
            return wordObj;
        }
    }
    /**
     * Search the frequency table for a given word based on the provided `FrequencyObject`.
     * @param {FrequencyObject} wordPair An object representing a words frequency. E.g. `{"frequency": 1, usage: "2.27%"}`
     * @return {FrequencyMap} A completed word object where the key equals the word and value equals the FrequencyObject.
     */
    searchMapForKey(pair) {
        let foundWordObj = {};
        for (const key in this.frequencies) {
            if (this.frequencies[key] == pair) {
                foundWordObj[key] = pair;
                return foundWordObj;
            }
        }
        return foundWordObj;
    }
    printFrequencies() {
        for (const key in this.frequencies) {
            console.log(`${key}: { frequency: ${this.frequencies[key].frequency}, usage: ${this.frequencies[key].usage} }`);
        }
    }
}
;
let wf = new WordFrequencies();
const doc = `Hello, World. This is some example text that 
repeat the word test. Usually a test covers multiple topics
but the real test is to learn something by the end of a test.`;
const frequencies = wf.countWordsInStr(doc);
const frequencyList = wf.sortByFrequency(frequencies);
console.log(frequencies);
console.log(frequencyList);
console.log("Search sorted frequency list: ", frequencyList.find((node) => Object.keys(node).includes("test")));
console.log("4th word: ", wf.getNthWord(4));
