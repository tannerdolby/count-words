# word-counts
> Count all the words in a given string or file and return word counts in a hash table.

## Installation
Install the package from [npm](https://www.npmjs.com/package/word-counts)

```
npm install word-counts
```

## Usage
Provide a string or local filepath containing text which can be scanned in order to populate the word frequency table.

```js
const countWords = require("word-counts");

const doc = `Hello, World. This is some example text that 
repeats the word test. Usually a test covers multiple topics
but the real test is to learn something by the end of a test.`;

const wordTable = countWords(doc);
console.log(wordTable);
console.log(wordTable.wordCount);
console.log(wordTable.uniqueWordCount);

/*
{
  a: { frequency: 2, usage: 6.5 },
  by: { frequency: 1, usage: 3.2 },
  covers: { frequency: 1, usage: 3.2 },
  ...
}
32
25
*/
```

Sort result by frequency:

```js
const wordTable = wc.countWords(doc);
console.log(wordTable.sortedFrequencyList);
/*
[
  { test: { frequency: 4, usage: 12.9 } },
  { the: { frequency: 3, usage: 9.7 } },
  { a: { frequency: 2, usage: 6.5 } },
  ...
]
*/
```

## Methods
- `countWords`: Count the frequency of words in a given string.
- `countWordsInFile`: Count the frequency of words in a local file.
- `printFrequencies`: Get a stringified version of the word frequency table.
- `getNthWord`: Get the Nth word from the word list.

### Attributes
The `countWords` and `countWordsInFile` functions both return `WordMap` objects which contain the following attributes:

- `frequencies`: Object representing the word frequency table.
- `wordList`: A list of all the words.
- `uniqueWordList`: A list of all the unique words.
- `sortedUniqueWordList`: A sorted list of all the unique words.
- `sortedFrequencyList`: A sorted list of word frequency objects.
- `wordCount`: Count of all words.
- `uniqueWordCount`: Count of all unique words.

## Tests
Install dev dependencies:

```js
npm install -d
```
and run test suite:

```js
npm run test
```

## Contributing
If you find any bugs or would like to suggest a feature, feel free to [create an issue](https://github.com/tannerdolby/count-words/issues).