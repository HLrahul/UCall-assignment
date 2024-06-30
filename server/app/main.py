"""main.py

This module defines a FastAPI application for managing books.

The application provides endpoints for CRUD operations on books stored in a database.

Endpoints:
    GET /books/: Retrieve all books.
    GET /books/{book_id}: Retrieve a specific book by ID.
    POST /books/: Create a new book.
    PUT /books/{book_id}: Update an existing book.
    DELETE /books/{book_id}: Delete a book.

Dependencies:
    get_db: Dependency function to get a SQLAlchemy database session.

"""

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from app import crud, models, schemas

from app.database import SessionLocal, engine

# Create tables in the database if they don't exist
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

def get_db():
    """
    Dependency function to get a SQLAlchemy database session.

    Yields:
        Session: SQLAlchemy database session.

    Closes the session automatically after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# API endpoints
@app.get("/books/", response_model=list[schemas.Book])
def read_books(db: Session = Depends(get_db)):
    """
    Retrieve all books from the database.

    Args:
        db (Session, optional): SQLAlchemy database session. Defaults to Depends(get_db).

    Returns:
        list[schemas.Book]: List of all books retrieved from the database.
    """
    return crud.get_books(db)


@app.get("/books/{book_id}", response_model=schemas.Book)
def read_book(book_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific book by its ID.

    Args:
        book_id (int): ID of the book to retrieve.
        db (Session, optional): SQLAlchemy database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: If the book with the given ID is not found (status code 404).

    Returns:
        schemas.Book: Book object if found.
    """
    db_book = crud.get_book(db, book_id)
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book


@app.post("/books/", response_model=schemas.Book)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    """
    Create a new book in the database.

    Args:
        book (schemas.BookCreate): Data of the new book to create.
        db (Session, optional): SQLAlchemy database session. Defaults to Depends(get_db).

    Returns:
        schemas.Book: Created book object.
    """
    return crud.create_book(db, **book.dict())


@app.put("/books/{book_id}", response_model=schemas.Book)
def update_book(book_id: int, book: schemas.BookUpdate, db: Session = Depends(get_db)):
    """
    Update an existing book in the database.

    Args:
        book_id (int): ID of the book to update.
        book (schemas.BookUpdate): New data for the book.
        db (Session, optional): SQLAlchemy database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: If the book with the given ID is not found (status code 404).

    Returns:
        schemas.Book: Updated book object.
    """
    db_book = crud.update_book(db, book_id, **book.dict())
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book


@app.delete("/books/{book_id}", response_model=schemas.Book)
def delete_book(book_id: int, db: Session = Depends(get_db)):
    """
    Delete a book from the database by its ID.

    Args:
        book_id (int): ID of the book to delete.
        db (Session, optional): SQLAlchemy database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: If the book with the given ID is not found (status code 404).

    Returns:
        schemas.Book: Deleted book object.
    """
    db_book = crud.delete_book(db, book_id)
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book
