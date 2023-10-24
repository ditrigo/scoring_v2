export const users = [
  {
    id: 1,
    manager: "Панфилова И. О,",
    clientName: "ООО 'Розочка'",
    PRD: "МИДУОЛ",
    INN: "345352342",
    region: "77 г. Москва",
    status: "Кредитор",
    support: "Мировое соглашение",
    positive: "Мировое соглашение",
    negative: "-",
    solvency: "Высокий риск",
    activity: "Средний риск",
    activeType: "Средний риск",
    stage: "Работа завершена",
    point: "25.05.23",
  },
  {
    id: 2,
    manager: "Бойченко К. О,",
    clientName: "ИП Волков А. Р.",
    PRD: "МИДУОЛ",

    INN: "3458258916",
    region: "61 Ростовская область",
    status: "Должник",
    support: "Рассрочка",
    positive: "-",
    negative: "-",
    solvency: "Низкий риск",
    activity: "Высокий риск",
    activeType: "Высокий риск",
    stage: "В работе",
    point: "09.10.23",
  },
  {
    id: 3,
    manager: "Кириллова К. О,",
    clientName: "ИП Кур А. Р.",
    PRD: "МИДУОЛ",

    INN: "16876168936",
    region: "Ростовская область",
    status: "Должник",
    support: "Рассрочка",
    positive: "-",
    negative: "-",
    solvency: "Низкий риск",
    activity: "Высокий риск",
    activeType: "Средний риск",
    stage: "В работе",
    point: "19.12.22",
  },
]

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(users)
    }, 500)
  })

export default {
  fetchAll,
}
