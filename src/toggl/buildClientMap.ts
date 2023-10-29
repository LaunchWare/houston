import { Client } from "./Client"
import { TogglClient } from "./TogglClient"

export const buildClientMap = async () => {
  const http = await TogglClient.instance.http()
  const resp = await http.get<Client[]>("clients", {
    searchParams: { status: "active" },
    responseType: "json",
  })

  return resp.body.reduce((map: Record<string, string>, client) => {
    if (client.name && !client.name.match(/Launch Academy/i) && !client.name.match(/Launchers/)) {
      map[client.id.toString()] = client.name
    }
    return map
  }, {})
}
