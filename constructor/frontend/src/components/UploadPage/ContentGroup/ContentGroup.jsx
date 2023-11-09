import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import axios from "axios"
import MyButton from "../../UI/MyButton/MyButton"
import "../../../styles/App.css"
import Table from "../../Table"
import HistoryDownloadTable from "../../HistoryDownloadTable"
import configFile from "../../../config.json"

const ContentGroup = () => {
  const [view, setView] = useState("log")
  const [attributes, setAttributes] = useState([])
  const [logAttributs, setLogAttributs] = useState()

  const [uploadColumns, setUploadColumns] = useState([
    { name: "Id", path: "id", isVisible: true },
    { name: "Дата загрузки", isVisible: true },
    { name: "ИНН", isVisible: true },
    { name: "Дата отчета", isVisible: true },
  ])

  const [logColumns, setLogColumns] = useState([
    { name: "Название", isVisible: true },
    { name: "Дата загрузки", isVisible: true },
    { name: "Размер", isVisible: true },
    { name: "Общее количество строк", isVisible: true },
    { name: "Пропущенные строки", isVisible: true },
    { name: "Новые строки", isVisible: true },
  ])

  async function getFilesAttributes() {
    axios
      .get(`${configFile.apiEndPoint}/files/`)
      .then((res) => {
        setLogAttributs(res.data.data)
        // console.log("getFilesAttributes", res.data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getFilesAttributes()
  }, [])

  async function getfiles() {
    axios
      .get(`${configFile.apiEndPoint}/attributes/`)
      .then((res) => {
        setAttributes(res.data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getfiles()
  }, [])

  return (
    <div
      className="text-center  btngroup container"
      // text-center mx-3 btngroup container"
      style={{ width: 800, minHeight: 600 }}
    >
      <div
        className="btn-group px-5 mt-4"
        style={{ width: 800 }}
        role="group"
        aria-label="Basic outlined example"
      >
        <MyButton
          className={view === "log" ? "btn-primary" : ""}
          onClick={() => setView("log")}
        >
          История загрузки
        </MyButton>
        <MyButton
          className={view === "view" ? "btn-primary" : ""}
          onClick={() => setView("view")}
        >
          Просмотр данных
        </MyButton>

        <MyButton
          className={view === "faq" ? "btn-primary" : ""}
          onClick={() => setView("faq")}
        >
          Информация
        </MyButton>
      </div>

      {/* изменить структуру ниже Вынести за пределы. Сделать переиспользуемым модулем! */}
      <div className="table-responsive mx-3">
        {view === "view" && (
          <>
            <div className="table-responsive mx-3">
              <Table
                attributes={attributes}
                columns={uploadColumns}
                setColumns={setUploadColumns}
              />
            </div>
          </>
        )}

        {view === "log" && (
          <>
            <HistoryDownloadTable
              attributes={logAttributs}
              columns={logColumns}
              setColumns={setLogColumns}
            />
            {/*<table className="table text-left table-bordered mt-5">*/}
            {/*    <thead>*/}
            {/*        <tr>*/}
            {/*            <th>Название</th>*/}
            {/*            <th>Размер</th>*/}
            {/*            <th>Удалить</th>*/}
            {/*        </tr>*/}
            {/*    </thead>*/}
            {/*{uploadedFiles.map( e => (*/}
            {/*        <tbody>*/}
            {/*            <tr>*/}
            {/*                <td>{e.name}</td>*/}
            {/*                <td>{formatBytes(e.size)}</td>*/}
            {/*                <td>Delete</td>*/}
            {/*            </tr>*/}
            {/*        </tbody>*/}
            {/*))}*/}
            {/*</table>*/}
          </>
        )}

        {view === "faq" && (
          <>
            <div>
              <h3>
                Главное меню содержит основные режимы работы Конструктора:
              </h3>
              <ol>
                <li>Модуль загрузки данных</li>
                <li>Модуль скоринга</li>
                <li>Модуль выдачи результатов</li>
                <li>Модуль CRM</li>
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ContentGroup
