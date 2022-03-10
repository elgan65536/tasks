import React, { useState } from "react";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const COLORS: string[] = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "cyan",
    "magenta",
    "white",
    "black"
];

export function ChangeColor(): JSX.Element {
    const [selectedColor, setSelectedColor] = useState<string>("red");
    function updateColor(event: ChangeEvent) {
        setSelectedColor(event.target.value);
    }

    return (
        <div>
            <h3>Change Color</h3>
            {COLORS.map(
                (color: string): JSX.Element => (
                    <Form.Check
                        inline
                        type="radio"
                        name="color"
                        onChange={updateColor}
                        id={"response-" + color}
                        key={color}
                        label={
                            <div style={{ backgroundColor: color }}>
                                {color}
                            </div>
                        }
                        value={color}
                        checked={selectedColor === color}
                    />
                )
            )}
            <br />
            the color is{" "}
            {
                <span
                    style={{ backgroundColor: selectedColor }}
                    data-testid="colored-box"
                >
                    {selectedColor}
                </span>
            }
        </div>
    );
}
