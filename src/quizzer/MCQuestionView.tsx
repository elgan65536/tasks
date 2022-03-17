import React, { useState } from "react";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function MCQuestionView({
    options,
    expectedAnswer,
    body
}: {
    options: string[];
    expectedAnswer: string;
    body: string;
}): JSX.Element {
    const [answer, setAnswer] = useState<string>(options[0]);
    function updateAnswer(event: ChangeEvent) {
        setAnswer(event.target.value);
    }
    return (
        <div>
            <Form.Group controlId="userOptions">
                <Form.Label>{body}</Form.Label>
                <Form.Select value={answer} onChange={updateAnswer}>
                    {options.map(
                        (option: string): JSX.Element => (
                            <option value={option} key={option}>
                                {option}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            {answer === expectedAnswer ? "✔️" : "❌"}
        </div>
    );
}
