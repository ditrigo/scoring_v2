import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import MyButton from "../../UI/MyButton/MyButton";
import "../../../styles/App.css";
import Table from "../../Table";

const ContentGroup = ({ uploadedFiles }) => {
  const [view, setView] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploadColumns, setUploadColumns] = useState([
    { name: "Id", isVisible: true },
    { name: "Дата загрузки", isVisible: true },
    { name: "ИНН", isVisible: true },
    { name: "Дата выгрузки отчета", isVisible: true },
  ]);
  const [logColumns, setLogColumns] = useState([
    { name: "Название файла", isVisible: true },
    { name: "Дата загрузки файла", isVisible: true },
    { name: "Размер файла", isVisible: true },
    { name: "События при загрузке файла", isVisible: true },
  ]);

  async function getAttributes() {
    axios
      .get("http://127.0.0.1:8000/api/attributes/")
      .then((res) => {
        console.log(res.data.data);
        setAttributes(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function getFiles() {
    axios
      .get("http://127.0.0.1:8000/api/files/")
      .then((res) => {
        console.log(res.data.data);
        setFiles(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
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
    getAttributes();
    getFiles();
  }, []);

  return (
    <div
      className="text-center mx-3 btngroup"
      style={{ width: 800, minHeight: 600 }}
    >
      <div
        className="btn-group px-5"
        style={{ width: 800 }}
        role="group"
        aria-label="Basic outlined example"
      >
        <MyButton onClick={() => setView("view")}>Просмотр данных</MyButton>
        <MyButton onClick={() => setView("log")}>История загрузки</MyButton>
        <MyButton onClick={() => setView("faq")}>Информация</MyButton>
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
            <Table
              attributes={files}
              columns={logColumns}
              setColumns={setLogColumns}
            />
          </>
        )}

        {view === "faq" && (
          <>
          <div>
            <h3>Главное меню содержит основные режимы работы Конструктора:</h3>
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
  );
};

export default ContentGroup;
