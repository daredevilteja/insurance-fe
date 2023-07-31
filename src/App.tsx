import { useState } from "react";
import "./App.css";

function App() {
  const [adultsCount, setAdultsCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  return (
    <div>
      <form>
        <label>
          Enter number of adults:
          <input type="number" name="adults" />
        </label>
        <label>
          Enter number of children:
          <input type="number" name="child" />
        </label>
        <label>Sum insured</label>
      </form>
    </div>
  );
}

export default App;
