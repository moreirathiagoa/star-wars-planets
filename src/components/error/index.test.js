import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Error from "./";

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
    render(<Error />, container);
  });
  expect(container.textContent).toBe("");

  act(() => {
    render(<Error errorMessage="Problems during server access." />, container);
  });
  expect(container.textContent).toBe("Problems during server access.");

});