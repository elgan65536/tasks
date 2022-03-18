import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Quiz, DEFAULT_QUIZZES } from "./quiz";
import { QuizListView } from "./QuizListView";
import { QuizTakeView } from "./QuizTakeView";

export function Quizzer(): JSX.Element {
    const [quizzes, setQuizzes] = useState<Quiz[]>(DEFAULT_QUIZZES);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz>(DEFAULT_QUIZZES[0]);
    const [mode, setMode] = useState<"take" | "edit" | null>(null);
    return (
        <div>
            <h2>Quizzer</h2>
            <Container>
                <Row>
                    <Col>
                        <h3>Quizzes</h3>
                        {quizzes.map(
                            (quiz: Quiz): JSX.Element =>
                                QuizListView(quiz, setSelectedQuiz, setMode)
                        )}
                        <Button onClick={() => setQuizzes(DEFAULT_QUIZZES)}>
                            Reset Quizzes
                        </Button>
                    </Col>
                    <Col>
                        {mode === null && "Select a quiz to display it here"}
                        {quizzes.map(
                            (quiz: Quiz): JSX.Element =>
                                QuizTakeView(quiz, selectedQuiz, mode)
                        )}
                        {mode === "edit" && (
                            <h3>Editing {selectedQuiz.title}</h3>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
