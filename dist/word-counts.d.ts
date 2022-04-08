declare const fs: any;
declare type FrequencyObject = {
    frequency: number;
    usage: number;
};
declare type FrequencyMap = {
    [key: string]: FrequencyObject;
};
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
}
declare const wordRegex: RegExp;
/**
 * Count the frequency of words in a given string.
 * @param {string} document A string representing the text content to scan.
 * @return {WordTable} A hash map populated with word count data.
 */
declare function countWords(doc: string): WordTable;
/**
 * Count the frequency of words in a given local file containing text content.
 * @param {string} filePath A local filepath representing a document to be scanned.
 * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
 * @return {WordTable} A hash map containing word data.
 */
declare function countWordsInFile(filePath: string, encoding?: string): WordTable;
declare function searchByValue(frequencies: FrequencyMap, pair: FrequencyObject): FrequencyMap;
declare function sortByFrequency(frequencies: FrequencyMap): Array<FrequencyMap>;
