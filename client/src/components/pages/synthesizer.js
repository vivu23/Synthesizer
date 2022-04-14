import React, { Component} from "react";
import "../css/Main.css";
import Background from "../resources/cityscape_fin.png";
import * as Tone from "tone";

class Synthesizer extends Component {
  constructor(){
    super();
    this.wavefrom = "sine";
 }

 async handleKeyDown(e){
   console.log(e.key);
   this.chooseKey(e.key.toUpperCase());

 }
  async handleSelect(e) {
    console.log(e.target.value);
    this.wavefrom = e.target.value;
  }
  async handleKey(e) {
    var key = "";
    if (e.currentTarget.className === "black-key") {
      e.stopPropagation();
      console.log("Clicked " + e.currentTarget.textContent);
      key = e.currentTarget.textContent;
    } else {
      console.log(
        "Clicked " +
          e.currentTarget.textContent[e.currentTarget.textContent.length - 1]
      );
      key = e.currentTarget.textContent[e.currentTarget.textContent.length - 1];
    }
    this.chooseKey(key);
  }

  chooseKey(key){

    // VOLUME
    var volSliderValue = document.getElementById("volumeValue").value
    const vol = new Tone.Volume(volSliderValue).toDestination();
    if(volSliderValue < -30)
        vol.mute = true;


    // REVERB EFFECT
    var reverbSliderValue = document.getElementById("reverbValue").value
    reverbSliderValue = reverbSliderValue/100;
    const reverb = new Tone.JCReverb(reverbSliderValue).toDestination();


    // DELAY EFFECT
    var delaySliderValue = document.getElementById("delayValue").value
    delaySliderValue = delaySliderValue/100;
    var delayTime;
    if(delaySliderValue === 0)
    {
        delayTime = "0";
    }
    else {
        delayTime = "8n";
    }
    const feedbackDelay = new Tone.FeedbackDelay(delayTime, delaySliderValue).toDestination();


    // CREATE SYNTH AND APPLY EFFECTS
    const synth = new Tone.Synth();
    synth.autostart = true;
    if(reverbSliderValue === 0)
        synth.chain(vol, feedbackDelay);
    else {
        synth.chain(vol, reverb, feedbackDelay);
    }

    // APPLY WAVE TYPE
    const now = Tone.now();
    let type = this.wavefrom;
    synth.oscillator.type = type;


    //RECORDING STUFF
    const audio = document.querySelector('audio');
    const actx = Tone.context;
    const dest = actx.createMediaStreamDestination();
    const recorder = new MediaRecorder(dest.stream);
    //recorder.start();
    synth.connect(dest);
    //synth.toDestination();

    // STORE AUDIO DATA STREAM
    const chunks = [];

    recorder.start();
    // var startedRecording = document.getElementById("start_recording");
    // startedRecording.onclick = function(){
    //     console.log("recording started");
    //     recorder.start();
    // }
    var stoppedRecording = document.getElementById("stop_recording");
    stoppedRecording.onclick = function(){
        console.log("recording stopped");
        recorder.stop();
    }

    recorder.ondataavailable = evt => chunks.push(evt.data);
    recorder.onstop = evt => {
        let blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
        audio.src = URL.createObjectURL(blob);
    };

    switch (key) {
      // LEFT ROW
      case "Z":
        synth.triggerAttackRelease("C3", "8n", now);
        break;
      case "S":
        synth.triggerAttackRelease("C#3", "8n", now);
        break;
      case "X":
        synth.triggerAttackRelease("D3", "8n", now);
        break;
      case "D":
        synth.triggerAttackRelease("D#3", "8n", now);
        break;
      case "C":
        synth.triggerAttackRelease("E3", "8n", now);
        break;
      case "V":
        synth.triggerAttackRelease("F3", "8n", now);
        break;
      case "G":
        synth.triggerAttackRelease("F#3", "8n", now);
        break;
      case "B":
        synth.triggerAttackRelease("G3", "8n", now);
        break;
      case "H":
        synth.triggerAttackRelease("G#3", "8n", now);
        break;
      case "N":
        synth.triggerAttackRelease("A3", "8n", now);
        break;
      case "J":
        synth.triggerAttackRelease("A#3", "8n", now);
        break;
      case "M":
        synth.triggerAttackRelease("B3", "8n", now);
        break;
      // RIGHT ROW
      case "Q":
        synth.triggerAttackRelease("C4", '0.05', now);
        break;
      case "2":
        synth.triggerAttackRelease("C#4", "8n", now);
        break;
      case "W":
        synth.triggerAttackRelease("D4", "8n", now);
        break;
      case "3":
        synth.triggerAttackRelease("D#4", "8n", now);
        break;
      case "E":
        synth.triggerAttackRelease("E4", "8n", now);
        break;
      case "R":
        synth.triggerAttackRelease("F4", "8n", now);
        break;
      case "5":
        synth.triggerAttackRelease("F#4", "8n", now);
        break;
      case "T":
        synth.triggerAttackRelease("G4", "8n", now);
        break;
      case "6":
        synth.triggerAttackRelease("G#4", "8n", now);
        break;
      case "Y":
        synth.triggerAttackRelease("A4", "8n", now);
        break;
      case "7":
        synth.triggerAttackRelease("A#4", "8n", now);
        break;
      case "U":
        synth.triggerAttackRelease("B4", "8n", now);
        break;
      default:
        break;
    }

  }

