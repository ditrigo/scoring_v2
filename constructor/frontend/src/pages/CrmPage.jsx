import React, { useEffect, useState } from "react"
import api from "../api"
import TableHeader from "../components/CrmPage/Form/TableHeader"
import NumericRow from "../components/CrmPage/Form/NumericRow"
import ContentRows from "../components/CrmPage/Form/ContentRows"
import { Link } from "react-router-dom"
import axios from "axios"
import MyInput from "../components/UI/MyInput/MyInput"
import { users as usersApi } from "../api/fake.api/users"

const CrmPage = () => {
  const [users, setUsers] = useState()
  let [currentUserId, setCurrentUserId] = useState()
  const [value, setValue] = useState("")

  useEffect(() => {
    // api.users.fetchAll().then((data) => {
    //   setUsers(data)
    // })
    setUsers(usersApi)
    console.log(users)
  }, [])

  const handleGetCurrentUserId = (e) => {
    // console.log(e.target.dataset.id)
    setCurrentUserId(e.target.dataset.id)
  }

  //   const filtredUsers = users.filter((el) => {
  //     if (Number.isInteger(+value)) {
  //       return el.INN.includes(value)
  //     } else {
  //       return el.manager.toLowerCase().includes(value.toLowerCase())
  //     }
  //   })

  return (
    <div className="container m-5">
      <div className="row row-centered colored">
        <button className="btn btn-primary w-50 mx-auto m-2 col-sm-4">
          <Link to="/newclient" className="nav-link m-2">
            + Новый клиент
          </Link>
        </button>

        <button
          className="btn btn-primary w-50 mx-auto m-2 col-sm-4"
          disabled={!currentUserId}
        >
          <Link to={"/newclient/" + currentUserId} className="nav-link m-2">
            Редактировать клиента (нажмать на номер в таблице): {currentUserId}
          </Link>
        </button>
      </div>
      {users ? (
        <>
          <div className="mb-3">
            <form>
              <input
                type="text"
                placeholder="ИНН или Менеджер"
                className="form-group search__input mr-5"
                onChange={(event) => setValue(event.target.value)}
              />
            </form>
          </div>

          <table className="table">
            <TableHeader />
            <tbody>
              <NumericRow />
              <ContentRows
                users={users}
                handleGetCurrentUserId={handleGetCurrentUserId}
              />
            </tbody>
          </table>
        </>
      ) : (
        <h2>Нет данных</h2>
      )}
    </div>
  )
}

export default CrmPage
