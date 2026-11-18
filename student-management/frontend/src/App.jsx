
import { useState, useEffect } from 'react';
import './App.css';

import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

import Chatbot from './pages/Chatbot';
import Homepage from './pages/homepage';

const API = 'http://127.0.0.1:8000';

function App() {

    // Track the currently active page
    const [activePage, setActivePage] = useState('home');

    // Store student records
    const [students, setStudents] = useState([]);

    // Store form inputs
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    // Load students from FastAPI when the app opens
    useEffect(() => {
        fetchStudents();
    }, []);

    // Retrieve students from the backend
    const fetchStudents = async () => {
        try {
            const response = await fetch(`${API}/students`);

            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }

            const data = await response.json();
            setStudents(data);

        } catch (error) {
            console.error('Error loading students:', error);
            alert('Could not connect to the backend.');
        }
    };

    // Add a student through FastAPI
    const addStudent = async () => {

        if (name.trim() === '' || age === '') {
            alert('Please enter the student name and age');
            return;
        }

        try {
            const response = await fetch(`${API}/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.trim(),
                    age: Number(age)
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add student');
            }

            // Reload students from the database
            await fetchStudents();

            // Clear form
            setName('');
            setAge('');

        } catch (error) {
            console.error('Error adding student:', error);
            alert('Could not add student. Please try again.');
        }
    };

    // Delete a student through FastAPI
    const deleteStudent = async (id) => {

        try {
            const response = await fetch(`${API}/students/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete student');
            }

            await fetchStudents();

        } catch (error) {
            console.error('Error deleting student:', error);
            alert('Could not delete student.');
        }
    };

    return (
        <div className="app-container">

            {/* Navigation */}
            <nav className="navigation">

                <button onClick={() => setActivePage('home')}>
                    Home
                </button>

                <button onClick={() => setActivePage('chatbot')}>
                    Chatbot
                </button>

                <button onClick={() => setActivePage('students')}>
                    Students
                </button>

            </nav>

            {/* Display the selected page */}

            {activePage === 'home' && (
                <Homepage />
            )}

            {activePage === 'chatbot' && (
                <Chatbot />
            )}

            {activePage === 'students' && (
                <>
                    <h1>Student Management</h1>
                    <p>React Student Management System</p>

                    <StudentForm
                        name={name}
                        setName={setName}
                        age={age}
                        setAge={setAge}
                        onAddStudent={addStudent}
                    />

                    <StudentList
                        students={students}
                        onDelete={deleteStudent}
                    />
                </>
            )}

        </div>
    );
}

export default App;
