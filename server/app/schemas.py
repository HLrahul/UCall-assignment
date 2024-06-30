"""schemas.py

This module defines Pydantic models for representing books.

Classes:
    BookBase: Base schema for book data.
    BookCreate: Schema for creating a new book.
    BookUpdate: Schema for updating an existing book.
    Book: Schema for representing a book with ORM mode enabled.
"""

from pydantic import BaseModel


class BookBase(BaseModel):
    """Base schema for book data."""
    title: str
    author: str
    year: int


class BookCreate(BookBase):
    """Schema for creating a new book."""
    pass


class BookUpdate(BookBase):
    """Schema for updating an existing book."""
    pass


class Book(BookBase):
    """Schema for representing a book with ORM mode enabled."""
    id: int

    class Config:
        """Pydantic config class to enable ORM mode."""
        orm_mode = True
