import httpService from "./http.service"

const modelEndPoint = `scoring_model/`

const modelService = {
  get: async () => {
    const { data } = await httpService.get(modelEndPoint)
    return data
  },
  post: async (payload) => {
    const { data } = await httpService.post(modelEndPoint, payload)
    return data
  },
  getLinkedMarkers: async (id) => {
    const { data } = await httpService.get(modelEndPoint + id)
    return data
  },
  delete: async (id) => {
    const { data } = await httpService.delete(modelEndPoint + id)
    return data
  },
  put: async (id, payload) => {
    const { data } = await httpService.put(modelEndPoint + id, payload)
    return data
  },
}

export default modelService
