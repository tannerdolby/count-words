# word-counts
Record the frequency of every word in a given string or file. The `WordCounts` class includes additional useful data relative to word counts.

## Installation
Install the package from [npm](https://www.npmjs.com/package/word-counts).

```
npm install word-counts
```

## Usage
Provide a string or local file containing text which can be scanned in order to populate the word frequency table.

```js
const doc = `Hello, World. This is some example text that 
repeats the word test. Usually a test covers multiple topics
but the real test is to learn something by the end of a test.`;

const wc = new WordCounts();
const frequencies = wc.count(doc);
console.log(frequencies);
console.log(wc.wordCount);
console.log(wc.uniqueWordCount);

/*
Frequencies: {
  a: { frequency: 2, usage: 6.5 },
  by: { frequency: 1, usage: 3.2 },
  covers: { frequency: 1, usage: 3.2 },
  ...
}
32
30
*/
```

Sort result by frequency:

```js
const frequencyList = wf.sortedFrequencyList;
console.log(frequencyList);
/*
[
  { test: { frequency: 4, usage: 12.9 } },
  { the: { frequency: 3, usage: 9.7 } },
  { a: { frequency: 2, usage: 6.5 } },
  ...
]
*/
```

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