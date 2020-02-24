import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Button from "./";

let container = null;
beforeEach(() => {
  //configure DOM element as render
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // clean after finish
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a errorMessage", () => {
  act(() => {
    render(<Button />, container);
  });
  expect(container.textContent).toBe("");

  act(() => {
    render(<Button buttonName="Next" />, container);
  });
  expect(container.textContent).toBe("Next");

});