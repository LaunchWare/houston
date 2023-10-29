export class TogglClient {
  async http() {
    const { default: got } = await import("got");
    return got.extend({
      prefixUrl: `https://api.track.toggl.com/api/v9/workspaces/${this.workspaceId}/`,
      username: this.togglApiToken,
      password: "api_token",
    })
  }

  public static get instance() {
    return new TogglClient();
  }

  get togglApiToken() {
    return process.env.TOGGL_API_TOKEN;
  }

  get workspaceId() {
    return process.env.TOGGL_WORKSPACE_ID;
  }
}
