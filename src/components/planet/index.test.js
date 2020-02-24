import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Planet from "./";

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

it("renders user data", async () => {
  const fakePlanet = {
    url: 'https://swapi.co/api/planets/1/',
    name: 'Tatoine',
    population: "100000",
    climate: 'frozem',
    terrain: 'terrain',
    films: ['https://swapi.co/api/films/1/','https://swapi.co/api/films/1/']
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakePlanet)
    })
  );

  // user assinc version of the act to aply Promises resolved
  await act(async () => {
    render(<Planet planet={fakePlanet} />, container);
  });
  
  expect(container.querySelector('[data-testid="population"]').textContent).toEqual(fakePlanet.population);
  expect(container.querySelector('[data-testid="climated"]').textContent).toEqual(fakePlanet.climate);
  expect(container.querySelector('[data-testid="terrain"]').textContent).toEqual(fakePlanet.terrain);
  expect(container.querySelector('[data-testid="totalFilms"]').textContent).toEqual(fakePlanet.films.length + " films");
  expect(container.textContent).toContain("");

  // remove the mock to garanty test isolation
  global.fetch.mockRestore();
});