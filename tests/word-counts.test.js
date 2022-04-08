const {countWords, countWordsInFile} = require("../dist/word-counts");

test("Scan a string and build frequency tables", () => {
    const doc = `Hello, World. This is some example text that 
    repeats the word test. Usually a test covers multiple topics
    but the real test is to learn something by the end of a test. A test
    is taking place, test one two three test.`;

    const wordTable = countWords(doc);

    expect(wordTable.wordCount).toBe(42);
    expect(wordTable.uniqueWordCount).toBe(31);
    expect(wordTable.getNthWord(3)).toEqual({ is: { frequency: 3, usage: 7.1 } });
    expect(wordTable.frequencies).toEqual({
        Hello: { frequency: 1, usage: 2.4 },
        World: { frequency: 1, usage: 2.4 },
        This: { frequency: 1, usage: 2.4 },
        is: { frequency: 3, usage: 7.1 },
        some: { frequency: 1, usage: 2.4 },
        example: { frequency: 1, usage: 2.4 },
        text: { frequency: 1, usage: 2.4 },
        that: { frequency: 1, usage: 2.4 },
        repeats: { frequency: 1, usage: 2.4 },
        the: { frequency: 3, usage: 7.1 },
        word: { frequency: 1, usage: 2.4 },
        test: { frequency: 7, usage: 16.7 },
        Usually: { frequency: 1, usage: 2.4 },
        a: { frequency: 2, usage: 4.8 },
        covers: { frequency: 1, usage: 2.4 },
        multiple: { frequency: 1, usage: 2.4 },
        topics: { frequency: 1, usage: 2.4 },
        but: { frequency: 1, usage: 2.4 },
        real: { frequency: 1, usage: 2.4 },
        to: { frequency: 1, usage: 2.4 },
        learn: { frequency: 1, usage: 2.4 },
        something: { frequency: 1, usage: 2.4 },
        by: { frequency: 1, usage: 2.4 },
        end: { frequency: 1, usage: 2.4 },
        of: { frequency: 1, usage: 2.4 },
        A: { frequency: 1, usage: 2.4 },
        taking: { frequency: 1, usage: 2.4 },
        place: { frequency: 1, usage: 2.4 },
        one: { frequency: 1, usage: 2.4 },
        two: { frequency: 1, usage: 2.4 },
        three: { frequency: 1, usage: 2.4 }
    });

    expect(wordTable.sortedFrequencyList).toEqual([
        { test: { frequency: 7, usage: 16.7 } },
        { is: { frequency: 3, usage: 7.1 } },
        { the: { frequency: 3, usage: 7.1 } },
        { a: { frequency: 2, usage: 4.8 } },
        { Hello: { frequency: 1, usage: 2.4 } },
        { World: { frequency: 1, usage: 2.4 } },
        { This: { frequency: 1, usage: 2.4 } },
        { some: { frequency: 1, usage: 2.4 } },
        { example: { frequency: 1, usage: 2.4 } },
        { text: { frequency: 1, usage: 2.4 } },
        { that: { frequency: 1, usage: 2.4 } },
        { repeats: { frequency: 1, usage: 2.4 } },
        { word: { frequency: 1, usage: 2.4 } },
        { Usually: { frequency: 1, usage: 2.4 } },
        { covers: { frequency: 1, usage: 2.4 } },
        { multiple: { frequency: 1, usage: 2.4 } },
        { topics: { frequency: 1, usage: 2.4 } },
        { but: { frequency: 1, usage: 2.4 } },
        { real: { frequency: 1, usage: 2.4 } },
        { to: { frequency: 1, usage: 2.4 } },
        { learn: { frequency: 1, usage: 2.4 } },
        { something: { frequency: 1, usage: 2.4 } },
        { by: { frequency: 1, usage: 2.4 } },
        { end: { frequency: 1, usage: 2.4 } },
        { of: { frequency: 1, usage: 2.4 } },
        { A: { frequency: 1, usage: 2.4 } },
        { taking: { frequency: 1, usage: 2.4 } },
        { place: { frequency: 1, usage: 2.4 } },
        { one: { frequency: 1, usage: 2.4 } },
        { two: { frequency: 1, usage: 2.4 } },
        { three: { frequency: 1, usage: 2.4 } }
    ]);

    expect(wordTable.wordList).toEqual([
        'Hello',    'World',     'This', 'is',
        'some',     'example',   'text', 'that',
        'repeats',  'the',       'word', 'test',
        'Usually',  'a',         'test', 'covers',
        'multiple', 'topics',    'but',  'the',
        'real',     'test',      'is',   'to',
        'learn',    'something', 'by',   'the',
        'end',      'of',        'a',    'test',
        'A',        'test',      'is',   'taking',
        'place',    'test',      'one',  'two',
        'three',    'test'
      ]);

    expect(wordTable.uniqueWordList).toEqual([
        'Hello',     'World',  'This',
        'is',        'some',   'example',
        'text',      'that',   'repeats',
        'the',       'word',   'test',
        'Usually',   'a',      'covers',
        'multiple',  'topics', 'but',
        'real',      'to',     'learn',
        'something', 'by',     'end',
        'of',        'A',      'taking',
        'place',     'one',    'two',
        'three'
    ]);

    expect(wordTable.sortedUniqueWordList).toEqual([
        'a',       'A',        'but',
        'by',      'covers',   'end',
        'example', 'Hello',    'is',
        'learn',   'multiple', 'of',
        'one',     'place',    'real',
        'repeats', 'some',     'something',
        'taking',  'test',     'text',
        'that',    'the',      'This',
        'three',   'to',       'topics',
        'two',     'Usually',  'word',
        'World'
    ]);

    expect(wordTable.printFrequencies()).toBe(`Hello: { frequency: 1, usage: 2.4 }
World: { frequency: 1, usage: 2.4 }
This: { frequency: 1, usage: 2.4 }
is: { frequency: 3, usage: 7.1 }
some: { frequency: 1, usage: 2.4 }
example: { frequency: 1, usage: 2.4 }
text: { frequency: 1, usage: 2.4 }
that: { frequency: 1, usage: 2.4 }
repeats: { frequency: 1, usage: 2.4 }
the: { frequency: 3, usage: 7.1 }
word: { frequency: 1, usage: 2.4 }
test: { frequency: 7, usage: 16.7 }
Usually: { frequency: 1, usage: 2.4 }
a: { frequency: 2, usage: 4.8 }
covers: { frequency: 1, usage: 2.4 }
multiple: { frequency: 1, usage: 2.4 }
topics: { frequency: 1, usage: 2.4 }
but: { frequency: 1, usage: 2.4 }
real: { frequency: 1, usage: 2.4 }
to: { frequency: 1, usage: 2.4 }
learn: { frequency: 1, usage: 2.4 }
something: { frequency: 1, usage: 2.4 }
by: { frequency: 1, usage: 2.4 }
end: { frequency: 1, usage: 2.4 }
of: { frequency: 1, usage: 2.4 }
A: { frequency: 1, usage: 2.4 }
taking: { frequency: 1, usage: 2.4 }
place: { frequency: 1, usage: 2.4 }
one: { frequency: 1, usage: 2.4 }
two: { frequency: 1, usage: 2.4 }
three: { frequency: 1, usage: 2.4 }`
    );
});

