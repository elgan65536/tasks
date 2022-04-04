import React from "react";
import { render, screen } from "@testing-library/react";
import { Quizzer } from "./Quizzer";

describe("Quizzer Tests", () => {
    beforeEach(() => {
        render(<Quizzer />);
    });
    test("The Quizzer renders", () => {
        expect(screen.findByText("Quizzer")).toBeInTheDocument;
    });
    test("The Default Quizzes are visible", () => {
        expect(screen.findByText("Math Quiz")).toBeInTheDocument;
        expect(screen.findByText("English Quiz")).toBeInTheDocument;
        expect(screen.findByText("History Quiz")).toBeInTheDocument;
    });
    test("The quizzer is not in take or edit mode", () => {
        expect(screen.findByText("Select a quiz to display it here"))
            .toBeInTheDocument;
    });
    test("Pressing a take button puts the quizzer in take mode", () => {
        const take = screen.getByTestId("Math Quiz Take Button");
        take.click();
        expect(screen.findByText("Select a quiz to display it here")).not
            .toBeInTheDocument;
        expect(screen.findByText("Taking Math Quiz")).toBeInTheDocument;
    });
    test("Pressing a edit button puts the quizzer in edit mode", () => {
        const edit = screen.getByTestId("Math Quiz Edit Button");
        edit.click();
        expect(screen.findByText("Select a quiz to display it here")).not
            .toBeInTheDocument;
        expect(screen.findByText("Editing Math Quiz")).toBeInTheDocument;
    });
    test("Pressing a delete button deletes a quiz", () => {
        const deleteb = screen.getByTestId("Math Quiz Delete Button");
        deleteb.click();
        expect(screen.findByText("Math Quiz")).not.toBeInTheDocument;
    });
    test("new quiz can be added", () => {
        const add = screen.getByRole("button", { name: /New Quiz/i });
        add.click();
        expect(screen.findByText("New Quiz")).toBeInTheDocument;
        expect(screen.findByText("no description entered")).toBeInTheDocument;
    });
    test("multiple choice questions can exist", () => {
        const take = screen.getByTestId("Math Quiz Take Button");
        take.click();
        expect(screen.findByRole("combobox")).toBeInTheDocument;
        expect(screen.findByRole("textbox")).not.toBeInTheDocument;
    });
    test("short answer questions can exist", () => {
        const take = screen.getByTestId("Math Quiz Take Button");
        take.click();
        const next = screen.getByTestId("Next Button");
        next.click();
        expect(screen.findByRole("textbox")).toBeInTheDocument;
    });
    test("unpublished questions are hidden by default", () => {
        const take = screen.getByTestId("Math Quiz Take Button");
        take.click();
        const next = screen.getByTestId("Next Button");
        next.click();
        next.click();
        expect(screen.findByText("this question is unPublished."))
            .toBeInTheDocument;
    });
    test("unpublished questions can be shown", () => {
        const take = screen.getByTestId("Math Quiz Take Button");
        take.click();
        const next = screen.getByTestId("Next Button");
        next.click();
        next.click();
        const hide = screen.getByTestId("Hide Unpublished Button");
        hide.click;
        expect(screen.findByText("this question is unPublished.")).not
            .toBeInTheDocument;
    });
});
