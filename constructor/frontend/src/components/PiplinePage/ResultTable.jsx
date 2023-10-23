import React, { useState, useEffect } from "react"
import MyButton from "../UI/MyButton/MyButton"
import axios from "axios"
import Moment from "moment"
import localization from "moment/locale/ru"
import { Link } from "react-router-dom"

const ResultTable = ({ getLinkMarkers }) => {
  const [results, setResults] = useState([
    // {
    //   date: "16.10.2023",
    //   INN: "1234567890",
    //   result: "Низкий риск банкротсва",
    // },
    // {
    //   date: "16.10.2023",
    //   INN: "1234567890",
    //   result: "Низкий риск банкротсва",
    // },
    // {
    //   date: "16.10.2023",
    //   INN: "2368120869",
    //   result: "Средний риск банкротсва",
    // },
    // {
    //   date: "16.10.2023",
    //   INN: "2368120869",
    //   result: "Средний риск банкротсва",
    // },
    // {
    //   date: "16.10.2023",
    //   INN: "1234567890",
    //   result: "Низкий риск банкротсва",
    // },
  ])

  async function getResults() {
    axios
      .get("http://127.0.0.1:8000/api/inn_res/")
      .then((res) => {
        setResults(res.data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  useEffect(() => {
    // console.log("useEffect in getAtr")
    getResults()
  }, [])

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
              <th scope="col">Дата создания</th>
              <th scope="col">ИНН</th>
              <th scope="col">Результат</th>
            </tr>
          </thead>
          <tbody>
            {results.map((el, index) => {
              return (
                <tr key={index}>
                  <td>
                    {Moment(el.created_date)
                      .locale("rus", localization)
                      .format("LLL")}
                  </td>
                  <td className="text-center">{el.inn}</td>
                  <td>{el.result_score}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {/* <MyButton className="btn-outline-primary mt-2 mr-4" onClick={() => { }}>
          Подтвердить
        </MyButton> */}
        <Link to="/pipeline">
          <MyButton
            className="btn btn-outline-secondary mt-2"
            onClick={() => {}}
          >
            На модуль выдачи результатов
          </MyButton>
        </Link>
      </div>
    </>
  )
}

export default ResultTable
