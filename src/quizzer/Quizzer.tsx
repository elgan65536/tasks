import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Quiz, DEFAULT_QUIZZES, NEW_QUIZ, NEW_QUESTION } from "./quiz";
import { QuizListView } from "./QuizListView";
import { QuizTakeView } from "./QuizTakeView";
import { QuizEditView } from "./QuizEditView";
import { Question } from "../interfaces/question";

export function Quizzer(): JSX.Element {
    const [quizzes, setQuizzes] = useState<Quiz[]>(DEFAULT_QUIZZES);
    const [selectedQuizID, setSelectedQuizId] = useState<number>(0);
    const [mode, setMode] = useState<"take" | "edit" | null>(null);
    const [nextQuizID, setNextQuizID] = useState<number>(4);
    const [nextQuestionID, setNextQuestionID] = useState<number>(7);
    const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
    // function findQuiz(): Quiz {
    //     const foundQuiz = quizzes.find(
    //         (quiz: Quiz): boolean => quiz.id === selectedQuizID
    //     );
    //     if (foundQuiz === undefined) {
    //         return { id: 0, title: "", description: "", questions: [] };
    //     }
    //     return foundQuiz;
    // }

    function deleteQuiz(id: number) {
        setQuizzes(quizzes.filter((quiz: Quiz): boolean => quiz.id !== id));
    }
    function editQuizInfo(id: number, title: string, description: string) {
        const foundQuiz = quizzes.find((quiz: Quiz): boolean => quiz.id === id);
        if (foundQuiz === undefined) {
            return;
        }
        const newQuiz = {
            ...foundQuiz,
            title: title,
            description: description
        };
        setQuizzes(
            quizzes.map((quiz: Quiz): Quiz => (quiz.id === id ? newQuiz : quiz))
        );
    }
    function addQuestion(id: number) {
        const foundQuiz = quizzes.find((quiz: Quiz): boolean => quiz.id === id);
        if (foundQuiz === undefined) {
            return;
        }
        const newQuestion: Question = { ...NEW_QUESTION, id: nextQuestionID };
        const newQuiz = {
            ...foundQuiz,
            questions: [...foundQuiz.questions, newQuestion]
        };
        setNextQuestionID(nextQuestionID + 1);
        setQuizzes(
            quizzes.map((quiz: Quiz): Quiz => (quiz.id === id ? newQuiz : quiz))
        );
    }

    return (
        <div>
            <h2>Quizzer</h2>
            <Container>
                <Row>
                    <Col>
                        <h3>Quizzes</h3>
                        {quizzes.map(
                            (quiz: Quiz): JSX.Element => (
                                <QuizListView
                                    key={quiz.id}
                                    quiz={quiz}
                                    deleteQuiz={deleteQuiz}
                                    setSelectedQuizId={setSelectedQuizId}
                                    setMode={setMode}
                                    setSelectedQuestion={setSelectedQuestion}
                                />
                            )
                        )}
                        <Button
                            onClick={() => {
                                const newQuiz = {
                                    ...NEW_QUIZ,
                                    id: nextQuizID,
                                    questions: [
                                        { ...NEW_QUESTION, id: nextQuestionID }
                                    ]
                                };
                                const modifiedQuizzes: Quiz[] = [
                                    ...quizzes,
                                    newQuiz
                                ];
                                setQuizzes(modifiedQuizzes);
                                setNextQuizID(nextQuizID + 1);
                                setNextQuestionID(nextQuestionID + 1);
                            }}
                        >
                            New Quiz
                        </Button>
                    </Col>
                    <Col>
                        {mode !== null && (
                            <Button
                                onClick={() => {
                                    setMode(null);
                                    setSelectedQuizId(0);
                                }}
                            >
                                Close
                            </Button>
                        )}
                        {mode === null && "Select a quiz to display it here"}
                        <QuizTakeView
                            quizzes={quizzes}
                            selectedQuizId={selectedQuizID}
                            mode={mode}
                            selectedQuestion={selectedQuestion}
                            setSelectedQuestion={setSelectedQuestion}
                        ></QuizTakeView>
                        <QuizEditView
                            quizzes={quizzes}
                            selectedQuizId={selectedQuizID}
                            mode={mode}
                            selectedQuestion={selectedQuestion}
                            setSelectedQuestion={setSelectedQuestion}
                            setQuizInfo={editQuizInfo}
                            addQuestion={addQuestion}
                        ></QuizEditView>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
