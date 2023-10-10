import React from "react"

const ContentRows = ({ users, handleGetCurrentUserId }) => {
  const makeClassName = (value) => {
    if (value === "Низкий риск") return "text-success"
    if (value === "Средний риск") return "text-warning"
    if (value === "Высокий риск") return "text-danger"
  }

  return (
    users &&
    users.map((el) => {
      return (
        <tr key={el.id} onClick={handleGetCurrentUserId} role="button">
          <th scope="row" data-id={el.id}>
            {el.id}
          </th>
          <td>{el.manager}</td>
          <td>{el.clientName}</td>
          <td>{el.INN}</td>
          <td>{el.region}</td>
          <td>{el.status}</td>
          <td>{el.support}</td>
          <td>{el.positive}</td>
          <td>{el.negative}</td>
          <td className={makeClassName(el.solvency)}>{el.solvency}</td>
          <td className={makeClassName(el.activity)}>{el.activity}</td>
          <td className={makeClassName(el.activeType)}>{el.activeType}</td>
          <td>{el.stage}</td>
          <td>{el.point}</td>
        </tr>
      )
    })
  )
}

export default ContentRows