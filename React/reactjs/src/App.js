import {useState} from "react";
import './App.css';

function App() {
    const [val, setVal] = useState("");

    return (
        <div className="App">
            <h1>
                {val}
            </h1>
            <input type={"text"} onChange={(evt) => {
                setVal(evt.target.value);
            }} />
        </div>
    );
}

export default App;
