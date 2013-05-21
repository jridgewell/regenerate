# Regenerate

[![Dependency status](https://gemnasium.com/mathiasbynens/regenerate.png)](https://gemnasium.com/mathiasbynens/regenerate)

Regenerate is a regular expression generator for JavaScript. Easily generate JavaScript-compatible regular expressions based on a given set of symbols or code points.

Feel free to fork if you see possible improvements!

## Installation and usage

In a browser:

~~~html
<script src="regenerate.js"></script>
~~~

Via [npm](http://npmjs.org/):

~~~bash
npm install regenerate
~~~

In [Narwhal](http://narwhaljs.org/), [Node.js](http://nodejs.org/), and [RingoJS](http://ringojs.org/):

~~~js
var regenerate = require('regenerate');
~~~

In [Rhino](http://www.mozilla.org/rhino/):

~~~js
load('regenerate.js');
~~~

Using an AMD loader like [RequireJS](http://requirejs.org/):

~~~js
require(
  {
    'paths': {
      'regenerate': 'path/to/regenerate'
    }
  },
  ['regenerate'],
  function(regenerate) {
    console.log(regenerate);
  }
);
~~~

Usage example:

~~~js
// Code points used in this example:
// U+1F604 SMILING FACE WITH OPEN MOUTH AND SMILING EYES
// U+1F605 SMILING FACE WITH OPEN MOUTH AND COLD SWEAT
// U+1F606 SMILING FACE WITH OPEN MOUTH AND TIGHTLY-CLOSED EYES
// U+1F607 SMILING FACE WITH HALO

// Create a regular expression that matches any of the given code points:
regenerate.fromCodePoints([0x1F604, 0x1F605, 0x1F606, 0x1F607]);
// → '\\uD83D[\\uDE04-\\uDE07]'

// Create a regular expression that matches any code point in the given range:
regenerate.fromCodePointRange(0x1F604, 0x1F607);
// → '\\uD83D[\\uDE04-\\uDE07]'

// Create a regular expression that matches any BMP code point:
regenerate.fromCodePointRange(0x0000, 0xFFFF);
// → '[\\0-\\uD7FF\\uDC00-\\uFFFF]|[\\uD800-\\uDBFF]'
~~~

## Unit tests & code coverage

After cloning this repository, run `npm install` to install the dependencies needed for Regenerate development and testing. You may want to install Istanbul _globally_ using `npm install istanbul -g`.

Once that’s done, you can run the unit tests in Node using `npm test` or `node tests/tests.js`. To run the tests in Rhino, Ringo, Narwhal, and web browsers as well, use `grunt test`.

To generate [the code coverage report](http://rawgithub.com/mathiasbynens/regenerate/master/coverage/regenerate/regenerate.js.html), use `grunt cover`.

## Author

| [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](http://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](http://mathiasbynens.be/) |

## License

Regenerate is dual licensed under the [MIT](http://mths.be/mit) and [GPL](http://mths.be/gpl) licenses.