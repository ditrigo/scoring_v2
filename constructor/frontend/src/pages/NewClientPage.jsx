import React, { useEffect, useState } from "react"
import TextField from "../components/CrmPage/Form/textField"
import Divider from "../components/CrmPage/Form/Divider"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { validator } from "../components/utils/validator"
import SelectSearchField from "../components/CrmPage/Form/SelectSearchField"
import {
  getTransformedData,
  transformManagersData,
  transformRegionsData,
} from "../components/utils/crmHelper"
import configFile from "../config.json"
import httpService from "../services/http.service"

const NewClientPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState()
  const [errors, setErrors] = useState({})

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
  const [prdCatalog, setPrdCatalog] = useState({})
  const [fieldsOfPosDec, setfieldsOfPosDec] = useState([])
  const [dataOfFieldsDec, setDataOfFieldsDec] = useState({})
  const [clientData, setClientData] = useState({
    first_name: "",
    // second_name: "",
    // patronymic: "",
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
    fields_of_positive_decision: [],
    // DENIS
    stage_review: "",
    prd_catalog_id: "",
  })

  let validatorConfig = {
    prd_catalog_id: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    first_name: {
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
    stage_review: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    region_id: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    applicant_status: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    control_point: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    debt_amount: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
      maxCount: {
        message: "Не больше 6 знаков",
        value: 6,
      },
    },
    debt_type: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    category: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    support_measure: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    event_date: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    event_description: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
      maxCount: {
        message: "Не больше 200 знаков",
        value: 200,
      },
    },
    // settled_debt_amount: {},
    received_amount_budget: {
      maxCount: {
        message: "Не больше 6 знаков",
        value: 6,
      },
    },
    overdue_debt_amount: {
      maxCount: {
        message: "Не больше 6 знаков",
        value: 6,
      },
    },
    technical_overdue_debt_amount: {
      maxCount: {
        message: "Не больше 6 знаков",
        value: 6,
      },
    },
    support_duration: {
      max: {
        message: "Не более 36",
        value: 36,
      },
    },
    // measure_provided_duration: {
    //   max: {
    //     message: "Не более 36",
    //     value: 36,
    //   },
    // },
    9: {
      maxCount: {
        message: "Не больше 6 знаков",
        value: 6,
      },
    },
    14: {
      maxCount: {
        message: "Не больше 6 знаков",
        value: 6,
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
    getTransformedData("crm_review_stage", setStage, "stage", "stage_review")
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
    getTransformedData(
      "crm_prd_catalog",
      setPrdCatalog,
      "catalog_prd",
      "prd_catalog_id"
    )

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

    if (params.id && client) {
      // Обновление
      const jsonForUpdate = {
        id: client.id,
        first_name: clientData.first_name,
        inn: clientData.inn,
        region_id: clientData.region_id,
        manager_id: clientData.manager_id,
        applicant_status: clientData.applicant_status,

        information_source_id: {
          id: client.information_source.id,
          info_source_type_id: clientData.info_source_type_id,
          info_source_date: clientData.info_source_date,
          info_source_number: clientData.info_source_number,
        },
        representitive_client_id: {
          id: client.representitive_client.id,
          representative_first_name: clientData.representative_first_name,
          // representative_second_name: clientData.representative_second_name,
          // representative_patronymic: clientData.representative_patronymic,
          representative_position: clientData.representative_position,
          representative_phone: clientData.representative_phone,
          representative_email: clientData.representative_email,
          control_point: clientData.control_point,
        },
        compliance_data_id: {
          id: client.compliance_criteria.id,
          debt_amount: clientData.debt_amount,
          debt_type: clientData.debt_type,
          category: clientData.category,
          support_measure: clientData.support_measure,
          note: clientData.note,
          support_duration: clientData.support_duration,
        },
        first_meeting_date: clientData.first_meeting_date,
        event_date: clientData.event_date,
        event_description: clientData.event_description,
        kpi_id: {
          id: client.kpi.id,
          positive_decision_date: clientData.positive_decision_date,
          measure_provided_duration: clientData.measure_provided_duration,
          oiv_request_sender: clientData.oiv_request_sender,
          settled_debt_amount: clientData.settled_debt_amount,
          received_amount_budget: clientData.received_amount_budget,
          overdue_debt_amount: clientData.overdue_debt_amount,
          technical_overdue_debt_amount:
            clientData.technical_overdue_debt_amount,
          positive_decision_type: clientData.positive_decision_type,
          negative_decision_type: clientData.negative_decision_type,
        },

        prd_catalog_id: clientData.prd_catalog_id,
        stage_review: clientData.stage_review,

        fields_of_positive_decision: [...Object.values(dataOfFieldsDec)],
      }
      console.log("🚀jsonForUpdate: ", jsonForUpdate)
      try {
        const { data } = await httpService.post(
          `crm_update_relation_client/${params.id}`,
          jsonForUpdate
        )
        alert(data.message)
        console.log(data)
        navigate("/crm")
      } catch (error) {
        alert("Ошибка: " + error.response.data.message)
      }
    } else {
      try {
        // Создание
        const json = {
          region_id: clientData.region_id,
          manager_id: clientData.manager_id,
          applicant_status: clientData.applicant_status,
          information_source_id: {
            info_source_type_id: clientData.info_source_type_id,
            info_source_date: clientData.info_source_date,
            info_source_number: clientData.info_source_number,
          },
          representitive_client_id: {
            representative_first_name: clientData.representative_first_name,
            // representative_second_name: clientData.representative_second_name,
            // representative_patronymic: clientData.representative_patronymic,
            representative_position: clientData.representative_position,
            representative_phone: clientData.representative_phone,
            representative_email: clientData.representative_email,
            control_point: clientData.control_point,
          },
          compliance_data_id: {
            debt_amount: clientData.debt_amount,
            debt_type: clientData.debt_type,
            category: clientData.category,
            support_measure: clientData.support_measure,
            note: clientData.note,
            support_duration: clientData.support_duration,
          },
          kpi_id: {
            positive_decision_date: clientData.positive_decision_date,
            measure_provided_duration: clientData.measure_provided_duration,
            oiv_request_sender: clientData.oiv_request_sender,
            settled_debt_amount: clientData.settled_debt_amount,
            received_amount_budget: clientData.received_amount_budget,
            overdue_debt_amount: clientData.overdue_debt_amount,
            technical_overdue_debt_amount:
              clientData.technical_overdue_debt_amount,
            positive_decision_type: clientData.positive_decision_type,
            negative_decision_type: clientData.negative_decision_type,
          },
          first_name: clientData.first_name,
          // second_name: clientData.second_name,
          // patronymic: clientData.patronymic,
          inn: clientData.inn,
          first_meeting_date: clientData.first_meeting_date,
          event_date: clientData.event_date,
          event_description: clientData.event_description,
          // DENIS
          prd_catalog_id: clientData.prd_catalog_id,
          stage_review: clientData.stage_review,
          fields_of_positive_decision: [...Object.values(dataOfFieldsDec)],
        }
        console.log("Создание json: ", json)

        const { data } = await httpService.post(`crm_create_client/`, json)
        alert("Ответ сервера: " + data.message)
        console.log(data)
        navigate("/crm")
      } catch (error) {
        console.log("🚀 error:", error.response.data)
        alert("Ошибка: " + JSON.stringify(error.response.data))
      }
    }
  }

  const handleCancle = (e) => {
    e.preventDefault()
    navigate("/crm")
  }

  const handleChange = (target) => {
    if (Number.isInteger(+target.name)) {
      console.log(target.name)
      setDataOfFieldsDec((prevState) => ({
        ...prevState,
        [target.name]: {
          // id: "",
          fields_of_pos_decision: target.name,
          value: target.value,
        },
      }))
    }
    if (target.target?.dataset.positive) {
      setDataOfFieldsDec((prevState) => ({
        ...prevState,
        [target.target.dataset.name]: {
          // id: "",
          fields_of_pos_decision: target.target.dataset.name,
          value: target.target.value,
        },
      }))
    }
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

  const getClient = async () => {
    try {
      const { data } = await httpService.get(
        `crm_detail_relation_client/${params.id}`
      )
      console.log(data.data)
      setClient(data.data)
    } catch (error) {
      console.log("🚀 ", error)
    }
  }

  useEffect(() => {
    if (params.id) getClient()
  }, [])

  useEffect(() => {
    if (params.id && client) {
      console.log(client)
      setClientData({
        first_name: client.first_name,
        // second_name: client.second_name,
        // patronymic: client.patronymic,
        inn: client.inn,
        region_id: client.region.id,
        manager_id: client.manager.id,
        applicant_status: client.applicant_status.id,
        info_source_type_id: client.information_source.info_source_type,
        info_source_date: client.information_source.info_source_date,
        info_source_number: client.information_source.info_source_number,
        representative_first_name:
          client.representitive_client.representative_first_name,
        representative_second_name:
          client.representitive_client.representative_second_name,
        representative_patronymic:
          client.representitive_client.representative_patronymic,
        representative_position:
          client.representitive_client.representative_position,
        representative_phone: client.representitive_client.representative_phone,
        representative_email: client.representitive_client.representative_email,
        control_point: client.representitive_client.control_point,
        debt_amount: client.compliance_criteria.debt_amount,
        debt_type: client.compliance_criteria.debt_type.id,
        category: client.compliance_criteria.category.id,
        support_measure: client.compliance_criteria.support_measure.id,
        note: client.compliance_criteria.note,
        support_duration: client.compliance_criteria.support_duration,
        first_meeting_date: client.first_meeting_date,
        event_date: client.event_date,
        event_description: client.event_description,
        positive_decision_type: client.kpi.positive_decision_type,
        negative_decision_type: client.kpi.negative_decision_type,
        positive_decision_date: client.kpi.positive_decision_date,
        measure_provided_duration: client.kpi.measure_provided_duration,
        oiv_request_sender: client.kpi.oiv_request_sender,
        settled_debt_amount: client.kpi.settled_debt_amount,
        received_amount_budget: client.kpi.received_amount_budget,
        overdue_debt_amount: client.kpi.overdue_debt_amount,
        technical_overdue_debt_amount: client.kpi.technical_overdue_debt_amount,
        // DENIS
        prd_catalog_id: client.prd_catalog.id,
        stage_review: client.stage_review?.id,
        fields_of_positive_decision: client.fields_of_positive_decision,
      })
      client.fields_of_positive_decision.map((el) => {
        console.log("подгрузка полей")
        setClientData((prevState) => ({
          ...prevState,
          [el.fields_of_pos_decision]: el.value,
        }))
      })
    }
  }, [client])

  useEffect(() => {
    validate()

    if (params.id && client) {
      client.fields_of_positive_decision.map((el) => {
        setDataOfFieldsDec((prevState) => ({
          ...prevState,
          [el.fields_of_pos_decision]: {
            // id: "",
            fields_of_pos_decision: el.fields_of_pos_decision,
            value: el.value,
          },
        }))
      })
    }
  }, [clientData])

  useEffect(() => {
    if (params.id && client) {
      client.fields_of_positive_decision.map((el) => {
        console.log("подгрузка полей")
        return setClientData((prevState) => ({
          ...prevState,
          [el.fields_of_pos_decision]: el.value,
        }))
      })
    }
  }, [])

  if (clientData.positive_decision_type) {
    // console.log("validator add ", clientData.positive_decision_type)
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
        max: {
          message: "Не более 36",
          value: 36,
        },
      },
      settled_debt_amount: {
        isRequired: {
          message: "Это поле обязательно для заполнения",
        },
        maxCount: {
          message: "Не больше 6 знаков",
          value: 6,
        },
      },
    }
  }

  const getfieldsOfPositivDecision = async (id) => {
    setDataOfFieldsDec({})
    setfieldsOfPosDec([])
    try {
      const { data } = await httpService.get(
        `crm_fields_of_positiv_decision/${id}`
      )
      // console.log(data.data)
      const res = data.data.map((el) => {
        if (!client) {
          setClientData((prevState) => ({
            ...prevState,
            [el.id]: "",
          }))
        }
        setClientData((prevState) => ({
          ...prevState,
          control_field: "",
        })) // Нужно изменить стейт для того, чтоб подгрузить значения в fieldsOfPosDec. Здесь все сложно...
        return {
          label: el.description,
          key: el.id,
          type: el.type_of_fields === "datetime" ? "date" : "text",
          isPositive: true,
        }
      })
      setfieldsOfPosDec(res)

      // console.log(res)
    } catch (error) {
      // console.log("🚀 ~ ", error)
    }
  }
  useEffect(() => {
    getfieldsOfPositivDecision(clientData.positive_decision_type)
  }, [clientData.positive_decision_type])

  const inputsData = [
    { label: "1. Общие сведения", key: "", type: "title" },
    {
      label: "Представительство ПРД",
      key: "prd_catalog_id",
      type: "select",
      options: prdCatalog,
    },
    {
      label: "Менеджер площадки",
      key: "manager_id",
      type: "select",
      options: managers,
    },
    {
      label: "Наименование клиента",
      key: "first_name",
      type: "text",
    },
    // { label: "Фамилия", key: "second_name", type: "text" },
    // { label: "Отчество", key: "patronymic", type: "text" }, /// - заменить на одно поле

    { label: "ИНН", key: "inn", type: "text", inputType: "number" },
    {
      label: "Стадия рассмотрения",
      key: "stage_review",
      type: "select",
      options: stage,
    },

    { label: "2. Первичные учетные данные", key: "", type: "title" },
    { label: "Регион", key: "region_id", type: "select", options: regions },
    {
      label: "Статус заявителя",
      key: "applicant_status",
      type: "select",
      options: status,
    },
    { label: "Источник информации", key: "", type: "title2" },
    {
      label: "Тип источника информации (Письмо / список / поручение)",
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
    { label: "Представители клиента", key: "", type: "title2" },
    { label: "ФИО", key: "representative_first_name", type: "text" },
    // { label: "Фамилия", key: "representative_second_name", type: "text" },
    // { label: "Отчество", key: "representative_patronymic", type: "text" },
    { label: "Должность", key: "representative_position", type: "text" },
    {
      label: "Телефон",
      key: "representative_phone",
      type: "text",
      inputType: "number",
    },
    {
      label: "Электронная почта",
      key: "representative_email",
      type: "text",
      inputType: "email",
    },
    {
      label: "Дата регистрации обращения в МИУДОЛ",
      key: "control_point",
      type: "date",
    },
    {
      label: "3. Критерии соответствия клиентским требованиям",
      key: "",
      type: "title",
    },
    {
      label: "Сумма задолженности",
      key: "debt_amount",
      type: "text",
      inputType: "number",
    },
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
      label: "Примечание к мере поддержки",
      key: "note",
      type: "text",
    },
    {
      label: "Срок, на который необходимо предоставить меру поддержки (мес)",
      key: "support_duration",
      type: "text",
      inputType: "number",
    },

    { label: "4. Согласительные мероприятия", key: "", type: "title" },
    {
      label: "Дата первой встречи",
      key: "first_meeting_date",
      type: "date",
    },
    {
      label: "Контрольная точка (Дата наступления события)",
      key: "event_date",
      type: "date",
    },
    {
      label: "Описание события ",
      key: "event_description",
      type: "text",
    },
    {
      label: "5. Ключевые показатели эффективности (KPI)",
      key: "",
      type: "title",
    },
    { label: "Принятое решение", key: "", type: "title2" },
    {
      label: "Вид положительного решения",
      key: "positive_decision_type",
      type: "select",
      disabled: clientData.negative_decision_type,
      options: positive,
    },

    fieldsOfPosDec.length && fieldsOfPosDec[0],
    fieldsOfPosDec.length && fieldsOfPosDec[1] ? fieldsOfPosDec[1] : "",
    fieldsOfPosDec.length && fieldsOfPosDec[2] ? fieldsOfPosDec[2] : "",
    fieldsOfPosDec.length && fieldsOfPosDec[3] ? fieldsOfPosDec[3] : "",
    fieldsOfPosDec.length && fieldsOfPosDec[4] ? fieldsOfPosDec[4] : "",
    fieldsOfPosDec.length && fieldsOfPosDec[5] ? fieldsOfPosDec[5] : "",
    fieldsOfPosDec.length && fieldsOfPosDec[6] ? fieldsOfPosDec[6] : "",
    fieldsOfPosDec.length && fieldsOfPosDec[7] ? fieldsOfPosDec[7] : "",

    {
      label: "Дата положительного решения",
      key: "positive_decision_date",
      type: "date",
    },
    {
      label: "На сколько предоставлена мера (в мес.)",
      key: "measure_provided_duration",
      type: "text",
      inputType: "number",
    },
    {
      label: "Сумма урегулированной задолженности (тыс руб)",
      key: "settled_debt_amount",
      type: "text",
      inputType: "number",
    },
    // здесь у них поле
    {
      label: "От кого ходатайство ОИВ (для МС)",
      key: "oiv_request_sender",
      type: "text",
    },
    {
      label: "Вид отрицаетльного решения",
      key: "negative_decision_type",
      type: "select",
      disabled: clientData.positive_decision_type,
      options: negative,
    },
    {
      label: "5. Ключевые показатели эффективности (KPI)",
      key: "",
      type: "title",
    },
    {
      label: "Сумма, поступившая в бюджет (тыс руб)",
      key: "received_amount_budget",
      type: "text",
      inputType: "number",
    },
    { label: "Просроченная задолженность", key: "", type: "title2" },
    {
      label: "Сумма просроченной задолженности",
      key: "overdue_debt_amount",
      type: "text",
      inputType: "number",
    },
    {
      label: "Сумма технической просроченной задолженности",
      key: "technical_overdue_debt_amount",
      type: "text",
      inputType: "number",
    },
    ///////////////////////////////////////////////////////////////////////////////////
    { label: "Следующие поля пока не работают!!!", key: "", type: "title" }, ///////// delete later

    { label: "Отлагательные меры", key: "", type: "title2" },
    {
      label: "Ближайший срок исполнения обязательств",
      key: "",
      type: "date",
    },
    { label: "Рассрочка/отсрочка", key: "", type: "title2" },
    {
      label: "Не вступило в силу рассрочка/отсрочка ",
      key: "",
      type: "text",
    },
    { label: "Мировое соглашение", key: "", type: "title2" },
    {
      label: "Номер дела",
      key: "",
      type: "text",
    },
    {
      label: "Дата утверждения МС судом",
      key: "",
      type: "date",
    },
    { label: "Дата окончания МС", key: "", type: "date" },
    {
      label: "Сумма треований, вошедших в МС (тыс руб)",
      key: "",
      type: "text",
    },
    {
      label: "Сумма исполненных обязательств (тыс руб)",
      key: "",
      type: "text",
    },
    { label: "6. Вид предостовляемого обеспечения", key: "", type: "title" },
    { label: "Залог имущества (тыс руб)", key: "", type: "text" },
    { label: "Поручительство (тыс руб)", key: "", type: "text" },
    { label: "Банковская гарантия (тыс руб)", key: "", type: "text" },
    {
      label: "7. Проводимая работа в случае не исполнения предоставления меры",
      key: "",
      type: "title",
    },
    { label: "Дата направления уведомления ДОЛЖНИКУ", key: "", type: "date" },
    { label: "Дата направления уведомления ПОРУЧИТЕЛЮ", key: "", type: "date" },
    {
      label: "Дата направления уведомления ЗАЛОГОДАТЕЛЮ",
      key: "",
      type: "date",
    },
    { label: "8. Постконтроль", key: "", type: "title" },
    // { label: "Подгрузить информацию через ИНН", key: "", type: "title2" },
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
      label: "Результаты скоринга платежеспособность (не передается на бек)",
      key: "",
      type: "select",
      options: solvencyRisk,
    },
    {
      label: "Из выписки СКУАД  - Текущая стоимость бизнеса",
      key: "",
      type: "text",
    },
    {
      label: "Из выписки СКУАД  - Ликвидационная стоимость бизнеса",
      key: "",
      type: "text",
    },
    { label: "Из выписки СКУАД - Возвратность средств", key: "", type: "text" },
    {
      label: "Из выписки СКУАД - Потребность в оборотных средствах",
      key: "",
      type: "text",
    },
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
                // console.log(el)
                if (el.type === "text") {
                  return (
                    <TextField
                      key={ind}
                      type={el.inputType || "text"}
                      label={el.label}
                      name={el.key}
                      value={clientData[el.key]}
                      onChange={handleChange}
                      error={errors[el.key]}
                      clientData={el.key === "inn" && clientData}
                    />
                  )
                } else if (el.type === "select") {
                  return (
                    <SelectSearchField
                      key={ind}
                      options={el.options}
                      label={el.label}
                      name={el.key}
                      placeholder={
                        params.id && client
                          ? el?.options.filter(
                              (opt) => opt.id === clientData[el.key]
                            )[0]?.label
                          : el.label
                      }
                      onChange={handleChange}
                      error={errors[el.key]}
                      disabled={el.disabled}
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
                        <input
                          type="date"
                          onChange={(date) => handleChange(date)}
                          data-name={el.key}
                          data-positive={el?.isPositive}
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
                } else if (el.type === "title2") {
                  return (
                    <div key={ind}>
                      <h3 className="text-primary mt-2">{el.label}</h3>
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
                  Back
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
