import React, { useState } from "react";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export {};

export function SAQuestionView({
    expectedAnswer,
    body,
    published,
    unpublishedVisible
}: {
    expectedAnswer: string;
    body: string;
    published: boolean;
    unpublishedVisible: boolean;
}): JSX.Element {
    const [answer, setAnswer] = useState<string>("");
    function updateAnswer(event: ChangeEvent) {
        setAnswer(event.target.value);
    }
    return (
        <div>
            {(unpublishedVisible || published) && (
                <div>
                    <Form.Group controlId="formAnswer">
                        <Form.Label>{body}</Form.Label>
                        <Form.Control value={answer} onChange={updateAnswer} />
                    </Form.Group>
                    {answer === expectedAnswer ? "✔️" : "❌"}
                </div>
            )}
        </div>
    );
}
