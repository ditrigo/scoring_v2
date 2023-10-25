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
  })
  const [testApi, setTestApi] = useState()

  const handleChangeTest = (target) => {
    console.log(target)

    setTestData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

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
  const menegers = [
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
                label="Мера поддержки запрашиваемая"
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
