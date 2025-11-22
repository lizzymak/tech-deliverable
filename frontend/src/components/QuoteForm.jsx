import React from "react";
import { useEffect, useState } from "react";

function QuoteForm({apiBaseUrl, onQuoteSubmited}){
    //initialize all the variables were going to use
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    //Function to handle submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        if (!name || !message) return //if no name or message was provided we return

        //create form data object that will be used to send as body to api
        const formData = new FormData();
        formData.append("name", name);
        formData.append("message", message);

        try{

            //post to data base the form data object
            const res = await fetch(`${apiBaseUrl}/quote`, {
            method: "POST",
            body: formData,
            })

            //if our quote was successfully added to database then we reset the from
            if (res.ok) {
                setName("")
                setMessage("")
                setError("")
                onQuoteSubmitted() // tell parent to refresh quotes
            } 
            //if quote was not successfully posted then we send an error
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