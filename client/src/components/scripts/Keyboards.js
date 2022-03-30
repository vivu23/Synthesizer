// Tone.Synth is a basic synthesizer with a single oscillator
// sine tone set by default
let wavePicker = document.querySelector("select[name='waveform']");
let type = wavePicker.options[wavePicker.selectedIndex].value;
synth.oscillator.type = type;

// connect it to the master output (your speakers)
synth.toMaster();

const piano = document.getElementById("piano");

piano.addEventListener("mousedown", e => {
  // change waveform when you click on the piano
  let wavePicker = document.querySelector("select[name='waveform']");
  let type = wavePicker.options[wavePicker.selectedIndex].value;
  synth.oscillator.type = type;
  // fires off a note continously until trigger is released
  synth.triggerAttack(e.target.dataset.note);
});

piano.addEventListener("mouseup", e => {
  // stops the trigger
  synth.triggerRelease();
});

// handles keyboard events
document.addEventListener("keydown", e => {

  // change waveform when you press on keyboard
  let wavePicker = document.querySelector("select[name='waveform']");
  let type = wavePicker.options[wavePicker.selectedIndex].value;
  synth.oscillator.type = type;

  // e object has the key property to tell which key was pressed
  switch (e.key) {
      // LEFT ROW
      case "z":
        return synth.triggerAttack("C3", now);
      case "s":
        return synth.triggerAttack("C#3", now);
      case "x":
        return synth.triggerAttack("D3", now);
      case "d":
        return synth.triggerAttack("D#3", now);
      case "c":
        return synth.triggerAttack("E3", now);
      case "v":
        return synth.triggerAttack("F3", now);
      case "g":
        return synth.triggerAttack("F#3", now);
      case "b":
        return synth.triggerAttack("G3", now);
      case "h":
        return synth.triggerAttack("G#3", now);
      case "n":
        return synth.triggerAttack("A3", now);
      case "j":
        return synth.triggerAttack("A#3", now);
      case "m":
        return synth.triggerAttack("B3", now);

    // RIGHT ROW
    case "q":
      return synth.triggerAttack("C4", now);
    case "2":
      return synth.triggerAttack("C#4", now);
    case "w":
      return synth.triggerAttack("D4", now);
    case "3":
      return synth.triggerAttack("D#4", now);
    case "e":
      return synth.triggerAttack("E4", now);
    case "r":
      return synth.triggerAttack("F4", now);
    case "5":
      return synth.triggerAttack("F#4", now);
    case "t":
      return synth.triggerAttack("G4", now);
    case "6":
      return synth.triggerAttack("G#4", now);
    case "y":
      return synth.triggerAttack("A4", now);
    case "7":
      return synth.triggerAttack("A#4", now);
    case "u":
      return synth.triggerAttack("B4", now);
    default:
      return;
  }
});
// when the key is released, audio is released as well
document.addEventListener("keyup", e => {
  switch (e.key) {

    // LEFT ROW
    case "z":
    case "s":
    case "x":
    case "d":
    case "c":
    case "v":
    case "g":
    case "b":
    case "h":
    case "n":
    case "j":
    case "m":

    /// RIGHT ROW
    case "q":
    case "2":
    case "w":
    case "3":
    case "e":
    case "r":
    case "5":
    case "t":
    case "6":
    case "y":
    case "7":
    case "u":
       synth.triggerRelease();
  }
});
