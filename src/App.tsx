import * as Tone from "tone";

import "./App.css";

function App() {
  const play = () => {
    // TODO next: 4 on the floor
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
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
