import { APIGatewayEventRequestContext, APIGatewayProxyEvent } from 'aws-lambda';

import { App, AwsLambdaReceiver, LogLevel } from "@slack/bolt";
import { SlackConfiguration } from '../bot/SlackConfiguration';
import { AwsCallback } from '@slack/bolt/dist/receivers/AwsLambdaReceiver';

const slackConfiguration = SlackConfiguration.instance

export const receiver = new AwsLambdaReceiver({
  logLevel: LogLevel.DEBUG,
  signingSecret: slackConfiguration.signingSecret
})

const app = new App({
  // clientId: slackConfiguration.clientId,
  // clientSecret: slackConfiguration.clientSecret,
  token: slackConfiguration.token,
  receiver,
})

app.command('/confirmbillable', async ({ command, ack, say }) => {
  await ack()
  await say("pong")
})

export const botHandler = async (event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext, callback: AwsCallback) => {
  if (event.headers["Content-Type"] === "application/json") {
    const json = JSON.parse(event.body || "{}");
    if (json?.type === "url_verification") {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge: json.challenge }),
      };
    }
  }
  else {
    const handler = await receiver.start();
    return await handler(event, context, callback);
  }
}
