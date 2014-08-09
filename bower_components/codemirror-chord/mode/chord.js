(function (mod) {
    'use strict';

    if (typeof exports === 'object' && typeof module === 'object') // CommonJS
        mod(require('../../lib/codemirror'));
    else if (typeof define === 'function' && define.amd) // AMD
        define(['../../lib/codemirror'], mod);
    else // Plain browser env
        mod(CodeMirror);
})(function (CodeMirror) {

    'use strict';

    CodeMirror.defineMode('chord', function () {
        var chord = /([CDEFGAB])(#|##|b|bb)?(maj|min|m|sus)?(\d)?$/g;

        function tokenBase(stream, state) {
            if (stream.eatSpace()) return null;

            stream.next();
            if (stream.peek() == "/") stream.next();
            stream.eatWhile(/([\S])/);

            var cur = stream.current();
            return cur.match(chord) ? 'chord' : null;
        }


        function tokenize(stream, state) {
            return (state.tokens[0] || tokenBase)(stream, state);
        }

        return {
            startState: function () {
                return {
                    tokens: [],
                    inChord: false
                };
            },
            token: function (stream, state) {
                return tokenize(stream, state);
            }
        };
    });

    CodeMirror.defineMIME('text/x-cord', 'chord');

});
