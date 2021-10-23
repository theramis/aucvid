import { Handler, APIGatewayEvent } from "aws-lambda";
import { getData } from "./dataRetriever";

let data: any = null;

const handler: Handler = async (event: APIGatewayEvent): Promise<any> => {
  if (data === null) {
    data = getData();
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: {
      "Cache-Control": "public, s-maxage=1800",
      "Content-Type": "application/json",
    },
  };
};

export { handler };
