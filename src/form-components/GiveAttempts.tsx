import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

interface buttonProps {
    setAttempts: (newAttempts: number) => void;
    attempts: number;
    amount: number;
}

function Gainer(props: buttonProps): JSX.Element {
    return (
        <Button
            onClick={() => props.setAttempts(props.attempts + props.amount)}
        >
            gain
        </Button>
    );
}

function User(props: buttonProps): JSX.Element {
    return (
        <Button
            onClick={() => props.setAttempts(props.attempts - 1)}
            disabled={props.attempts <= 0}
        >
            use
        </Button>
    );
}

export function GiveAttempts(): JSX.Element {
    const [attempts, setAttempts] = useState<number>(3);
    const [gainAmount, setGainAmount] = useState<number>(0);
    function updateAmount(event: ChangeEvent) {
        setGainAmount(parseInt(event.target.value) || 0);
    }
    return (
        <div>
            <h3>Give Attempts</h3>
            <Form.Group controlId="formAttempts">
                <Form.Label>Attempts: {attempts}</Form.Label>
                <Form.Control
                    value={gainAmount}
                    onChange={updateAmount}
                    type="number"
                />
            </Form.Group>
            <Gainer
                attempts={attempts}
                setAttempts={setAttempts}
                amount={gainAmount}
            ></Gainer>
            <User
                attempts={attempts}
                setAttempts={setAttempts}
                amount={-1}
            ></User>
        </div>
    );
}
