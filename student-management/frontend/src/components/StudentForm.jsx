
import './StudentForm.css';

function StudentForm({ name, setName, age, setAge, onAddStudent }) {
    return (
        <div className="student-form">

            <input
                className="student-input"
                type="text"
                placeholder="Enter student name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                className="student-input"
                type="number"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />

            <button
                className="add-button"
                onClick={onAddStudent}
            >
                Add Student
            </button>

        </div>
    );
}

export default StudentForm;
