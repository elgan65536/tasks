import React, { useState } from "react";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export function EditMode(): JSX.Element {
    const [name, setName] = useState<string>("Your Name");
    const [isStudent, setIsStudent] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    function updateName(event: ChangeEvent) {
        setName(event.target.value);
    }
    function updateIsStudent(event: ChangeEvent) {
        setIsStudent(event.target.checked);
    }
    function updateEditMode(event: ChangeEvent) {
        setEditMode(event.target.checked);
    }
    return (
        <div>
            <h3>Edit Mode</h3>
            <Form.Check
                type="switch"
                id="is-editMode-check"
                label="Edit Mode"
                checked={editMode}
                onChange={updateEditMode}
            />
            {editMode && (
                <div>
                    <Form.Group controlId="formName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control value={name} onChange={updateName} />
                    </Form.Group>
                    <Form.Check
                        type="checkbox"
                        id="is-student-check"
                        label="Student"
                        checked={isStudent}
                        onChange={updateIsStudent}
                    />
                </div>
            )}
            {!editMode && (
                <div>
                    {name} is {isStudent ? "" : "not "}a student
                </div>
            )}
        </div>
    );
}
