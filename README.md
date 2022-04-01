# Word Count
Count the number of occurences for each word in a given string or file and return an object containing the frequency for each word along with a count of all words.

## Usage
Provide a string or local file containing text which can be scanned in order to populate the frequency table.

```js
const wf = new WordFrequencies();
const doc = `Hello, World! why Hello again, the book I am reading is out of this world. I can't believe I haven't read the series.`;
const frequencies = wf.countWordsInString(doc);
console.log(frequencies);
/*
{
  again: { frequency: 1, usage: '4.3%' },
  am: { frequency: 1, usage: '4.3%' },
  believe: { frequency: 1, usage: '4.3%' },
  book: { frequency: 1, usage: '4.3%' },
  "can't": { frequency: 1, usage: '4.3%' },
  "haven't": { frequency: 1, usage: '4.3%' },
  Hello: { frequency: 2, usage: '8.7%' },
  I: { frequency: 3, usage: '13.0%' },
  is: { frequency: 1, usage: '4.3%' },
  of: { frequency: 1, usage: '4.3%' },
  out: { frequency: 1, usage: '4.3%' },
  read: { frequency: 1, usage: '4.3%' },
  reading: { frequency: 1, usage: '4.3%' },
  series: { frequency: 1, usage: '4.3%' },
  the: { frequency: 2, usage: '8.7%' },
  this: { frequency: 1, usage: '4.3%' },
  why: { frequency: 1, usage: '4.3%' },
  World: { frequency: 1, usage: '4.3%' },
  world: { frequency: 1, usage: '4.3%' }
}
*/
```

Sort result by frequency:

```js
const frequencyList = wf.sortByFrequency();
console.log(frequencyList);
/*
[
  { I: { frequency: 3, usage: '13.0%' } },
  { Hello: { frequency: 2, usage: '8.7%' } },
  { the: { frequency: 2, usage: '8.7%' } },
  { again: { frequency: 1, usage: '4.3%' } },
  { am: { frequency: 1, usage: '4.3%' } },
  { believe: { frequency: 1, usage: '4.3%' } },
  { book: { frequency: 1, usage: '4.3%' } },
  { "can't": { frequency: 1, usage: '4.3%' } },
  { "haven't": { frequency: 1, usage: '4.3%' } },
  { is: { frequency: 1, usage: '4.3%' } },
  { of: { frequency: 1, usage: '4.3%' } },
  { out: { frequency: 1, usage: '4.3%' } },
  { read: { frequency: 1, usage: '4.3%' } },
  { reading: { frequency: 1, usage: '4.3%' } },
  { series: { frequency: 1, usage: '4.3%' } },
  { this: { frequency: 1, usage: '4.3%' } },
  { why: { frequency: 1, usage: '4.3%' } },
  { World: { frequency: 1, usage: '4.3%' } },
  { world: { frequency: 1, usage: '4.3%' } }
]
*/
```