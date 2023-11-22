import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Moment from "moment"
import localization from "moment/locale/ru"
import httpService from "../../../services/http.service"

const ContentRows = ({ clients }) => {
  const [positiveDecisions, setPositiveDecisions] = useState()
  const [negativeDecisions, setNegativeDecisions] = useState()

  const makeClassName = (value) => {
    if (value === "Низкий риск") return "text-success"
    if (value === "Средний риск") return "text-warning"
    if (value === "Высокий риск") return "text-danger"
  }
  // console.log(clients)

  const getPositiveDecisions = async () => {
    try {
      const { data } = await httpService.get(`crm_pos_decision/`)
      setPositiveDecisions(data.data)
    } catch (error) {}
  }
  const getNegativeDecisions = async () => {
    try {
      const { data } = await httpService.get(`crm_neg_decision/`)
      setNegativeDecisions(data.data)
    } catch (error) {}
  }
  useEffect(() => {
    getPositiveDecisions()
    getNegativeDecisions()
  }, [])

  const getPositive = (client) => {
    return (
      positiveDecisions &&
      positiveDecisions.find(
        (el) => el.id === client?.kpi?.positive_decision_type
      )
    )
  }

  const getNegative = (client) => {
    return (
      negativeDecisions &&
      negativeDecisions.find(
        (el) => el.id === client?.kpi?.negative_decision_type
      )
    )
  }

  return (
    clients &&
    clients.map((el) => {
      return (
        <tr key={el.id} role="button">
          <th scope="row">{el.id}</th>
          <td>{el.prd_catalog.catalog_prd}</td>
          <td>
            <Link to={"/newclient/" + el.id}>
              {el.manager?.second_name} {el.manager?.first_name}{" "}
              {el.manager?.patronymic} {el.manager?.job_title}
            </Link>
          </td>
          <td>{el.first_name}</td>
          <td>{el.inn}</td>
          <td>
            {el.region.region_number} {el.region.region}
          </td>
          <td>{el.applicant_status.status}</td>
          <td>{el.compliance_criteria.support_measure.category_type}</td>
          <td>{getPositive(el)?.positive_decision}</td>
          <td>{getNegative(el)?.negative_decision}</td>
          <td className={makeClassName("Низкий риск")}>Риск</td>
          <td className={makeClassName("Средний риск")}>Риск</td>
          <td className={makeClassName("Высокий риск")}>Риск</td>
          <td> {el.stage_review?.stage}</td>
          <td>
            {Moment(el.event_date).locale("rus", localization).format("L")}
          </td>
        </tr>
      )
    })
  )
}

export default ContentRows
