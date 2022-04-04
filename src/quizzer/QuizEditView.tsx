import React from "react";
import { Button, Form } from "react-bootstrap";
import { Question, QuestionType } from "../interfaces/question";
import { QuestionEditView } from "./QuestionEditView";
import { Quiz } from "./quiz";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

interface quizEditViewProps {
    quizzes: Quiz[];
    selectedQuizId: number;
    mode: "take" | "edit" | null;
    selectedQuestion: number;
    setQuizzes: (newQuizzes: Quiz[]) => void;
    setSelectedQuestion: (newSelected: number) => void;
    setQuizInfo: (id: number, title: string, description: string) => void;
    addQuestion: (id: number) => void;
}

export function QuizEditView({
    quizzes,
    selectedQuizId,
    mode,
    selectedQuestion,
    setQuizzes,
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
    function editQuestionInfo(
        id: number,
        name: string,
        body: string,
        type: QuestionType,
        expected: string,
        points: number,
        published: boolean
    ) {
        const foundQuestion = findQuiz().questions.find(
            (question: Question): boolean => question.id === id
        );
        if (foundQuestion === undefined) {
            return;
        }
        const newQuestion: Question = {
            ...foundQuestion,
            name: name,
            body: body,
            type: type,
            expected: expected,
            points: points,
            published: published
        };
        const newQuiz = {
            ...findQuiz(),
            questions: findQuiz().questions.map(
                (question: Question): Question =>
                    question.id === id ? newQuestion : question
            )
        };
        setQuizzes(
            quizzes.map(
                (quiz: Quiz): Quiz =>
                    quiz.id === selectedQuizId ? newQuiz : quiz
            )
        );
    }
    function deleteQuestion(id: number) {
        const newQuestions: Question[] = findQuiz().questions.filter(
            (question: Question): boolean => question.id !== id
        );
        const newQuiz: Quiz = { ...findQuiz(), questions: newQuestions };
        setQuizzes(
            quizzes.map(
                (quiz: Quiz): Quiz =>
                    quiz.id === selectedQuizId ? newQuiz : quiz
            )
        );
        setSelectedQuestion(selectedQuestion === 0 ? 0 : selectedQuestion - 1);
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
                    <QuestionEditView
                        quizzes={quizzes}
                        selectedQuizId={selectedQuizId}
                        selectedQuestion={selectedQuestion}
                        editQuestionInfo={editQuestionInfo}
                        deleteQuestion={deleteQuestion}
                    />
                    <Button
                        data-testid={"Question Add Button"}
                        style={{ backgroundColor: "green" }}
                        onClick={() => addQuestion(selectedQuizId)}
                    >
                        Add Question
                    </Button>
                    <br />
                    <Button
                        onClick={() =>
                            setSelectedQuestion(selectedQuestion - 1)
                        }
                        disabled={selectedQuestion <= 0}
                    >
                        {"<-"} Previous Question
                    </Button>{" "}
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
