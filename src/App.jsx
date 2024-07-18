import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = React.useState(null);

  async function handleClick() {
    const allQuotes = await axios.get(
      "https://web-server-with-sql.onrender.com/messages"
    );
    const randomDataIndex = Math.floor(Math.random() * allQuotes.data.length);
    setData(allQuotes.data[randomDataIndex]);
  }

  return (
    <>
      <h1>Quotes Page</h1>
      <div className="quoteGetter">
        <p>{data && "'" + data.text + "'"}</p>
        <p>{data && data.author}</p>
        <button onClick={handleClick}>Get Random Quote</button>
      </div>
    </>
  );
}

export default App;
