import axios from "axios"
import configFile from "../../config.json"

export const transformData = (data, keyInNativeObj, keyName) => {
  // console.log(data)
  const result = data.map((el) => ({
    id: el.id,
    label: el[keyInNativeObj],
    value: el.id,
    name: keyName,
  }))
  return result
}

export function getTransformedData(
  endPoint,
  setDataState,
  keyInNativeObj,
  keyName
) {
  axios
    // .get(`http://127.0.0.1:8000/api/${endPoint}/`)
    .get(`${configFile.apiEndPoint}/${endPoint}/`)
    .then((res) => {
      // console.log(`${endPoint} `, res.data)
      setDataState(transformData(res.data.data, keyInNativeObj, keyName))
    })
    .catch((e) => {
      console.log(e)
    })
}

export const transformManagersData = (data) => {
  const result = data.map((el) => ({
    id: el.id,
    label: `${el.second_name} ${el.first_name}. ${el.patronymic}. ${el.job_title}`,
    value: `${el.id}`,
    name: "manager_id",
  }))
  return result
}

export const transformRegionsData = (data) => {
  const result = data.map((el) => ({
    id: el.id,
    label: `${el.region_number} ${el.region}`,
    value: `${el.id}`,
    name: "region_id",
  }))
  return result
}

export const validatorConfig = {
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
  PRD: {
    isRequired: {
      message: "Это поле обязательно для заполнения",
    },
  },

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
  // optional
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

export const firstData = [
  { id: 10, name: "Источник информации. Номер", key: "sourceNumber" },
  {
    id: 13,
    name: "Представитель клиента. ФИО",
    key: "representativeName",
  },
  {
    id: 63,
    name: "Представитель клиента. Должность",
    key: "representativeTitle",
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
    name: "Ближайший срок исполнения обязательства (до какого момента отложены меры)",
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

export const inputsData = [
  { label: "Предстаительство ПРД", key: "PRD?", type: "select", options: "" },
  { label: "Наименование клиента", key: "", type: "title" },
  { label: "Имя", key: "first_name", type: "text" },
  { label: "Фамилия", key: "second_name", type: "text" },
  { label: "Отчество", key: "patronimic", type: "text" },
  { label: "ИНН", key: "inn", type: "text" },
  { label: "Первичные учетные данные", key: "", type: "title" },
  { label: "Регион", key: "region_id", type: "select" },
  { label: "Менеджер", key: "manager_id", type: "select" },
  { label: "Статус заявителя", key: "applicant_status", type: "select" },
  { label: "Источник информации", key: "", type: "title" },
  {
    label: "Тип источника информации",
    key: "info_source_type_id",
    type: "select",
  },
  { label: "Дата источника информации", key: "info_source_date", type: "date" },
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
  { label: "Тип долга", key: "debt_type", type: "select" },
  { label: "Категория предприятия", key: "category", type: "select" },
  {
    label: "Мера поддержки, запрашиваемая клиентом",
    key: "support_measure",
    type: "select",
  },
  {
    label:
      "Примечание к описанию события в рамках огласительных меропрятий (гр.22)",
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
    label: "Дата первой встречи в рамках согласитлеьных мероприятий",
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
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  { label: "Ключевые показатели эффективности (KPI)", key: "", type: "title" },
  { label: "Принятое решение", key: "", type: "title" },
  { label: "Вид положительного решения", key: "", type: "select" },
  { label: "Дата принятия положительного решения", key: "", type: "date" },
  {
    label: "Срок, на который предоставляется мера поддержки",
    key: "",
    type: "text",
  },
  {
    label: "Орган исполнительной власти, от которого поступило ходатайство",
    key: "",
    type: "text",
  },
  { label: "Вид отрицаетльного решения", key: "", type: "select" },
  { label: "Сумма урегулированной задолженности", key: "", type: "text" },
  { label: "Сумма, поступившая в бюджет", key: "", type: "text" },
  { label: "Просроченная задолженность", key: "", type: "title" },
  { label: "Сумма просроченной задолженности", key: "", type: "text" },
  {
    label: "Сумма тезнической просроченной задолженности",
    key: "",
    type: "text",
  },
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
  { label: "Стадия рассмотрения", key: "", type: "select" },
  {
    label: "Проводимая работа в случае не исполнения предоставления меры",
    key: "",
    type: "title",
  },
  { label: "Дата направления уведомления должнику", key: "", type: "date" },
  { label: "Дата направления уведомления поручителю", key: "", type: "date" },
  { label: "Дата направления уведомления залогодателю", key: "", type: "date" },
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
  { label: "Платежеспособность", key: "", type: "select" }, //risk
  { label: "Текущая стоимость бизнеса", key: "", type: "text" },
  { label: "Ликвидационная стоимость бизнеса", key: "", type: "text" },
  { label: "Возвратность средств", key: "", type: "text" },
  { label: "Потребность в оборотных средствах", key: "", type: "text" },
  { label: "Ранг платежеспособности", key: "", type: "text" },
]
