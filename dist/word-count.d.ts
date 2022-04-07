declare const fs: any;
declare type FrequencyObject = {
    frequency: number;
    usage: number;
};
interface FrequencyMap {
    [key: string]: FrequencyObject;
}
/**
 * A class for counting the frequency of words in a given string or file.
 */
declare class WordFrequencies {
    frequencies: FrequencyMap;
    sortedFrequencyList: Array<FrequencyMap>;
    wordList: Array<string>;
    uniqueWordList: Array<string>;
    sortedUniqueWordList: Array<string>;
    wordRegex: RegExp;
    words: number;
    uniqueWords: number;
    constructor();
    /**
     * Record the frequency of every word from an input string.
     * @param {string} filePath A local filepath representing a document to be scanned.
     * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
     * @return {FrequencyMap} A hash table containing all word frequencies.
     */
    countWordsInString(strToCheck: string): FrequencyMap;
    /**
     * Record the frequency of every word from a specified local files contents.
     * @param {string} filePath A local filepath representing a document to be scanned.
     * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
     * @return {FrequencyMap} A hash table sorted in ascending order (a-z) containing all words and their frequencies.
     */
    countWordsInFile(filePath: string, encoding?: string): FrequencyMap;
    /**
     * Count the frequency of words in a given string or file
     * @param {string} document A string representing the text content to scan.
     * @return {Map<string, FrequencyObject>} A hash map sorted in ascending order (a-z) containing all words and their frequencies.
     */
    countWords(doc: string): FrequencyMap;
    /**
     * Returns a list of word objects in descending order based on frequency.
     * @return {Array<FrequencyMap>} An array of word objects.
     */
    private sortByFrequency;
    /**
     * Search the frequency table for a given word based on the provided `FrequencyObject`.
     * @param {FrequencyObject} wordPair An object representing a words frequency. E.g. `{"frequency": 1, usage: "2.27%"}`
     * @return {FrequencyMap} A completed word object where the key equals the word and value equals the FrequencyObject.
     */
    searchMapForKey(pair: FrequencyObject): FrequencyMap;
    getNthWord(target: number): FrequencyMap | undefined;
    printFrequencies(): String;
    hasScanRun(): boolean;
    doesScanDataExist(): boolean | Error;
}
