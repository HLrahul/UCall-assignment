"""crud.py

This module contains CRUD (Create, Read, Update, Delete) operations for 
managing books in the database.

Functions:
    get_books(db: Session) -> List[models.Book]: Retrieve all books from the database.
    get_book(db: Session, book_id: int) -> Optional[models.Book]: 
    Retrieve a specific book by its ID.
    
    create_book(db: Session, title: str, author: str, year: int) -> models.Book: 
    Create a new book in the database.
    
    update_book(db: Session, book_id: int, title: str, author: str, year: int) -> 
    Optional[models.Book]: Update an existing book in the database.
    
    delete_book(db: Session, book_id: int) -> Optional[models.Book]: 
    Delete a book from the database by its ID.
"""

from sqlalchemy.orm import Session
from app import models


def get_books(db: Session):
    """
    Retrieve all books from the database.

    Args:
        db (Session): SQLAlchemy database session.

    Returns:
        List[models.Book]: List of all books retrieved from the database.
    """
    return db.query(models.Book).all()


def get_book(db: Session, book_id: int):
    """
    Retrieve a specific book by its ID.

    Args:
        db (Session): SQLAlchemy database session.
        book_id (int): ID of the book to retrieve.

    Returns:
        Optional[models.Book]: Book object if found, None if not found.
    """
    return db.query(models.Book).filter(models.Book.id == book_id).first()


def create_book(db: Session, title: str, author: str, year: int):
    """
    Create a new book in the database.

    Args:
        db (Session): SQLAlchemy database session.
        title (str): Title of the new book.
        author (str): Author of the new book.
        year (int): Year of publication of the new book.

    Returns:
        models.Book: Created book object.
    """
    db_book = models.Book(title=title, author=author, year=year)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


def update_book(db: Session, book_id: int, title: str, author: str, year: int):
    """
    Update an existing book in the database.

    Args:
        db (Session): SQLAlchemy database session.
        book_id (int): ID of the book to update.
        title (str): New title for the book.
        author (str): New author for the book.
        year (int): New year of publication for the book.

    Returns:
        Optional[models.Book]: Updated book object if found, None if book with 
        given ID does not exist.
    """
    db_book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if db_book:
        db_book.title = title
        db_book.author = author
        db_book.year = year
        db.commit()
        db.refresh(db_book)
    return db_book


def delete_book(db: Session, book_id: int):
    """
    Delete a book from the database by its ID.

    Args:
        db (Session): SQLAlchemy database session.
        book_id (int): ID of the book to delete.

    Returns:
        Optional[models.Book]: Deleted book object if found and deleted, 
        None if book with given ID does not exist.
    """
    db_book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if db_book:
        db.delete(db_book)
        db.commit()
    return db_book
