Srt.js
======

A small parser for SubRip(.srt) subtitle file in JavaScript

[Online demo][1]

## Installation

`npm install srtjs --save`

## Usage

**Node.js**

```
var Srt = require('srtjs'),
	fs = require('fs');
	
var srtText = fs.readFileSync('./test/test.srt', {
    encoding: 'utf-8'
});
	
var srt = new Srt(srtText);
```

**Browserify**

```
var Srt = require('./src/srt.js');
var srt = new Srt(yourSrtText);
```


Lines:

```
// get the number of entries
console.log(srt.lines.length); // 723

// get the 5th line
console.log(srt.lines[4].subtitle); // Come on, let's go!

// get the index of the entry
console.log(srt.lines[4].counter); // 5

// get the start time of the 5th entry
console.log(srt.lines[5].start.text); // 00:01:42,500

// each entry also has a start and end date object
console.log(srt.lines[5].start.time);

// you can get hours, minutes, seconds, and milliseconds as well
console.log(srt.lines[5].start.hours);
```

Shift:

```
// move all subs 5 seconds later
srt.shift(5, seconds);

// move all subs 2 seconds earlier
srt.shift(-2, seconds);
```

Get subtitle text:

```
console.log(srt.getSrtContent());
```

## Tests

`npm test`

## License

Srt.js is available under the [MIT License][2].

[1]: http://fuermosi777.github.io/srtjs/
[2]: http://opensource.org/licenses/MIT