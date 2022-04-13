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
 * @param {string} doc A string representing the text content to scan.
 * @return {WordTable} An object populated with word count data.
 */
declare function countWords(doc: string): WordTable;
/**
 * Count the frequency of words in a given local file containing text content.
 * @param {string} filepath A local filepath representing a document to be scanned.
 * @param {string} encoding Character encoding to be used for reading the file located at `filepath`. Default: "utf8".
 * @return {WordTable} A promise containing an object populated with word count data.
 */
declare function countWordsInFile(filepath: string, encoding?: string): Promise<WordTable>;
declare function searchByValue(frequencies: FrequencyMap, pair: FrequencyObject): FrequencyMap;
declare function sortByFrequency(frequencies: FrequencyMap): Array<FrequencyMap>;
