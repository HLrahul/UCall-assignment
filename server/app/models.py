"""models.py

This module defines SQLAlchemy models for managing books in a database.

Classes:
    Book: Represents a book with attributes like id, title, author, year,
    created_at, and updated_at.
"""

import datetime

from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Book(Base):
    """
    SQLAlchemy model for representing a book.

    Attributes:
        id (int): Primary key identifier for the book.
        title (str): Title of the book.
        author (str): Author of the book.
        year (int, optional): Year of publication of the book.
        created_at (datetime): Date and time when the book record was created.
        updated_at (datetime): Date and time when the book record was last updated.
    """
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    year = Column(Integer)
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now,
                        onupdate=datetime.datetime.now)
