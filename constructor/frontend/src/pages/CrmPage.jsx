import React, { useEffect, useState } from "react"
// import api from "../api"
import TableHeader from "../components/CrmPage/Form/TableHeader"
import NumericRow from "../components/CrmPage/Form/NumericRow"
import ContentRows from "../components/CrmPage/Form/ContentRows"
import { Link } from "react-router-dom"
import MyInput from "../components/UI/MyInput/MyInput"
import MyButton from "../components/UI/MyButton/MyButton"
import configFile from "../config.json"
import axios from "axios"
import httpService from "../services/http.service"

const CrmPage = () => {
  const [clients, setClients] = useState()
  const [searchValue, setSearchValue] = useState("")
  const FileDownload = require("js-file-download")
  let filtredClients = []

  const getClients = async () => {
    try {
      const { data } = await httpService.get(`crm_client/`)
      // console.log(data.data)
      setClients(data.data)
      // console.log(clients)
    } catch (error) {
      console.log("🚀 ~ file: CrmPage.jsx:19 ~ getClients ~ error:", error)
    }
  }

  useEffect(() => {
    getClients()
  }, [])

  try {
    useEffect(() => {
      // console.log(clients)
    }, [])

    // Добавил проверку через тернарный оператор, чтоб не падал в ошибку от пустых clients
    filtredClients = clients
      ? clients.filter((el) => {
          // console.log(el)
          if (Number.isInteger(+searchValue)) {
            return String(el.inn).includes(searchValue)
          } else {
            return el.manager.second_name
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          }
        })
      : clients
  } catch (e) {
    console.log(e)
  }

  async function downLoadCrmDatas() {
    axios({
      url: `${configFile.apiEndPoint}/crm_import_db_to_file/`,
      method: "GET",
      responseType: "blob",
    })
      .then((res) => {
        FileDownload(res.data, "CRM Report.xlsx")
        // console.log("Результаты в таблице", res.data.data)
        // setResults(res.data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div className="container mr-5 mt-3 mb-3">
      <div className="row">
        <div className="col">
          <form className="">
            {/* d-flex align-items-center */}
            <MyInput
              type="text"
              placeholder="ИНН или Менеджер"
              // className="form-group search__input mr-5"
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </form>
        </div>
        <div className="col-md-auto mt-1 mb-1">
          <Link to="/newclient" className="">
            <MyButton>Новый клиент</MyButton>
          </Link>
        </div>
        <div className="col-md-auto mt-1 mb-1">
          <MyButton onClick={() => downLoadCrmDatas()}>Скачать данные</MyButton>
        </div>
      </div>
      {clients ? (
        <>
          <div className="row mt-3">
            <div className="col-md-12">
              <div className="">
                {/* <div className="card-header"></div> */}
                <div className="card-body">
                  {" "}
                  <div className="table crmTable">
                    <table className="table text-center tableContent">
                      <TableHeader />
                      <tbody className="text-center">
                        <NumericRow />
                        <ContentRows clients={filtredClients} />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2 className="d-flex justify-content-center align-items-center mt-5">
          Нет данных
        </h2>
      )}
    </div>
  )
}

export default CrmPage
