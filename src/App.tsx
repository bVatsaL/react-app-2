import { BaseSyntheticEvent, useState } from "react";
import "./App.css";

const API_URL = process.env.API_URL || 'https://app2-5gbx.onrender.com';

const App: React.FC = () => {
  const [items, setItems] = useState([]);

  const getItems = () => {
    fetch(`${API_URL}/api`)
      .then((res) => res.json())
      .then((result) => setItems(result.data));
  };

  const clearItems = (e: BaseSyntheticEvent) => {
    fetch(`${API_URL}/api/clear`)
      .then((res) => res.json())
      .then((result) => setItems(result.data));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div>Items storege</div>
          <button
            className="buttonStyle"
            type="button"
            onClick={getItems}
          >
            Refresh
          </button>
          <button
            className="buttonStyle"
            type="button"
            onClick={clearItems}
          >
            Clear storage
          </button>
        </div>
        <div>
          {!items.length && (
            <span>Empty.!</span>
          )}
          <ul>
            {!!items.length && items.map((item) => (<li key={item}>{item}</li>))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default App;
