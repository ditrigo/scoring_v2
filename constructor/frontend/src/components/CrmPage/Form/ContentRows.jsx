import React from "react"
import { Link } from "react-router-dom"
import Moment from "moment"
import localization from "moment/locale/ru"

const ContentRows = ({ clients }) => {
  const makeClassName = (value) => {
    if (value === "Низкий риск") return "text-success"
    if (value === "Средний риск") return "text-warning"
    if (value === "Высокий риск") return "text-danger"
  }
  console.log(clients)

  return (
    clients &&
    clients.map((el) => {
      return (
        <tr key={el.id} role="button">
          <th scope="row">{el.id}</th>
          <td>{el.prd_catalog.catalog_prd}</td>
          <td>
            <Link to={"/newclient/" + el.id}>
              {el.manager.second_name} {el.manager.first_name}.
              {el.manager.patronymic}. {el.manager.job_title}
            </Link>
          </td>
          <td>
            {el.second_name} {el.first_name} {el.patronymic}
          </td>

          <td>{el.inn}</td>
          <td>
            {el.region.region_number} {el.region.region}
          </td>
          <td>{el.applicant_status.status}</td>
          <td>{el.compliance_criteria.support_measure.category_type}</td>
          <td>{el.kpi?.positive_decision_type}</td>
          <td>{el.kpi?.negative_decision_type}</td>
          <td className={makeClassName("Низкий риск")}>нет в json</td>
          <td className={makeClassName("Средний риск")}>нет в json</td>
          <td className={makeClassName("Высокий риск")}>нет в json</td>
          <td> {el.stage_review?.stage}</td>
          <td>
            {Moment(el.event_date).locale("rus", localization).format("LL")}
            {/* {el.event_date} */}
          </td>
        </tr>
      )
    })
  )
}

export default ContentRows
