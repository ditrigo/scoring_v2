import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import MyButton from "../UI/MyButton/MyButton"
import axios from "axios"
import configFile from "../../config.json"

const ResultMarkersView = () => {
  const { modelId } = useParams()
  const { inn } = useParams()
  const [result, setResult] = useState([])

  async function getResByModelAndInn() {
    try {
      const { data } = await axios.get(
        `${configFile.apiEndPoint}/get_res_by_model_inn/${+modelId}/${+inn}`
      )
      console.log("results: ", data.response.markers_and_values)
      setResult(data.response.markers_and_values)
    } catch (error) {
      console.log(
        "🚀 ~ file: ResultMarkersView.jsx:30 ~ getResByModelAndInn ~ error:",
        error
      )
    }
  }

  useEffect(() => {
    getResByModelAndInn()
  }, [])

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
              {result[0] &&
                result.map((res) => {
                  return (
                    <tr>
                      <td className="text-center">{res.marker_name}</td>
                      <td className="text-center">{res.formula}</td>
                      <td>
                        {typeof res.target_value === "number"
                          ? Math.round(res.target_value * 100) / 100
                          : res.target_value}{" "}
                      </td>
                      <td>{res.value}</td>
                      <td>{res.error}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ResultMarkersView
