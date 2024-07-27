import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App component", () => {
  it("renders Hello Twinkl!", () => {
    render(<App />);
    expect(screen.getByText("Hello Twinkl!")).toBeInTheDocument();
  });
});
