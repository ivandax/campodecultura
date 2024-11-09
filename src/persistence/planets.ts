import { Resource, Result } from "@src/domain/Result";
import { get } from "@src/persistence";
import { Planet } from "@src/domain/Planet";
import { mockData } from "./mockData";

async function getPlanets() {
  const url = "https://swapi.dev/api/planets";
  const result = await get<Resource<Planet>>(url);
  return result;
}

function getMockPlanets(): Result<Resource<Planet>> {
  const result: Result<Resource<Planet>> = {
    error: null,
    data: mockData as Resource<Planet>,
  };
  return result;
}

export { getPlanets, getMockPlanets };
