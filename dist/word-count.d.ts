declare const fs: any;
declare type FrequencyObject = {
    frequency: number;
    usage: number | string;
};
interface FrequencyMap {
    [key: string]: FrequencyObject;
}
/**
 * A utility class for scanning a document and recording
 * the frequency of each word found in a hash table.
 */
declare class WordFrequencies {
    frequencies: FrequencyMap;
    wordList: string[];
    wordRegex: RegExp;
    totalWords: number;
    constructor();
    /**
     * Count the frequency of every from an input string.
     * @param {string} filePath A local filepath representing a document to be scanned.
     * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
     * @return {FrequencyMap} A hash table containing all word frequencies.
     */
    countWordsInStr(strToCheck: string): FrequencyMap;
    /**
     * Count the frequency of every word from a specified local file.
     * @param {string} filePath A local filepath representing a document to be scanned.
     * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
     * @return {FrequencyMap} A hash table sorted in ascending order (a-z) containing all words and their frequencies.
     */
    countWordsInFile(filePath: string, encoding?: string): FrequencyMap;
    /**
     * Count the frequency of words in a given string
     * @param {string} document A string representing the text content to scan.
     * @return {FrequencyMap} A hash table sorted in ascending order (a-z) containing all words and their frequencies.
     */
    countWords(document: string): FrequencyMap;
    sortByFrequency(): Array<FrequencyMap>;
    printFrequencies(): void;
}
declare let wf: WordFrequencies;
declare let frequenciesOne: FrequencyMap;
declare let frequenciesTwo: FrequencyMap;
