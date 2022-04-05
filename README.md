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
const frequencyList = wf.sortedFrequencyList;

console.log(`Frequencies: ${frequencies}`);
console.log(`Frequency List: ${frequencyList}`);

/*
Frequencies: {
  a: { frequency: 2, usage: 6.5 },
  by: { frequency: 1, usage: 3.2 },
  covers: { frequency: 1, usage: 3.2 },
  end: { frequency: 1, usage: 3.2 },
  example: { frequency: 1, usage: 3.2 },
  Hello: { frequency: 1, usage: 3.2 },
  is: { frequency: 2, usage: 6.5 },
  learn: { frequency: 1, usage: 3.2 },
  multiple: { frequency: 1, usage: 3.2 },
  of: { frequency: 1, usage: 3.2 },
  real: { frequency: 1, usage: 3.2 },
  repeats: { frequency: 1, usage: 3.2 },
  some: { frequency: 1, usage: 3.2 },
  something: { frequency: 1, usage: 3.2 },
  test: { frequency: 4, usage: 12.9 },
  text: { frequency: 1, usage: 3.2 },
  that: { frequency: 1, usage: 3.2 },
  the: { frequency: 3, usage: 9.7 },
  This: { frequency: 1, usage: 3.2 },
  to: { frequency: 1, usage: 3.2 },
  topics: { frequency: 1, usage: 3.2 },
  Usually: { frequency: 1, usage: 3.2 },
  word: { frequency: 1, usage: 3.2 },
  World: { frequency: 1, usage: 3.2 }
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
  { is: { frequency: 2, usage: 6.5 } },
  { repeats: { frequency: 1, usage: 3.2 } },
  { by: { frequency: 1, usage: 3.2 } },
  { covers: { frequency: 1, usage: 3.2 } },
  { end: { frequency: 1, usage: 3.2 } },
  { example: { frequency: 1, usage: 3.2 } },
  { Hello: { frequency: 1, usage: 3.2 } },
  { learn: { frequency: 1, usage: 3.2 } },
  { multiple: { frequency: 1, usage: 3.2 } },
  { of: { frequency: 1, usage: 3.2 } },
  { real: { frequency: 1, usage: 3.2 } },
  { some: { frequency: 1, usage: 3.2 } },
  { something: { frequency: 1, usage: 3.2 } },
  { text: { frequency: 1, usage: 3.2 } },
  { that: { frequency: 1, usage: 3.2 } },
  { This: { frequency: 1, usage: 3.2 } },
  { to: { frequency: 1, usage: 3.2 } },
  { topics: { frequency: 1, usage: 3.2 } },
  { Usually: { frequency: 1, usage: 3.2 } },
  { word: { frequency: 1, usage: 3.2 } },
  { World: { frequency: 1, usage: 3.2 } }
]
*/
```