import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Question } from "../interfaces/question";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

interface QuestionViewProps {
    question: Question;
    unPublishedVisible: boolean;
}

export function SAQuestionView({
    question,
    unPublishedVisible
}: QuestionViewProps): JSX.Element {
    const [answer, setAnswer] = useState<string>("");
    function updateAnswer(event: ChangeEvent) {
        setAnswer(event.target.value);
    }
    return (
        <div>
            {(unPublishedVisible || question.published) && (
                <div>
                    {question.type === "short_answer_question" && (
                        <div>
                            <Form.Group controlId="formAnswer">
                                <Form.Label>
                                    <b>{question.name}: </b>
                                    {question.body}
                                </Form.Label>
                                <Form.Control
                                    value={answer}
                                    onChange={updateAnswer}
                                />
                            </Form.Group>
                            {answer === question.expected ? "✔️" : "❌"}{" "}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
