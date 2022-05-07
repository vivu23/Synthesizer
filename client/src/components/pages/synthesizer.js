<<<<<<< HEAD
import React, { Component } from "react";
import "../css/Main.css";
import Background from "../resources/KV-SYN-logo.png";
import * as Tone from "tone";
import { GlobalContext } from "../context/GlobalState";
import UserProfile from "../scripts/UserProfile";
import { Navigate } from "react-router-dom";

class Synthesizer extends Component {
static contextType = GlobalContext
 constructor(){
    super();
    this.state ={
     user: null, 
     waveform : "sine",
     octave: 2,
     volume : -20,
     reverb : 0,
     delay : 0,
     recordings : [],
     recorder : false,
     knob1 : 0,
     audio: null
    }
 }

  async componentDidMount(){
    if(this.context.isLoggedIn){
      var email = UserProfile.getName();
      const url = "/login/";
      const response = await fetch(url + email);
      const data = await response.json();
      this.setState({user: data});
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleKeyDown(e) {
    if(this.state.recorder===true){
      this.setState({
        recordings: [...this.state.recordings, e.key.toUpperCase()]
      })
    }
    this.playSound(e.key.toUpperCase(), null);
  }

  async handleKey(e) {
    var key = "";
    if (e.currentTarget.className === "black-key") {
      e.stopPropagation();
      key = e.currentTarget.textContent;
    } else {
      key = e.currentTarget.textContent[e.currentTarget.textContent.length - 1];
    }
    if(this.state.recorder===true){
      this.setState({
        recordings: [...this.state.recordings, key]
      })
    }

    this.playSound(key, null);
  }

  async handleStart(){
    if(this.state.recorder === true){
      this.setState({
        recorder: false
      })
    } else{
      this.setState({
        recorder: true
      })
    }

  }

  async saveRecording(){
    console.log(this.context);
    if(!this.context.isLoggedIn){
        alert("You need to login to save this recording!");
    }
    else{
      let input = prompt("Please enter the name for this recording!");
      var data = new FormData()
      data.append('file', this.state.audio);
      data.append('fileName', input);
      await fetch("upload/" + this.state.user._id, {
        method: "POST",
        body: data
      })
      .then((res) => res.json())
      .then((body) => console.log(body));
      alert("Recording Saved Successfully!");
      window.location.reload();
    }
  }


  async handleRecording(){
    const audio = document.querySelector('audio');
    const synth = new Tone.Synth();
    const actx  = Tone.context;
    const dest  = actx.createMediaStreamDestination();
    const recorder = new MediaRecorder(dest.stream);

    synth.connect(dest);

    const chunks = [];
      let note = 0;
    Tone.Transport.scheduleRepeat(time => {
      if (note === 0) recorder.start();
      if (note > this.state.recordings.length) {
        synth.triggerRelease(time)
        recorder.stop();
        Tone.Transport.stop();
      } else this.playSound(this.state.recordings[note], synth);
      note++;
    }, '4n');

    recorder.ondataavailable = evt => chunks.push(evt.data);
    recorder.onstop = evt => {
      let blob = new Blob(chunks, { type: 'audio/mp3; codecs=opus' });
      this.setState({
        audio: blob
      })
      audio.src = URL.createObjectURL(blob);
    };

    Tone.Transport.start();
  }

  chooseKey(key, synth) {
    console.log(this.state.recorder);

    const now = Tone.now();

    // CHANGE OCTAVE
    let octave = [3, 4];
    if (this.state.octave > 2) {
      octave[0] += this.state.octave - 2;
      octave[1] += this.state.octave - 2;
    }
    if (this.state.octave === 1) {
      octave[0] = 2;
      octave[1] = 3;
    }
    if (this.state.octave === 0) {
      octave[0] = 1;
      octave[1] = 2;
    }

    // DISPLAY VALUES ON MIDDLE SYNTH SCREEN
    const valOfVolume = this.state.volume;
    const newValOfVolume = valOfVolume / 10 * 100 + 200;
    document.getElementById("effect1").innerHTML = "octave: " + (octave[0] - 3);
    document.getElementById("effect2").innerHTML = "volume: " + Math.round(newValOfVolume);
    document.getElementById("effect3").innerHTML = "delay: " + Math.round(this.state.delay/7*10);
    if(this.state.reverb*1.5-5 == -5)
        document.getElementById("effect4").innerHTML = "reverb: 0";
    else {
        document.getElementById("effect4").innerHTML = "reverb: " + Math.round(this.state.reverb*1.5-5);
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
        synth.triggerAttackRelease(`C${octave[1]}`, "8n", now);
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
  }

  playSound(key, synth) {
    if(synth == null){
      synth = new Tone.Synth();
    }
    synth.autostart = true;
    // VOLUME
    const vol = new Tone.Volume(this.state.volume).toDestination();
    if (this.state.volume < -30) vol.mute = true;

    // REVERB EFFECT
    const reverb = new Tone.JCReverb(this.state.reverb / 100).toDestination();

    // DELAY EFFECT
    var delayTime = "0";
    if (this.state.delay / 100 !== 0) {
      delayTime = "8n";
    }
    const feedbackDelay = new Tone.FeedbackDelay(
      delayTime,
      this.state.reverb / 100
    ).toDestination();

    // CREATE SYNTH AND APPLY EFFECTS

    if (this.state.reverb / 100 === 0) synth.chain(vol, feedbackDelay);
    else {
      synth.chain(vol, reverb, feedbackDelay);
    }

    // APPLY WAVE TYPE
    let type = this.state.waveform;
    synth.oscillator.type = type;
    this.chooseKey(key, synth);
  }

  render() {
    return (
      <>
        <div
          class="main"
          onKeyDown={(e) => this.handleKeyDown(e)}
          tabIndex="-1"
        >
          <div class="screen">
          <div class="vst">
            <table class="settings_table">
              <tr>
                <td colspan="2" class="synth_sity_title">
                    <table class="logoTable">
                        <tr class="mainScreen">
                            <table class="effectsScreen">
                                <tr id="effect1">
                                    <br />Created By: <br />
                                    Seth Klupka, Vi Vu
                                    {/* Text above gets replaced by octave val */}
                                </tr>
                                <tr id="effect2">
                                {/*volume value*/}
                                </tr>
                                <tr id="effect3">
                                {/*delay value*/}
                                </tr>
                                <tr id="effect4">
                                {/*reverb volume*/}
                                </tr>
                            </table>
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

              <tr>
                <td class="setting_cell">
                  <span>AUDIO RECORDING</span>
                  <br />
                  <audio controls></audio>
                </td>

                <td class="setting_cell">
                  <span>RECORD</span>
                  <br />
                  <button class="recordingButton" onClick={()=>this.handleStart()}>
                    <b>{(this.state.recorder) ? "Stop" : "Start"}</b>
                  </button>
                  <button class="recordingButton" disabled={(this.state.recordings.length <= 0 || this.state.recorder) ? true: false} onClick={()=> this.handleRecording()}><b>Listen</b></button>
                  <button class="recordingButton" disabled={(this.state.recordings.length <= 0 || this.state.recorder) ? true: false} onClick={()=> this.saveRecording()}><b>Save</b></button>
                  <button class="recordingButton" disabled={(this.state.recordings.length <= 0 || this.state.recorder) ? true: false}><b>Reset</b></button>
                </td>
              </tr>

              <tr>
              <td colspan="2" class="setting_cell">
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
              {/*
                <td class="setting_cell">



                </td>*/}
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

            <div class="keyboard">
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
        <div></div>
      </>
    );
  }
}

export default Synthesizer;
||||||| merged common ancestors
=======
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
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    let type = this.wavefrom;
    synth.oscillator.type = type;
    switch (key) {
      // LEFT ROW
      case "Z":
        return synth.triggerAttackRelease("C3", "8n", now);
      case "S":
        return synth.triggerAttackRelease("C#3", "8n", now);
      case "X":
        return synth.triggerAttackRelease("D3", "8n", now);
      case "D":
        return synth.triggerAttackRelease("D#3", "8n", now);
      case "C":
        return synth.triggerAttackRelease("E3", "8n", now);
      case "V":
        return synth.triggerAttackRelease("F3", "8n", now);
      case "G":
        return synth.triggerAttackRelease("F#3", "8n", now);
      case "B":
        return synth.triggerAttackRelease("G3", "8n", now);
      case "H":
        return synth.triggerAttackRelease("G#3", "8n", now);
      case "N":
        return synth.triggerAttackRelease("A3", "8n", now);
      case "J":
        return synth.triggerAttackRelease("A#3", "8n", now);
      case "M":
        return synth.triggerAttackRelease("B3", "8n", now);
      // RIGHT ROW
      case "Q":
        return synth.triggerAttackRelease("C4", "8n", now);
      case "2":
        return synth.triggerAttackRelease("C#4", "8n", now);
      case "W":
        return synth.triggerAttackRelease("D4", "8n", now);
      case "3":
        return synth.triggerAttackRelease("D#4", "8n", now);
      case "E":
        return synth.triggerAttackRelease("E4", "8n", now);
      case "R":
        return synth.triggerAttackRelease("F4", "8n", now);
      case "5":
        return synth.triggerAttackRelease("F#4", "8n", now);
      case "T":
        return synth.triggerAttackRelease("G4", "8n", now);
      case "6":
        return synth.triggerAttackRelease("G#4", "8n", now);
      case "Y":
        return synth.triggerAttackRelease("A4", "8n", now);
      case "7":
        return synth.triggerAttackRelease("A#4", "8n", now);
      case "U":
        return synth.triggerAttackRelease("B4", "8n", now);
      default:
        return;
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
                  <h1>SynthSityX v1.0</h1>
                </td>
              </tr>
              <tr>
                <td class="setting_cell">
                  <div class="center">
                    <span>WAVEFORM</span>
                    <br />
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
                      <input
                        class="volume_bar"
                        type="range"
                        min="0.0"
                        max="1.0"
                        step="0.01"
                        value="0.5"
                        list="volumes"
                        name="volume"
                      />
                      <datalist id="volumes">
                        <option value="0.0" label="Mute" />
                        <option value="1.0" label="100%" />
                      </datalist>
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
      </>
    );
  }
}

export default Synthesizer;
>>>>>>> f10a77a7ffbb2f20a68610ffbae40d1af5977176
