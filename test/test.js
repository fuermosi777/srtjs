var should = require('chai').should(),
    Srt = require('../src/srt'),
    fs = require('fs');

var srtText = fs.readFileSync('./test/test.srt', {
    encoding: 'utf-8'
});

describe('Srt.js', function() {
    var srt, srtShifted;

    it('Srt should init without crashes', function() {
        srt = new Srt(srtText);
        srtShifted = new Srt(srtText);
    });

    it('Srt.lines should be an array', function() {
        srt.lines.should.be.an.instanceOf(Array);
    });

    it('lines should have valid objects', function() {
        var i;
        for (i = 0; i < srt.lines.length; i++) {
            var line = srt.lines[i];
            line.should.have.property('counter');
            line.should.have.property('subtitle');
            line.should.have.property('start');
            line.should.have.property('end');
        }
    });

    it('line.start and .end should be an object with valid values', function() {
    	// only test start
        var i;
        for (i = 0; i < srt.lines.length; i++) {
            var start = srt.lines[i].start;
            start.should.be.an.instanceOf(Object);

            start.text.should.be.a('string');
            start.time.should.be.a('date');
            start.hours.should.be.a('number');
            start.minutes.should.be.a('number');
            start.seconds.should.be.a('number');
            start.milliseconds.should.be.a('number');
        }
    });

    it('.shift() should work', function() {
    	srtShifted.shift(4, 'seconds');
    });

    it('shifted srt should be 4 seconds later', function() {
    	var diff = srtShifted.lines[0].start.time.getTime() - srt.lines[0].start.time.getTime();
    	parseInt(diff).should.equal(4000);
    });

    it('.getSrtContent() should return a srt formatted file', function() {
    	srt.getSrtContent().should.be.a('string');
    });
});
