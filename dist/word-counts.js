"use strict";
const fs = require("fs");
;
const wordRegex = /(\w+\'\w+)|(\w+)/;
/**
 * Count the frequency of words in a given string.
 * @param {string} document A string representing the text content to scan.
 * @return {WordTable} A hash map populated with word count data.
 */
function countWords(doc) {
    const wordTable = {
        frequencies: {},
        wordList: [],
        uniqueWordList: [],
        sortedUniqueWordList: [],
        sortedFrequencyList: [],
        wordCount: 0,
        uniqueWordCount: 0,
        getNthWord(target) {
            const key = this.wordList[target];
            return this.sortedFrequencyList.find(wordObj => Object.keys(wordObj).includes(key));
        },
        printFrequencies() {
            let frequencyStr = "";
            for (const key in this.frequencies) {
                frequencyStr += `${key}: { frequency: ${this.frequencies[key].frequency}, usage: ${this.frequencies[key].usage} }\n`;
            }
            return frequencyStr.slice(0, frequencyStr.length - 1);
        }
    };
    let words = doc.split(/\s+/).map(word => {
        const cleanWordObj = word.match(wordRegex);
        const cleanWord = cleanWordObj && cleanWordObj[0] ? cleanWordObj[0] : "";
        wordTable.frequencies[cleanWord] = { "frequency": 0, "usage": 0 };
        wordTable.wordList.push(cleanWord);
        return cleanWord;
    });
    wordTable.wordCount = words.length;
    wordTable.uniqueWordList = [...new Set(words)];
    words = words.sort((a, b) => a.localeCompare(b));
    words.forEach((word) => {
        // wordTable.wordList.push(word);
        wordTable.sortedUniqueWordList.push(word);
        const wordData = wordTable.frequencies[word];
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
function countWordsInFile(filePath, encoding = "utf8") {
    let doc = fs.readFileSync(filePath, encoding);
    return countWords(doc);
}
;
function searchByValue(frequencies, pair) {
    const foundWord = {};
    for (const key in frequencies) {
        if (frequencies[key] == pair) {
            foundWord[key] = pair;
            return foundWord;
        }
    }
    return foundWord;
}
function sortByFrequency(frequencies) {
    const frequencyList = [];
    for (const key in frequencies) {
        const wordData = {};
        wordData[key] = frequencies[key];
        frequencyList.push(wordData[key]);
    }
    frequencyList.sort((a, b) => {
        if (a.frequency == b.frequency)
            return 0;
        return a.frequency > b.frequency ? -1 : 1;
    });
    return frequencyList.map(wordObj => {
        return searchByValue(frequencies, wordObj);
    });
}
module.exports = { countWords, countWordsInFile };
