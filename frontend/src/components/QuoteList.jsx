import React, { useEffect, useState } from "react";
import QuoteItem from "./QuoteItem";

export default function QuoteList({ apiBaseUrl, maxAge }) {
  // Initialize state variables
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuotes() {
      // Set loading to true before fetching quotes
      setLoading(true);

      try {
        // Construct URL to fetch quotes with optional maxAge filter
        const url = `${apiBaseUrl}/quotes${maxAge ? `?max_age=${maxAge}` : ""}`;
        // Fetch quotes from backend
        const res = await fetch(url);
        // Parse response as JSON
        const data = await res.json();
        setQuotes(data);
      } catch (err) {
        console.error("Failed to fetch quotes", err);
      } finally {
        // Set loading to false after fetching is complete
        setLoading(false);
      }
    }

    // Call fetchQuotes to load quotes
    fetchQuotes();
  }, [apiBaseUrl, maxAge]); // Re-run effect if apiBaseUrl or maxAge changes

  if (loading) return <p>Loading quotes...</p>;

  return (
    <div className="quote-list">
      {quotes.length === 0 ? (
        <p>No quotes found.</p> //If the length of our quotes list is 0 then we display this
      ) : (
        quotes.map((quote, idx) => <QuoteItem key={idx} quote={quote} />) //If there are quotes in our quotes list then we map each quote to a separate QuoteItem component
      )}
    </div>
  );
}
