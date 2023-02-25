import './App.css';
import {MinecraftOutput} from "./MinecratOutput";
import {CommandsToolbar} from "./commands/CommandToolbar";

function App() {

  return (
    <div className="App fullscreen">
        <h1>Minecraft server overlay</h1>
        <CommandsToolbar />
        <MinecraftOutput />
    </div>
  )
}

export default App
