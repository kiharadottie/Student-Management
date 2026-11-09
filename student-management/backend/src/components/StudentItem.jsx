
import './StudentItem.css';

function StudentItem({ student, onDelete }) {
    return (
        <div className="student-item">

            <span>
                {student.name} — {student.age} years old
            </span>

            <button
                className="delete-button"
                onClick={() => onDelete(student.id)}
            >
                Delete
            </button>

        </div>
    );
}

export default StudentItem;
