import axios from "axios"
import configFile from "../../config.json"

export const transformData = (data, keyInNativeObj, keyName) => {
  // console.log(data)
  const result = data.map((el) => ({
    id: el.id,
    label: el[keyInNativeObj],
    value: el.id,
    name: keyName,
  }))
  result.unshift({
    id: "",
    label: "Пусто",
    value: "",
    name: keyName,
  })
  return result
}

export function getTransformedData(
  endPoint,
  setDataState,
  keyInNativeObj,
  keyName
) {
  axios
    // .get(`http://127.0.0.1:8000/api/${endPoint}/`)
    .get(`${configFile.apiEndPoint}/${endPoint}/`)
    .then((res) => {
      // console.log(`${endPoint} `, res.data)
      setDataState(transformData(res.data.data, keyInNativeObj, keyName))
    })
    .catch((e) => {
      console.log(e)
    })
}

export const transformManagersData = (data) => {
  const result = data.map((el) => ({
    id: el.id,
    label: `${el.second_name} ${el.first_name} ${el.patronymic} ${el.job_title}`,
    // Denis
    value: el.id,
    name: "manager_id",
  }))
  result.unshift({
    id: "",
    label: `Пусто`,
    value: ``,
    name: "manager_id",
  })
  return result
}

export const transformRegionsData = (data) => {
  const result = data.map((el) => ({
    id: el.id,
    label: `${el.region_number} ${el.region}`,
    // Denis
    value: el.id,
    name: "region_id",
  }))
  result.unshift({
    id: "",
    label: `Пусто`,
    value: ``,
    name: "region_id",
  })
  return result
}
