import React, { useEffect, useState } from "react"
import api from "../api"
import TextField from "../components/CrmPage/Form/textField"
import Divider from "../components/CrmPage/Form/Divider"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { validator } from "../components/utils/validator"
import SelectSearchField from "../components/CrmPage/Form/SelectSearchField"
import {
  firstData,
  getTransformedData,
  transformManagersData,
  transformRegionsData,
  validatorConfig,
} from "../components/utils/crmHelper"

const NewClientPage = () => {
  const params = useParams()
  const [users, setUsers] = useState()
  const [errors, setErrors] = useState({})

  const [clientData, setClientData] = useState({})
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
  const isValid = Object.keys(errors).length === 0

  const validate = () => {
    const errors = validator(testData, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
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
    console.log(testData)
    // setClientData({})
    setTestData({
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
    // console.log(target)

    setTestData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

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
                error={errors.dateEventOccurance}
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
