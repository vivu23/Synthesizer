import React, { Component} from "react";
import "../css/Main.css";
import Background from "../resources/KV-SYN-logo.png";
import * as Tone from "tone";

class Synthesizer extends Component {

 constructor(){
    super();
    this.state ={
     waveform : "sine",
     octave: 2,
     volume : -20,
     reverb : 0,
     delay : 0,
     recording : [],
     recorder : 0,
     knob1 : 0
    }
 }

 onChange(e){
  this.setState({[e.target.name]: e.target.value});
  console.log(e.target.name);
  console.log(e.target.value);
 };

 async handleKeyDown(e){
  console.log(e.key);
  this.chooseKey(e.key.toUpperCase());

}

 async handleKey(e) {

   var key = "";
   if (e.currentTarget.className === "black-key") {
     e.stopPropagation();
     key = e.currentTarget.textContent;
   } else {
     key = e.currentTarget.textContent[e.currentTarget.textContent.length - 1];
   }
   this.setState({
    recording: [ ...this.state.recording, key]
    });
    this.chooseKey(key);
  }

  chooseKey(key){
    // VOLUME
    const vol = new Tone.Volume(this.state.volume).toDestination();
    if(this.state.volume < -30)
        vol.mute = true;

    // REVERB EFFECT
    const reverb = new Tone.JCReverb(this.state.reverb/100).toDestination();

    // DELAY EFFECT
    var delayTime = "0";
    if(this.state.delay/100 !== 0)
    {
        delayTime = "8n";
    }
    const feedbackDelay = new Tone.FeedbackDelay(delayTime, this.state.reverb/100).toDestination();

    // CREATE SYNTH AND APPLY EFFECTS
    const synth = new Tone.Synth();
    synth.autostart = true;
    if(this.state.reverb/100 === 0)
        synth.chain(vol, feedbackDelay);
    else {
        synth.chain(vol, reverb, feedbackDelay);
    }

    // APPLY WAVE TYPE
    const now = Tone.now();
    let type = this.state.waveform;
    synth.oscillator.type = type;

    // CALL RECORDING FUNCTION ?
    //this.handleRecording(synth);

    // CHANGE OCTAVE
    let octave = [3, 4];
    console.log(`octave=${this.state.octave}`);
    if(this.state.octave == 2)
        console.log("dont do anything");
    if(this.state.octave > 2){
            octave[0] += this.state.octave - 2;
            octave[1] += this.state.octave - 2;
    }
    if(this.state.octave == 1){
            octave[0] = 2;
            octave[1] = 3;
    }
    if(this.state.octave == 0){
            octave[0] = 1;
            octave[1] = 2;
    }

    switch (key) {
      // LEFT ROW
      case "Z":
        synth.triggerAttackRelease(`C${octave[0]}`, "8n", now);
        break;
      case "S":
        synth.triggerAttackRelease(`C#${octave[0]}`, "8n", now);
        break;
      case "X":
        synth.triggerAttackRelease(`D${octave[0]}`, "8n", now);
        break;
      case "D":
        synth.triggerAttackRelease(`D#${octave[0]}`, "8n", now);
        break;
      case "C":
        synth.triggerAttackRelease(`E${octave[0]}`, "8n", now);
        break;
      case "V":
        synth.triggerAttackRelease(`F${octave[0]}`, "8n", now);
        break;
      case "G":
        synth.triggerAttackRelease(`F#${octave[0]}`, "8n", now);
        break;
      case "B":
        synth.triggerAttackRelease(`G${octave[0]}`, "8n", now);
        break;
      case "H":
        synth.triggerAttackRelease(`G#${octave[0]}`, "8n", now);
        break;
      case "N":
        synth.triggerAttackRelease(`A${octave[0]}`, "8n", now);
        break;
      case "J":
        synth.triggerAttackRelease(`A#${octave[0]}`, "8n", now);
        break;
      case "M":
        synth.triggerAttackRelease(`B${octave[0]}`, "8n", now);
        break;
      // RIGHT ROW
      case "Q":
        synth.triggerAttackRelease(`C${octave[1]}`, '8n', now);
        break;
      case "2":
        synth.triggerAttackRelease(`C#${octave[1]}`, "8n", now);
        break;
      case "W":
        synth.triggerAttackRelease(`D${octave[1]}`, "8n", now);
        break;
      case "3":
        synth.triggerAttackRelease(`D#${octave[1]}`, "8n", now);
        break;
      case "E":
        synth.triggerAttackRelease(`E${octave[1]}`, "8n", now);
        break;
      case "R":
        synth.triggerAttackRelease(`F${octave[1]}`, "8n", now);
        break;
      case "5":
        synth.triggerAttackRelease(`F#${octave[1]}`, "8n", now);
        break;
      case "T":
        synth.triggerAttackRelease(`G${octave[1]}`, "8n", now);
        break;
      case "6":
        synth.triggerAttackRelease(`G#${octave[1]}`, "8n", now);
        break;
      case "Y":
        synth.triggerAttackRelease(`A${octave[1]}`, "8n", now);
        break;
      case "7":
        synth.triggerAttackRelease(`A#${octave[1]}`, "8n", now);
        break;
      case "U":
        synth.triggerAttackRelease(`B${octave[1]}`, "8n", now);
        break;
      default:
        break;
    } //switch(key)
}//chooseKey(key)

