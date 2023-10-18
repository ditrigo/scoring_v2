import React, { useState } from "react"
import _ from "lodash"
import Moment from "moment"
import localization from "moment/locale/ru"
// import 'https://momentjs.com/downloads/moment-with-locales.min.js';

const Table = ({ attributes, columns, setColumns }) => {
  const [sortType, setSortType] = useState({ path: "name", order: "asc" })

  const sortedAttributes = _.orderBy(attributes, sortType.path, sortType.order)
  // console.log("header: ", columns)
  // console.log("body: ", sortedAttributes)

  const handleSort = (item) => {
    if (sortType.path === item) {
      setSortType({
        ...sortType,
        order: sortType.order === "asc" ? "desc" : "asc",
      })
    } else {
      setSortType({ path: item, order: "asc" })
    }
  }

  const renderSortArrow = (sortType, currentPath) => {
    if (sortType.path === currentPath) {
      if (sortType.order === "asc") {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-up-fill"
            viewBox="0 0 16 16"
          >
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
          </svg>
        )
      } else {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        )
      }
    }
    return null
  }

  const checkClick = (idx) => {
    const tableChange = [...columns]
    tableChange[idx].isVisible = !tableChange[idx].isVisible
    setColumns(tableChange)
  }

  return (
    <>
      {/* <h3>Управление отображаемыми полями</h3> */}
      <div className="btn-group mt-4">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuClickableInside"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          Фильтрация колонок таблицы
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby="dropdownMenuClickableInside"
        >
          {columns?.map((col, idx) => (
            <li>
              <span key={col.id} className="mx-3">
                <input
                  type="checkbox"
                  checked={col.isVisible}
                  onClick={() => checkClick(idx)}
                />
                <span> {col.name}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <table className="table  table-bordered mt-4">
        <thead>
          <tr>
            {columns
              ?.filter((e) => e.isVisible)
              ?.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  onClick={
                    column.name ? () => handleSort(column.path) : undefined
                  }
                  {...{ role: column.path && "button" }}
                >
                  <span className="d-flex justify-content-center align-items-center">
                    {column.name} {renderSortArrow(sortType, column.name)}
                  </span>
                </th>
              ))}
          </tr>
        </thead>

        <tbody>
          {sortedAttributes.map((file) => (
            <tr key={file.id}>
              {columns[0].isVisible && (
                <td className="d-flex justify-content-center align-items-center">
                  {file.id}
                </td>
              )}
              {columns[1].isVisible && (
                <td className="center-block">
                  {Moment(file.created_date)
                    .locale("rus", localization)
                    .format("LLL")}
                </td>
              )}

              {/* upload_date ??? */}
              {columns[2].isVisible && (
                <td className="d-flex justify-content-center align-items-center">
                  {file.inn}
                </td>
              )}

              {columns[3].isVisible && (
                <td>
                  {Moment(file.report_date)
                    .locale("rus", localization)
                    .format("LLL")}
                </td>
              )}

              {/* unload_date ??? */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <table className="table text-left table-bordered mt-5">
        <thead>
          <tr>
            {columns
              ?.filter((e) => e.isVisible)
              ?.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  onClick={
                    column.name ? () => handleSort(column.path) : undefined
                  }
                  {...{ role: column.path && "button" }}
                >
                  <span className="d-flex justify-content-center align-items-center">
                    {column.name} {renderSortArrow(sortType, column.name)}
                  </span>
                </th>
              ))}
          </tr>
        </thead>

        <tbody>
          {sortedAttributes.map((file) => (
            <tr key={file.id}>
              <td>{file.id}</td>
              <td>
                {Moment(file.created_date)
                  .locale("rus", localization)
                  .format("LLL")}
              </td>{" "}
              <td>{file.inn}</td>
              <td>
                {Moment(file.report_date)
                  .locale("rus", localization)
                  .format("LLL")}
              </td>{" "}
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  )
}

export default Table
