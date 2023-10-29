import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const authInstallHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  JSON.parse(event.body || "{}");

  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
}
