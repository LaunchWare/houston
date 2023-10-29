import { Client } from "./Client"
import { TogglClient } from "./TogglClient"

export const buildClientMap = async () => {
  const http = await TogglClient.instance.http()
  const resp = await http.get<Client[]>("clients", {
    searchParams: { status: "active" },
    responseType: "json",
  })

  return resp.body.reduce((map: Record<string, string>, client) => {
    if (!client.name.match(/Launch Academy/i)) {
      map[client.id.toString()] = client.name
    }
    return map
  }, {})
}
