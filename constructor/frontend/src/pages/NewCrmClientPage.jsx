import React, { useEffect, useState } from "react"
import api from "../api"
import TextField from "../components/CrmPage/Form/textField"
import Divider from "../components/CrmPage/Form/Divider"
import { Link, useParams } from "react-router-dom"
import SelectField from "../components/CrmPage/Form/SelectField"
import Select from "react-select"

const NewCrmClientPage = () => {
  const params = useParams()
  //   console.log(params)
  const [firstData, setFirstData] = useState()
  // const [KPI, setKPI] = useState()
  const [users, setUsers] = useState()
  const [regions, setRegions] = useState()

  const [usersData, setUsersData] = useState({})

  const handleChangeSelect = (target) => {
    console.log(target)
    setUsersData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const [testData, setTestData] = useState({ test: "test" })
  const handleChangeTest = (target) => {
    setTestData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  useEffect(() => {
    api.firstData.fetchAll().then((data) => {
      setFirstData(data)
    })
    // console.log()
    // api.KPI.fetchAll().then((data) => {
    //   setKPI(data)
    // })
    api.users.fetchAll().then((data) => {
      setUsers(data)
    })
    api.regions.fetchAll().then((data) => {
      setRegions(data)
    })
    // console.log(regions)
  }, [])

  function getCurrentUser(users) {
    const user = users.filter((el) => el.id === +params.id)
    return user
  }
  // ТУТ ПЕРЕДАЕТСЯ ПУСТОЙ USER - вылетает с нераспознанными свойствами
  // Теперь ок. Добавил корректное условие (не params, a params.id)
  useEffect(() => {
    if (params.id && users) {
      const user = getCurrentUser(users)[0]
      // console.log("Текущий ", user)

      setUsersData((prevState) => ({
        ...prevState,
        INN: user.INN,
        clientName: user.clientName,
        region: user.region,
        status: user.status,
        manager: user.manager,
      }))

      //   ((prevState) => ({
      //     ...prevState,
      //     [target.name]: target.value,
      //   }))
    }
    // console.log("usersData B useEffect ", usersData)
  }, [users])

  //   if (params.id && users) {
  //     const user = getCurrentUser(users)[0]
  //     console.log("Текущий ", user)

  //     setUsersData({
  //       INN: user.INN,
  //       clientName: user.clientName,
  //       region: user.region,
  //       status: user.status,
  //       manager: user.manager,
  //     })
  //   }

  // console.log("usersData ВНЕ useEffect ", usersData)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Отправка данных на сервер")
    setUsersData({})
    // Показать изменение на странице (стейт пустеет, а ничего на странице не обновляется)
    console.log(usersData)
  }

  const handleCancle = (e) => {
    e.preventDefault()
    setUsersData({})
    // Добавить переход по history?
  }

  const handleChange = (target) => {
    console.log(target)
    setUsersData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const handleDate = (e) => {
    console.log("Календарь ", e.target.value)
  }

  const riskList = [
    { label: "Высокий риск", value: "Высокий риск" },
    { label: "Средний риск", value: "Средний риск" },
    { label: "Низкий риск", value: "Низкий риск" },
  ]
  const sources = [
    { label: "Письмо", value: "Письмо", name: "source" },
    { label: "Список", value: "Список", name: "source" },
    { label: "Поручение", value: "Поручение", name: "source" },
  ]

  return (
    <div className="container ">
      <div className="row">
        <div className="col-md-12">
          <div className="card p-4">
            <form>
              {/* {firstData &&
        firstData.map((el) => {
          if (el.name) {
            return (
              <TextField
                key={el.id}
                label={el.name}
                name={el.name}
                value={usersData.name}
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
        })} */}

              {firstData &&
                firstData.map((el) => {
                  if (el.name) {
                    if (el.type === "risk") {
                      return (
                        <SelectField
                          key={el.id}
                          label={el.name}
                          defaultOption="Выберите"
                          name={el.name}
                          options={riskList}
                          onChange={handleChange}
                          value={usersData.name}
                        />
                      )
                    }
                    // else if (el.type === "date") {
                    //   return (
                    //     <input
                    //       type={el.type}
                    //       name={el.name}
                    //       value={usersData.date}
                    //       onChange={(e) => {
                    //         handleDate(e)
                    //       }}
                    //     ></input>
                    //   )
                    // }
                    else if (el.name === "region") {
                      return (
                        <div className="mb-2">
                          <label className="form-label">Регион</label>
                          <Select
                            options={regions}
                            onChange={handleChangeSelect}
                            name="region"
                          />
                        </div>
                      )
                    } else if (el.name === "source") {
                      return (
                        <div className="mb-2">
                          <label className="form-label">Источник</label>
                          <Select
                            options={sources}
                            onChange={handleChangeSelect}
                            name="source"
                          />
                        </div>
                      )
                    } else {
                      return (
                        <TextField
                          key={el.id}
                          label={el.name}
                          name={el.name}
                          value={usersData.name}
                          onChange={handleChange}
                        />
                      )
                    }
                  } else if (el.title) {
                    return (
                      <div key={el.id}>
                        <h3 className="text-center mt-2">{el.title}</h3>
                        <Divider />
                      </div>
                    )
                  }
                })}
              {/* <TextField
                label="test"
                name="test"
                value={testData.test}
                onChange={handleChangeTest}
              /> */}
              <div className="row row-centered mb-2 colored">
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
          </div>
        </div>
      </div>
    </div>
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
