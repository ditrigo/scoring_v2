import React, { useEffect, useState } from "react"
import api from "../api"
import TableHeader from "../components/CrmPage/Form/TableHeader"
import NumericRow from "../components/CrmPage/Form/NumericRow"
import ContentRows from "../components/CrmPage/Form/ContentRows"
import { Link } from "react-router-dom"
import MyInput from "../components/UI/MyInput/MyInput"
import MyButton from "../components/UI/MyButton/MyButton"
import configFile from "../config.json"
import axios from "axios"

const CrmPage = () => {
  const [users, setUsers] = useState()
  const [searchValue, setSearchValue] = useState("")
  const FileDownload = require("js-file-download")

  let filtredUsers = []

  try {
    useEffect(() => {
      api.users.fetchAll().then((data) => {
        setUsers(data)
      })
      // setUsers(usersApi)
      console.log(users)
    }, [])

    // Добавил проверку через тернарный оператор, чтоб не падал в ошибку от пустых users
    filtredUsers = users
      ? users.filter((el) => {
        if (Number.isInteger(+searchValue)) {
          return el.INN.includes(searchValue)
        } else {
          return el.manager.toLowerCase().includes(searchValue.toLowerCase())
        }
      })
      : null
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
          <MyButton
            onClick = {() => downLoadCrmDatas()}
          >
            Скачать данные
          </MyButton>
        </div>
      </div>
      {users ? (
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
                        <ContentRows users={filtredUsers} />
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
