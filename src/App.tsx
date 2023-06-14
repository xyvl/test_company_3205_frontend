import { useCustomSelector } from "./hooks/redux"

function App() {
  const state = useCustomSelector(state => state.state)
  
  return (
    <form>
      <input type="text" /><input type="text" />
    </form>
  );
}

export default App;
