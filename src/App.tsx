import { BaseSyntheticEvent, useEffect, useState } from "react";
import "./App.css";
import prismatic from "@prismatic-io/embedded";

const API_URL = process.env.API_URL || 'https://app2-5gbx.onrender.com';

const App: React.FC = () => {
  const [items, setItems] = useState([]);

  useEffect(
    () => {
      (async () => {
        const responseToken = await fetch(`${API_URL}/token`);
        const { token } = await responseToken.json();
        await prismatic.init();
        try {
          const response = await prismatic.authenticate({ token });
          console.log('response', response);
        } catch (ex) {
          console.log('error', ex);
        }
      })();
    },
    [],
  );

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

  const openMarketplace = () => {
    prismatic.showMarketplace({
      usePopover: true,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div>Items storage</div>
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
          <button
            className="buttonStyle"
            type="button"
            onClick={openMarketplace}
          >
            Marketplace
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
