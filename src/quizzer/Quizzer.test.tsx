import React from "react";
import { render } from "@testing-library/react";
import { Quizzer } from "./Quizzer";

describe("Quizzer Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
    });
    test("The Quizzer renders", () => {
        //expect(screen.findByText("Quizzer")).toBeInTheDocument;
    });
});
