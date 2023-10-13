import React, { useEffect, useState } from "react"
import api from "../api"
import TextField from "../components/CrmPage/Form/textField"
import Divider from "../components/CrmPage/Form/Divider"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import SelectField from "../components/CrmPage/Form/SelectField"

const NewCrmClientPage = () => {
  const params = useParams()
  //   console.log(params)
  const [firstData, setFirstData] = useState()
  const [KPI, setKPI] = useState()
  const [users, setUsers] = useState()

  const [usersData, setUsersData] = useState({})

  useEffect(() => {
    api.firstData.fetchAll().then((data) => {
      setFirstData(data)
    })
    console.log()
    api.KPI.fetchAll().then((data) => {
      setKPI(data)
    })
    api.users.fetchAll().then((data) => {
      setUsers(data)
    })
    console.log(users)
  }, [])

  function getCurrentUser(users) {
    const user = users.filter((el) => el.id === +params.id)
    return user
  }
  // ТУТ ПЕРЕДАЕТСЯ ПУСТОЙ USER - вылетает с нераспознанными свойствами
  // Теперь ок. Добавил корректное условие (не params, a params.id)
  useEffect(() => {
    if (params.id && users) {
      console.log(params)
      const user = getCurrentUser(users)[0]
      console.log(user)

      setUsersData({
        INN: user.INN,
        clientName: user.clientName,
        region: user.region,
        status: user.status,
        manager: user.manager,
      })
    }
    console.log(usersData)
  }, [users])

  console.log("usersData - ", usersData)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Отправка данных на сервер")
    setUsersData({})
    // Показать изменение на странице (стейт пустеет, а на ничего не странице не обновляется)
    console.log(usersData)
  }

  const handleCancle = (e) => {
    e.preventDefault()
    alert("Изменения отменены")
    setUsersData({})
    // Добавить переход по history?
  }

  const handleChange = (target) => {
    setUsersData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const riskList = [
    { label: "Высокий риск", value: "Высокий риск" },
    { label: "Средний риск", value: "Средний риск" },
    { label: "Низкий риск", value: "Низкий риск" },
  ]

  return (
    <form>
      {firstData &&
        firstData.map((el) => {
          if (el.name) {
            return (
              <TextField
                key={el.id}
                label={el.name}
                name={el.type ? el.type : el.name}
                value={usersData?.name}
                onChange={handleChange}
              />
            )
          } else if (el.title) {
            return (
              <div key={el.id}>
                <h3 className="text-center mt-5">{el.title}</h3>
                <Divider />
              </div>
            )
          }
        })}

      {KPI &&
        KPI.map((el) => {
          if (el.name) {
            return el.type === "risk" ? (
              <SelectField
                key={el.id}
                label={el.name}
                defaultOption="Выберите риск"
                name={el.name}
                options={riskList}
                onChange={handleChange}
                value={usersData?.name}
              />
            ) : (
              <TextField
                key={el.id}
                label={el.name}
                name={el.name}
                value={usersData?.name}
                onChange={handleChange}
              />
            )
          } else if (el.title) {
            return (
              <div key={el.id}>
                <h3 className="text-center mt-5">{el.title}</h3>
                <Divider />
              </div>
            )
          }
        })}

      <div className="row row-centered mb-4 colored">
        <button
          type="submit"
          className="btn btn-primary w-25 mx-auto m-2 col-sm-3"
          onClick={handleSubmit}
        >
          Сохранить
        </button>

        <button
          className="btn btn-danger w-25 mx-auto m-2 col-sm-3"
          onClick={handleCancle}
        >
          <Link to="/crm" className="nav-link m-2">
            Отмена
          </Link>
        </button>
      </div>
    </form>
  )
}

export default NewCrmClientPage

{
  /* <SelectField
              label="Выбери важность"
              defaultOption="Выберите..."
              name="importance"
              options={importanceList}
              onChange={handleChange}
              value={data.importance}
            /> */
}
