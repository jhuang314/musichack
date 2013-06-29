
var canvas = document.getElementById("sheet");
var renderer = new Vex.Flow.Renderer(canvas,
		Vex.Flow.Renderer.Backends.CANVAS);

var ctx = renderer.getContext();
var notes = [];


var stave = new Vex.Flow.Stave(50, 0, 980);
stave.addClef("treble").setContext(ctx);
//stave.addClef("treble").setContext(ctx).draw();


function updateScore(key) {

	console.log(key);
	stave = new Vex.Flow.Stave(0, 150, 1180);

	// Create the notes
	if (key[1]=="#") {
		notes.push(new Vex.Flow.StaveNote({ keys: [key], duration: "q" }).addAccidental(0, new Vex.Flow.Accidental("#")));
	}
	else {
		notes.push(new Vex.Flow.StaveNote({ keys: [key], duration: "q" }));
	}
	console.log(notes);
	//		var notes = [
	//		// A quarter-note C.
	//		new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
	//
	//		// A quarter-note D.
	//		new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
	//
	//
	//			];

	// Create a voice in 4/4
	var voice = new Vex.Flow.Voice({
num_beats: notes.length,
beat_value: 4,
resolution: Vex.Flow.RESOLUTION
});

// Add notes to voice
voice.addTickables(notes);

// Format and justify the notes to 500 pixels
var formatter = new Vex.Flow.Formatter().
joinVoices([voice]).format([voice], 980);

ctx.clearRect(0,0,canvas.width, canvas.height);
stave.addClef("treble").setContext(ctx).draw();
// Render voice
voice.draw(ctx, stave);

}


