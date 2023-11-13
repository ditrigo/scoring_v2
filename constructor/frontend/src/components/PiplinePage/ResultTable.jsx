import React, { useState, useEffect } from "react"
import MyButton from "../UI/MyButton/MyButton"
import axios from "axios"
import Moment from "moment"
import localization from "moment/locale/ru"
import { Link } from "react-router-dom"
import modelService from "../../services/model.service"
import configFile from "../../config.json"
import MyInput from "../UI/MyInput/MyInput"

const ResultTable = ({ getLinkMarkers }) => {
  // const [results, setResults] = useState([])
  const [models, setModels] = useState()
  const [searchValue, setSearchValue] = useState("")
  const FileDownload = require("js-file-download")
  let searchedModels = []

  // async function getResults() {
  //   axios
  //     .get(`${configFile.apiEndPoint}/inn_res/`)
  //     .then((res) => {
  //       // console.log("Результаты в таблице", res.data.data)
  //       setResults(res.data.data)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }

  const getModels = async () => {
    try {
      const { data } = await modelService.get()
      console.log("data: ", data)
      setModels(data)
      // console.log("from service models", models)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    // getResults()
    getModels()
  }, [])

  searchedModels = models
    ? models.filter((el) => {
      // console.log("el",el)
      return el.inns.some((inn) => {
        // console.log("inn",inn)
        console.log("searchedModels inside map", searchedModels)
        return Moment(inn.created_date, )
          .locale("rus", localization)
          .format("LLL")
          .includes(searchValue)
      })
    })
    : models
    console.log("searchedModels", searchedModels)

  // searchedModels = models
  //   ? models.filter((el) => {
  //       // console.log(el)
  //       return el.inns.some((inn) => {
  //         // console.log(inn)
  //         return Moment(inn.created_date)
  //           .locale("rus", localization)
  //           .format("LLL")
  //           .includes(searchValue)
  //       })
  //     })
  //   : models

  // async function downLoadResults() {
  //   axios({
  //     url: `${configFile.apiEndPoint}/download/`,
  //     method: "GET",
  //     responseType: "blob",
  //   })
  //     .then((res) => {
  //       FileDownload(res.data, "ScotringResults.xlsx")
  //       // console.log("Результаты в таблице", res.data.data)
  //       // setResults(res.data.data)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }

  async function downLoadResultsNEW() {
    axios({
      url: searchValue 
      ? `${configFile.apiEndPoint}/data_for_journal/?firstdate="${searchValue}"`
      : `${configFile.apiEndPoint}/data_for_journal/`
      ,
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
            <MyButton
              // onClick={downLoadResults}
              onClick = {downLoadResultsNEW}
            >
              Выгрузить данные
            </MyButton>
          </div>
        </div>
        <div className="mt-4">
          <MyInput
            type="text"
            placeholder="Введите дату для выгрузки"
            // className="form-group search__input mr-5"
            onChange={(event) => 
              // console.log("VALUE", event.target.value) 
            setSearchValue(event.target.value)
          }
          />
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
              searchedModels.map((el, index) => {
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
                        {/* дата модели -
                        {Moment(el.created_date)
                          .locale("rus", localization)
                          .format("LLL")}{" "}
                        - дата модели */}
                        {el.inns.map((el, index) => {
                          return (
                            <p className="text-center" key={index}>
                              {Moment(el.created_date)
                                .locale("rus", localization)
                                .format("LLL")}
                            </p>
                          )
                        })}
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
