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
