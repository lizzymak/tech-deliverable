import React from "react";

function QuoteItem({quote}){
    const date = new Date(quote.time) // convert string to Date object
    //returns component that dipslays user's name, quote, and time it was posted
    return(

        <div className="container"> 
            <p className="username">{quote.name}</p>
            <p className="message">{quote.message}</p>
            <p className="date">{date.toLocaleString()}</p>
        </div>
    )

}

export default QuoteItem