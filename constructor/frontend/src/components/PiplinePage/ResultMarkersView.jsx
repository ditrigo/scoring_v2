import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import MyButton from "../UI/MyButton/MyButton"
import axios from "axios"

const ResultMarkersView = () => {
  const { inn } = useParams()
  const [results, setResults] = useState([])
  const [result, setResult] = useState([])

  async function getResults() {
    axios
      .get("http://127.0.0.1:8000/api/inn_res/")
      .then((res) => {
        console.log("Результаты в просмотре ", res.data.data)
        setResults(res.data.data)
        setResult((prevState) => [res.data.data.find((el) => el.inn === +inn)])
      })
      .catch((e) => {
        console.log(e)
      })
  }
  useEffect(() => {
    getResults()
  }, [])

  useEffect(() => {
    setResult((prevState) => [results.find((el) => el.inn === +inn)])
  }, [results])

  //   const formula =
  //     results &&
  //     results.find((el) => el.inn === +inn)?.result_score?.markers_and_values
  //   console.log("result", result && result[0].result_score.markers_and_values)

  return (
    <>
      <div
        className="container mt-5 mb-5"
        style={{
          overflow: "auto",
        }}
      >
        <table className="text-center table  table-bordered table-responsive">
          <thead>
            <tr>
              <th scope="col">Название маркера</th>
              <th scope="col">Формула</th>
              <th scope="col">Баллы по ИНН {inn}</th>
            </tr>
          </thead>
          <tbody>
            {result[0] &&
              result[0].result_score.markers_and_values.map((el, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">Название маркера</td>
                    <td className="text-center">{el.formula}</td>
                    <td>{el.value}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        <Link to="/results">
          <MyButton
            className="btn btn-outline-secondary mt-2"
            onClick={() => {}}
          >
            К таблице результатов
          </MyButton>
        </Link>
      </div>
    </>
  )
}

export default ResultMarkersView
