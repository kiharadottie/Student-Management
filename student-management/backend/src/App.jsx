
import { useState } from 'react';
import './App.css';

import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {

    // Store student records
    const [students, setStudents] = useState([]);

    // Store form inputs
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    // Add a student
    const addStudent = () => {

        if (name.trim() === '' || age === '') {
            alert('Please enter the student name and age');
            return;
        }

        const newStudent = {
            id: Date.now(),
            name: name,
            age: age
        };

        setStudents([...students, newStudent]);

        setName('');
        setAge('');
    };

    // Delete a student
    const deleteStudent = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    return (
        <div className="app-container">

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

        </div>
    );
}

export default App;
