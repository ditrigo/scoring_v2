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
    { label: "ТНО, ФНС    ", value: "ТНО, ФНС    ", name: "source" },
    {
      label: "Входящие звонки    ",
      value: "Входящие звонки    ",
      name: "source",
    },
    { label: "РГ    ", value: "РГ    ", name: "source" },
  ]
  const menegers = [
    { label: "Бабасов П.Н.", value: "Бабасов П.Н.", name: "source" },
    { label: "Бойченко И.А.    ", value: "Бойченко И.А.    ", name: "source" },
    {
      label: "Емельянова Е.А.    ",
      value: "Емельянова Е.А.    ",
      name: "meneger",
    },
  ]
  const status = [
    { label: "должник    ", value: "должник    ", name: "source" },
    { label: "кредитор    ", value: "кредитор    ", name: "source" },
  ]
  const type = [
    { label: "Текущий", value: "Текущий", name: "source" },
    { label: "будущий", value: "будущий", name: "source" },
    { label: "Поручение", value: "Поручение", name: "source" },
  ]
  const category = [
    {
      label: "системообразующее    ",
      value: "системообразующее    ",
      name: "source",
    },
    {
      label: "градообразующее    ",
      value: "градообразующее    ",
      name: "source",
    },
    {
      label: "стратегическое    ",
      value: "стратегическое    ",
      name: "source",
    },
  ]
  const positive = [
    { label: "МС    ", value: "МС    ", name: "source" },
    { label: "Рассрочка    ", value: "Рассрочка    ", name: "source" },
    {
      label: "отлагательные меры    ",
      value: "отлагательные меры    ",
      name: "source",
    },
  ]
  const stage = [
    {
      label: "Получено обращение     ",
      value: "Получено обращение     ",
      name: "source",
    },
    {
      label: "Проведено первое совещание     ",
      value: "Проведено первое совещание     ",
      name: "source",
    },
    {
      label: "Истребованы документы",
      value: "Истребованы документы",
      name: "source",
    },
  ]
  const negative = [
    {
      label:
        "отказ – невозможность восстановления платежеспособности – безальтернативное банкротство     ",
      value:
        "отказ – невозможность восстановления платежеспособности – безальтернативное банкротство     ",
      name: "source",
    },
    {
      label:
        "отказ - не требуется помощь, стабильное финансовое состояние     ",
      value:
        "отказ - не требуется помощь, стабильное финансовое состояние     ",
      name: "source",
    },
    {
      label: "отказ – не исполнение регламента деятельности ПРД     ",
      value: "отказ – не исполнение регламента деятельности ПРД     ",
      name: "source",
    },
  ]
  const support = [
    {
      label: "отсрочка / рассрочка (ст. 64 НК РФ)    ",
      value: "отсрочка / рассрочка (ст. 64 НК РФ)    ",
      name: "source",
    },
    {
      label: "отлагательные меры    ",
      value: "отлагательные меры    ",
      name: "source",
    },
    {
      label: "отлагательные меры + МС    ",
      value: "отлагательные меры + МС",
      name: "source",
    },
  ]
  const PRD = [
    {
      label: "МИДУОЛ",
      value: "МИДУОЛ",
      name: "source",
    },
    {
      label: "РП Республика Коми",
      value: "РП Республика Коми",
      name: "source",
    },
    {
      label: "РП Республика Карелия      ",
      value: "РП Республика Карелия",
      name: "source",
    },
  ]

  return (
    <div className="container mt-3">
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
                    else if (el.name === "Регион") {
                      return (
                        <div className="mb-2">
                          <label className="form-label">Регион</label>
                          <Select
                            options={regions}
                            onChange={handleChangeSelect}
                            name="region"
                            placeholder="Выберите"
                          />
                        </div>
                      )
                    } else if (el.name === "Менеджер") {
                      return (
                        <div className="mb-2">
                          <label className="form-label">Менеджер</label>
                          <Select
                            options={menegers}
                            onChange={handleChangeSelect}
                            name="meneger"
                            placeholder="Выберите"
                          />
                        </div>
                      )
                    } else if (el.name === "Представительсво ПРД") {
                      return (
                        <div className="mb-2">
                          <label className="form-label">
                            Представительсво ПРД
                          </label>
                          <Select
                            options={PRD}
                            onChange={handleChangeSelect}
                            name="PRD"
                            placeholder="Выберите"
                          />
                        </div>
                      )
                    } else if (el.name === "source") {
                      return (
                        <div className="mb-2">
                          <label className="form-label">
                            Письмо/поручение/список
                          </label>
                          <Select
                            options={sources}
                            onChange={handleChangeSelect}
                            name="source"
                            placeholder="Выберите"
                          />
                        </div>
                      )
                    } else if (el.name === "Статус заявителя") {
                      return (
                        <div className="mb-2">
                          <label className="form-label">Статус заявителя</label>
                          <Select
                            options={status}
                            onChange={handleChangeSelect}
                            name="Статус заявителя"
                            placeholder="Выберите"
                          />
                        </div>
                      )
                    } else if (el.name === "Тип долга") {
                      return (
                        <div className="mb-2">
                          <label className="form-label">Тип долга</label>
                          <Select
                            options={type}
                            onChange={handleChangeSelect}
                            name="Тип долга"
                            placeholder="Выберите"
                          />
                        </div>
                      )
                    } else if (el.name === "Категория") {
                      return (
                        <div className="mb-2">
                          <label className="form-label">Категория</label>
                          <Select
                            options={category}
                            onChange={handleChangeSelect}
                            name="Категория"
                            placeholder="Выберите"
                          />
                        </div>
                      )
                    } else if (
                      el.name === "Мера поддержки, запрашиваемая клиентом"
                    ) {
                      return (
                        <div className="mb-2">
                          <label className="form-label">
                            Мера поддержки, запрашиваемая клиентом
                          </label>
                          <Select
                            options={support}
                            onChange={handleChangeSelect}
                            name="Мера поддержки, запрашиваемая клиентом"
                            placeholder="Выберите"
                          />
                        </div>
                      )
                    } else if (el.name === "Вид положительного решения") {
                      return (
                        <div className="mb-2">
                          <label className="form-label">
                            Вид положительного решения
                          </label>
                          <Select
                            options={positive}
                            onChange={handleChangeSelect}
                            name="Вид положительного решения"
                            placeholder="Выберите"
                          />
                        </div>
                      )
                    } else if (el.name === "Вид отрицательного решения") {
                      return (
                        <div className="mb-2">
                          <label className="form-label">
                            Вид отрицательного решения
                          </label>
                          <Select
                            options={negative}
                            onChange={handleChangeSelect}
                            name="Вид отрицательного решения"
                            placeholder="Выберите"
                          />
                        </div>
                      )
                    } else if (el.name === "Стадия рассмотрения") {
                      return (
                        <div className="mb-2">
                          <label className="form-label">
                            Стадия рассмотрения
                          </label>
                          <Select
                            options={stage}
                            onChange={handleChangeSelect}
                            name="Стадия рассмотрения"
                            placeholder="Выберите"
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
