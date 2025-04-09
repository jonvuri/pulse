import { createSignal } from "solid-js";
import * as Tone from "tone";

import "./App.css";

function App() {
  const [swingAmount, setSwingAmount] = createSignal(0.3);
  const [square1, setSquare1] = createSignal(false);
  const [square2, setSquare2] = createSignal(false);
  const [square3, setSquare3] = createSignal(false);
  const [square4, setSquare4] = createSignal(false);

  const play = () => {
    Tone.getTransport().bpm.value = 150;

    const synth = new Tone.MembraneSynth().toDestination();

    function scheduleMeasure(startTime: number, swing: number) {
      const half = Tone.Time("2n").toSeconds();
      const quarter = Tone.Time("4n").toSeconds();
      const eighth = Tone.Time("8n").toSeconds();

      const firstDownbeat = startTime;
      Tone.getTransport().scheduleOnce((time) => {
        synth.triggerAttackRelease("C2", "8n", time);
        Tone.getDraw().schedule(() => {
          setSquare1(true);
          setTimeout(() => setSquare1(false), 100);
        }, time);
      }, firstDownbeat);

      const firstUpbeat = startTime + quarter + swing * eighth;
      Tone.getTransport().scheduleOnce((time) => {
        synth.triggerAttackRelease("C3", "8n", time);
        Tone.getDraw().schedule(() => {
          setSquare2(true);
          setTimeout(() => setSquare2(false), 100);
        }, time);
      }, firstUpbeat);

      const secondDownbeat = startTime + half;
      Tone.getTransport().scheduleOnce((time) => {
        synth.triggerAttackRelease("C2", "8n", time);
        Tone.getDraw().schedule(() => {
          setSquare3(true);
          setTimeout(() => setSquare3(false), 100);
        }, time);
      }, secondDownbeat);

      const secondUpbeat = startTime + half + quarter + swing * eighth;
      Tone.getTransport().scheduleOnce((time) => {
        synth.triggerAttackRelease("C3", "8n", time);
        Tone.getDraw().schedule(() => {
          setSquare4(true);
          setTimeout(() => setSquare4(false), 100);
        }, time);
      }, secondUpbeat);
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
        <div
          style={{
            display: "flex",
            gap: "1rem",
            "margin-bottom": "1rem",
            "justify-content": "center",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              "background-color": square1() ? "#ff00ff" : "#808080",
              transition: "background-color 0.1s",
            }}
          />
          <div
            style={{
              width: "40px",
              height: "40px",
              "background-color": square2() ? "#ff00ff" : "#808080",
              transition: "background-color 0.1s",
            }}
          />
          <div
            style={{
              width: "40px",
              height: "40px",
              "background-color": square3() ? "#ff00ff" : "#808080",
              transition: "background-color 0.1s",
            }}
          />
          <div
            style={{
              width: "40px",
              height: "40px",
              "background-color": square4() ? "#ff00ff" : "#808080",
              transition: "background-color 0.1s",
            }}
          />
        </div>
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
