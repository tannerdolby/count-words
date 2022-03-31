# Word Count
Count the number of occurences for each word in a given string or file and return an object containing the frequency for each word along with a count of all words.

## Usage
Provide a string or local file containing text which can be scanned in order to populate the frequency table.

```js
const wf = new WordFrequencies();
const doc = `Hello, World! why Hello again, the book I am reading is out of this world. I can't believe I haven't read the series.`;
const frequencies = wf.countWordsInString(doc);
console.log(frequencies);
/* {
  numberOfWords: 23,
  again: 1,
  am: 1,
  believe: 1,
  book: 1,
  "can't": 1,
  "haven't": 1,
  Hello: 2,
  I: 3,
  is: 1,
  of: 1,
  out: 1,
  read: 1,
  reading: 1,
  series: 1,
  the: 2,
  this: 1,
  why: 1,
  World: 1,
  world: 1
} */
```