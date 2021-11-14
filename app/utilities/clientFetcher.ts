import { ErrorResponse } from "../../shared/types/api";

const clientFetcher = (url: string) =>
  fetch(url).then(async (response) => {
    if (!response.ok) {
      const errorMessage = (await response.json()) as ErrorResponse;
      throw new Error(errorMessage.message);
    }
    return response.json();
  });

export default clientFetcher;
