import { User } from "./User"
import { TogglClient } from "./TogglClient"

export const buildUserMap = async () => {
  const http = await TogglClient.instance.http()
  const resp = await http.get<User[]>("users", {
    searchParams: { status: "active" },
    responseType: "json",
  })

  return resp.body.reduce((map: Record<string, string>, user) => {
    if (user.is_active && !user.inactive) {
      map[user.id.toString()] = user.fullname
    }
    return map
  }, {})
}
