import './App.css';
import {MinecraftOutput} from "./MinecratOutput";
import {CommandsToolbar} from "./commands/CommandToolbar";
import {ServerSelection} from "./ServerSelection";

function App() {

  return (
    <div className="App fullscreen">
        <h1>Minecraft server overlay</h1>
        <ServerSelection />
        <CommandsToolbar />
        <MinecraftOutput />
    </div>
  )
}

export default App
