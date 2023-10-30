export class WebhookMessage {
  private message: string

  constructor(message: string) {
    this.message = message
  }
  async send() {
    const { default: got } = await import("got")
    return got.post(this.url, {
      json: { text: this.message },
    })
  }

  private get url() {
    return process.env.SLACK_WEBHOOK_URL || ""
  }
}
