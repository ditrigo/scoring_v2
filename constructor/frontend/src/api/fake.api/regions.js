export const regions = [
  {
    number: 1,
    label: "1 Республика Адыгея",
    value: "1 Республика Адыгея",
    name: "region",
  },
  {
    number: 2,
    label: " 2 Республика Башкортостан",
    value: " 2 Республика Башкортостан",
    name: "region",
  },
  {
    number: 3,
    label: "3 Республика Бурятия",
    value: "3 Республика Бурятия",
    name: "region",
  },
  {
    number: 4,
    label: "4 Республика Алтай",
    value: "4 Республика Алтай",
    name: "region",
  },
  {
    number: 5,
    label: "5 Республика Дагестан",
    value: "5 Республика Дагестан",
    name: "region",
  },
  {
    number: 6,
    label: "6 Республика Ингушетия",
    value: "6 Республика Ингушетия",
    name: "region",
  },
  {
    number: 7,
    label: "7 Кабардино-Балкарская Республика",
    value: "7 Кабардино-Балкарская Республика",
    name: "region",
  },
  {
    number: 8,
    label: "8 Республика Калмыкия",
    value: "8 Республика Калмыкия",
    name: "region",
  },
  {
    number: 9,
    label: "9 Карачаево-Черкесская Республика",
    value: "9 Карачаево-Черкесская Республика",
    name: "region",
  },
  {
    number: 10,
    label: "10 Республика Карелия",
    value: "10 Республика Карелия",
    name: "region",
  },
  {
    number: 11,
    label: "11 Республика Коми",
    value: "11 Республика Коми",
    name: "region",
  },
  {
    number: 12,
    label: "12 Республика Марий Эл",
    value: "12 Республика Марий Эл",
    name: "region",
  },
  {
    number: 13,
    label: "13 Республика Мордовия",
    value: "13 Республика Мордовия",
    name: "region",
  },
  {
    number: 14,
    label: "14 Республика Саха (Якутия)",
    value: "14 Республика Саха (Якутия)",
    name: "region",
  },
  {
    number: 15,
    label: "15 Республика Северная Осетия-Алания",
    value: "15 Республика Северная Осетия-Алания",
    name: "region",
  },
]

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(regions)
    }, 500)
  })

export default {
  fetchAll,
}
