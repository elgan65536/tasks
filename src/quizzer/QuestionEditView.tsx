import React from "react";
import { Button, Form } from "react-bootstrap";
import { Question, QuestionType } from "../interfaces/question";
import { Quiz } from "./quiz";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

interface questionEditViewProps {
    quizzes: Quiz[];
    selectedQuizId: number;
    selectedQuestion: number;
    editQuestionInfo: (
        id: number,
        name: string,
        body: string,
        type: QuestionType,
        expected: string,
        points: number,
        published: boolean
    ) => void;
    deleteQuestion: (id: number) => void;
}

export function QuestionEditView({
    quizzes,
    selectedQuizId,
    selectedQuestion,
    editQuestionInfo,
    deleteQuestion
}: questionEditViewProps): JSX.Element {
    function findQuiz(): Quiz {
        const foundQuiz = quizzes.find(
            (quiz: Quiz): boolean => quiz.id === selectedQuizId
        );
        if (foundQuiz === undefined) {
            return { id: 0, title: "", description: "", questions: [] };
        }
        return foundQuiz;
    }
    function findQuestion(): Question {
        return findQuiz().questions[selectedQuestion];
    }
    function updateName(event: ChangeEvent) {
        const question: Question = findQuiz().questions[selectedQuestion];
        editQuestionInfo(
            question.id,
            event.target.value,
            question.body,
            question.type,
            question.expected,
            question.points,
            question.published
        );
    }
    function updateBody(event: ChangeEvent) {
        const question: Question = findQuiz().questions[selectedQuestion];
        editQuestionInfo(
            question.id,
            question.name,
            event.target.value,
            question.type,
            question.expected,
            question.points,
            question.published
        );
    }
    function updateType(event: ChangeEvent) {
        const question: Question = findQuiz().questions[selectedQuestion];
        editQuestionInfo(
            question.id,
            question.name,
            question.body,
            event.target.value as QuestionType,
            question.expected,
            question.points,
            question.published
        );
    }
    function updateExpected(event: ChangeEvent) {
        const question: Question = findQuiz().questions[selectedQuestion];
        editQuestionInfo(
            question.id,
            question.name,
            question.body,
            question.type,
            event.target.value,
            question.points,
            question.published
        );
    }
    function updatePoints(event: ChangeEvent) {
        const question: Question = findQuiz().questions[selectedQuestion];
        editQuestionInfo(
            question.id,
            question.name,
            question.body,
            question.type,
            question.expected,
            parseInt(event.target.value) || 0,
            question.published
        );
    }
    function updatePublished(event: React.ChangeEvent<HTMLInputElement>) {
        const question: Question = findQuiz().questions[selectedQuestion];
        editQuestionInfo(
            question.id,
            question.name,
            question.body,
            question.type,
            question.expected,
            question.points,
            event.target.checked
        );
    }

    return (
        <div>
            <h3>Editing {findQuestion().name}</h3>
            <Form.Group controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    value={findQuiz().questions[selectedQuestion].name}
                    onChange={updateName}
                />
            </Form.Group>
            <Form.Group controlId="formBody">
                <Form.Label>Body:</Form.Label>
                <Form.Control
                    as={"textarea"}
                    rows={5}
                    value={findQuiz().questions[selectedQuestion].body}
                    onChange={updateBody}
                />
            </Form.Group>
            Type:{" "}
            <Form.Check
                inline
                type="radio"
                name="type"
                onChange={updateType}
                label="Multiple Choice"
                value="multiple_choice_question"
                checked={
                    findQuiz().questions[selectedQuestion].type ===
                    "multiple_choice_question"
                }
            ></Form.Check>
            <Form.Check
                inline
                type="radio"
                name="type"
                onChange={updateType}
                label="Short Answer"
                value="short_answer_question"
                checked={
                    findQuiz().questions[selectedQuestion].type ===
                    "short_answer_question"
                }
            ></Form.Check>
            <Form.Group controlId="formExpected">
                <Form.Label>Expecxted Answer:</Form.Label>
                <Form.Control
                    value={findQuiz().questions[selectedQuestion].expected}
                    onChange={updateExpected}
                />
            </Form.Group>
            <Form.Group controlId="formPoints">
                <Form.Label>Points:</Form.Label>
                <Form.Control
                    value={findQuiz().questions[selectedQuestion].points}
                    onChange={updatePoints}
                    type={"number"}
                />
            </Form.Group>
            <Form.Check
                type="checkbox"
                label="Published?"
                checked={findQuiz().questions[selectedQuestion].published}
                onChange={updatePublished}
            />
            <Button
                data-testid={"Question Delete Button"}
                style={{ backgroundColor: "red" }}
                onClick={() =>
                    deleteQuestion(findQuiz().questions[selectedQuestion].id)
                }
                disabled={findQuiz().questions.length <= 1}
            >
                Delete Question
            </Button>
        </div>
    );
}
