// $(document).ready(function() {
// 	var $input = $("#eccoEnter");
// 	$input.on('change', function() {
// 		var input = this.value;
// 		alert(input);
// 	}).change();
// });


var canvas = document.getElementById('eccoCanvas');
ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 240;

//  Grab the nodes
var img = document.getElementById('eccoBkg');
var text = document.getElementById('eccoText');

// When the image has loaded...
img.onload = function() {
	drawEcco();
}  

eccoText.addEventListener('keydown', drawEcco);
eccoText.addEventListener('keyup', drawEcco);
eccoText.addEventListener('change', drawEcco);

function drawEcco() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	var text = document.getElementById('eccoText').value;
	text = text.toUpperCase();
	x = memeSize / 2;
	y = 0;

	// wrapText(ctx, text1, x, y, 300, 28, false);

	// ctx.textBaseline = 'bottom';
	// var text2 = document.getElementById('bottom-text').value;
	// text2 = text2.toUpperCase();
	// y = memeSize;

	// wrapText(ctx, text2, x, y, 300, 28, true);

}

function setLines(context, text, maxWidth, xMargin, yMargin) {
	var words = text.split(" ");
	var new_rows = [];
	var new_line = words[0];
	if (words.length == 1){
		
	}

	// The Python method:
	// max_row_len = 18
 //    x_margin = 16
 //    y_margin = 26
 //    words = sentence.split(" ")
 //    new_rows = []
 //    new_line = words[0]
 //    if len(words) == 1:
 //        new_rows.append(new_line)
 //    else:
 //        for i in range(1,len(words)):
 //            if len(new_line) + len(words[i]) < max_row_len:
 //                new_line += " " + words[i]
 //            else:
 //                new_rows.append(new_line)
 //                new_line = words[i]

 //            if i == (len(words) - 1):
 //                new_rows.append(new_line)
}

function wrapText(context, text, x, y, maxWidth, lineHeight, fromBottom) {
	var pushMethod = (fromBottom)?'unshift':'push';
	lineHeight = (fromBottom)?-lineHeight:lineHeight;
	var lines = [];
	var y = y;
	var line = '';
	var words = text.split(' ');
	for (var n = 0; n < words.length; n++) {
	  var testLine = line + ' ' + words[n];
	  var metrics = context.measureText(testLine);
	  var testWidth = metrics.width;
	  if (testWidth > maxWidth) {
	    lines[pushMethod](line);
	    line = words[n] + ' ';
	  } else {
	    line = testLine;
	  }
	}
	lines[pushMethod](line);
	for (var k in lines) {
	  context.strokeText(lines[k], x, y + lineHeight * k);
	  context.fillText(lines[k], x, y + lineHeight * k);
	}
}