test("Scan a local files content and build frequency tables", async () => {
    const wordTable = await countWordsInFile("words.md");

    expect(wordTable.wordCount).toBe(79);
    expect(wordTable.uniqueWordCount).toBe(51);
    expect(wordTable.getNthWord(4)).toEqual({ some: { frequency: 1, usage: 1.3 } });
    expect(wordTable.frequencies).toEqual({
        Hello: { frequency: 2, usage: 2.5 },
        World: { frequency: 2, usage: 2.5 },
        This: { frequency: 1, usage: 1.3 },
        is: { frequency: 1, usage: 1.3 },
        some: { frequency: 1, usage: 1.3 },
        test: { frequency: 8, usage: 10.1 },
        text: { frequency: 2, usage: 2.5 },
        to: { frequency: 5, usage: 6.3 },
        outline: { frequency: 1, usage: 1.3 },
        the: { frequency: 4, usage: 5.1 },
        capabilities: { frequency: 1, usage: 1.3 },
        of: { frequency: 3, usage: 3.8 },
        counting: { frequency: 1, usage: 1.3 },
        frequency: { frequency: 1, usage: 1.3 },
        each: { frequency: 2, usage: 2.5 },
        word: { frequency: 2, usage: 2.5 },
        in: { frequency: 2, usage: 2.5 },
        a: { frequency: 4, usage: 5.1 },
        given: { frequency: 1, usage: 1.3 },
        document: { frequency: 1, usage: 1.3 },
        I: { frequency: 1, usage: 1.3 },
        am: { frequency: 1, usage: 1.3 },
        going: { frequency: 1, usage: 1.3 },
        repeat: { frequency: 1, usage: 1.3 },
        bunch: { frequency: 1, usage: 1.3 },
        times: { frequency: 1, usage: 1.3 },
        show: { frequency: 1, usage: 1.3 },
        how: { frequency: 1, usage: 1.3 },
        this: { frequency: 1, usage: 1.3 },
        utility: { frequency: 1, usage: 1.3 },
        will: { frequency: 1, usage: 1.3 },
        count: { frequency: 1, usage: 1.3 },
        doc: { frequency: 1, usage: 1.3 },
        Test: { frequency: 1, usage: 1.3 },
        Well: { frequency: 1, usage: 1.3 },
        "It's": { frequency: 2, usage: 2.5 },
        nice: { frequency: 1, usage: 1.3 },
        meet: { frequency: 2, usage: 2.5 },
        you: { frequency: 2, usage: 2.5 },
        again: { frequency: 1, usage: 1.3 },
        pleasure: { frequency: 1, usage: 1.3 },
        Let: { frequency: 1, usage: 1.3 },
        us: { frequency: 1, usage: 1.3 },
        continue: { frequency: 1, usage: 1.3 },
        discussing: { frequency: 1, usage: 1.3 },
        and: { frequency: 1, usage: 1.3 },
        find: { frequency: 1, usage: 1.3 },
        exactly: { frequency: 1, usage: 1.3 },
        can: { frequency: 1, usage: 1.3 },
        be: { frequency: 1, usage: 1.3 },
        improved: { frequency: 1, usage: 1.3 }
      }
    );

    expect(wordTable.sortedFrequencyList).toEqual([
        { test: { frequency: 8, usage: 10.1 } },
        { to: { frequency: 5, usage: 6.3 } },
        { the: { frequency: 4, usage: 5.1 } },
        { a: { frequency: 4, usage: 5.1 } },
        { of: { frequency: 3, usage: 3.8 } },
        { Hello: { frequency: 2, usage: 2.5 } },
        { World: { frequency: 2, usage: 2.5 } },
        { text: { frequency: 2, usage: 2.5 } },
        { each: { frequency: 2, usage: 2.5 } },
        { word: { frequency: 2, usage: 2.5 } },
        { in: { frequency: 2, usage: 2.5 } },
        { "It's": { frequency: 2, usage: 2.5 } },
        { meet: { frequency: 2, usage: 2.5 } },
        { you: { frequency: 2, usage: 2.5 } },
        { This: { frequency: 1, usage: 1.3 } },
        { is: { frequency: 1, usage: 1.3 } },
        { some: { frequency: 1, usage: 1.3 } },
        { outline: { frequency: 1, usage: 1.3 } },
        { capabilities: { frequency: 1, usage: 1.3 } },
        { counting: { frequency: 1, usage: 1.3 } },
        { frequency: { frequency: 1, usage: 1.3 } },
        { given: { frequency: 1, usage: 1.3 } },
        { document: { frequency: 1, usage: 1.3 } },
        { I: { frequency: 1, usage: 1.3 } },
        { am: { frequency: 1, usage: 1.3 } },
        { going: { frequency: 1, usage: 1.3 } },
        { repeat: { frequency: 1, usage: 1.3 } },
        { bunch: { frequency: 1, usage: 1.3 } },
        { times: { frequency: 1, usage: 1.3 } },
        { show: { frequency: 1, usage: 1.3 } },
        { how: { frequency: 1, usage: 1.3 } },
        { this: { frequency: 1, usage: 1.3 } },
        { utility: { frequency: 1, usage: 1.3 } },
        { will: { frequency: 1, usage: 1.3 } },
        { count: { frequency: 1, usage: 1.3 } },
        { doc: { frequency: 1, usage: 1.3 } },
        { Test: { frequency: 1, usage: 1.3 } },
        { Well: { frequency: 1, usage: 1.3 } },
        { nice: { frequency: 1, usage: 1.3 } },
        { again: { frequency: 1, usage: 1.3 } },
        { pleasure: { frequency: 1, usage: 1.3 } },
        { Let: { frequency: 1, usage: 1.3 } },
        { us: { frequency: 1, usage: 1.3 } },
        { continue: { frequency: 1, usage: 1.3 } },
        { discussing: { frequency: 1, usage: 1.3 } },
        { and: { frequency: 1, usage: 1.3 } },
        { find: { frequency: 1, usage: 1.3 } },
        { exactly: { frequency: 1, usage: 1.3 } },
        { can: { frequency: 1, usage: 1.3 } },
        { be: { frequency: 1, usage: 1.3 } },
        { improved: { frequency: 1, usage: 1.3 } }
      ]
    );

    expect(wordTable.wordList).toEqual([
        'Hello',      'World',    'This',         'is',
        'some',       'test',     'text',         'to',
        'outline',    'the',      'capabilities', 'of',
        'counting',   'the',      'frequency',    'of',
        'each',       'word',     'in',           'a',
        'given',      'text',     'document',     'I',
        'am',         'going',    'to',           'repeat',
        'test',       'a',        'bunch',        'of',
        'times',      'to',       'show',         'how',
        'this',       'utility',  'will',         'count',
        'each',       'word',     'in',           'a',
        'doc',        'Test',     'test',         'test',
        'Well',       'Hello',    'World',        "It's",
        'nice',       'to',       'meet',         'you',
        'again',      'test',     'test',         "It's",
        'a',          'pleasure', 'to',           'meet',
        'you',        'Let',      'us',           'continue',
        'discussing', 'the',      'test',         'and',
        'find',       'exactly',  'the',          'test',
        'can',        'be',       'improved'
    ]);

    expect(wordTable.uniqueWordList).toEqual([
        'Hello',      'World',     'This',         'is',
        'some',       'test',      'text',         'to',
        'outline',    'the',       'capabilities', 'of',
        'counting',   'frequency', 'each',         'word',
        'in',         'a',         'given',        'document',
        'I',          'am',        'going',        'repeat',
        'bunch',      'times',     'show',         'how',
        'this',       'utility',   'will',         'count',
        'doc',        'Test',      'Well',         "It's",
        'nice',       'meet',      'you',          'again',
        'pleasure',   'Let',       'us',           'continue',
        'discussing', 'and',       'find',         'exactly',
        'can',        'be',        'improved'
    ]);

    expect(wordTable.sortedUniqueWordList).toEqual([
        'a',        'again',     'am',       'and',
        'be',       'bunch',     'can',      'capabilities',
        'continue', 'count',     'counting', 'discussing',
        'doc',      'document',  'each',     'exactly',
        'find',     'frequency', 'given',    'going',
        'Hello',    'how',       'I',        'improved',
        'in',       'is',        "It's",     'Let',
        'meet',     'nice',      'of',       'outline',
        'pleasure', 'repeat',    'show',     'some',
        'test',     'Test',      'text',     'the',
        'this',     'This',      'times',    'to',
        'us',       'utility',   'Well',     'will',
        'word',     'World',     'you'
    ]);

    expect(wordTable.printFrequencies()).toEqual(`Hello: { frequency: 2, usage: 2.5 }
World: { frequency: 2, usage: 2.5 }
This: { frequency: 1, usage: 1.3 }
is: { frequency: 1, usage: 1.3 }
some: { frequency: 1, usage: 1.3 }
test: { frequency: 8, usage: 10.1 }
text: { frequency: 2, usage: 2.5 }
to: { frequency: 5, usage: 6.3 }
outline: { frequency: 1, usage: 1.3 }
the: { frequency: 4, usage: 5.1 }
capabilities: { frequency: 1, usage: 1.3 }
of: { frequency: 3, usage: 3.8 }
counting: { frequency: 1, usage: 1.3 }
frequency: { frequency: 1, usage: 1.3 }
each: { frequency: 2, usage: 2.5 }
word: { frequency: 2, usage: 2.5 }
in: { frequency: 2, usage: 2.5 }
a: { frequency: 4, usage: 5.1 }
given: { frequency: 1, usage: 1.3 }
document: { frequency: 1, usage: 1.3 }
I: { frequency: 1, usage: 1.3 }
am: { frequency: 1, usage: 1.3 }
going: { frequency: 1, usage: 1.3 }
repeat: { frequency: 1, usage: 1.3 }
bunch: { frequency: 1, usage: 1.3 }
times: { frequency: 1, usage: 1.3 }
show: { frequency: 1, usage: 1.3 }
how: { frequency: 1, usage: 1.3 }
this: { frequency: 1, usage: 1.3 }
utility: { frequency: 1, usage: 1.3 }
will: { frequency: 1, usage: 1.3 }
count: { frequency: 1, usage: 1.3 }
doc: { frequency: 1, usage: 1.3 }
Test: { frequency: 1, usage: 1.3 }
Well: { frequency: 1, usage: 1.3 }
It's: { frequency: 2, usage: 2.5 }
nice: { frequency: 1, usage: 1.3 }
meet: { frequency: 2, usage: 2.5 }
you: { frequency: 2, usage: 2.5 }
again: { frequency: 1, usage: 1.3 }
pleasure: { frequency: 1, usage: 1.3 }
Let: { frequency: 1, usage: 1.3 }
us: { frequency: 1, usage: 1.3 }
continue: { frequency: 1, usage: 1.3 }
discussing: { frequency: 1, usage: 1.3 }
and: { frequency: 1, usage: 1.3 }
find: { frequency: 1, usage: 1.3 }
exactly: { frequency: 1, usage: 1.3 }
can: { frequency: 1, usage: 1.3 }
be: { frequency: 1, usage: 1.3 }
improved: { frequency: 1, usage: 1.3 }`
    );
});