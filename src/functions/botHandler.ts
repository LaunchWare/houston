import { APIGatewayEventRequestContext, APIGatewayProxyEvent } from 'aws-lambda';

import { App, AwsLambdaReceiver } from "@slack/bolt";
import { SlackConfiguration } from '../bot/SlackConfiguration';
import { AwsCallback } from '@slack/bolt/dist/receivers/AwsLambdaReceiver';
import { BillableSummaryMessage } from '../bot/BillableSummaryMessage';

const slackConfiguration = SlackConfiguration.instance

export const receiver = new AwsLambdaReceiver({
  signingSecret: slackConfiguration.signingSecret
})

const app = new App({
  // clientId: slackConfiguration.clientId,
  // clientSecret: slackConfiguration.clientSecret,
  socketMode: false,
  token: slackConfiguration.token,
  receiver,
})

app.command("/confirm-weekly-hours", async ({ ack, say, command }) => {
  await ack()
  const args = command.text.split(" ")
  const summary = new BillableSummaryMessage(new Date(args[0]), new Date(args[1]))
  const summaryMessages = [`<!here> Please confirm your time for the period of ${args[0]} and ${args[1]}`, ...(await summary.build())]
  await say(summaryMessages.join("\n"))
})

app.command("/confirm-for-invoices", async ({ ack, say, command }) => {
  await ack()
  const args = command.text.split(" ")
  const summary = new BillableSummaryMessage(new Date(args[0]), new Date(args[1]))
  const summaryMessages = ["<!here> Please confirm your time and share what you worked on", ...(await summary.build())]
  await say(summaryMessages.join("\n"))
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
