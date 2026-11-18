
import StudentItem from './StudentItem';
import './StudentList.css';

function StudentList({ students, onDelete }) {
    return (
        <div className="student-list">

            <h2>Students ({students.length})</h2>

            {students.length === 0 ? (
                <p>No students added yet.</p>
            ) : (
                students.map((student) => (
                    <StudentItem
                        key={student.id}
                        student={student}
                        onDelete={onDelete}
                    />
                ))
            )}

        </div>
    );
}

export default StudentList;
