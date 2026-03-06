import { describe, expect, test } from "vitest";
import App from "../App";
import { fireEvent, render, screen } from "@testing-library/react";

describe("App Unit Testing", () => {
  test("make sure bahwa heading itu nilainya Roberto Santoso", () => {
    render(<App />);
    screen.debug();
    const webTitle = screen.getByTestId("web__title");
    //   isi dari webTitle itu harus! Roberto Santoso
    expect(webTitle).toHaveTextContent(/^Roberto Santoso$/);
    // expect(webTitle).toHaveTextContent("Roberto Santoso");
  });

  // Button Counter +
  test("make sure bahwa button itu nilainya 0, +", () => {
    render(<App />);
    screen.debug();
    const buttonCounter = screen.getByTestId("button__counter");
    fireEvent.click(buttonCounter);
    expect(buttonCounter.textContent).toBe("1");
  });

  // Button Counter -
  test("make sure bahwa button itu nilainya 0, -", () => {
    render(<App />);
    screen.debug();
    const buttonCounter = screen.getByTestId("button__counter");
    const buttonDecrement = screen.getByTestId("button__decrement");
    fireEvent.click(buttonCounter);
    fireEvent.click(buttonDecrement);
    expect(buttonCounter.textContent).toBe("0");
  });
});
