import { createSignal } from "solid-js";
import * as Tone from "tone";

import "./App.css";

function App() {
  const [swingAmount, setSwingAmount] = createSignal(0.3);

  const play = () => {
    Tone.getTransport().bpm.value = 120;
    const beatsPerMeasure = 4;

    const synth = new Tone.MembraneSynth().toDestination();

    function scheduleMeasure(startTime: number, swing: number) {
      const quarter = Tone.Time("4n").toSeconds(); // Quarter note
      const eighth = Tone.Time("8n").toSeconds(); // Eighth note
      const sixteenth = Tone.Time("16n").toSeconds(); // Sixteenth note

      for (let i = 0; i < beatsPerMeasure; i++) {
        const beatTime = startTime + i * quarter;

        // Downbeat
        Tone.getTransport().scheduleOnce((time) => {
          synth.triggerAttackRelease("C2", "8n", time);
        }, beatTime);

        // Upbeat (with swing)
        const swungUpbeat = beatTime + eighth + swing * sixteenth;
        Tone.getTransport().scheduleOnce((time) => {
          synth.triggerAttackRelease("C3", "8n", time);
        }, swungUpbeat);
      }
    }

    const dynamicLoop = new Tone.Loop((time) => {
      scheduleMeasure(time, swingAmount());
    }, "1m");

    Tone.getTransport().start();
    dynamicLoop.start(0);
  };

  return (
    <>
      <div class="card">
        <button onClick={play}>play</button>
        <div>
          <label>
            Swing: {(swingAmount() * 100).toFixed(0)}%
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={swingAmount()}
              onInput={(e) => setSwingAmount(Number(e.currentTarget.value))}
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
