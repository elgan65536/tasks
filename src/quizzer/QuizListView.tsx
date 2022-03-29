import React from "react";
import { Button } from "react-bootstrap";
import { Quiz } from "./quiz";

interface quizListProps {
    quiz: Quiz;
    deleteQuiz: (id: number) => void;
    setSelectedQuizId: (id: number) => void;
    setMode: (mode: "take" | "edit" | null) => void;
    setSelectedQuestion: (selectedQuestion: number) => void;
}

export function QuizListView({
    quiz,
    deleteQuiz,
    setSelectedQuizId,
    setMode,
    setSelectedQuestion
}: quizListProps) {
    return (
        <div>
            <h4>{quiz.title}</h4>
            <b>Description: </b>
            {quiz.description}
            <br />
            id: {quiz.id}
            <br />
            {quiz.questions.length} question
            {quiz.questions.length === 1 ? "" : "s"}
            <br />
            <Button
                onClick={() => {
                    setSelectedQuizId(quiz.id), setMode("take");
                    setSelectedQuestion(0);
                }}
                disabled={quiz.questions.length === 0}
            >
                Take Quiz
            </Button>{" "}
            <Button
                onClick={() => {
                    setSelectedQuizId(quiz.id), setMode("edit");
                }}
            >
                Edit Quiz
            </Button>{" "}
            <Button
                style={{ backgroundColor: "red" }}
                onClick={() => {
                    deleteQuiz(quiz.id), setMode(null);
                }}
            >
                Delete Quiz
            </Button>
        </div>
    );
}
