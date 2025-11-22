import "./App.css";
import React, { useState } from "react";
import QuoteForm from "./components/QuoteForm";
import QuoteList from "./components/QuoteList";
import logo from "./assets/quotebook.png";

const API_BASE = "http://localhost:8000" //port out backend runs on

function App() {
	const [maxAge, setMaxAge] = useState(0); // 0 = all quotes
  	const [refreshKey, setRefreshKey] = useState(0); // to trigger QuoteList refresh
	return (
		<div className="App">
			<div className="top-header">
				<img src={logo} alt="Hack Logo" />
				<h1>Hack at UCI Tech Deliverable</h1>
			</div>
			

			<div className="main-area">
				<div className="form-container">
					<h2>Submit a quote</h2>
      				<QuoteForm apiBaseUrl={API_BASE} onQuoteSubmitted={() => setRefreshKey((prev) => prev + 1)}/>
				</div>
				

				<div className="max-age-container">
					<h2>Previous Quotes</h2>
					<label>Show quotes from:
					<select value={maxAge} onChange={(e) => setMaxAge(Number(e.target.value))}>
						<option value={7 * 24 * 3600}>Last week</option>
						<option value={30 * 24 * 3600}>Last month</option>
						<option value={365 * 24 * 3600}>Last year</option>
						<option value={0}>All time</option>
					</select>
					</label>
				</div>
				
		
				<QuoteList apiBaseUrl={API_BASE} maxAge={maxAge} key={refreshKey} />

			</div>
			
			
		</div>
	)
}

export default App;
