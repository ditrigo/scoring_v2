import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import axios from "axios"
import MyButton from "../../UI/MyButton/MyButton"
import "../../../styles/App.css"
import Table from "../../Table"
import HistoryDownloadTable from "../../HistoryDownloadTable"

const ContentGroup = () => {
  const [view, setView] = useState("view")
  const [attributes, setAttributes] = useState([])

  const [uploadColumns, setUploadColumns] = useState([
    { name: "Id", path: "id", isVisible: true },
    { name: "Дата загрузки", isVisible: true },
    { name: "ИНН", isVisible: true },
    { name: "Дата выгрузки отчета", isVisible: true },
  ])

  const [logColumns, setLogColumns] = useState([
    { name: "Название", isVisible: true },
    { name: "Дата загрузки", isVisible: true },
    { name: "Размер", isVisible: true },
    { name: "Общее количество загруженных строк", isVisible: true },
    { name: "Количество пропущенных строк", isVisible: true },
    { name: "Новые загруженные строки", isVisible: true },
  ])

  const logAttributs = [
    {
      name: "Just a name",
      created_date: "2023-10-12T12:25:07.688056Z",
      size: "3kb",
      total: 10,
      missed: 3,
      new: 7,
    },
    {
      name: "Just a second name",
      created_date: "2023-10-12T12:25:07.688056Z",
      size: "1kb",
      total: 134,
      missed: 130,
      new: 4,
    },
    {
      name: "Just a package",
      created_date: "2023-10-12T12:25:07.688056Z",
      size: "8kb",
      total: 100,
      missed: 20,
      new: 80,
    },
    {
      name: "Not just a package name",
      created_date: "2023-10-12T12:25:07.688056Z",
      size: "13kb",
      total: 13,
      missed: 3,
      new: 10,
    },
  ]

  async function getfiles() {
    axios
      .get("http://127.0.0.1:8000/api/attributes/")
      .then((res) => {
        setAttributes(res.data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  // function formatBytes(bytes, decimals = 2) {
  //   if (!+bytes) return "0 Bytes";

  //   const k = 1024;
  //   const dm = decimals < 0 ? 0 : decimals;
  //   const sizes = [
  //     "Bytes",
  //     "KiB",
  //     "MiB",
  //     "GiB",
  //     "TiB",
  //     "PiB",
  //     "EiB",
  //     "ZiB",
  //     "YiB",
  //   ];

  //   const i = Math.floor(Math.log(bytes) / Math.log(k));

  //   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  // }

  useEffect(() => {
    // console.log('useEFFECT')
    getfiles()
  }, [])

  return (
    <div
      className="text-center mx-3 btngroup"
      style={{ width: 800, minHeight: 600 }}
    >
      <div
        className="btn-group px-5 mt-4"
        style={{ width: 800 }}
        role="group"
        aria-label="Basic outlined example"
      >
        <MyButton
          className={view === "view" ? "btn-primary" : ""}
          onClick={() => setView("view")}
        >
          Просмотр данных
        </MyButton>
        <MyButton
          className={view === "log" ? "btn-primary" : ""}
          onClick={() => setView("log")}
        >
          История загрузки
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
            <Table
              attributes={attributes}
              columns={uploadColumns}
              setColumns={setUploadColumns}
            />
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
