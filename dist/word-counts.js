"use strict";
const fs = require("fs");
/**
 * A class for counting the frequency of words in a given string or file.
 */
class WordCounts {
    constructor() {
        this.frequencies = {};
        this.sortedFrequencyList = [];
        this.wordList = [];
        this.uniqueWordList = [];
        this.sortedUniqueWordList = [];
        this.wordRegex = /(\w+\'\w+)|(\w+)/;
        this.wordCount = 0;
        this.uniqueWordCount = 0;
    }
    /**
     * Count the frequency of words in a given string.
     * @param {string} document A string representing the text content to scan.
     * @return {Map<string, FrequencyObject>} A hash map sorted in ascending order (a-z) containing all words and their frequencies.
     */
    count(doc) {
        let words = doc.split(/\s+/).map(word => {
            const cleanWordObj = word.match(this.wordRegex);
            const cleanWord = cleanWordObj && cleanWordObj[0] != undefined ? cleanWordObj[0] : "";
            this.frequencies[cleanWord] = { "frequency": 0, "usage": 0 };
            return cleanWord;
        });
        this.wordCount = words.length;
        this.uniqueWordList = [...new Set(words)];
        words = words.sort((a, b) => a.localeCompare(b));
        words.forEach((word) => {
            this.wordList.push(word);
            this.sortedUniqueWordList.push(word);
            const wordData = this.frequencies[word];
            wordData.frequency += 1;
            wordData.usage = parseFloat(((wordData.frequency / this.wordCount) * 100).toFixed(1));
        });
        this.sortedUniqueWordList = [...new Set(this.sortedUniqueWordList)];
        this.uniqueWordCount = this.sortedUniqueWordList.length;
        this.sortedFrequencyList = this.sortByFrequency();
        return this.frequencies;
    }
    /**
     * Count the frequency of words in a given local file containing text content.
     * @param {string} filePath A local filepath representing a document to be scanned.
     * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
     * @return {FrequencyMap} A hash table sorted in ascending order (a-z) containing all words and their frequencies.
     */
    countWordsInFile(filePath, encoding = "utf8") {
        let doc = fs.readFileSync(filePath, encoding);
        return this.count(doc);
    }
    ;
    /**
     * Get the nth word from frequency table as it appears in the document.
     * @param {string} target The nth word to lookup. (0-indexed)
     * @return The word object from frequency table representing the nth word.
     */
    getNthWord(target) {
        if (!this.doesScanDataExist())
            return {};
        const key = this.uniqueWordList[target];
        return this.sortedFrequencyList.find(wordObj => Object.keys(wordObj).includes(key));
    }
    printFrequencies() {
        if (!this.doesScanDataExist())
            return "";
        let frequencies = "";
        for (const key in this.frequencies) {
            frequencies += `${key}: { frequency: ${this.frequencies[key].frequency}, usage: ${this.frequencies[key].usage} }\n`;
        }
        return frequencies.slice(0, frequencies.length - 1);
    }
    searchByValue(pair) {
        let foundWord = {};
        for (const key in this.frequencies) {
            if (this.frequencies[key] == pair) {
                foundWord[key] = pair;
                return foundWord;
            }
        }
        return foundWord;
    }
    sortByFrequency() {
        if (!this.doesScanDataExist())
            return [];
        let frequencyList = [];
        for (const key in this.frequencies) {
            const wordData = {};
            wordData[key] = this.frequencies[key];
            frequencyList.push(wordData[key]);
        }
        frequencyList.sort((a, b) => {
            if (a.frequency == b.frequency)
                return 0;
            return a.frequency > b.frequency ? -1 : 1;
        });
        return frequencyList.map(wordObj => {
            return this.searchByValue(wordObj);
        });
    }
    hasScanRun() {
        return Object.keys(this.frequencies).length > 0 ? true : false;
    }
    doesScanDataExist() {
        if (!this.hasScanRun())
            throw Error("No data available. Make sure to run countWordsIn*() to generate frequency tables.");
        return true;
    }
}
;
module.exports = WordCounts;
