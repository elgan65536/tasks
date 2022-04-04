import { Question } from "../interfaces/question";

export interface Quiz {
    id: number;
    questions: Question[];
    title: string;
    description: string;
}

export const NEW_QUIZ: Quiz = {
    id: 0,
    title: "New Quiz",
    description: "no description entered",
    questions: []
};

export const NEW_QUESTION: Question = {
    id: 0,
    name: "new Question",
    body: "no body entered",
    type: "short_answer_question",
    options: [],
    expected: "",
    points: 1,
    published: false
};

export const DEFAULT_QUIZZES: Quiz[] = [
    {
        id: 1,
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
            },
            {
                id: 3,
                name: "triangle question",
                body: "one side of a triangle is 3 inches long. The angle of the vertex opposite this side is 30 degrees. What is the diameter, in inches, of a circle that touches all three of the triangle's vertices?",
                type: "short_answer_question",
                options: [],
                expected: "6",
                points: 10,
                published: false
            }
        ]
    },
    {
        id: 2,
        title: "History Quiz",
        description: "tests your knowledge of history",
        questions: [
            {
                id: 4,
                name: "president question",
                body: "who is the second president of the United States?",
                type: "multiple_choice_question",
                options: [
                    "Washington",
                    "Adams",
                    "Jefferson",
                    "Lincoln",
                    "Obama"
                ],
                expected: "Adams",
                points: 6,
                published: true
            }
        ]
    },
    {
        id: 3,
        title: "English Quiz",
        description:
            "tests whether or not you know the second letter of the alphabet",
        questions: [
            {
                id: 5,
                name: "alphabet question",
                body: "What is the second letter of the alphabet?",
                type: "multiple_choice_question",
                options: ["A", "B", "C", "D", "🅱"],
                expected: "B",
                points: 3,
                published: true
            }
        ]
    }
];
