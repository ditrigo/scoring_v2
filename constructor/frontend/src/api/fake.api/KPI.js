const KPI = [
  { id: 28, title: "Принятое решение" },
  { id: 29, name: "Вид положительного решения" },
  { id: 30, name: "Дата положительного решения" },
  { id: 31, name: "На сколько предоставлена мера (в месяцах)" },
  { id: 32, name: "Вид отрицательного решения" },
  { id: 33, name: "От кого ходатайство (для МС)" },
  { id: 34, name: "Сумма урегулированной задолжности (тыс руб)" },
  { id: 35, name: "Сумма, поступившая в бюджет (тыс руб)" },
  { id: 36, title: "Отлагательные меры" },
  {
    id: 37,
    name: "Близжайший срок исполнения обязательства (до какого момента отложены меры)",
  },
  { id: 38, title: "Изменение сроков уплаты" },
  { id: 39, name: "Не вступило в силу рассрочка/отсрочка (тыс руб)" },
  { id: 40, title: "Мировое соглашение" },
  { id: 41, name: "Номер дела" },
  { id: 42, name: "Дата утверждения МС судом" },
  { id: 43, name: "Сумма требований, вошедших в МС" },
  { id: 44, name: "Дата окончания МС" },
  { id: 45, name: "Сумма исполненных обязательств (тыс руб)" },
  { id: 46, title: "Просроченная задолженность" },
  { id: 47, name: "Сумма (тыс руб)" },
  { id: 48, name: "Сумма тезнической просроченной задолженности (тыс руб)" },
  { id: 49, name: "Стадия рассмотрения" },
  { id: 50, title: "Вид предоставляемого обеспечения" },
  { id: 51, name: "Залог имущества (тыс руб)" },
  { id: 52, name: "Поручительство (тыс руб)" },
  { id: 53, name: "Банковская гарантия (тыс руб)" },
  {
    id: 54,
    title: "Проводимая работа, в случае не исполнения предоставленной меры",
  },
  { id: 55, name: "Дата направления ДОЛЖНИКУ уведомления (претензии)" },
  { id: 56, name: "Дата направления ПОРУЧИТЕЛЮ уведомления (претензии)" },
  { id: 57, name: "Дата направления ЗАЛОГОДАТЕЛЮ уведомления (претензии)" },
  { id: 57.1, title: "Новые параметры для таблицы" },
  { id: 58, name: "Платежеспособность (риск)", type: "risk" },
  { id: 59, name: "Деловая активность (риск)", type: "risk" },
  { id: 60, name: "Вид активов (риск)", type: "risk" },
  { id: 61, name: "Стадия рассмотрения" },
  { id: 62, name: "Контрольная точка" },
]

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(KPI)
    }, 0)
  })

export default {
  fetchAll,
}
