import { ErrorResponse } from "../../shared/types/api";

const clientFetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error((data as ErrorResponse).message);
  }
};

export default clientFetcher;
