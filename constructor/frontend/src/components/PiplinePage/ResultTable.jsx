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
  const [searchModelName, setSearchModelName] = useState("")
  const [searchAuthor, setSearchAuthor] = useState("")
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
        return el.model_name
          .toLowerCase()
          .includes(searchModelName.toLowerCase())
      })
    : models

  let searchedModels2 = searchedModels
    ? searchedModels.filter((el) => {
        return el.author_id.toLowerCase().includes(searchAuthor.toLowerCase())
      })
    : searchedModels

  let searchedModels3 = searchedModels2
    ? searchedModels2.filter((el) => {
        // console.log("el",el)
        return el.inns.some((inn) => {
          let date =
            Moment(inn.created_date).locale("rus", localization).format("L") +
            " " +
            Moment(inn.created_date).locale("rus", localization).format("LT")

          // console.log(date, date.includes(searchValue))
          return date.includes(searchValue)
        })
      })
    : searchedModels2

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
    let URL = `${configFile.apiEndPoint}/data_for_journal/?`
    if (searchValue) URL += `date="${searchValue}"&`
    if (searchAuthor) URL += `user="${searchAuthor}"&`
    if (searchModelName) URL += `model="${encodeURI(searchModelName)}"&`
    URL = URL.replace(/&$/, "")

    console.log(
      "🚀 ~ file: ResultTable.jsx:99 ~ downLoadResultsNEW ~ URL:",
      URL
    )

    axios({
      url: URL,
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
              onClick={downLoadResultsNEW}
            >
              Выгрузить данные
            </MyButton>
          </div>
        </div>
        {/* <div className="mt-4">
          <MyInput
            type="text"
            placeholder="Введите дату выдачи результатов для выгрузки"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div> */}
        <table className="text-center table  table-bordered table-responsive">
          <thead>
            <tr>
              <th scope="col">
                Название модели <br />
                <MyInput
                  type="text"
                  placeholder="Введите название модели"
                  onChange={(event) => setSearchModelName(event.target.value)}
                  className="form-control  mt-2"
                />
              </th>
              <th scope="col">
                Автор
                <br />
                <MyInput
                  type="text"
                  placeholder="Введите автора"
                  onChange={(event) => setSearchAuthor(event.target.value)}
                  className="form-control  mt-2"
                />
              </th>
              <th scope="col">
                Дата выдачи результата <br />{" "}
                <MyInput
                  type="text"
                  placeholder="Введите дату выдачи результата"
                  onChange={(event) => setSearchValue(event.target.value)}
                  className="form-control mt-2"
                />
              </th>
              <th scope="col">ИНН и результат</th>
            </tr>
          </thead>
          <tbody>
            {models &&
              searchedModels3.map((el, index) => {
                return (
                  el.inns.length !== 0 && (
                    <tr key={index}>
                      <td>{"Тестовое имя" && el.model_name}</td>
                      <td>{"Тестовый пользователь" && el.author_id}</td>

                      <td>
                        {el.inns.map((el, index) => {
                          const date =
                            Moment(el.created_date)
                              .locale("rus", localization)
                              .format("L") +
                            " " +
                            Moment(el.created_date)
                              .locale("rus", localization)
                              .format("LT")
                          return (
                            date.includes(searchValue) && (
                              <p className="text-center" key={index}>
                                {date}
                              </p>
                            )
                          )
                        })}
                      </td>
                      <td>
                        {el.inns.map((inn, index) => {
                          console.log("elll", el)
                          const date =
                            Moment(inn.created_date)
                              .locale("rus", localization)
                              .format("L") +
                            " " +
                            Moment(inn.created_date)
                              .locale("rus", localization)
                              .format("LT")
                          return (
                            date.includes(searchValue) && (
                              <p className="text-center" key={index}>
                                ИНН{" "}
                                {inn.result_score ? (
                                  <Link to={`/results/${inn.inn}/${el.id}`}>
                                    {inn.inn}
                                  </Link>
                                ) : (
                                  inn.inn
                                )}{" "}
                                с общим результатом{" "}
                                <span className="text-success">
                                  {inn.result_score
                                    ? inn?.result_score?.total_rank
                                    : "-"}
                                </span>
                              </p>
                            )

                            //   {el.inns.map((el, index) => {
                            //     return (
                            //       Moment(el.created_date)
                            //         .locale("rus", localization)
                            //         .format("L")
                            //         .includes(searchValue) && (
                            //         <p className="text-center" key={index}>
                            //           {Moment(el.created_date)
                            //             .locale("rus", localization)
                            //             .format("L") + ' ' + Moment(el.created_date)
                            //             .locale("rus", localization)
                            //             .format("LT")}
                            //         </p>
                            //       )
                            //     )
                            //   })}
                            // </td>
                            // <td>
                            //   {el.inns.map((el, index) => {
                            //     return (
                            //       Moment(el.created_date)
                            //         .locale("rus", localization)
                            //         .format("L")
                            //         .includes(searchValue) && (
                            //         <p className="text-center" key={index}>
                            //           ИНН{" "}
                            //           {el.result_score ? (
                            //             <Link to={"/results/" + el.inn}>
                            //               {el.inn}
                            //             </Link>
                            //           ) : (
                            //             el.inn
                            //           )}{" "}
                            //           с общим результатом{" "}
                            //           <span className="text-success">
                            //             {el.result_score
                            //               ? el?.result_score?.total_rank
                            //               : "-"}
                            //           </span>
                            //         </p>
                            //       )
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
