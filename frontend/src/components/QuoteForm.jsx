import React from "react";
import { useEffect, useState } from "react";

function QuoteForm({apiBaseUrl, onQuoteSubmitted}){
    // Initialize all state variables for the form
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        if (!name || !message) return // Handle form submission

        // Create FormData to send in POST request
        const formData = new FormData();
        formData.append("name", name);
        formData.append("message", message);

        try{

            // Send POST request to backend with the form data
            const res = await fetch(`${apiBaseUrl}/quote`, {
            method: "POST",
            body: formData,
            })

            // If quote added successfully, reset form inputs and trigger parent refresh
            if (res.ok) {
                setName("")
                setMessage("")
                setError("")
                onQuoteSubmitted() // tell parent to refresh quotes
            } 
            // If POST failed, set an error message
            else {
            setError("Failed to submit quote. Try again.")
            }

        }
        catch(err){
            console.error(err);
            setError("Error submitting quote. Try again.");
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="input-name">Name</label>
            <input type="text" id="input-name" value={name} onChange={(e) => setName(e.target.value)} required/>

            <label htmlFor="input-message">Quote</label>
            <input type="text" id="input-message" value={message} onChange={(e) => setMessage(e.target.value)} required/>

            <button type="submit">Submit</button>

            {error && <p>{error}</p>}
        </form>
    )

}

export default QuoteForm