 async handleRecording(synth){
     // RECORDING
    const audio = document.querySelector('audio');
    const actx = Tone.context;
    const dest = actx.createMediaStreamDestination();
    const recorder = new MediaRecorder(dest.stream);

    synth.connect(dest);

     // ARRAY FOR DATA STREAM
    const chunks = [];

    // HANDLE RECORDING BUTTONS
    var startedRecording = document.getElementById("start_recording");
    var stoppedRecording = document.getElementById("stop_recording");
    startedRecording.onclick = function(){
    console.log("recording started");
    recorder.start();
    }
    stoppedRecording.onclick = function(){
    console.log("recording stopped");
    recorder.stop();
    }

    // STORE DATA INTO ARRAY
    recorder.ondataavailable = evt => chunks.push(evt.data);
    recorder.onstop = evt => {
        let blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
        audio.src = URL.createObjectURL(blob);
    };
 }

  render() {
    return (
      <>
        <div class="main" onKeyDown={(e) => this.handleKeyDown(e)} tabIndex= "-1">
          <div class="screen">
          <div class="vst">
            <table class="settings_table">
            {/*
              <td colspan="2" class="synth_sity_image_cell">
                <img
                  class="synth_sity_image"
                  alt=""
                  src={Background}
                  width="600px"
                />
              </td>
              */}

              <tr>
                <td colspan="2" class="synth_sity_title">
                    <table class="logoTable">
                        <tr class="mainScreen">
                            [ some info here ] <br />
                            etc.               <br /> <br />
                            seth klupka, vi vu
                        </tr>
                        <tr>
                            <img
                              class="synth_sity_image"
                              alt=""
                              src={Background}
                              width="600px"
                            />
                        </tr>
                    </table>
                </td>



              </tr>
              {/*
              <tr>
                <td class="setting_cell">
                <span>AUDIO RECORDING</span>
                <br />
                    <audio controls></audio>
                </td>

                <td class="setting_cell">
                <span>RECORD</span>
                <br />
                    <button id="start_recording">
                    <b>START</b>
                    </button>

                    <button id="stop_recording">
                    <b>STOP</b>
                    </button>
                </td>
              </tr>
              */}
              <tr>
              <td class="setting_cell">
                <div class="center">
                  <span>WAVEFORM</span>
                  <br />
                  <select
                    name="waveform"
                    id="waveform_forum"
                    onChange={(e) => this.onChange(e)}
                  >
                    <option value="sine">SINE</option>
                    <option value="square">SQUARE</option>
                    <option value="sawtooth">SAWTOOTH</option>
                    <option value="triangle">TRIANGLE</option>
                  </select>
                </div>
              </td>


                <td class="setting_cell">
                    <span></span>
                </td>
              </tr>

              <tr>
              <td class="setting_cell">
                  <span>OCTAVE</span>
                  <br />
                  <div>
                      <input type="range" min="0" max="4" name="octave" class="slider"
                      value={this.state.octave} onChange={(e) => this.onChange(e)} id="octaveValue"/>
                      <div class="ticks">
                        <span class="tick" id="mainTick">|</span>
                        <span class="tick">|</span>
                        <span class="tick" id="mainTick">|</span>
                        <span class="tick">|</span>
                        <span class="tick" id="mainTick">|</span>

                      </div>
                  </div>
              </td>


                <td class="setting_cell">
                  <div class="settingsBar">
                    <div class="center">
                    <span>VOLUME</span>
                    <br />
                        <div class="volume_controller">
                            <input type="range"
                                   min="-30"
                                   max="-10"
                                   class="slider" value={this.state.volume} name="volume" onChange={(e) => this.onChange(e)}
                                   id="volumeValue"/>
                        </div>
                        <div class="ticks">
                          <span class="tick" id="mainTick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick" id="mainTick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick">|</span>
                          <span class="tick" id="mainTick">|</span>
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
                          <input type="range" min="0" max="70" name="delay" class="slider"
                                 value={this.state.delay} onChange={(e) => this.onChange(e)} id="delayValue"/>
                                 <div class="ticks">
                                   <span class="tick" id="mainTick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick" id="mainTick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick">|</span>
                                   <span class="tick" id="mainTick">|</span>
                                 </div>
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
                          <input type="range" min="0" max="70" name="reverb" value={this.state.reverb}
                          onChange={(e) => this.onChange(e)} class="slider" id="reverbValue"/>
                          <div class="ticks">
                            <span class="tick" id="mainTick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick" id="mainTick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick">|</span>
                            <span class="tick" id="mainTick">|</span>
                          </div>
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
            </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </>
    );
  }
}

export default Synthesizer;