  render() {
    return (
      <>
        <div class="main" onKeyDown={(e) => this.handleKeyDown(e)} tabIndex= "-1">
          <div class="screen">
            <table class="settings_table">
              <td colspan="2" class="synth_sity_image_cell">
                <img
                  class="synth_sity_image"
                  alt=""
                  src={Background}
                  width="600px"
                />
              </td>
              <tr>
                <td colspan="2" class="synth_sity_title">
                  <h1>SynthCityX v1.0</h1>
                </td>
              </tr>
              <tr>
                <td class="setting_cell">
                  <div class="center">
                    <span>WAVEFORM</span>
                    <br />
                    <select
                      name="waveform"
                      id="waveform_forum"
                      onChange={(e) => this.handleSelect(e)}
                    >
                      <option value="sine">SINE</option>
                      <option value="square">SQUARE</option>
                      <option value="sawtooth">SAWTOOTH</option>
                      <option value="triangle">TRIANGLE</option>
                    </select>
                  </div>
                </td>


                <td class="setting_cell">
                  <div class="settingsBar">
                    <div class="center">
                    <span>VOLUME</span>
                    <br />
                        <div class="volume_controller">
                            <input type="range" min="-30" max="-10" class="slider" id="volumeValue"/>
                        </div>
                    </div>
                  </div>
                </td>

              </tr>

              <tr>

              <td class="setting_cell">
                <div class="settingsBar">
                  <div class="center">
                  <span>DELAY</span>
                  <br />
                      <div>
                          <input type="range" min="0" max="70" class="slider" id="delayValue"/>
                      </div>
                  </div>
                </div>
              </td>

              <td class="setting_cell">
                <div class="settingsBar">
                  <div class="center">
                  <span>REVERB</span>
                  <br />
                      <div>
                          <input type="range" min="0" max="70" class="slider" id="reverbValue"/>
                      </div>
                  </div>
                </div>
              </td>

              </tr>
            </table>

            <div class="keyboard" >
              <ul id="piano" class="piano">
                <li
                  data-note="C3"
                  class="key"
                  onClick={(e) => this.handleKey(e)}
                              >
                  <div
                    data-note="C#3"
                    class="black-key"
                    onClick={(e) => this.handleKey(e)}
                  >
                    S
                  </div>
                  Z
                </li>
                <li
                  data-note="D3"
                  class="key"
                  onClick={(e) => this.handleKey(e)}
                >
                  <div
                    data-note="D#3"
                    class="black-key"
                    onClick={(e) => this.handleKey(e)}
                  >
                    D
                  </div>
                  X
                </li>
                <li
                  data-note="E3"
                  class="key"
                  onClick={(e) => this.handleKey(e)}
                >
                  C
                </li>
                <li
                  data-note="F3"
                  class="key"
                  onClick={(e) => this.handleKey(e)}
                >
                  <div
                    data-note="F#3"
                    class="black-key"
                    onClick={(e) => this.handleKey(e)}
                  >
                    G
                  </div>
                  V
                </li>

                <li
                  data-note="G3"
                  class="key"
                  onClick={(e) => this.handleKey(e)}
                >
                  <div
                    data-note="G#3"
                    class="black-key"
                    onClick={(e) => this.handleKey(e)}
                  >
                    H
                  </div>
                  B
                </li>
                <li
                  data-note="A3"
                  class="key"
                  onClick={(e) => this.handleKey(e)}
                >
                  <div
                    data-note="A#3"
                    class="black-key"
                    onClick={(e) => this.handleKey(e)}
                  >
                    J
                  </div>
                  N
                </li>
                <li
                  data-note="B4"
                  class="key"
                  onClick={(e) => this.handleKey(e)}
                >
                  M
                </li>

                <li
                  data-note="C4"
                  class="key"
                  onClick={(e) => this.handleKey(e)}
                >
                  <div
                    data-note="C#4"
                    class="black-key"
                    onClick={(e) => this.handleKey(e)}
                  >
                    2
                  </div>
                  Q
                </li>
                <li
                  data-note="D4"
                  class="key"
                  onClick={(e) => this.handleKey(e)}
                >
                  <div
                    data-note="D#4"
                    class="black-key"
                    onClick={(e) => this.handleKey(e)}
                  >
                    3
                  </div>
                  W
                </li>
                <li
                  data-note="E4"
                  class="key"
                  onClick={(e) => this.handleKey(e)}
                >
                  E
                </li>
                <li
                  data-note="F4"
                  class="key"
                  onClick={(e) => this.handleKey(e)}
                >
                  <div
                    data-note="F#4"
                    class="black-key"
                    onClick={(e) => this.handleKey(e)}
                  >
                    5
                  </div>
                  R
                </li>
                <li
                  data-note="G4"
                  class="key"
                  onClick={(e) => this.handleKey(e)}
                >
                  <div
                    data-note="G#4"
                    class="black-key"
                    onClick={(e) => this.handleKey(e)}
                  >
                    6
                  </div>
                  T
                </li>
                <li
                  data-note="A4"
                  class="key"
                  onClick={(e) => this.handleKey(e)}
                >
                  <div
                    data-note="A#4"
                    class="black-key"
                    onClick={(e) => this.handleKey(e)}
                  >
                    7
                  </div>
                  Y
                </li>
                <li
                  data-note="B4"
                  class="key"
                  onClick={(e) => this.handleKey(e)}
                >
                  U
                </li>
              </ul>

              <audio controls></audio>
              <button id="start_recording">
              <b>START recording [not working</b>
              </button>

              <button id="stop_recording">
              <b>STOP recording</b>
              </button>

            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Synthesizer;
