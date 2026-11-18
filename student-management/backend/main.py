

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

# Create FastAPI application
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
def get_db_connection():
    connection = sqlite3.connect("students.db")
    connection.row_factory = sqlite3.Row
    return connection


# Create database table
connection = get_db_connection()

connection.execute("""
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL
    )
""")

connection.commit()
connection.close()


# Student data structure
class Student(BaseModel):
    name: str
    age: int


# Home endpoint
@app.get("/")
def home():
    return {
        "message": "Welcome to Student Management Backend!"
    }


# Get all students
@app.get("/students")
def get_students():
    connection = get_db_connection()

    students = connection.execute(
        "SELECT * FROM students"
    ).fetchall()

    connection.close()

    return [dict(student) for student in students]


# Add a student
@app.post("/students")
def add_student(student: Student):
    connection = get_db_connection()

    connection.execute(
        "INSERT INTO students (name, age) VALUES (?, ?)",
        (student.name, student.age)
    )

    connection.commit()
    connection.close()

    return {
        "message": "Student added successfully!"
    }


# Delete a student
@app.delete("/students/{student_id}")
def delete_student(student_id: int):
    connection = get_db_connection()

    cursor = connection.execute(
        "DELETE FROM students WHERE id = ?",
        (student_id,)
    )

    connection.commit()
    connection.close()

    if cursor.rowcount == 0:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return {
        "message": "Student deleted successfully!"
    }


# Update a student
@app.put("/students/{student_id}")
def update_student(student_id: int, student: Student):
    connection = get_db_connection()

    cursor = connection.execute(
        "UPDATE students SET name = ?, age = ? WHERE id = ?",
        (student.name, student.age, student_id)
    )

    connection.commit()
    connection.close()

    if cursor.rowcount == 0:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return {
        "message": "Student updated successfully!"
    }
