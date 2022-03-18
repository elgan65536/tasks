import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Question } from "../interfaces/question";
import { MCQuestionView } from "./MCQuestionView";
import { Quiz } from "./quiz";
import { SAQuestionView } from "./SAQuestionView";

export function QuizTakeView(
    quiz: Quiz,
    selectedQuiz: Quiz,
    mode: "take" | "edit" | null
): JSX.Element {
    const [unpublishedVisible, setUnpublishedVisible] = useState<boolean>(true);
    return (
        <div>
            {quiz === selectedQuiz && mode === "take" && (
                <div>
                    <h3>{quiz.title}</h3>
                    <Button
                        onClick={() =>
                            setUnpublishedVisible(!unpublishedVisible)
                        }
                    >
                        {unpublishedVisible && "Hide"}
                        {!unpublishedVisible && "Show"} unpublished questions
                    </Button>
                    {quiz.questions.map(
                        (question: Question): JSX.Element =>
                            question.type === "multiple_choice_question" ? (
                                <MCQuestionView
                                    options={question.options}
                                    expectedAnswer={question.expected}
                                    body={question.body}
                                    published={question.published}
                                    unpublishedVisible={unpublishedVisible}
                                    key={question.name + " view"}
                                />
                            ) : (
                                <SAQuestionView
                                    expectedAnswer={question.expected}
                                    body={question.body}
                                    published={question.published}
                                    unpublishedVisible={unpublishedVisible}
                                    key={question.name + " view"}
                                />
                            )
                    )}
                </div>
            )}
        </div>
    );
}
