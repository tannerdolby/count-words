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
declare class WordCounts {
    frequencies: FrequencyMap;
    wordList: Array<string>;
    uniqueWordList: Array<string>;
    sortedUniqueWordList: Array<string>;
    sortedFrequencyList: Array<FrequencyMap>;
    wordRegex: RegExp;
    wordCount: number;
    uniqueWordCount: number;
    constructor();
    /**
     * Count the frequency of words in a given string.
     * @param {string} document A string representing the text content to scan.
     * @return {Map<string, FrequencyObject>} A hash map sorted in ascending order (a-z) containing all words and their frequencies.
     */
    count(doc: string): FrequencyMap;
    /**
     * Count the frequency of words in a given local file containing text content.
     * @param {string} filePath A local filepath representing a document to be scanned.
     * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
     * @return {FrequencyMap} A hash table sorted in ascending order (a-z) containing all words and their frequencies.
     */
    countWordsInFile(filePath: string, encoding?: string): FrequencyMap;
    /**
     * Get the nth word from frequency table as it appears in the document.
     * @param {string} target The nth word to lookup. (0-indexed)
     * @return The word object from frequency table representing the nth word.
     */
    getNthWord(target: number): FrequencyMap | undefined;
    printFrequencies(): string;
    private searchByValue;
    private sortByFrequency;
    private hasScanRun;
    private doesScanDataExist;
}
