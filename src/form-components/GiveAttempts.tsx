import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function GiveAttempts(): JSX.Element {
    const [attempts, setAttempts] = useState<number>(3);
    function updateAttempts(event: ChangeEvent) {
        setAttempts(parseInt(event.target.value));
    }
    return (
        <div>
            <h3>Give Attempts</h3>
            <Form.Group controlId="formAttempts">
                <Form.Label>Attempts:</Form.Label>
                <Form.Control value={attempts} onChange={updateAttempts} />
            </Form.Group>
            <Button onClick={() => setAttempts(attempts - 1)}>Lose</Button>
            <Button onClick={() => setAttempts(attempts + 1)}>Gain</Button>
            <br />
            {attempts}
        </div>
    );
}
