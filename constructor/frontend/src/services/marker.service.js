import httpService from "./http.service"

const markerEndPoint = `marker_attributes/`

const markerSrvice = {
  get: async () => {
    const { data } = await httpService.get(markerEndPoint)
    return data
  },
  post: async (payload) => {
    const { data } = await httpService.post(markerEndPoint, payload)
    return data
  },
  delete: async (id) => {
    const { data } = await httpService.delete(markerEndPoint + id)
    return data
  },
  postCreateRelation: async (endPoint, payload) => {
    const { data } = await httpService.post(markerEndPoint + endPoint, payload)
    return data
  },
}

export default markerSrvice
