import React from "react";
import { Button } from "react-bootstrap";
import { Quiz } from "./quiz";

export function QuizListView(quiz: Quiz) {
    return (
        <div>
            <h4>{quiz.title}</h4>
            <b>Description: </b>
            {quiz.description}
            <br />
            {quiz.questions.length} question
            {quiz.questions.length === 1 ? "" : "s"}
            <br />
            <Button>Take Quiz</Button>
            <Button>Edit Quiz</Button>
        </div>
    );
}
