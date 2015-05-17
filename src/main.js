'use strict';

var Srt = require('./srt.js');

main();

function main() {
    var srtForm_ = document.getElementById('srtForm');
    srtForm_.onsubmit = function(e) {
        e.preventDefault();
        var file_ = document.getElementById('srtInput');
        var delta_ = document.getElementById('srtDelta');
        var unit_ = document.getElementById('srtUnit');
        var reader = new FileReader();
        if (file_.files.length) {
            var file = file_.files[0];
            var delta = delta_.value;
            var unit = unit_.value;
            reader.readAsText(file);
            reader.onload = function(e) {
                processSrt(e, delta, unit);
            }
        } else {
            alert('nothing');
        }
    }
}

function processSrt(e, delta, unit) {
    var srtText = e.target.result;
    var srt = new Srt(srtText);
    srt.shift(delta, unit);
    downloadSrt(srt.getSrtContent());
}

function downloadSrt(txt) {
	var submitBtnWrapper_ = document.getElementById('submitBtnWrapper');
	submitBtnWrapper_.innerHTML = '<a class="btn btn-warning" download="new.srt" href="' + "data:text/srt;charset=utf-8," + encodeURIComponent(txt) + '">Download</a>';
}
