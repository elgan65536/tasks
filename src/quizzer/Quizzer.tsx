import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Quiz, DEFAULT_QUIZZES } from "./quiz";
import { QuizListView } from "./QuizListView";

export function Quizzer(): JSX.Element {
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [mode, setMode] = useState<"take" | "edit" | null>(null);
    return (
        <div>
            <h3>Quizzer</h3>
            <Container>
                <Row>
                    <Col>
                        <h3>Quizzes</h3>
                        {DEFAULT_QUIZZES.map(
                            (quiz: Quiz): JSX.Element => QuizListView(quiz)
                        )}
                    </Col>
                    <Col>
                        {(selectedQuiz === null || mode === null) &&
                            "Select a quiz to display it here"}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
