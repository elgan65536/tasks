import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { MCQuestionView } from "./MCQuestionView";
import { Quiz } from "./quiz";
import { SAQuestionView } from "./SAQuestionView";

interface quizTakeViewProps {
    quizzes: Quiz[];
    selectedQuizId: number;
    mode: "take" | "edit" | null;
    selectedQuestion: number;
    setSelectedQuestion: (newSeleted: number) => void;
}

export function QuizTakeView({
    quizzes,
    selectedQuizId,
    mode,
    selectedQuestion,
    setSelectedQuestion
}: quizTakeViewProps): JSX.Element {
    const [unpublishedVisible, setUnpublishedVisible] = useState<boolean>(true);
    function findQuiz(): Quiz {
        const foundQuiz = quizzes.find(
            (quiz: Quiz): boolean => quiz.id === selectedQuizId
        );
        if (foundQuiz === undefined) {
            return { id: 0, title: "", description: "", questions: [] };
        }
        return foundQuiz;
    }
    return (
        <div>
            {mode === "take" && (
                <div>
                    <h3>{findQuiz().title}</h3>
                    <Button
                        onClick={() =>
                            setUnpublishedVisible(!unpublishedVisible)
                        }
                    >
                        {unpublishedVisible && "Hide"}
                        {!unpublishedVisible && "Show"} Unpublished Questions
                    </Button>
                    <br />
                    {!findQuiz().questions[selectedQuestion].published &&
                        !unpublishedVisible &&
                        "this question is unPublished."}
                    <SAQuestionView
                        question={findQuiz().questions[selectedQuestion]}
                        unPublishedVisible={unpublishedVisible}
                    />
                    <MCQuestionView
                        question={findQuiz().questions[selectedQuestion]}
                        unPublishedVisible={unpublishedVisible}
                    />
                    <Button
                        onClick={() =>
                            setSelectedQuestion(selectedQuestion - 1)
                        }
                        disabled={selectedQuestion === 0}
                    >
                        {"<-"} Previous Question
                    </Button>
                    <Button
                        onClick={() =>
                            setSelectedQuestion(selectedQuestion + 1)
                        }
                        disabled={
                            selectedQuestion === findQuiz().questions.length - 1
                        }
                    >
                        Next Question {"->"}
                    </Button>
                </div>
            )}
        </div>
    );
}
