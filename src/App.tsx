import * as Tone from "tone";

import "./App.css";

function App() {
  const play = () => {
    const synth = new Tone.Synth().toDestination();

    //play a note every quarter-note
    new Tone.Loop((time) => {
      synth.triggerAttackRelease("C3", "16n", time);
    }, "4n").start(0);

    Tone.getTransport().start();
  };

  return (
    <>
      <div class="card">
        <button onClick={play}>play</button>
      </div>
    </>
  );
}

export default App;
