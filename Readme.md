# U-Books

A simple book management application made with FastAPI and React.js (Ucall service assignment)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm or yarn
- Python (for the server-side)

### Installing

A step by step series of examples that tell you how to get a development environment running.

First, clone the repository:

```bash
git clone https://github.com/HLrahul/UCall-assignment.git
```

After getting into the project directory, to setup client (frontend):

```bash
cd client
```

```bash
npm i
```

```bash
npm run dev
```

Now, to setup the server (backend):

```bash
cd server
```

Create a virtual environment

```bash
py -m venv venv

# To activate the virtual environment
.\venv\Scripts\activate # for windows system
./venv/bin/activate # for linux system
```

Install the dependencies

```bash
pip install -r requirements.txt
```

Run the application

```bash
cd app

uvicorn app.main:app
```

### Endpoints

- `GET` `/books` - list all books
- `GET` `/books/{id}` - get one book
- `PUT` `/books/{id}` - update a book
- `DELETE` `/books/{id}` - delete a book
