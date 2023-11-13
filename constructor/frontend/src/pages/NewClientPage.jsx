import React, { useEffect, useState } from "react"
import TextField from "../components/CrmPage/Form/textField"
import Divider from "../components/CrmPage/Form/Divider"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { validator } from "../components/utils/validator"
import SelectSearchField from "../components/CrmPage/Form/SelectSearchField"
import {
  getTransformedData,
  transformManagersData,
  transformRegionsData,
} from "../components/utils/crmHelper"
import configFile from "../config.json"
// import ReactDatePicker from "react-datepicker"
import httpService from "../services/http.service"

const NewClientPage = () => {
  const params = useParams()
  const [client, setClient] = useState()
  const [errors, setErrors] = useState({})
  // const [startDate, setStartDate] = useState()

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
  const [clientData, setClientData] = useState({
    test: "",

    first_name: "",
    second_name: "",
    patronymic: "",
    inn: "",
    region_id: "",
    manager_id: "",
    applicant_status: "",
    info_source_type_id: "",
    info_source_date: "",
    info_source_number: "",
    representative_first_name: "",
    representative_second_name: "",
    representative_patronymic: "",
    representative_position: "",
    representative_phone: "",
    representative_email: "",
    control_point: "",
    debt_amount: "",
    debt_type: "",
    category: "",
    support_measure: "",
    note: "",
    support_duration: "",
    first_meeting_date: "",
    event_date: "",
    event_description: "",
    positive_decision_type: "",
    negative_decision_type: "",
    positive_decision_date: "",
    measure_provided_duration: "",
    oiv_request_sender: "",
    settled_debt_amount: "",
    received_amount_budget: "",
    overdue_debt_amount: "",
    technical_overdue_debt_amount: "",
  })

  let validatorConfig = {
    support_measure: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    region_id: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    first_name: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    second_name: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    patronymic: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    inn: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
      count: {
        message: "ИНН должен содержать от 10 символов.",
        value: 10,
      },
    },
    applicant_status: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    // PRD: {
    //   isRequired: {
    //     message: "Это поле обязательно для заполнения",
    //   },
    // },

    category: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    event_description: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    debt_type: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    debt_amount: {
      maxCount: {
        message: "Не больше 6 знаков",
        value: 6,
      },
    },
    ///////////////////////////////////////////////////////////// для следущюих полей нет ключей! Создал пока свои!
    stage: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    dateAppealsToMIDUOL: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    deptSum: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    termMesureNecessary: {
      max: {
        message: "Не более 36",
        value: 36,
      },
    },
    termMesure: {
      max: {
        message: "Не более 36",
        value: 36,
      },
    },
  }

  const isValid = Object.keys(errors).length === 0

  const validate = () => {
    const errors = validator(clientData, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    getTransformedData(
      "crm_supp_measure",
      setSupport,
      "category_type",
      "support_measure"
    )
    getTransformedData("crm_review_stage", setStage, "stage", "stage")
    getTransformedData("crm_category", setCategory, "type", "category")
    getTransformedData(
      "crm_applicant_status",
      setStatus,
      "status",
      "applicant_status"
    )
    getTransformedData(
      "crm_info_source_type",
      setSources,
      "type",
      "info_source_type_id"
    )
    getTransformedData(
      "crm_pos_decision",
      setPositive,
      "positive_decision",
      "positive_decision_type"
    )
    getTransformedData(
      "crm_neg_decision",
      setNegative,
      "negative_decision",
      "negative_decision_type"
    )
    getTransformedData("crm_dept_type", setType, "type", "debt_type")

    axios
      .get(`${configFile.apiEndPoint}/crm_managers/`)
      .then((res) => {
        setManagers(transformManagersData(res.data.data))
      })
      .catch((e) => {
        console.log(e)
      })

    axios
      .get(`${configFile.apiEndPoint}/crm_region/`)
      .then((res) => {
        setRegions(transformRegionsData(res.data.data))
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(client && client.information_source.id)
    const json = {
      region_id: clientData.region_id,
      manager_id: clientData.manager_id,
      applicant_status: clientData.applicant_status,
      information_source_id: {
        id: client[0] ? client[0].information_source.id : "",
        info_source_type_id: clientData.info_source_type_id,
        info_source_date: clientData.info_source_date,
        info_source_number: clientData.info_source_number,
      },
      representitive_client_id: {
        id: client[0] ? client[0].representitive_client.id : "",
        representative_first_name: clientData.representative_first_name,
        representative_second_name: clientData.representative_second_name,
        representative_patronymic: clientData.representative_patronymic,
        representative_position: clientData.representative_position,
        representative_phone: clientData.representative_phone,
        representative_email: clientData.representative_email,
        control_point: clientData.control_point,
      },
      compliance_data_id: {
        id: client[0] ? client[0].compliance_criteria.id : "",
        debt_amount: clientData.debt_amount,
        debt_type: clientData.debt_type,
        category: clientData.category,
        support_measure: clientData.support_measure,
        note: clientData.note,
        support_duration: clientData.support_duration,
      },
      kpi: {
        id: "",
        uuid: "",
        created_date: "",
        positive_decision_date: clientData.positive_decision_date,
        measure_provided_duration: clientData.measure_provided_duration,
        oiv_request_sender: clientData.oiv_request_sender,
        settled_debt_amount: clientData.settled_debt_amount,
        received_amount_budget: clientData.received_amount_budget,
        overdue_debt_amount: clientData.overdue_debt_amount,
        technical_overdue_debt_amount: clientData.technical_overdue_debt_amount,
        positive_decision_type: clientData.positive_decision_type,
        negative_decision_type: clientData.negative_decision_type,
      },
      first_name: clientData.first_name,
      second_name: clientData.second_name,
      patronymic: clientData.patronymic,
      inn: clientData.inn,
      first_meeting_date: clientData.first_meeting_date,
      event_date: clientData.event_date,
      event_description: clientData.event_description,
      fields_of_positive_decision: [
        // {
        //   id: 5,
        //   fields_of_pos_decision: 5,
        //   value: "111",
        // },
        // {
        //   id: 6,
        //   fields_of_pos_decision: 6,
        //   value: "222",
        // },
      ],
    }

    console.log(json)
    if (params.id && client) {
      try {
        const { data } = await httpService.post(
          `crm_update_relation_client/${params.id}`,
          json
        )
        console.log(data)
      } catch (error) {
        console.log(
          "🚀 ~ file: NewClientPage.jsx:238 ~ handleSubmit ~ error:",
          error
        )
      }
    } else {
      try {
        const { data } = await httpService.post(`crm_create_client/`, json)
        // console.log(data)
      } catch (error) {
        console.log(
          "🚀 ~ file: NewClientPage.jsx:238 ~ handleSubmit ~ error:",
          error
        )
      }
    }

    // setClientData({})
  }

  const handleCancle = (e) => {
    e.preventDefault()
    setClientData({})
  }

  const handleChange = (target) => {
    console.log(target)
    if (target?.target?.type === "date") {
      setClientData((prevState) => ({
        ...prevState,
        [target.target.dataset.name]: target.target.value,
      }))
    }

    setClientData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  // TEST

  const solvencyRisk = [
    { label: "Высокий риск", value: "Высокий риск", name: "solvencyRisk" },
    { label: "Средний риск", value: "Средний риск", name: "solvencyRisk" },
    { label: "Низкий риск", value: "Низкий риск", name: "solvencyRisk" },
  ]
  // const activityRisk = [
  //   { label: "Высокий риск", value: "Высокий риск", name: "activityRisk" },
  //   { label: "Средний риск", value: "Средний риск", name: "activityRisk" },
  //   { label: "Низкий риск", value: "Низкий риск", name: "activityRisk" },
  // ]
  // const withdrawalOfAssetsRisk = [
  //   {
  //     label: "Высокий риск",
  //     value: "Высокий риск",
  //     name: "withdrawalOfAssetsRisk",
  //   },
  //   {
  //     label: "Средний риск",
  //     value: "Средний риск",
  //     name: "withdrawalOfAssetsRisk",
  //   },
  //   {
  //     label: "Низкий риск",
  //     value: "Низкий риск",
  //     name: "withdrawalOfAssetsRisk",
  //   },
  // ]

  const PRD = [
    {
      label: "МИУДОЛ",
      value: "МИУДОЛ",
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

  // const [testData, setTestData] = useState({})
  // const [users, setUsers] = useState()
  // const [testApi, setTestApi] = useState()

  const getClients = async () => {
    try {
      const { data } = await httpService.get(`crm_client/`)
      const client = data.data.filter((el) => {
        // console.log("el: ", el.id, "params: ", params.id)
        return el.id === +params.id
      })
      // console.log(client)
      setClient(client)
    } catch (error) {
      console.log("🚀 ~ file: CrmPage.jsx:19 ~ getClients ~ error:", error)
    }
  }

  useEffect(() => {
    if (params.id) getClients()
  }, [])

  useEffect(() => {
    if (params.id && client) {
      // console.log(client[0])
      setClientData({
        ...clientData,
        first_name: client[0].first_name,
        second_name: client[0].second_name,
        patronymic: client[0].patronymic,
        inn: client[0].inn,
        region_id: client[0].region.id,
        manager_id: client[0].manager.id,
        applicant_status: client[0].applicant_status.id,
        info_source_type_id: client[0].information_source.info_source_type,
        info_source_date: client[0].information_source.info_source_date,
        info_source_number: client[0].information_source.info_source_number,
        representative_first_name:
          client[0].representitive_client.representative_first_name,
        representative_second_name:
          client[0].representitive_client.representative_second_name,
        representative_patronymic:
          client[0].representitive_client.representative_patronymic,
        representative_position:
          client[0].representitive_client.representative_position,
        representative_phone:
          client[0].representitive_client.representative_phone,
        representative_email:
          client[0].representitive_client.representative_email,
        control_point: client[0].representitive_client.control_point,
        debt_amount: client[0].compliance_criteria.debt_amount,
        debt_type: client[0].compliance_criteria.debt_type.id,
        category: client[0].compliance_criteria.category.id,
        support_measure: client[0].compliance_criteria.support_measure.id,
        note: client[0].compliance_criteria.note,
        support_duration: client[0].compliance_criteria.support_duration,
        first_meeting_date: client[0].first_meeting_date,
        event_date: client[0].event_date,
        event_description: client[0].event_description,
        positive_decision_type: 1,
        negative_decision_type: 1,
        positive_decision_date: "2023-11-11",
        measure_provided_duration: 23,
        oiv_request_sender: "er",
        settled_debt_amount: 44,
        received_amount_budget: 555,
        overdue_debt_amount: 777,
        technical_overdue_debt_amount: 888,
      })
    }
  }, [client])

  // useEffect(() => {
  //   if (params.id && users) {
  //     testApi && setTestData(testApi[0])
  //   }
  // }, [testApi])

  useEffect(() => {
    validate()
  }, [clientData])

  if (clientData.positive_decision_type) {
    validatorConfig = {
      ...validatorConfig,
      positive_decision_date: {
        isRequired: {
          message: "Это поле обязательно для заполнения",
        },
      },
      measure_provided_duration: {
        isRequired: {
          message: "Это поле обязательно для заполнения",
        },
      },
      settled_debt_amount: {
        isRequired: {
          message: "Это поле обязательно для заполнения",
        },
      },
    }
  }

  const inputsData = [
    {
      label: "Представительство ПРД",
      key: "PRD",
      type: "select",
      options: PRD,
    },
    { label: "Наименование клиента", key: "", type: "title" },
    { label: "Имя", key: "first_name", type: "text" },
    { label: "Фамилия", key: "second_name", type: "text" },
    { label: "Отчество", key: "patronymic", type: "text" },
    { label: "ИНН", key: "inn", type: "text" },
    { label: "Первичные учетные данные", key: "", type: "title" },
    { label: "Регион", key: "region_id", type: "select", options: regions },
    { label: "Менеджер", key: "manager_id", type: "select", options: managers },
    {
      label: "Статус заявителя",
      key: "applicant_status",
      type: "select",
      options: status,
    },
    { label: "Источник информации", key: "", type: "title" },
    {
      label: "Тип источника информации",
      key: "info_source_type_id",
      type: "select",
      options: sources,
    },
    {
      label: "Дата источника информации",
      key: "info_source_date",
      type: "date",
    },
    {
      label: "Номер источника информации",
      key: "info_source_number",
      type: "text",
    },
    { label: "Представитель клиента", key: "", type: "title" },
    { label: "Имя", key: "representative_first_name", type: "text" },
    { label: "Фамилия", key: "representative_second_name", type: "text" },
    { label: "Отчество", key: "representative_patronymic", type: "text" },
    { label: "Должность", key: "representative_position", type: "text" },
    { label: "Номер", key: "representative_phone", type: "text" },
    { label: "Электронная почта", key: "representative_email", type: "text" },
    { label: "Дата обращения в МИУДОЛ", key: "control_point", type: "date" },
    {
      label: "Критерии соответствия клиентским требованиям",
      key: "",
      type: "title",
    },
    { label: "Сумма задолженности", key: "debt_amount", type: "text" },
    { label: "Тип долга", key: "debt_type", type: "select", options: type },
    {
      label: "Категория предприятия",
      key: "category",
      type: "select",
      options: category,
    },
    {
      label: "Мера поддержки, запрашиваемая клиентом",
      key: "support_measure",
      type: "select",
      options: support,
    },
    {
      label:
        "Примечание к описанию события в рамках согласительных меропрятий (гр.22)",
      key: "note",
      type: "text",
    },
    {
      label: "Срок, на который необходимо предоставить меру поддержки",
      key: "support_duration",
      type: "text",
    },
    { label: "Согласительные меры", key: "", type: "title" },
    {
      label: "Дата первой встречи в рамках согласительных мероприятий",
      key: "first_meeting_date",
      type: "date",
    },
    {
      label: "Дата наступления события в рамках согласительных мероприятий",
      key: "event_date",
      type: "date",
    },
    {
      label: "Описание события в рамках согласительных мероприятий",
      key: "event_description",
      type: "text",
    },
    {
      label: "Ключевые показатели эффективности (KPI)",
      key: "",
      type: "title",
    },
    { label: "Принятое решение", key: "", type: "title" },
    {
      label: "Вид положительного решения",
      key: "positive_decision_type",
      type: "select",
      options: positive,
    },
    {
      label: "Дата принятия положительного решения",
      key: "positive_decision_date",
      type: "date",
    },
    {
      label: "Срок, на который предоставляется мера поддержки (в мес.)",
      key: "measure_provided_duration",
      type: "text",
    },
    {
      label: "Орган исполнительной власти, от которого поступило ходатайство",
      key: "oiv_request_sender",
      type: "text",
    },
    {
      label: "Вид отрицаетльного решения",
      key: "negative_decision_type",
      type: "select",
      options: negative,
    },
    {
      label: "Сумма урегулированной задолженности (тыс руб)",
      key: "settled_debt_amount",
      type: "text",
    },
    {
      label: "Сумма, поступившая в бюджет",
      key: "received_amount_budget",
      type: "text",
    },
    { label: "Просроченная задолженность", key: "", type: "title" },
    {
      label: "Сумма просроченной задолженности",
      key: "overdue_debt_amount",
      type: "text",
    },
    {
      label: "Сумма технической просроченной задолженности",
      key: "technical_overdue_debt_amount",
      type: "text",
    },
    ///////////////////////////////////////////////////////////////////////////////////
    { label: "Следующие поля пока не работают!", key: "", type: "title" }, ///////// delete later

    { label: "Отлагательные меры", key: "", type: "title" },
    {
      label:
        "Ближайший срок исполнения обязательств при принятии отлагательных мер",
      key: "",
      type: "date",
    },
    { label: "Изменение сроков уплаты", key: "", type: "title" },
    {
      label:
        "Сумма, не вступившая в силу при рассрочке/отсрочке при принятии меры «Изменение сроков уплаты»",
      key: "",
      type: "text",
    },
    { label: "Мировое соглашение", key: "", type: "title" },
    {
      label: 'Номер дела при принятии меры "Мировое соглашение"',
      key: "",
      type: "text",
    },
    {
      label: "Дата утверждения мирового соглашения судом",
      key: "",
      type: "date",
    },
    {
      label: "Сумма треований, вошедших в мировое соглашение",
      key: "",
      type: "text",
    },
    { label: "Дата окончания мирового соглашения", key: "", type: "date" },
    {
      label: "Сумма исполненных обязательств в рамках мирового соглашения",
      key: "",
      type: "text",
    },
    { label: "Вид предостовляемого обеспечения", key: "", type: "title" },
    { label: "Предоставляемый залог имущества", key: "", type: "text" },
    { label: "Предоставляемое поручительство", key: "", type: "text" },
    { label: "Предоставляемая банковская гарантия", key: "", type: "text" },
    { label: "Стадия рассмотрения", key: "", type: "select", options: stage },
    {
      label: "Проводимая работа в случае не исполнения предоставления меры",
      key: "",
      type: "title",
    },
    { label: "Дата направления уведомления должнику", key: "", type: "date" },
    { label: "Дата направления уведомления поручителю", key: "", type: "date" },
    {
      label: "Дата направления уведомления залогодателю",
      key: "",
      type: "date",
    },
    { label: "Постконтроль", key: "", type: "title" },
    {
      label: "Выручка за прошедший отчетный период текущего года",
      key: "",
      type: "text",
    },
    { label: "Выручка за предыдущий год", key: "", type: "text" },
    {
      label: "Среднесписочная численность персонала за предыдущее полугодие",
      key: "",
      type: "text",
    },
    { label: "Активы за предыдущий год", key: "", type: "text" },
    {
      label:
        'Сумма уплаченных налогов за текущий год согласно ИР "Расчет с бюджетом"',
      key: "",
      type: "text",
    },
    { label: "Стадия в процедуре банкротства", key: "", type: "text" },
    {
      label: 'Сумма долга ЕНС согласно ИР "Расчет с бюджетом"',
      key: "",
      type: "text",
    },
    { label: "Сумма ФОТ за предыдущее полугодие", key: "", type: "text" },
    { label: "Прибыль за предыдущее полугодие", key: "", type: "text" },
    {
      label: "Платежеспособность",
      key: "",
      type: "select",
      options: solvencyRisk,
    }, //risk
    { label: "Текущая стоимость бизнеса", key: "", type: "text" },
    { label: "Ликвидационная стоимость бизнеса", key: "", type: "text" },
    { label: "Возвратность средств", key: "", type: "text" },
    { label: "Потребность в оборотных средствах", key: "", type: "text" },
    { label: "Ранг платежеспособности", key: "", type: "text" },
  ]

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
              {inputsData.map((el, ind) => {
                if (el.type === "text") {
                  return (
                    <TextField
                      key={ind}
                      label={el.label}
                      name={el.key}
                      value={clientData[el.key]}
                      onChange={handleChange}
                      error={errors[el.key]}
                      clientData={el.key === "inn" && clientData}
                    />
                  )
                } else if (el.type === "select") {
                  // params.id &&
                  //   client &&
                  //   console.log(
                  //     el.options?.filter(
                  //       (opt) => opt.id === clientData[el.key]
                  //     )[0]?.label
                  //   )
                  return (
                    <SelectSearchField
                      key={ind}
                      options={el.options}
                      label={el.label}
                      name={el.key}
                      placeholder={
                        params.id && client
                          ? el.options.filter(
                              (opt) => opt.id === clientData[el.key]
                            )[0]?.label
                          : el.label
                      }
                      onChange={handleChange}
                      error={errors[el.key]}
                    />
                  )
                } else if (el.type === "date") {
                  return (
                    <div className="m-2 mb-4 has-validation" key={ind}>
                      <label className="form-label" htmlFor={el.key}>
                        {el.label}
                      </label>
                      <div
                        className={
                          errors[el.key]
                            ? "text form-control mt-1 mr-2  p-2 w-25 is-invalid"
                            : "text form-control mt-1 mr-2 border p-2 w-25"
                        }
                      >
                        {/* <ReactDatePicker
                          selected={startDate}
                          onChange={(date) => handleChange(date)}
                          isClearable
                          placeholderText="Выберите дату"
                          dateFormat="dd/MM/yyyy"
                        /> */}
                        <input
                          type="date"
                          onChange={(date) => handleChange(date)}
                          data-name={el.key}
                        />
                      </div>
                      {errors[el.key] && (
                        <div className="invalid-feedback">
                          Это поле обязательно для заполнению
                        </div>
                      )}
                    </div>
                  )
                } else if (el.type === "title") {
                  return (
                    <div key={ind}>
                      <h3 className="text-center mt-2">{el.label}</h3>
                      <Divider />
                    </div>
                  )
                }
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
                    Назад
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
