import { Resource, Result } from "@src/domain/Result";
import { mockData } from "./mockData";
import { Publication } from "@src/domain/Publication";

function getMockPublications(): Result<Resource<Publication>> {
  const result: Result<Resource<Publication>> = {
    error: null,
    data: mockData as Resource<Publication>,
  };
  return result;
}

export { getMockPublications };
