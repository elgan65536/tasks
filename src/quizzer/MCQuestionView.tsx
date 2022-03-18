import React, { useState } from "react";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function MCQuestionView({
    options,
    expectedAnswer,
    body,
    published,
    unpublishedVisible
}: {
    options: string[];
    expectedAnswer: string;
    body: string;
    published: boolean;
    unpublishedVisible: boolean;
}): JSX.Element {
    const [answer, setAnswer] = useState<string>("Select Answer");
    function updateAnswer(event: ChangeEvent) {
        setAnswer(event.target.value);
    }
    return (
        <div>
            {(unpublishedVisible || published) && (
                <div>
                    <Form.Group controlId="userOptions">
                        <Form.Label>{body}</Form.Label>
                        <Form.Select value={answer} onChange={updateAnswer}>
                            <option
                                value={"Select Answer"}
                                key={"Select Answer"}
                            >
                                Select Answer
                            </option>
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
            )}
        </div>
    );
}
