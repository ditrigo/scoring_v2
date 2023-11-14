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

  const [clienData, setClientData] = useState([])
  const [regions, setRegions] = useState({})
  const [support, setSupport] = useState({})
  const [stage, setStage] = useState({})
  const [category, setCategory] = useState({})
  const [status, setStatus] = useState({})
  const [sources, setSources] = useState({})
  const [positive, setPositive] = useState({})
  const [negative, setNegative] = useState({})
  const [type, setType] = useState({})
  const [managers, setManagers] = useState({})

  const transformData = (data, keyInNativeObj, keyName) => {
    const result = data.map((el) => ({
      id: el.id,
      label: el[keyInNativeObj],
      value: el[keyInNativeObj],
      name: keyName,
    }))
    return result
  }

  const transformManagersData = (data) => {
    const result = data.map((el) => ({
      id: el.id,
      label: `${el.second_name} ${el.first_name}. ${el.patronymic}. ${el.job_title}`,
      value: `${el.second_name} ${el.first_name}. ${el.patronymic}. ${el.job_title}`,
      name: "managers",
    }))
    return result
  }

  const transformRegionsData = (data) => {
    const result = data.map((el) => ({
      id: el.id,
      label: `${el.region_number} ${el.region}`,
      value: `${el.region_number} ${el.region}`,
      name: "regions",
    }))
    return result
  }

  function getTransformedData(endPoint, setDataState, keyInNativeObj, keyName) {
    axios
      .get(`http://127.0.0.1:8000/api/${endPoint}/`)
      .then((res) => {
        // console.log(res.data)
        setDataState(transformData(res.data.data, keyInNativeObj, keyName))
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getTransformedData(
      "crm_supp_measure",
      setSupport,
      "category_type",
      "support"
    )
    getTransformedData("crm_review_stage", setStage, "stage", "stage")
    getTransformedData("crm_category", setCategory, "type", "category")
    getTransformedData("crm_applicant_status", setStatus, "status", "status")
    getTransformedData("crm_info_source_type", setSources, "type", "sources")
    getTransformedData(
      "crm_pos_decision",
      setPositive,
      "positive_decision",
      "positive"
    )
    getTransformedData(
      "crm_neg_decision",
      setNegative,
      "negative_decision",
      "negative"
    )
    getTransformedData("crm_dept_type", setType, "type", "type")

    axios
      .get(`http://127.0.0.1:8000/api/crm_managers/`)
      .then((res) => {
        setManagers(transformManagersData(res.data.data))
      })
      .catch((e) => {
        console.log(e)
      })

    axios
      .get(`http://127.0.0.1:8000/api/crm_region/`)
      .then((res) => {
        setRegions(transformRegionsData(res.data.data))
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

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

    support: {
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
    dateAppealsToMIDUOL: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    dateEventOccurance: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    deptSum: {
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
    solvencyRisk: "",
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
    dateAppealsToMIDUOL: "",
    dateEventOccurance: "",
    deptSum: "",
    descr: "",
    activity: "",
    sourceNumber: "",
    representativeNameEndTitle: "",
    representativeNumber: "",
    representativeMail: "",
    notes: "",
    termMesureNecessary: "",
    firstMeetDate: "",
    termMesure: "",
    petitionAuthor: "",
    settledDebtAmount: "",
    amountReceivedIntoBudget: "",
    nearestDateForFulfillment: "",
    notInForce: "",
    caseNumber: "",
    courtMCApprovalDate: "",
    amountOfClaimsMC: "",
    MCexpirationDate: "",
    amountOfFulfilledObligations: "",
    sum: "",
    amountOfTechnicalOverdueDebt: "",
    pledgeOfProperty: "",
    surety: "",
    bankGuarantee: "",
    deptorDirectionDate: "",
    garantorDirectionDate: "",
    pledgetorDirectionDate: "",
    checkPoint: "",
    activityRisk: "",
    assetsTypeRisk: "",
  })
  const [testApi, setTestApi] = useState()

  const handleChangeTest = (target) => {
    console.log(target)

    setTestData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  // const type = [
  //   { label: "Текущий", value: "Текущий", name: "type" },
  //   { label: "будущий", value: "будущий", name: "type" },
  //   { label: "Поручение", value: "Поручение", name: "type" },
  // ]

  const solvencyRisk = [
    { label: "Высокий риск", value: "Высокий риск", name: "solvencyRisk" },
    { label: "Средний риск", value: "Средний риск", name: "solvencyRisk" },
    { label: "Низкий риск", value: "Низкий риск", name: "solvencyRisk" },
  ]
  const activityRisk = [
    { label: "Высокий риск", value: "Высокий риск", name: "activityRisk" },
    { label: "Средний риск", value: "Средний риск", name: "activityRisk" },
    { label: "Низкий риск", value: "Низкий риск", name: "activityRisk" },
  ]
  const assetsTypeRisk = [
    { label: "Высокий риск", value: "Высокий риск", name: "assetsTypeRisk" },
    { label: "Средний риск", value: "Средний риск", name: "assetsTypeRisk" },
    { label: "Низкий риск", value: "Низкий риск", name: "assetsTypeRisk" },
  ]

  // const sources = [
  //   { label: "ТНО, ФНС", value: "ТНО, ФНС", name: "sources" },
  //   {
  //     label: "Входящие звонки",
  //     value: "Входящие звонки",
  //     name: "sources",
  //   },
  //   { label: "РГ", value: "РГ", name: "sources" },
  // ]
  // const managers = [
  //   { label: "Бабасов П.Н.", value: "Бабасов П.Н.", name: "managers" },
  //   {
  //     label: "Бойченко И.А.",
  //     value: "Бойченко И.А.",
  //     name: "managers",
  //   },
  //   {
  //     label: "Емельянова Е.А.",
  //     value: "Емельянова Е.А.",
  //     name: "managers",
  //   },
  // ]
  // const status = [
  //   { label: "должник", value: "должник", name: "status" },
  //   { label: "кредитор", value: "кредитор", name: "status" },
  // ]

  // const category = [
  //   {
  //     label: "системообразующее",
  //     value: "системообразующее",
  //     name: "category",
  //   },
  //   {
  //     label: "градообразующее",
  //     value: "градообразующее",
  //     name: "category",
  //   },
  // ]

  // const stage = [
  //   {
  //     label: "Получено обращение",
  //     value: "Получено обращение",
  //     name: "stage",
  //   },
  //   {
  //     label: "Проведено первое совещание",
  //     value: "Проведено первое совещание",
  //     name: "stage",
  //   },
  //   {
  //     label: "Истребованы документы",
  //     value: "Истребованы документы",
  //     name: "stage",
  //   },
  // ]

  // const support = [
  //   {
  //     label: "отсрочка / рассрочка (ст. 64 НК РФ)",
  //     value: "отсрочка / рассрочка (ст. 64 НК РФ)",
  //     name: "support",
  //   },
  //   {
  //     label: "отлагательные меры",
  //     value: "отлагательные меры",
  //     name: "support",
  //   },
  //   {
  //     label: "отлагательные меры + МС",
  //     value: "отлагательные меры + МС",
  //     name: "support",
  //   },
  // ]

  // const regions = [
  //   {
  //     number: 1,
  //     label: "1 Республика Адыгея",
  //     value: "1 Республика Адыгея",
  //     name: "regions",
  //   },
  //   {
  //     number: 2,
  //     label: " 2 Республика Башкортостан",
  //     value: " 2 Республика Башкортостан",
  //     name: "regions",
  //   },
  // ]

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
      label: "РП Республика Карелия",
      value: "РП Республика Карелия",
      name: "PRD",
    },
  ]
  // const negative = [
  //   {
  //     label:
  //       "отказ – невозможность восстановления платежеспособности – безальтернативное банкротство",
  //     value:
  //       "отказ – невозможность восстановления платежеспособности – безальтернативное банкротство",
  //     name: "negative",
  //   },
  //   {
  //     label: "отказ - не требуется помощь, стабильное финансовое состояние",
  //     value: "отказ - не требуется помощь, стабильное финансовое состояние",
  //     name: "negative",
  //   },
  //   {
  //     label: "отказ – не исполнение регламента деятельности ПРД",
  //     value: "отказ – не исполнение регламента деятельности ПРД",
  //     name: "negative",
  //   },
  // ]
  // const positive = [
  //   { label: "МС", value: "МС", name: "positive" },
  //   { label: "Рассрочка", value: "Рассрочка", name: "positive" },
  //   {
  //     label: "отлагательные меры",
  //     value: "отлагательные меры",
  //     name: "positive",
  //   },
  // ]

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
    { id: 10, name: "Источник информации. Номер", key: "sourceNumber" },
    {
      id: 13,
      name: "Представитель клиента. ФИО, должность",
      key: "representativeNameEndTitle",
    },
    {
      id: 14,
      name: "Представитель клиента. Телефон",
      key: "representativeNumber",
    },
    { id: 15, name: "Представитель клиента. Почта", key: "representativeMail" },
    { id: 20, name: "Вид деятельности", key: "activity" },
    { id: 22, name: "Примечания", key: "notes" },
    {
      id: 23,
      name: "Срок, на который необходимо предоставить меры",
      key: "termMesureNecessary",
    },
    { id: 26, name: "Дата первой встречи", key: "firstMeetDate" },

    {
      id: 31,
      name: "На сколько предоставлена мера (в месяцах)",
      key: "termMesure",
    },
    { id: 33, name: "От кого ходатайство (для МС)", key: "petitionAuthor" },
    {
      id: 34,
      name: "Сумма урегулированной задолжности (тыс руб)",
      key: "settledDebtAmount",
    },
    {
      id: 35,
      name: "Сумма, поступившая в бюджет (тыс руб)",
      key: "amountReceivedIntoBudget",
    },
    {
      id: 37,
      name: "Близжайший срок исполнения обязательства (до какого момента отложены меры)",
      key: "nearestDateForFulfillment ",
    },
    {
      id: 39,
      name: "Не вступило в силу рассрочка/отсрочка (тыс руб)",
      key: "notInForce",
    },
    { id: 41, name: "Номер дела", key: "caseNumber" },
    { id: 42, name: "Дата утверждения МС судом", key: "courtMCApprovalDate" },
    {
      id: 43,
      name: "Сумма требований, вошедших в МС",
      key: "amountOfClaimsMC",
    },
    { id: 44, name: "Дата окончания МС", key: "MCexpirationDate" },
    {
      id: 45,
      name: "Сумма исполненных обязательств (тыс руб)",
      key: "amountOfFulfilledObligations",
    },
    { id: 47, name: "Сумма (тыс руб)", key: "sum" },
    {
      id: 48,
      name: "Сумма технической просроченной задолженности (тыс руб)",
      key: "amountOfTechnicalOverdueDebt",
    },
    { id: 51, name: "Залог имущества (тыс руб)", key: "pledgeOfProperty" },
    { id: 52, name: "Поручительство (тыс руб)", key: "surety" },
    { id: 53, name: "Банковская гарантия (тыс руб)", key: "bankGuarantee" },

    {
      id: 55,
      name: "Дата направления ДОЛЖНИКУ уведомления (претензии)",
      key: "deptorDirectionDate",
    },
    {
      id: 56,
      name: "Дата направления ПОРУЧИТЕЛЮ уведомления (претензии)",
      key: "garantorDirectionDate",
    },
    {
      id: 57,
      name: "Дата направления ЗАЛОГОДАТЕЛЮ уведомления (претензии)",
      key: "pledgetorDirectionDate",
    },
    { id: 62, name: "Контрольная точка", key: "checkPoint" },
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
                options={PRD}
                onChange={handleChangeTest}
                name="PRD"
                error={errors.PRD}
                label="Представительсво РПД"
                placeholder={testData.PRD}
              />
              <SelectSearchField
                options={solvencyRisk}
                onChange={handleChangeTest}
                name="solvencyRisk"
                error={errors.solvencyRisk}
                label="Платежеспособность"
                placeholder={testData.solvencyRisk}
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
              {/* <SelectSearchField
                options={PRD}
                onChange={handleChangeTest}
                name="PRD"
                error={errors.PRD}
                label="Представительсво РПД"
                placeholder={testData.PRD}
              /> */}
              <SelectSearchField
                options={type}
                onChange={handleChangeTest}
                name="type"
                error={errors.type}
                label="Тип долга"
                placeholder={testData.type}
              />
              <SelectSearchField
                options={activityRisk}
                onChange={handleChangeTest}
                name="activityRisk"
                error={errors.activityRisk}
                label="Деловая активность (риск)"
                placeholder={testData.activityRisk}
              />
              <SelectSearchField
                options={assetsTypeRisk}
                onChange={handleChangeTest}
                name="assetsTypeRisk"
                error={errors.assetsTypeRisk}
                label="Вид активов (риск)"
                placeholder={testData.assetsTypeRisk}
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
                name="deptSum"
                value={testData.deptSum}
                onChange={handleChangeTest}
                error={errors.deptSum}
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
                name="dateAppealsToMIDUOL"
                value={testData.dateAppealsToMIDUOL}
                onChange={handleChangeTest}
                error={errors.dateAppealsToMIDUOL}
              />
              <TextField
                label="Дата наступления события"
                name="dateEventOccurance"
                value={testData.dateEventOccurance}
                onChange={handleChangeTest}
                error={errors.dadateEventOccurancete2}
              />
              {firstData.map((el) => {
                return (
                  <TextField
                    key={el.id}
                    label={el.name}
                    name={el.key}
                    value={testData.key}
                    onChange={handleChangeTest}
                    error={errors.key}
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
