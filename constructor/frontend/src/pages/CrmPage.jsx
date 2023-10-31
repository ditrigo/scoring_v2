import React, { useEffect, useState } from "react"
import api from "../api"
import TableHeader from "../components/CrmPage/Form/TableHeader"
import NumericRow from "../components/CrmPage/Form/NumericRow"
import ContentRows from "../components/CrmPage/Form/ContentRows"
import { Link } from "react-router-dom"
import MyInput from "../components/UI/MyInput/MyInput"
import MyButton from "../components/UI/MyButton/MyButton"

const CrmPage = () => {
  const [users, setUsers] = useState()
  const [searchValue, setSearchValue] = useState("")
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
          {/* <button className="btn btn-primary w-50 mx-auto col">
          <Link to="/newclient" className="nav-link m-2">
            Новый клиент
          </Link>
          </button>   */}

          <Link to="/newclient" className="">
            <MyButton>Новый клиент</MyButton>
          </Link>
        </div>
      </div>
      {users ? (
        <>
          <div className="row mt-3">
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
