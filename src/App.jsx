import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = React.useState(null);
  const [newQuoteInfo, setNewQuoteInfo] = React.useState({
    text: "",
    author: "",
  });

  async function handleGet() {
    const allQuotes = await axios.get(
      "https://web-server-with-sql.onrender.com/messages"
    );
    const randomDataIndex = Math.floor(Math.random() * allQuotes.data.length);
    setData(allQuotes.data[randomDataIndex]);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewQuoteInfo((prevNewQuoteInfo) => ({
      ...prevNewQuoteInfo,
      [name]: value,
    }));
  }

  return (
    <>
      <h1>Quotes Page</h1>
      <div className="quoteGetter">
        <p>{data && "'" + data.text + "'"}</p>
        <p>{data && data.author}</p>
        <button onClick={handleGet}>Get Random Quote</button>
      </div>
      <div className="quotePoster">
        <input
          placeholder="Quote"
          value={newQuoteInfo.text}
          onChange={handleChange}
          name="text"
        ></input>
        <input
          placeholder="Author"
          value={newQuoteInfo.author}
          onChange={handleChange}
          name="author"
        ></input>
        <button>Post Quote</button>
      </div>
    </>
  );
}

export default App;
