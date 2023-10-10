export const firstData = [
    { id: 1, title: "Данные клиента" },
    { id: 2, name: "ИНН", type: "INN" },
    { id: 3, name: "Наименование клиента", type: "clientName" },
    { id: 4, name: "Регион", type: "region" },
    { id: 5, name: "Статус заявителя", type: "status" },
    { id: 6, name: "Менеджер площадки", type: "manager" },
    { id: 7, title: "Источник информации" },
    { id: 8, name: "Письмо, список, поручекние" },
    { id: 9, name: "Дата" },
    { id: 10, name: "Номер" },
    { id: 11, name: "Дата регистарции обращения в МИДУОЛ" },
    { id: 12, title: "Представители клиента" },
    { id: 13, name: "ФИО, должность" },
    { id: 14, name: "Телефон" },
    { id: 15, name: "Почта" },
    { id: 16, title: "Критерии соответствия клиентским требованиям" },
    { id: 17, name: "Сумма задолжности (общего долга)" },
    { id: 18, name: "Тип долга" },
    { id: 19, name: "Категория" },
    { id: 20, name: "Вид деятельности" },
    { id: 21, name: "Мера поддержки, запрашиваемая клиентом" },
    { id: 22, name: "Примечания" },
    { id: 23, name: "Срок, на который необходимо предоставить меры" },
    { id: 24, title: "Контрольная точка" },
    { id: 25, name: "Описание событий" },
    { id: 26, name: "Дата первой встречи" },
    { id: 27, name: "Дата наступления события" },
  ]
  
  const fetchAll = () =>
    new Promise((resolve) => {
      window.setTimeout(function () {
        resolve(firstData)
      }, 0)
    })
  
  export default {
    fetchAll,
  }