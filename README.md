#Srt.js

#Usage

Browserify/Webpack

```
var Srt = require('./srt.js');
var srt = new Srt(yourSrtText);
```

Shift:

```
// move all subs 5 seconds later
srt.shift(5, seconds);

// move all subs 2 seconds earlier
srt.shift(-2, seconds);
```

#Note

Still in developing