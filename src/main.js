'use strict';

var Srt = require('./srt.js');
var $ = require('./jquery-2.1.4.min.js');

$(function() {
    main();
});

function main() {
    dropzone();

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
            if (delta % 1 !== 0) return alert('The shift number must be an integer');
            reader.readAsText(file);
            reader.onload = function(e) {
                processSrt(e, delta, unit);
            }
        } else {
            alert('Please drop a srt file first');
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
    submitBtnWrapper_.innerHTML = '<a id="downloadBtn" class="download" download="new.srt" href="' + "data:text/srt;charset=utf-8," + encodeURIComponent(txt) + '">Download</a>';
    $('a#downloadBtn').on('click', function() {
        location.reload();
    });
}

function dropzone() {
    $('#dropzone').on('dragover', function() {
        $(this).addClass('hover');
    });

    $('#dropzone').on('dragleave', function() {
        $(this).removeClass('hover');
    });

    $('#dropzone input').on('change', function(e) {
        var file = this.files[0];
        $('#dropzone').removeClass('hover');

        if (!file) return;
        // if not srt
        if (file.name.split('.').pop() !== 'srt') {
            return alert('Please upload .srt file(s)');
        }

        $('#dropzone').addClass('dropped');

        // process
        if (file) {
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(e) {
                var srt = new Srt(e.target.result);
            }
            $('#dropzone .content').html('Success!');
        }
    });
}
