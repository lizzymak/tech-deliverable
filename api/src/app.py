from contextlib import asynccontextmanager
from datetime import datetime
from typing import AsyncIterator

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse
from typing_extensions import TypedDict

from services.database import JSONDatabase

from datetime import datetime, timedelta

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",  # your frontend URL
    "http://127.0.0.1:5173",
]




class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    return RedirectResponse("/", status.HTTP_303_SEE_OTHER)


# TODO: add another API route with a query parameter to retrieve quotes based on max age
@app.get("/quotes")
def get_quotes(max_age: int = 0):
    """
    Get quotes newer than max_age seconds.
    If max_age = 0, return all quotes.
    """
    if max_age == 0:
        return database["quotes"]
    
    now = datetime.now()

    """
    Iterate through each quote in the database
    Convert each quote's time that is a string into a python date time object
    Subtract that from the current time to obtain the amount of time that has passed since a quote has been posted
    Comparison operator checks if the calculated time is less than or equal to the max_age duration
    We then return a list of all the quotes that were posted within the max_age
    """

    return [
        quote for quote in database["quotes"]
        if now - datetime.fromisoformat(quote["time"]) <= timedelta(seconds=max_age)
    ]
