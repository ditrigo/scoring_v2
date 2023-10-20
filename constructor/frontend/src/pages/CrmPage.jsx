import React, { useEffect, useState } from "react"
import api from "../api"
import TableHeader from "../components/CrmPage/Form/TableHeader"
import NumericRow from "../components/CrmPage/Form/NumericRow"
import ContentRows from "../components/CrmPage/Form/ContentRows"
import { Link } from "react-router-dom"
import MyInput from "../components/UI/MyInput/MyInput"

const CrmPage = () => {
  const [users, setUsers] = useState()
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data)
    })
    // setUsers(usersApi)
    console.log(users)
  }, [])

  // Добавил проверку через тернарный оператор, чтоб не падал в ошибку от пустых users
  const filtredUsers = users
    ? users.filter((el) => {
        if (Number.isInteger(+searchValue)) {
          return el.INN.includes(searchValue)
        } else {
          return el.manager.toLowerCase().includes(searchValue.toLowerCase())
        }
      })
    : null

  return (
    <div className="container mr-5 mt-3">
      <div className="row row-centered colored">
        <form className="col d-flex align-items-center">
          <MyInput
            type="text"
            placeholder="ИНН или Менеджер"
            // className="form-group search__input mr-5"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </form>
        <button className="btn btn-primary w-50 mx-auto col">
          <Link to="/newclient" className="nav-link m-2">
            Новый клиент
          </Link>
        </button>
      </div>
      {users ? (
        <>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card">
                {/* <div className="card-header"></div> */}
                <div className="card-body">
                  {" "}
                  <div className="table-responsive">
                    <table className="table">
                      <TableHeader />
                      <tbody>
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
