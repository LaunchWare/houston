export class SlackConfiguration {
  public get appId() {
    return process.env.SLACK_APP_ID;
  }

  public get clientId() {
    return process.env.SLACK_CLIENT_ID || "";
  }

  public get clientSecret() {
    return process.env.SLACK_CLIENT_SECRET || "";
  }

  public get signingSecret() {
    return process.env.SLACK_SIGNING_SECRET || "";
  }

  public get token() {
    return process.env.SLACK_BOT_TOKEN || "";
  }

  public static get instance() {
    return new SlackConfiguration();
  }
}
