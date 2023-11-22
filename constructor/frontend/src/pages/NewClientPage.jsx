import React, { useEffect, useState } from "react"
import TextField from "../components/CrmPage/Form/textField"
import Divider from "../components/CrmPage/Form/Divider"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { validator } from "../components/utils/validator"
import SelectSearchField from "../components/CrmPage/Form/SelectSearchField"
import {
  getTransformedData,
  transformDynamicOptionsData,
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
  const [reasonsConsideration, setReasonsConsideration] = useState([])
  const [fieldsOfPosDec, setfieldsOfPosDec] = useState([])
  const [dataOfFieldsDec, setDataOfFieldsDec] = useState({})
  const [clientData, setClientData] = useState({
    first_name: "",
    inn: "",
    region_id: "",
    manager_id: "",
    applicant_status: "",
    info_source_type_id: "",
    info_source_date: "",
    info_source_number: "",
    representative_first_name: "",
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
    reasons: "",
    // New fields
    notice_debitor_date: "",
    notice_guarantor_date: "",
    notice_pledgetor_date: "",
    revenue_knd_1151006_2023year: "",
    revenue_knd_0710099_2022year: "",
    ssch_knd_1151111: "",
    assets_2022year: "",
    reastaxes_paid_2023yearns: "",
    reasobankruptcy_proceedings_stagens: "",
    debt_amount_unified_tax_service: "",
    fot_knd_1151111: "",
    profit_knd_1151006: "",
    solvency_scoring_results: "",
    reaskuad_current_business_valuesons: "",
    skuad_liquidation_business_value: "",
    skuad_refund_funds: "",
    skuad_working_capital: "",
    solvency_rank: "",
  })
  const [validatorConfig, setValidatorCOnfig] = useState({
    prd_catalog_id: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    manager_id: {
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
      maxCount: {
        message: "Не больше 12 знаков",
        value: 12,
      },
      not11: {
        message: "Не может содержать 11 знаков",
        value: 11,
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
  })
  // let validatorConfig = {
  //   prd_catalog_id: {
  //     isRequired: {
  //       message: "Это поле обязательно для заполнения",
  //     },
  //   },
  //   manager_id: {
  //     isRequired: {
  //       message: "Это поле обязательно для заполнения",
  //     },
  //   },
  //   first_name: {
  //     isRequired: {
  //       message: "Это поле обязательно для заполнения",
  //     },
  //   },
  //   inn: {
  //     isRequired: {
  //       message: "Это поле обязательно для заполнения",
  //     },
  //     count: {
  //       message: "ИНН должен содержать от 10 символов.",
  //       value: 10,
  //     },
  //     maxCount: {
  //       message: "Не больше 12 знаков",
  //       value: 12,
  //     },
  //     not11: {
  //       message: "Не может содержать 11 знаков",
  //       value: 11,
  //     },
  //   },
  //   stage_review: {
  //     isRequired: {
  //       message: "Это поле обязательно для заполнения",
  //     },
  //   },
  //   region_id: {
  //     isRequired: {
  //       message: "Это поле обязательно для заполнения",
  //     },
  //   },
  //   applicant_status: {
  //     isRequired: {
  //       message: "Это поле обязательно для заполнения",
  //     },
  //   },
  //   control_point: {
  //     isRequired: {
  //       message: "Это поле обязательно для заполнения",
  //     },
  //   },
  //   debt_amount: {
  //     isRequired: {
  //       message: "Это поле обязательно для заполнения",
  //     },
  //     maxCount: {
  //       message: "Не больше 6 знаков",
  //       value: 6,
  //     },
  //   },
  //   debt_type: {
  //     isRequired: {
  //       message: "Это поле обязательно для заполнения",
  //     },
  //   },
  //   category: {
  //     isRequired: {
  //       message: "Это поле обязательно для заполнения",
  //     },
  //   },
  //   support_measure: {
  //     isRequired: {
  //       message: "Это поле обязательно для заполнения",
  //     },
  //   },
  //   event_date: {
  //     isRequired: {
  //       message: "Это поле обязательно для заполнения",
  //     },
  //   },
  //   event_description: {
  //     isRequired: {
  //       message: "Это поле обязательно для заполнения",
  //     },
  //     maxCount: {
  //       message: "Не больше 200 знаков",
  //       value: 200,
  //     },
  //   },
  //   received_amount_budget: {
  //     maxCount: {
  //       message: "Не больше 6 знаков",
  //       value: 6,
  //     },
  //   },
  //   overdue_debt_amount: {
  //     maxCount: {
  //       message: "Не больше 6 знаков",
  //       value: 6,
  //     },
  //   },
  //   technical_overdue_debt_amount: {
  //     maxCount: {
  //       message: "Не больше 6 знаков",
  //       value: 6,
  //     },
  //   },
  //   support_duration: {
  //     max: {
  //       message: "Не более 36",
  //       value: 36,
  //     },
  //   },
  //   9: {
  //     maxCount: {
  //       message: "Не больше 6 знаков",
  //       value: 6,
  //     },
  //   },
  //   14: {
  //     maxCount: {
  //       message: "Не больше 6 знаков",
  //       value: 6,
  //     },
  //   },
  // }

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
    getTransformedData(
      "crm_reasons_consideration",
      setReasonsConsideration,
      "reasons",
      ""
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

  // console.log("params.id && client", params.id && client)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(client && client.information_source.id)

    if (params.id && client) {
      // Обновление
      const jsonForUpdate = {
        id: client.id,
        first_name: clientData.first_name,
        // second_name: "",
        // patronymic: "",
        inn: clientData.inn,
        region_id: clientData.region_id,
        manager_id: clientData.manager_id,
        applicant_status: clientData.applicant_status,

        information_source_id: {
          id: client.information_source?.id || "",
          info_source_type_id: clientData.info_source_type_id,
          info_source_date: clientData.info_source_date,
          info_source_number: clientData.info_source_number,
        },
        representitive_client_id: {
          id: client.representitive_client.id || "",
          representative_first_name: clientData.representative_first_name,
          // representative_second_name: "", // clientData.representative_second_name,
          // representative_patronymic: "", // clientData.representative_patronymic,
          representative_position: clientData.representative_position,
          representative_phone: clientData.representative_phone,
          representative_email: clientData.representative_email,
          control_point: clientData.control_point,
        },
        compliance_data_id: {
          id: client.compliance_criteria.id || "",
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
          id: client.kpi?.id || "",
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
        reasons: clientData.reasons || "",

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
          // second_name: "",
          // patronymic: "",
          inn: clientData.inn,
          first_meeting_date: clientData.first_meeting_date,
          event_date: clientData.event_date,
          event_description: clientData.event_description,
          // DENIS
          prd_catalog_id: clientData.prd_catalog_id,
          stage_review: clientData.stage_review,
          reasons: clientData.reasons,

          fields_of_positive_decision: [...Object.values(dataOfFieldsDec)],
        }
        console.log("Создание json: ", json)

        const { data } = await httpService.post(`crm_create_client/`, json)
        alert("Ответ сервера: " + data.message)
        console.log(data)
        navigate("/crm")
      } catch (error) {
        console.log("🚀 error:", error.response?.data)
        alert("Ошибка: " + JSON.stringify(error.response.data))
      }
    }
  }

  const handleCancle = (e) => {
    e.preventDefault()
    navigate("/crm")
  }

  const handleChange = (target) => {
    // console.log(target)

    if (Number.isInteger(+target.name)) {
      // console.log(target)
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
      // console.log(target)

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
        second_name: "",
        patronymic: "",
        inn: client.inn,
        region_id: client.region.id,
        manager_id: client.manager.id || "",
        applicant_status: client.applicant_status.id,
        info_source_type_id: client.information_source?.info_source_type || "",
        info_source_date: client.information_source?.info_source_date || "",
        info_source_number: client.information_source?.info_source_number || "",
        representative_first_name:
          client.representitive_client.representative_first_name || "",
        // representative_second_name:
        //   client.representitive_client.representative_second_name,
        // representative_patronymic:
        //   client.representitive_client.representative_patronymic,
        representative_position:
          client.representitive_client.representative_position || "",
        representative_phone:
          client.representitive_client.representative_phone || "",
        representative_email:
          client.representitive_client.representative_email || "",
        control_point: client.representitive_client.control_point,
        debt_amount: client.compliance_criteria.debt_amount,
        debt_type: client.compliance_criteria.debt_type.id,
        category: client.compliance_criteria.category.id,
        support_measure: client.compliance_criteria.support_measure.id,
        note: client.compliance_criteria.note,
        support_duration: client.compliance_criteria.support_duration || "",
        first_meeting_date: client.first_meeting_date || "",
        event_date: client.event_date,
        event_description: client.event_description,
        positive_decision_type: client.kpi?.positive_decision_type || "",
        negative_decision_type: client.kpi?.negative_decision_type || "",
        positive_decision_date: client.kpi?.positive_decision_date || "",
        measure_provided_duration: client.kpi?.measure_provided_duration || "",
        oiv_request_sender: client.kpi?.oiv_request_sender || "",
        settled_debt_amount: client.kpi?.settled_debt_amount || "",
        received_amount_budget: client.kpi?.received_amount_budget || "",
        overdue_debt_amount: client.kpi?.overdue_debt_amount || "",
        technical_overdue_debt_amount:
          client.kpi?.technical_overdue_debt_amount || "",
        // DENIS
        prd_catalog_id: client.prd_catalog.id,
        stage_review: client.stage_review.id,
        reasons: client.reasons?.id,
        fields_of_positive_decision: client.fields_of_positive_decision,
        // New fields
        notice_debitor_date: "",
        notice_guarantor_date: "",
        notice_pledgetor_date: "",
        revenue_knd_1151006_2023year: "",
        revenue_knd_0710099_2022year: "",
        ssch_knd_1151111: "",
        assets_2022year: "",
        reastaxes_paid_2023yearns: "",
        reasobankruptcy_proceedings_stagens: "",
        debt_amount_unified_tax_service: "",
        fot_knd_1151111: "",
        profit_knd_1151006: "",
        solvency_scoring_results: "",
        reaskuad_current_business_valuesons: "",
        skuad_liquidation_business_value: "",
        skuad_refund_funds: "",
        skuad_working_capital: "",
        solvency_rank: "",
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
    setValidatorCOnfig({
      prd_catalog_id: {
        isRequired: {
          message: "Это поле обязательно для заполнения",
        },
      },
      manager_id: {
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
        maxCount: {
          message: "Не больше 12 знаков",
          value: 12,
        },
        not11: {
          message: "Не может содержать 11 знаков",
          value: 11,
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
      2: {
        max: {
          message: "Не более 36",
          value: 36,
        },
      },
      3: {
        maxCount: {
          message: "Не больше 6 знаков",
          value: 6,
        },
      },
      9: {
        maxCount: {
          message: "Не больше 6 знаков",
          value: 6,
        },
      },
      10: {
        maxCount: {
          message: "Не больше 6 знаков",
          value: 6,
        },
      },
      11: {
        maxCount: {
          message: "Не больше 6 знаков",
          value: 6,
        },
      },
    })
    setErrors({})
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

  // if (clientData.positive_decision_type) {
  //   validatorConfig = {
  //     ...validatorConfig,
  //     positive_decision_date: {
  //       isRequired: {
  //         message: "Это поле обязательно для заполнения",
  //       },
  //     },
  //     measure_provided_duration: {
  //       isRequired: {
  //         message: "Это поле обязательно для заполнения",
  //       },
  //       max: {
  //         message: "Не более 36",
  //         value: 36,
  //       },
  //     },
  //     settled_debt_amount: {
  //       isRequired: {
  //         message: "Это поле обязательно для заполнения",
  //       },
  //       maxCount: {
  //         message: "Не больше 6 знаков",
  //         value: 6,
  //       },
  //     },
  //   }
  // }

  const getfieldsOfPositivDecision = async (id) => {
    // console.log("Вызов функции получения...")
    setDataOfFieldsDec([])

    try {
      const { data } = await httpService.get(
        `crm_fields_of_positiv_decision/${id}`
      )
      console.log(data.data)

      const res = data.data.map((el) => {
        if (!client) {
          setClientData((prevState) => ({
            ...prevState,
            [el.id]: "",
          }))
        }
        setClientData((prevState) => ({
          ...prevState,
          flag: "",
        })) // Нужно изменить стейт для того, чтоб подгрузить значения в fieldsOfPosDec при редактировании. Здесь все сложно...

        // el.origin === "reasons_for_consideration" &&
        //   console.log(
        //     "обновленный справочник ",
        //     transformDynamicOptionsData(reasonsConsideration, el.id)
        //   )

        // el.origin === "reasons_for_consideration" &&
        //   console.log("options///", reasonsConsideration)

        if (el.required) {
          // console.log("Required")
          setValidatorCOnfig((prevState) => ({
            ...prevState,
            [el.id]: {
              isRequired: {
                message: "Это поле обязательно для заполнения",
              },
            },
          }))
        }

        return el.origin === "reasons_for_consideration"
          ? {
              label: el.description,
              key: el.id,
              type: "select",
              options: transformDynamicOptionsData(reasonsConsideration, el.id),
            }
          : {
              label: el.description,
              key: el.id,
              type: el.type_of_fields === "datetime" ? "date" : "text",
              inputType: el.type_of_fields === "integer" ? "number" : "text",
              isPositive: true,
            }
      })

      setfieldsOfPosDec(res)

      // console.log("Пpилетающие поля переделанные (внутри функ) ", res)
    } catch (error) {
      console.log("🚀 ~ ОШИБКА В ПОЛУЧЕНИИ ПОЛЕЙ", error)
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
    // Положительное решение
    { label: "Принятое решение", key: "", type: "title2" },
    {
      label: "Вид положительного решения",
      key: "positive_decision_type",
      type: "select",
      disabled: clientData.negative_decision_type,
      options: positive,
    },

    // // Для МС (поля смотреть из консоли)
    clientData.positive_decision_type === 1 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[0],
    clientData.positive_decision_type === 1 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[1],
    (clientData.positive_decision_type === 1 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[11]) ||
      "",
    clientData.positive_decision_type === 1 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[2],

    // ДЛЯ Рассрочка
    clientData.positive_decision_type === 2 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[0],
    clientData.positive_decision_type === 2 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[1],
    clientData.positive_decision_type === 2 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[2],
    clientData.positive_decision_type === 2 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[3],

    // ДЛЯ Отлагательные меры
    clientData.positive_decision_type === 3 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[0],
    clientData.positive_decision_type === 3 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[1],
    clientData.positive_decision_type === 3 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[2],

    // ДЛЯ Отсрочка
    clientData.positive_decision_type === 4 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[0],
    clientData.positive_decision_type === 4 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[1],
    clientData.positive_decision_type === 4 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[2],
    clientData.positive_decision_type === 4 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[3],

    // ДЛЯ Инвестиционный кредит
    clientData.positive_decision_type === 5 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[0],
    clientData.positive_decision_type === 5 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[1],
    clientData.positive_decision_type === 5 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[2],
    clientData.positive_decision_type === 5 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[3],

    //Новая серия полей

    // Для MC
    clientData.positive_decision_type === 1 && {
      label: "Мировое соглашение",
      key: "",
      type: "title2",
    },
    clientData.positive_decision_type === 1 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[3],
    (clientData.positive_decision_type === 1 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[4]) ||
      "",
    (clientData.positive_decision_type === 1 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[6]) ||
      "",
    (clientData.positive_decision_type === 1 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[5]) ||
      "",
    (clientData.positive_decision_type === 1 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[7]) ||
      "",

    // ДЛЯ Рассрочка
    clientData.positive_decision_type === 2 && {
      label: "Рассрочка/отсрочка",
      key: "",
      type: "title2",
    },
    (clientData.positive_decision_type === 2 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[4]) ||
      "",

    // ДЛЯ Отлагательные меры
    clientData.positive_decision_type === 3 && {
      label: "Отлагательные меры",
      key: "",
      type: "title2",
    },
    (clientData.positive_decision_type === 3 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[3]) ||
      "",

    // ДЛЯ Отсрочка
    clientData.positive_decision_type === 4 && {
      label: "Рассрочка/отсрочка",
      key: "",
      type: "title2",
    },
    (clientData.positive_decision_type === 4 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[4]) ||
      "",

    // ДЛЯ Инвестиционный кредит
    clientData.positive_decision_type === 5 && {
      label: "Рассрочка/отсрочка",
      key: "",
      type: "title2",
    },
    (clientData.positive_decision_type === 5 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[4]) ||
      "",

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
    // { label: "Отлагательные меры", key: "", type: "title2" },

    clientData.positive_decision_type && {
      label: "6. Вид предостовляемого обеспечения",
      key: "",
      type: "title",
    },
    // ДЛЯ МС
    (clientData.positive_decision_type === 1 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[8]) ||
      "",
    (clientData.positive_decision_type === 1 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[9]) ||
      "",
    (clientData.positive_decision_type === 1 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[10]) ||
      "",

    // ДЛЯ Рассрочка
    (clientData.positive_decision_type === 2 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[5]) ||
      "",
    (clientData.positive_decision_type === 2 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[6]) ||
      "",
    (clientData.positive_decision_type === 2 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[7]) ||
      "",

    // Для Отлагательные меры нет

    // ДЛЯ Отсрочка
    (clientData.positive_decision_type === 4 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[5]) ||
      "",
    (clientData.positive_decision_type === 4 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[6]) ||
      "",
    (clientData.positive_decision_type === 4 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[7]) ||
      "",

    // ДЛЯ Инвестиционный кредит
    (clientData.positive_decision_type === 5 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[5]) ||
      "",
    (clientData.positive_decision_type === 5 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[6]) ||
      "",
    (clientData.positive_decision_type === 5 &&
      fieldsOfPosDec.length > 0 &&
      fieldsOfPosDec[7]) ||
      "",

    // {
    //   label: "Контрактные обязательства (тыс руб)",
    //   key: "",
    //   type: "text",
    //   inputType: "number",
    // },
    {
      label: "7. Проводимая работа в случае не исполнения предоставления меры",
      key: "",
      type: "title",
    },
    {
      label: "Дата направления уведомления ДОЛЖНИКУ",
      key: "notice_debitor_date",
      type: "date",
    },
    {
      label: "Дата направления уведомления ПОРУЧИТЕЛЮ",
      key: "notice_guarantor_date",
      type: "date",
    },
    {
      label: "Дата направления уведомления ЗАЛОГОДАТЕЛЮ",
      key: "notice_pledgetor_date",
      type: "date",
    },
    { label: "8. Постконтроль", key: "", type: "title" },
    // { label: "Подгрузить информацию через ИНН", key: "", type: "title2" },
    {
      label: "Выручка за прошедший отчетный период текущего года",
      key: "revenue_knd_1151006_2023year",
      type: "text",
      inputType: "number",
    },
    {
      label: "Выручка за предыдущий год",
      key: "revenue_knd_0710099_2022year",
      inputType: "number",
    },
    {
      label: "Среднесписочная численность персонала за предыдущее полугодие",
      key: "ssch_knd_1151111",
      type: "text",
      inputType: "number",
    },
    { label: "Активы за предыдущий год", key: "assets_2022year", type: "text" },
    {
      label:
        'Сумма уплаченных налогов за текущий год согласно ИР "Расчет с бюджетом"',
      key: "taxes_paid_2023year",
      type: "text",
      inputType: "number",
    },
    {
      label: "Стадия в процедуре банкротства",
      key: "bankruptcy_proceedings_stage",
      type: "text",
    },
    {
      label: 'Сумма долга ЕНС согласно ИР "Расчет с бюджетом"',
      key: "debt_amount_unified_tax_service",
      type: "text",
      inputType: "number",
    },
    {
      label: "Сумма ФОТ за предыдущее полугодие",
      key: "fot_knd_1151111",
      type: "text",
      inputType: "number",
    },
    {
      label: "Прибыль за предыдущее полугодие",
      key: "profit_knd_1151006",
      type: "text",
      inputType: "number",
    },
    {
      label: "Результаты скоринга платежеспособность (не передается на бек)",
      key: "solvency_scoring_results",
      type: "text",
      // options: solvencyRisk,
    },
    {
      label: "Из выписки СКУАД  - Текущая стоимость бизнеса",
      key: "skuad_current_business_value",
      type: "text",
    },
    {
      label: "Из выписки СКУАД  - Ликвидационная стоимость бизнеса",
      key: "skuad_liquidation_business_value",
      type: "text",
    },
    {
      label: "Из выписки СКУАД - Возвратность средств",
      key: "skuad_refund_funds",
      type: "text",
    },
    {
      label: "Из выписки СКУАД - Потребность в оборотных средствах",
      key: "skuad_working_capital",
      type: "text",
    },
    { label: "Ранг платежеспособности", key: "solvency_rank", type: "text" },
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
              {/* {console.log("Вывод элемента ", inputsData)}{" "} */}
              {inputsData.map((el, ind) => {
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
                          value={clientData[el.key]}
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
                  Назад
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
