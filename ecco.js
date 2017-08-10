var canvas = document.getElementById('eccoCanvas');
ctx = canvas.getContext('2d');

var max_rows = 18;
var x_margin = 16;
var y_margin = 26;

var img = document.getElementById('eccoBkg');
var text = document.getElementById('eccoText');

text.addEventListener('keydown', drawEcco);
text.addEventListener('keyup', drawEcco);
text.addEventListener('change', drawEcco);

img.onload = function() {
	drawEcco();
}

function drawEcco() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	var text = document.getElementById('eccoText').value;
	text = text.toUpperCase();
	var lines = setLines(ctx, text, max_rows, x_margin, y_margin);

	var row_num = 0;
	var y_pos = 132 - (lines.length * Math.floor(y_margin / 2));
	for (var row of lines){
		var x_pos = 152 - (row.length * Math.floor(x_margin / 2));
		for (var letter of row){
			if (letter == " "){
				x_pos += x_margin;
			} else {
				if (letter == "."){
					letter = 'dot';
				} else if (letter == ':') {
					letter = 'colon';
				} else if (letter == '?') {
					letter = 'question';
				}
				var latest_letter = new Image();
				latest_letter.src = './EccoFont/' + letter + '.png';
				ctx.drawImage(latest_letter, x_pos, y_pos, latest_letter.width, latest_letter.height);
				x_pos += latest_letter.width + 2;
			}
		}
		row_num++;
		y_pos += y_margin;
	}
}

function setLines(context, text, maxWidth, xMargin, yMargin) {
	var words = text.split(" ");
	var new_rows = [];
	var new_line = words[0];
	if (words.length == 1){
		new_rows.push(new_line);
	} else {
		for (var i = 1; i < words.length; i++){
			if (new_line.length + words[i].length < maxWidth){
				new_line += " " + words[i];
			} else {
				new_rows.push(new_line);
				new_line = words[i];
			}

			if (i == (words.length - 1)){
				new_rows.push(new_line);
			}
		}
	}
	return new_rows;
}