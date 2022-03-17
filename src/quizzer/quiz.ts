import { Question } from "../interfaces/question";

export {};

export interface Quiz {
    questions: Question[];
    title: string;
    description: string;
}

export const DEFAULT_QUIZZES: Quiz[] = [
    {
        title: "Math Quiz",
        description: "tests your math skills",
        questions: [
            {
                id: 1,
                name: "addition qestion",
                body: "what is 9 + 16",
                type: "multiple_choice_question",
                options: ["20", "25", "30"],
                expected: "25",
                points: 5,
                published: true
            },
            {
                id: 2,
                name: "multiplication question",
                body: "what is 12 * 18",
                type: "short_answer_question",
                options: [],
                expected: "216",
                points: 10,
                published: true
            }
        ]
    },
    {
        title: "History Quiz",
        description: "tests your knowledge of history",
        questions: []
    },
    {
        title: "English Quiz",
        description:
            "tests whether or not you know the second letter of the alphabet",
        questions: [
            {
                id: 1,
                name: "alphabet question",
                body: "What is the second letter of the alphabet?",
                type: "multiple_choice_question",
                options: ["A", "B", "C", "D"],
                expected: "B",
                points: 3,
                published: true
            }
        ]
    }
];
