import React from "react";
import '../css/Main.css';
import Background from "../resources/cityscape_fin.png";

export const Synthesizer = () => {
    return (
     <>
     <div class="main">
       <div class="screen">
        <table class="settings_table">
        <td colspan="2" class="synth_sity_image_cell">
                <img class="synth_sity_image" src={Background} width="600px" />
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
          <br/>
          <br/>
          <select name="waveform" id="waveform_forum">
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
            <br/>
            <input class="volume_bar" type="range" min="0.0" max="1.0" step="0.01"
                value="0.5" list="volumes" name="volume"/>
            <datalist id="volumes">
              <option value="0.0" label="Mute"/>
              <option value="1.0" label="100%"/>
            </datalist>
          </div>
        </div>
        </td>
    </tr>
</table>

<div class="keyboard">
<ul id="piano" class="piano">
<li data-note="C3" class="key">
  <div data-note="C#3" class="black-key">S</div>
  Z
</li>
<li data-note="D3" class="key">
  <div data-note="D#3" class="black-key">D</div>
  X
</li>
<li data-note="E3" class="key">
  C
</li>
<li data-note="F3" class="key">
  <div data-note="F#3" class="black-key">G</div>
  V
</li>
<li data-note="G3" class="key">
  <div data-note="G#3" class="black-key">H</div>
  B
</li>
<li data-note="A3" class="key">
  <div data-note="A#3" class="black-key">J</div>
  N
</li>
<li data-note="B4" class="key">
  M
</li>

<li data-note="C4" class="key">
  <div data-note="C#4" class="black-key">2</div>
  Q
</li>
<li data-note="D4" class="key">
  <div data-note="D#4" class="black-key">3</div>
  W
</li>
<li data-note="E4" class="key">
  E
</li>
<li data-note="F4" class="key">
  <div data-note="F#4" class="black-key">5</div>
  R
</li>
<li data-note="G4" class="key">
  <div data-note="G#4" class="black-key">6</div>
  T
</li>
<li data-note="A4" class="key">
  <div data-note="A#4" class="black-key">7</div>
  Y
</li>
<li data-note="B4" class="key">
  U
</li>
</ul>
</div>
</div>
</div>
     </>
    );
  };
  
export default Synthesizer;