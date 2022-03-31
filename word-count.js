var fs = require("fs");
/**
 * A utility class for scanning a document and recording
 * the frequency of each word found in a hash table.
 */
var WordFrequencies = /** @class */ (function () {
    function WordFrequencies() {
        this.wordRegex = /(\w+\'\w+)|(\w+)/;
        this.frequencies = {
            "numberOfWords": 0
        };
        this.wordList = [];
    }
    /**
     * Count the frequency of every from an input string.
     * @param {string} filePath A local filepath representing a document to be scanned.
     * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
     * @return {FrequencyMap} A hash table containing all word frequencies.
     */
    WordFrequencies.prototype.countWordsInStr = function (strToCheck) {
        return this.countWords(strToCheck);
    };
    ;
    /**
     * Count the frequency of every word from a specified local file.
     * @param {string} filePath A local filepath representing a document to be scanned.
     * @param {string} encoding Character encoding to be used for reading the file located at `filePath`. Default is "utf8".
     * @return {FrequencyMap} A hash table sorted in ascending order (a-z) containing all words and their frequencies.
     */
    WordFrequencies.prototype.countWordsInFile = function (filePath, encoding) {
        if (encoding === void 0) { encoding = "utf8"; }
        var doc = fs.readFileSync(filePath, encoding);
        return this.countWords(doc);
    };
    ;
    /**
     * Count the frequency of words in a given string
     * @param {string} document A string representing the text content to scan.
     * @return {FrequencyMap} A hash table sorted in ascending order (a-z) containing all words and their frequencies.
     */
    WordFrequencies.prototype.countWords = function (document) {
        var _this = this;
        var words = document.split(" ")
            .sort(function (a, b) {
            var lowA = a.toLowerCase(), lowB = b.toLowerCase();
            if (lowA == lowB)
                return 0;
            return lowA < lowB ? -1 : 1;
        })
            .map(function (word) {
            var cleanWord = word.match(_this.wordRegex)[0];
            _this.frequencies[cleanWord] = 0;
            _this.wordList.push(word);
            return cleanWord;
        });
        this.frequencies["numberOfWords"] = words.length;
        words.forEach(function (word) {
            _this.frequencies[word] += 1;
        });
        return this.frequencies;
    };
    WordFrequencies.prototype.printFrequencies = function () {
        for (var key in this.frequencies) {
            console.log(key + ": " + this.frequencies[key]);
        }
    };
    return WordFrequencies;
}());
;
var wf = new WordFrequencies();
var frequenciesOne = wf.countWordsInFile("./words.md");
console.log("Ex 1: ", frequenciesOne); // {"numberOfWords": 113, "Hello": 1, ... n}
var frequenciesTwo = wf.countWordsInStr("Hello, world! This is some test text to outline the capabilities of counting the occurence of each word in a given text document. I am going to repeat I a bunch of times to show how repeating I can be very annoying to read.");
console.log("Ex 2: ", frequenciesTwo); // {"Hello": 1, ... n}
wf.printFrequencies(); // Hello: 1
