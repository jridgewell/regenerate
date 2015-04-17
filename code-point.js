function CodePoint(data) {
    if (!(this instanceof CodePoint)) {
        return new CodePoint();
    }
    this.data = data || [];
}

CodePoint.prototype.add = function() {
    var cp = this;
    for (var i = 0; i < arguments.length; i++) {
        var c = arguments[i];
        cp = cp.addRange(c, c);
    }
    return cp;
};

CodePoint.prototype.addRange = function(start, end) {
    start = parseInt(start, 16) - 1;
    end = parseInt(end, 16);
    var data = this.data.slice();
    while (++start <= end) {
        if (data.indexOf(start) === -1) data.push(start);
    }
    return new CodePoint(data);
};

CodePoint.prototype.remove = function() {
    var cp = this;
    for (var i = 0; i < arguments.length; i++) {
        var c = arguments[i];
        cp = cp.removeRange(c, c);
    }
    return cp;
};

CodePoint.prototype.removeRange = function(start, end) {
    start = parseInt(start, 16) - 1;
    end = parseInt(end, 16);
    var data = this.data.slice();

    while (++start <= end) {
        var index = data.indexOf(start);
        if (index > -1) data.splice(index, 1);
    }
    return new CodePoint(data);
};

CodePoint.prototype.toString = function() {
    var data = this.data;
    data.sort(function(a, b) { return a - b; });

    var combined = [], start, end;
    for (var i = 0; i < data.length; i++) {
        start = end = data[i];
        while (i < data.length && data[++i] == end + 1) {
            end = data[i];
        }
        --i;
        if (end == start) {
            combined.push(upperAndLowerRange(start));
        } else {
            combined.push(upperAndLowerRange(start, end));
        }
    }

    if (combined.length > 1 | combined[0].length > 1) {
        combined.unshift('[');
        combined.push(']');
    }
    return combined.join('');
};

function upperAndLowerRange(start, end) {
    if (start < 10 && end >= 10) {
        return upperAndLowerRange(start, 9) + upperAndLowerRange(10, end);
    } else {
        var starth = start.toString(16);
        var endh = end == null ? starth : end.toString(16);
        var combined = starth;
        if (starth != endh) {
            if (start + 2 < end) combined += '-';
            else if (start + 1 < end) combined += (start + 1).toString(16);
            combined += endh;
        }
        return /[a-f]/.test(combined) ? combined + combined.toUpperCase() : combined;
    }
}

module.exports = CodePoint;
