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

export function MCQuestionView({
    question,
    unPublishedVisible
}: QuestionViewProps): JSX.Element {
    const [answer, setAnswer] = useState<string>("Select Answer");
    function updateAnswer(event: ChangeEvent) {
        setAnswer(event.target.value);
    }
    return (
        <div>
            {(unPublishedVisible || question.published) && (
                <div>
                    {question.type === "multiple_choice_question" && (
                        <div>
                            <Form.Group controlId="userOptions">
                                <Form.Label>
                                    <b>{question.name}: </b>
                                    {question.body}
                                </Form.Label>
                                <Form.Select
                                    value={answer}
                                    onChange={updateAnswer}
                                >
                                    <option
                                        value={"Select Answer"}
                                        key={"Select Answer"}
                                    >
                                        Select Answer
                                    </option>
                                    {question.options.map(
                                        (option: string): JSX.Element => (
                                            <option value={option} key={option}>
                                                {option}
                                            </option>
                                        )
                                    )}
                                </Form.Select>
                            </Form.Group>
                            {answer === question.expected ? "✔️" : "❌"}{" "}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
