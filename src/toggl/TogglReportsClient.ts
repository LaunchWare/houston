import { TogglClient } from "./TogglClient";

export class TogglReportsClient extends TogglClient {
  async http() {
    const client = await super.http();
    return client.extend({
      prefixUrl: `https://api.track.toggl.com/reports/api/v3/workspace/${this.workspaceId}/`,
    });
  }

  public static get instance() {
    return new TogglReportsClient();
  }
}
