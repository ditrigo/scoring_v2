import React, { useEffect, useState } from "react"
import api from "../api"
import TextField from "../components/CrmPage/Form/textField"
import Divider from "../components/CrmPage/Form/Divider"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { validator } from "../components/utils/validator"
import SelectSearchField from "../components/CrmPage/Form/SelectSearchField"

const NewClientPage = () => {
  const params = useParams()
  const [users, setUsers] = useState()
  const [errors, setErrors] = useState({})

  const [clienData, setClientData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Отправка данных на сервер")
    setClientData({})
  }

  const handleCancle = (e) => {
    e.preventDefault()
    setClientData({})
  }

  const handleChange = (target) => {
    console.log(target)
    setClientData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const getServerData = (url, func) => {
    axios
      .get(url)
      .then((res) => {
        // setModels(res.data.data)
        func(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getServerData("http://127.0.0.1:8000/api/crm_managers/", console.log)
    getServerData("http://127.0.0.1:8000/api/crm_region/", console.log)
    getServerData("http://127.0.0.1:8000/api/crm_supp_measure/", console.log)
    getServerData("http://127.0.0.1:8000/api/crm_review_stage/", console.log)
    getServerData("http://127.0.0.1:8000/api/crm_category/", console.log)
    getServerData(
      "http://127.0.0.1:8000/api/crm_applicant_status/",
      console.log
    )
    getServerData(
      "http://127.0.0.1:8000/api/crm_info_source_type/",
      console.log
    )
    getServerData("http://127.0.0.1:8000/api/crm_pos_decision/", console.log)
    getServerData("http://127.0.0.1:8000/api/crm_neg_decision/", console.log)
    getServerData("http://127.0.0.1:8000/api/crm_dept_type/", console.log)
  }, [])

  const validatorConfig = {
    // test: {
    //   isRequired: {
    //     message: "Это поле обязательно для заполнения",
    //   },
    // },

    status: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },

    category: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },

    stage: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },

    supprot: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },

    regions: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    name: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    INN: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    date: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    date2: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    sum: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    descr: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    type: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
  }

  const isValid = Object.keys(errors).length === 0

  // TEST
  const [testData, setTestData] = useState({
    test: "",
    risk: "",
    sources: "",
    managers: "",
    status: "",
    type: "",
    category: "",
    positive: "",
    stage: "",
    negative: "",
    support: "",
    PRD: "",
    regions: "",
    name: "",
    INN: "",
    date: "",
    date2: "",
    sum: "",
    descr: "",
    Номер: "",
    representative: "",
    Телефон: "",
    Почта: "",
    Примечания: "",
    term: "",
    activity: "",
    firstData: "",
  })
  const [testApi, setTestApi] = useState()

  const handleChangeTest = (target) => {
    console.log(target)

    setTestData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const type = [
    { label: "Текущий", value: "Текущий", name: "source" },
    { label: "будущий", value: "будущий", name: "source" },
    { label: "Поручение", value: "Поручение", name: "source" },
  ]

  const riskList = [
    { label: "Высокий риск", value: "Высокий риск", name: "risk" },
    { label: "Средний риск", value: "Средний риск", name: "risk" },
    { label: "Низкий риск", value: "Низкий риск", name: "risk" },
  ]

  const sources = [
    { label: "ТНО, ФНС    ", value: "ТНО, ФНС    ", name: "sources" },
    {
      label: "Входящие звонки    ",
      value: "Входящие звонки    ",
      name: "sources",
    },
    { label: "РГ    ", value: "РГ    ", name: "sources" },
  ]
  const managers = [
    { label: "Бабасов П.Н.", value: "Бабасов П.Н.", name: "menegers" },
    {
      label: "Бойченко И.А.    ",
      value: "Бойченко И.А.    ",
      name: "menegers",
    },
    {
      label: "Емельянова Е.А.    ",
      value: "Емельянова Е.А.    ",
      name: "menegers",
    },
  ]
  const status = [
    { label: "должник    ", value: "должник    ", name: "status" },
    { label: "кредитор    ", value: "кредитор    ", name: "status" },
  ]

  const category = [
    {
      label: "системообразующее    ",
      value: "системообразующее    ",
      name: "category",
    },
    {
      label: "градообразующее    ",
      value: "градообразующее    ",
      name: "category",
    },
  ]

  const stage = [
    {
      label: "Получено обращение     ",
      value: "Получено обращение     ",
      name: "stage",
    },
    {
      label: "Проведено первое совещание     ",
      value: "Проведено первое совещание     ",
      name: "stage",
    },
    {
      label: "Истребованы документы",
      value: "Истребованы документы",
      name: "stage",
    },
  ]

  const support = [
    {
      label: "отсрочка / рассрочка (ст. 64 НК РФ)    ",
      value: "отсрочка / рассрочка (ст. 64 НК РФ)    ",
      name: "support",
    },
    {
      label: "отлагательные меры    ",
      value: "отлагательные меры    ",
      name: "support",
    },
    {
      label: "отлагательные меры + МС    ",
      value: "отлагательные меры + МС",
      name: "support",
    },
  ]

  const regions = [
    {
      number: 1,
      label: "1 Республика Адыгея",
      value: "1 Республика Адыгея",
      name: "regions",
    },
    {
      number: 2,
      label: " 2 Республика Башкортостан",
      value: " 2 Республика Башкортостан",
      name: "regions",
    },
  ]

  const PRD = [
    {
      label: "МИДУОЛ",
      value: "МИДУОЛ",
      name: "PRD",
    },
    {
      label: "РП Республика Коми",
      value: "РП Республика Коми",
      name: "PRD",
    },
    {
      label: "РП Республика Карелия      ",
      value: "РП Республика Карелия",
      name: "PRD",
    },
  ]
  const negative = [
    {
      label:
        "отказ – невозможность восстановления платежеспособности – безальтернативное банкротство     ",
      value:
        "отказ – невозможность восстановления платежеспособности – безальтернативное банкротство     ",
      name: "negative",
    },
    {
      label:
        "отказ - не требуется помощь, стабильное финансовое состояние     ",
      value:
        "отказ - не требуется помощь, стабильное финансовое состояние     ",
      name: "negative",
    },
    {
      label: "отказ – не исполнение регламента деятельности ПРД     ",
      value: "отказ – не исполнение регламента деятельности ПРД     ",
      name: "negative",
    },
  ]
  const positive = [
    { label: "МС    ", value: "МС    ", name: "positive" },
    { label: "Рассрочка    ", value: "Рассрочка    ", name: "positive" },
    {
      label: "отлагательные меры    ",
      value: "отлагательные меры    ",
      name: "positive",
    },
  ]

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data)
    })
    api.testFiedls.fetchAll().then((data) => {
      setTestApi(data)
    })
  }, [])

  useEffect(() => {
    if (params.id && users) {
      testApi && setTestData(testApi[0])
    }
  }, [testApi])

  useEffect(() => {
    validate()
  }, [testData])

  const validate = () => {
    const errors = validator(testData, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const firstData = [
    { id: 10, name: "Номер" },
    {
      id: 13,
      name: "Представитель клиента. ФИО, должность",
      representative: "",
    },
    { id: 14, name: "Телефон" },
    { id: 15, name: "Почта" },
    { id: 20, name: "Вид деятельности", activity: "" },
    { id: 22, name: "Примечания" },
    { id: 23, name: "Срок, на который необходимо предоставить меры", term: "" },
    { id: 26, name: "Дата первой встречи",  }, 
    // firstDate

    { id: 31, name: "На сколько предоставлена мера (в месяцах)" },
    { id: 32, name: "Вид отрицательного решения" },
    { id: 33, name: "От кого ходатайство (для МС)" },
    { id: 34, name: "Сумма урегулированной задолжности (тыс руб)" },
    { id: 35, name: "Сумма, поступившая в бюджет (тыс руб)" },
    {
      id: 37,
      name: "Близжайший срок исполнения обязательства (до какого момента отложены меры)",
    },
    { id: 39, name: "Не вступило в силу рассрочка/отсрочка (тыс руб)" },
    { id: 41, name: "Номер дела" },
    { id: 42, name: "Дата утверждения МС судом" },
    { id: 43, name: "Сумма требований, вошедших в МС" },
    { id: 44, name: "Дата окончания МС" },
    { id: 45, name: "Сумма исполненных обязательств (тыс руб)" },
    { id: 47, name: "Сумма (тыс руб)" },
    { id: 48, name: "Сумма тезнической просроченной задолженности (тыс руб)" },
    { id: 49, name: "Стадия рассмотрения" },
    { id: 51, name: "Залог имущества (тыс руб)" },
    { id: 52, name: "Поручительство (тыс руб)" },
    { id: 53, name: "Банковская гарантия (тыс руб)" },

    { id: 55, name: "Дата направления ДОЛЖНИКУ уведомления (претензии)" },
    { id: 56, name: "Дата направления ПОРУЧИТЕЛЮ уведомления (претензии)" },
    { id: 57, name: "Дата направления ЗАЛОГОДАТЕЛЮ уведомления (претензии)" },
    { id: 59, name: "Деловая активность (риск)", type: "risk" },
    { id: 60, name: "Вид активов (риск)", type: "risk" },
    { id: 62, name: "Контрольная точка", type: "date" },
  ]
  // TEST

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-12 mb-4">
          <div className="card p-2">
            <form>
              <div>
                <h3 className="text-center mt-2">Данные клиента</h3>
                <Divider />
              </div>
              {/* <SelectSearchField
                options={riskList}
                onChange={handleChangeTest}
                name="risk"
                error={errors.risk}
                label="New label select"
                placeholder={testData.risk}
              /> */}
              <SelectSearchField
                options={riskList}
                onChange={handleChangeTest}
                name="risk"
                error={errors.risk}
                label="Платежеспособность"
                placeholder={testData.risk}
              />
              <SelectSearchField
                options={regions}
                onChange={handleChangeTest}
                name="regions"
                error={errors.regions}
                label="Регион"
                placeholder={testData.regions}
              />
              <SelectSearchField
                options={status}
                onChange={handleChangeTest}
                name="status"
                error={errors.status}
                label="Статус заявителя"
                placeholder={testData.status}
              />
              <SelectSearchField
                options={category}
                onChange={handleChangeTest}
                name="category"
                error={errors.category}
                label="Категория"
                placeholder={testData.category}
              />
              <SelectSearchField
                options={support}
                onChange={handleChangeTest}
                name="support"
                error={errors.support}
                label="Мера поддержки запрашиваемая клиентом"
                placeholder={testData.support}
              />
              <SelectSearchField
                options={sources}
                onChange={handleChangeTest}
                name="sources"
                error={errors.sources}
                label="Источник информации"
                placeholder={testData.sources}
              />
              <SelectSearchField
                options={stage}
                onChange={handleChangeTest}
                name="stage"
                error={errors.stage}
                label="Стадия рассмотрения"
                placeholder={testData.stage}
              />
              <SelectSearchField
                options={managers}
                onChange={handleChangeTest}
                name="managers"
                error={errors.managers}
                label="Менеджер"
                placeholder={testData.managers}
              />
              <SelectSearchField
                options={positive}
                onChange={handleChangeTest}
                name="positive"
                error={errors.positive}
                label="Положительное решение"
                placeholder={testData.positive}
              />
              <SelectSearchField
                options={negative}
                onChange={handleChangeTest}
                name="negative"
                error={errors.negative}
                label="Отрицательное решение"
                placeholder={testData.negative}
              />
              <SelectSearchField
                options={PRD}
                onChange={handleChangeTest}
                name="PRD"
                error={errors.PRD}
                label="Представительсво РПД"
                placeholder={testData.PRD}
              />
              <SelectSearchField
                options={type}
                onChange={handleChangeTest}
                name="type"
                error={errors.type}
                label="Тип долга"
                placeholder={testData.type}
              />

              {/* <TextField
                label="label tex"
                name="test"
                value={testData.test}
                onChange={handleChangeTest}
                error={errors.test}
              /> */}
              <TextField
                label="Нименование клиента"
                name="name"
                value={testData.name}
                onChange={handleChangeTest}
                error={errors.name}
              />
              <TextField
                label="ИНН"
                name="INN"
                value={testData.INN}
                onChange={handleChangeTest}
                error={errors.INN}
              />
              <TextField
                label="Сумма задолженности"
                name="sum"
                value={testData.sum}
                onChange={handleChangeTest}
                error={errors.sum}
              />
              <TextField
                label="Описание события"
                name="descr"
                value={testData.descr}
                onChange={handleChangeTest}
                error={errors.descr}
              />
              <TextField
                label="Дата обращения в МИДУОЛ"
                name="date"
                value={testData.date}
                onChange={handleChangeTest}
                error={errors.date}
              />
              <TextField
                label="Дата наступления события"
                name="date2"
                value={testData.date2}
                onChange={handleChangeTest}
                error={errors.date2}
              />
              {firstData.map((el) => {
                const elName = el.name
                return (
                  <TextField
                    label={elName}
                    name={elName}
                    value={testData.elName}
                    onChange={handleChangeTest}
                    error={errors.elName}
                  />
                )
              })}
              <div className="row row-centered  colored">
                <button
                  type="submit"
                  className="btn btn-primary w-25 mx-auto m-2 col-sm-3"
                  onClick={handleSubmit}
                  disabled={!isValid}
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

export default NewClientPage
