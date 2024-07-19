import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [quote, setQuote] = React.useState(null);
  const [newQuoteInfo, setNewQuoteInfo] = React.useState(createEmptyQuote());
  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
  if (!apiBaseURL) {
    throw new Error("missing import.meta.env.VITE_API_BASE_URL");
  }
  const url = apiBaseURL + "/messages";

  function createEmptyQuote() {
    return {
      text: "",
      author: "",
    };
  }

  async function handleGetQuotesFromAPI() {
    const allQuotes = await axios.get(url);
    const randomDataIndex = Math.floor(Math.random() * allQuotes.data.length);
    setQuote(allQuotes.data[randomDataIndex]);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewQuoteInfo((prevNewQuoteInfo) => ({
      ...prevNewQuoteInfo,
      [name]: value,
    }));
  }

  async function handlePostQuoteToAPI() {
    await axios.post(url, newQuoteInfo);
    setNewQuoteInfo(createEmptyQuote());
  }

  return (
    <>
      <h1>Quotes Page</h1>
      <div className="quoteGetter">
        <p>{quote && "'" + quote.text + "'"}</p>
        <p>{quote && quote.author}</p>
        <button onClick={handleGetQuotesFromAPI}>Get Random Quote</button>
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
        <button onClick={handlePostQuoteToAPI}>Post Quote</button>
      </div>
    </>
  );
}

export default App;
