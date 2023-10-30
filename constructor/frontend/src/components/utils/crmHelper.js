import axios from "axios"
import configFile from "../../config.json"

export const transformData = (data, keyInNativeObj, keyName) => {
  const result = data.map((el) => ({
    id: el.id,
    label: el[keyInNativeObj],
    value: el[keyInNativeObj],
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
      console.log(res.data)
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
    value: `${el.second_name} ${el.first_name}. ${el.patronymic}. ${el.job_title}`,
    name: "managers",
  }))
  return result
}

export const transformRegionsData = (data) => {
  const result = data.map((el) => ({
    id: el.id,
    label: `${el.region_number} ${el.region}`,
    value: `${el.region_number} ${el.region}`,
    name: "regions",
  }))
  return result
}

export const validatorConfig = {
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

export const firstData = [
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
