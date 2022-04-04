import React from "react";
import { Button, Form } from "react-bootstrap";
import { Quiz } from "./quiz";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

interface quizEditViewProps {
    quizzes: Quiz[];
    selectedQuizId: number;
    mode: "take" | "edit" | null;
    selectedQuestion: number;
    setSelectedQuestion: (newSelected: number) => void;
    setQuizInfo: (id: number, title: string, description: string) => void;
    addQuestion: (id: number) => void;
}

export function QuizEditView({
    quizzes,
    selectedQuizId,
    mode,
    selectedQuestion,
    setSelectedQuestion,
    setQuizInfo,
    addQuestion
}: quizEditViewProps): JSX.Element {
    function findQuiz(): Quiz {
        const foundQuiz = quizzes.find(
            (quiz: Quiz): boolean => quiz.id === selectedQuizId
        );
        if (foundQuiz === undefined) {
            return { id: 0, title: "", description: "", questions: [] };
        }
        return foundQuiz;
    }
    function updateTitle(event: ChangeEvent) {
        setQuizInfo(selectedQuizId, event.target.value, findQuiz().description);
    }
    function updateDescription(event: ChangeEvent) {
        setQuizInfo(selectedQuizId, findQuiz().title, event.target.value);
    }

    return (
        <div>
            {mode === "edit" && (
                <div>
                    <h3>Editing {findQuiz().title}</h3>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            value={findQuiz().title}
                            onChange={updateTitle}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            value={findQuiz().description}
                            onChange={updateDescription}
                        />
                    </Form.Group>
                    <Button onClick={() => addQuestion(selectedQuizId)}>
                        New Question
                    </Button>
                    <Button
                        onClick={() =>
                            setSelectedQuestion(selectedQuestion - 1)
                        }
                        disabled={selectedQuestion <= 0}
                    >
                        {"<-"} Previous Question
                    </Button>
                    <Button
                        onClick={() =>
                            setSelectedQuestion(selectedQuestion + 1)
                        }
                        disabled={
                            selectedQuestion >= findQuiz().questions.length - 1
                        }
                    >
                        Next Question {"->"}
                    </Button>
                </div>
            )}
        </div>
    );
}
