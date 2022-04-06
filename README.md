# Word Count
Count the number of occurences for each word in a given string or file and return an object containing the frequency for each word along with a count of all words.

## Usage
Provide a string or local file containing text which can be scanned in order to populate the frequency table.

```js
const doc = `Hello, World. This is some example text that 
repeats the word test. Usually a test covers multiple topics
but the real test is to learn something by the end of a test.`;

const wf = new WordFrequencies();
const frequencies = wf.countWordsInString(doc);
console.log(`Frequencies: ${frequencies}`);

/*
Frequencies: {
  a: { frequency: 2, usage: 6.5 },
  by: { frequency: 1, usage: 3.2 },
  covers: { frequency: 1, usage: 3.2 },
  ...
}
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