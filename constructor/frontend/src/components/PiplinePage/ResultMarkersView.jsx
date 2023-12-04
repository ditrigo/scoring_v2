import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import MyButton from "../UI/MyButton/MyButton"
import axios from "axios"
import configFile from "../../config.json"

const ResultMarkersView = () => {
  const { modelId } = useParams()
  const { inn } = useParams()
  // const [results, setResults] = useState([])
  const [result, setResult] = useState([])

  // async function getResults() {
  //   axios
  //     .get(`${configFile.apiEndPoint}/inn_res/`)
  //     .then((res) => {
  //       // console.log("Результаты в просмотре ", res.data.data)
  //       setResults(res.data.data)
  //       // setResult((prevState) => [res.data.data.find((el) => el.inn === +inn)])
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }

  async function getResByModelAndInn() {
    try {
      const { data } = await axios.get(
        `${configFile.apiEndPoint}/get_res_by_model_inn/${+modelId}/${+inn}`
      )
      console.log(data.response.markers_and_values)
      setResult(data.response.markers_and_values)
    } catch (error) {
      console.log(
        "🚀 ~ file: ResultMarkersView.jsx:30 ~ getResByModelAndInn ~ error:",
        error
      )
    }
    // axios
    //   .get(`${configFile.apiEndPoint}/get_res_by_model_inn/${+modelId}/${+inn}`)
    //   .then((res) => {
    //     console.log("Результаты  ", res.data.data)
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //   })
  }

  useEffect(() => {
    // getResults()
    getResByModelAndInn()
  }, [])

  // useEffect(() => {
  //   setResult((prevState) => [results.find((el) => el.inn === +inn)])
  // }, [results])

  return (
    <>
      <div
        className="container  mt-3"
        style={{
          overflow: "auto",
        }}
      >
        <div className="row mb-3">
          <Link to="/results">
            <MyButton className="btn btn-outline-secondary">
              К таблице результатов
            </MyButton>
          </Link>
        </div>
        <div className="row m-0">
          <table className="text-center table  table-bordered table-responsive">
            <thead>
              <tr>
                <th scope="col">Название маркера</th>
                <th scope="col">Формула</th>
                <th scope="col">Значение маркера по ИНН {inn}</th>
                <th scope="col">Баллы по ИНН {inn}</th>
                <th scope="col">Ошибки</th>
              </tr>
            </thead>
            <tbody>
              {result[0] && (
                <tr>
                  <td className="text-center">{result[0].marker_name}</td>
                  <td className="text-center">{result[0].formula}</td>
                  <td>
                    {typeof result[0].target_value === "number"
                      ? Math.round(result[0].target_value * 100) / 100
                      : result[0].target_value}{" "}
                  </td>
                  <td>{result[0].value}</td>
                  <td>{result[0].error}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* <table className="text-center table  table-bordered table-responsive">
          <thead>
            <tr>
              <th scope="col">Название маркера</th>
              <th scope="col">Формула</th>
              <th scope="col">Баллы по ИНН {inn}</th>
            </tr>
          </thead>
          <tbody>
            {result[0] &&
              result[0].result_score?.markers_and_values.map((el, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">Название маркера</td>
                    <td className="text-center">{el.formula}</td>
                    <td>{el.value}</td>
                  </tr>
                )
              })}
          </tbody>
        </table> */}
        {/* <Link to="/results">
          <MyButton
            className="btn btn-outline-secondary mt-2"
            onClick={() => {}}
          >
            К таблице результатов
          </MyButton>
        </Link> */}
      </div>
    </>
  )
}

export default ResultMarkersView
