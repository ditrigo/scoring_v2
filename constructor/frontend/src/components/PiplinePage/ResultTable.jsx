import React, { useState, useEffect } from "react"
import MyButton from "../UI/MyButton/MyButton"
import axios from "axios"
import Moment from "moment"
import localization from "moment/locale/ru"
import { Link } from "react-router-dom"
import modelService from "../../services/model.service"
import configFile from "../../config.json"

const ResultTable = ({ getLinkMarkers }) => {
  const [results, setResults] = useState([])
  const [models, setModels] = useState()

  const FileDownload = require("js-file-download")

  async function getResults() {
    axios
      .get(`${configFile.apiEndPoint}/inn_res/`)
      .then((res) => {
        // console.log("Результаты в таблице", res.data.data)
        setResults(res.data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  async function downLoadResults() {
    axios({
      url: `${configFile.apiEndPoint}/download/`,
      method: "GET",
      responseType: "blob",
    })
      .then((res) => {
        FileDownload(res.data, "ScotringResults.xlsx")
        // console.log("Результаты в таблице", res.data.data)
        // setResults(res.data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  useEffect(() => {
    getResults()
    getModels()
  }, [])

  // async function getModels() {
  //   axios
  //     .get("http://127.0.0.1:8000/api/scoring_model/")
  //     .then((res) => {
  //       // console.log("Получение моделей resTab", res.data.data)
  //       setModels(res.data.data)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }

  const getModels = async () => {
    try {
      const { data } = await modelService.get()
      // console.log("from service ", data)
      setModels(data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div
        className="container mt-3 mb-5"
        style={{
          overflow: "auto",
        }}
      >
        <div className="row  mb-3">
          <div className="col-md-auto">
            <Link
              to="/pipeline"
              // className="mb-2"
            >
              <MyButton
                className="btn btn-outline-secondary"
                // onClick={() => { }}
              >
                Модуль выдачи результатов
              </MyButton>
            </Link>
          </div>
          <div className="col-md-auto m-0">
            <MyButton onClick={downLoadResults}>Выгрузить данные</MyButton>
          </div>
        </div>
        <table className="text-center table  table-bordered table-responsive">
          <thead>
            <tr>
              <th scope="col">Название модели</th>
              <th scope="col">Автор</th>
              <th scope="col">Дата создания</th>
              <th scope="col">ИНН и результат</th>
            </tr>
          </thead>
          <tbody>
            {models &&
              models.map((el, index) => {
                return (
                  el.inns.length !== 0 && (
                    <tr key={index}>
                      <td>
                        {/* <Link to={"/results/" + el.model_name}> */}
                        {"Тестовое имя" && el.model_name}
                        {/* </Link> */}
                      </td>
                      <td>{"Тестовый пользователь" && el.author_id}</td>
                      <td>
                        {Moment(el.created_date)
                          .locale("rus", localization)
                          .format("LLL")}
                      </td>
                      <td>
                        {el.inns.map((el, index) => {
                          return (
                            <p className="text-center" key={index}>
                              ИНН{" "}
                              {el.result_score ? (
                                <Link to={"/results/" + el.inn}>{el.inn}</Link>
                              ) : (
                                el.inn
                              )}{" "}
                              с общим результатом{" "}
                              <span className="text-success">
                                {el.result_score
                                  ? el?.result_score?.total_rank
                                  : "-"}
                              </span>
                            </p>
                          )
                        })}
                      </td>
                    </tr>
                  )
                )
              })}

            {/* {results &&
              results.map((el, index) => {
                const rank = el.result_score?.total_rank
                return (
                  <tr key={index}>
                    <td>Тестовое имя модели</td>
                    <td>{"Тестовый пользователь" || el.author_id}</td>
                    <td>
                      {Moment(el.created_date)
                        .locale("rus", localization)
                        .format("LLL")}
                    </td>
                    <td className="text-center">
                      <Link to={"/results/" + el.inn}>{el.inn}</Link>
                    </td>

                    <td>{rank}</td>
                  </tr>
                )
              })} */}
          </tbody>
        </table>
        {/* <MyButton className="btn-outline-primary mt-2 mr-4" onClick={() => { }}>
          Подтвердить
        </MyButton> */}
      </div>
    </>
  )
}

export default ResultTable
