var env;

var reg = new RegExp(/(\w+\.\w+:\d+\:\d+)/);

function spaces(n) {
    if (n<1) return '';
    var s = '';
    while (n--) {
        s += ' ';
    }
    return s;
}

function pad(str, length) {
    return str + spaces(length - str.length);
}

function log() {
    var stack;

    try {
        // Use the error method to get the stack trace
        throw new Error();
    } catch (e) {
        // The second line is this function; the third is the calling function
        // Get that and pull out the calling function's name and path
        var line = e.stack.split('\n')[2].match(/\s+at\s+(.+)/)[1].split(' ');

        var fnName   = line[1] ? line[0] : '<anonymous>';
        var fileName = line[1] ? line[1].match(reg)[1] : line[0].match(reg)[1];

        // Add spaces to the end of each, to simulate table structure
        stack = pad(fnName, 25) + pad(fileName, 20);
    }

    // We're going to apply console.log, so we need to insert the stack into the arguments
    var args = Array.prototype.slice.call(arguments);
    args.unshift(stack);

    console.log.apply(console, args);
}

log.error = function error() {
    var stack;

    try {
        // Use the error method to get the stack trace
        throw new Error();
    } catch (e) {
        // The second line is this function; the third is the calling function
        // Get that and pull out the calling function's name and path
        var line = e.stack.split('\n')[3].match(/\s+at\s+(.+)/)[1].split(' ');

        var fnName   = line[1] ? line[0] : '<anonymous>';
        var fileName = line[1] ? line[1].match(reg)[1] : line[0].match(reg)[1];

        // Add spaces to the end of each, to simulate table structure
        stack = pad(fnName, 25) + pad(fileName, 20);
    }

    // We're going to apply console.log, so we need to insert the stack into the arguments
    var args = Array.prototype.slice.call(arguments);
    args.unshift(stack);

    console.log.apply(console, args);
};

module.exports = log;