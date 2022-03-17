import React from "react";
import { Button } from "react-bootstrap";
import { Quiz } from "./quiz";

export function QuizListView(
    quiz: Quiz,
    setQuiz: (quiz: Quiz) => void,
    setMode: (mode: "take" | "edit" | null) => void
) {
    return (
        <div>
            <h4>{quiz.title}</h4>
            <b>Description: </b>
            {quiz.description}
            <br />
            {quiz.questions.length} question
            {quiz.questions.length === 1 ? "" : "s"}
            <br />
            <Button
                onClick={() => {
                    setQuiz(quiz), setMode("take");
                }}
            >
                Take Quiz
            </Button>
            <Button
                onClick={() => {
                    setQuiz(quiz), setMode("edit");
                }}
            >
                Edit Quiz
            </Button>
        </div>
    );
}
