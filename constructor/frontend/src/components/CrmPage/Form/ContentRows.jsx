import React from "react"
import { Link } from "react-router-dom"

const ContentRows = ({ users }) => {
  const makeClassName = (value) => {
    if (value === "Низкий риск") return "text-success"
    if (value === "Средний риск") return "text-warning"
    if (value === "Высокий риск") return "text-danger"
  }
  // console.log(users)

  return (
    users &&
    users.map((el) => {
      return (
        <tr key={el.id} role="button">
          <th scope="row">{el.id}</th>
          <td>
            <Link to={"/newclient/" + el.id}>{el.manager}</Link>
          </td>
          <td>{el.clientName}</td>
          <td>{el.PRD}</td>
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
