import React, { useState } from "react"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import SelectField from "./SelectField"

const ContentRows = ({ users, handleGetCurrentUserId }) => {
  const makeClassName = (value) => {
    if (value === "Низкий риск") return "text-success"
    if (value === "Средний риск") return "text-warning"
    if (value === "Высокий риск") return "text-danger"
  }
  const makeClassNameDD = (value) => {
    if (value === "Низкий риск") return "Success"
    if (value === "Средний риск") return "Warning"
    if (value === "Высокий риск") return "Danger"
  }
  // console.log(users)

  // Для dropdown
  // const [, setData] = useState({ dropdown: "" })

  // const handleChange = ({ target }) => {
  //   if (target.text) {
  //     setData((prevState) => ({
  //       ...prevState,
  //       [target.name]: target.text,
  //     }))
  //   }
  // }

  // Для select
  const handleChange = (target) => {
    setUsersData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const riskList = [
    { label: "Высокий риск", value: "Высокий риск" },
    { label: "Средний риск", value: "Средний риск" },
    { label: "Низкий риск", value: "Низкий риск" },
  ]

  const [usersData, setUsersData] = useState({})

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
          {/* <td className={makeClassName(el.solvency)}></td> */}

          <td>
            <SelectField
              key={el.id}
              label={el.name}
              defaultOption="Выберите риск"
              name={el.name}
              options={riskList}
              onChange={handleChange}
              value={usersData?.name}
            />
          </td>

          {/* <DropdownButton
            id={`dropdown-variants-${makeClassNameDD(el.solvency)}`}
            variant={makeClassNameDD(el.solvency).toLocaleLowerCase()}
            className="m-2"
            title={el.solvency}
            onClick={handleChange}
          >
            <Dropdown.Item name="dropdown" href="#/action-1">
              Низкий риск
            </Dropdown.Item>
            <Dropdown.Item name="dropdown" href="#/action-2">
              Средний риск
            </Dropdown.Item>
            <Dropdown.Item name="dropdown" href="#/action-2">
              Высокий риск
            </Dropdown.Item>
          </DropdownButton> */}

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

{
  /* <SelectField
              label="Выбери важность"
              defaultOption="Выберите..."
              name="importance"
              options={importanceList}
              onChange={handleChange}
              value={data.importance}
            /> */
}
