import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Quiz, DEFAULT_QUIZZES } from "./quiz";
import { QuizListView } from "./QuizListView";
import { QuizTakeView } from "./QuizTakeView";

export function Quizzer(): JSX.Element {
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz>(DEFAULT_QUIZZES[0]);
    const [mode, setMode] = useState<"take" | "edit" | null>(null);
    return (
        <div>
            <h2>Quizzer</h2>
            <Container>
                <Row>
                    <Col>
                        <h3>Quizzes</h3>
                        {DEFAULT_QUIZZES.map(
                            (quiz: Quiz): JSX.Element =>
                                QuizListView(quiz, setSelectedQuiz, setMode)
                        )}
                    </Col>
                    <Col>
                        {mode === null && "Select a quiz to display it here"}
                        {DEFAULT_QUIZZES.map(
                            (quiz: Quiz): JSX.Element =>
                                QuizTakeView(quiz, selectedQuiz, mode)
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
