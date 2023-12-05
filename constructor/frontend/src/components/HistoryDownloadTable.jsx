import React, { useEffect, useState } from "react"
import _ from "lodash"
import Moment from "moment"
import localization from "moment/locale/ru"
import { paginate } from "./utils/paginate"
import Pagination from "./common/pagination"
// import 'https://momentjs.com/downloads/moment-with-locales.min.js';

const HistoryDownloadTable = ({ attributes, columns, setColumns }) => {
  const [sortType, setSortType] = useState({ path: "name", order: "asc" })

  const sortedAttributes = _.orderBy(attributes, sortType.path, sortType.order)

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

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const itemsCount = sortedAttributes.length
  // const pageSize = 3
  const pagesCount = Math.ceil(itemsCount / pageSize)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
    console.log("page: ", pageIndex)
  }
  const handlePageForward = () => {
    if (currentPage === pagesCount) return
    setCurrentPage((prevState) => prevState + 1)
  }

  const handlePageBack = () => {
    if (currentPage === 1) return
    setCurrentPage((prevState) => prevState - 1)
  }

  const handleIncrPageSize = () => {
    // if (currentPage >= pagesCount) {
    //   setCurrentPage(pagesCount - 1)
    // } else {
    //   setCurrentPage(1)
    // }
    setPageSize((prevState) => prevState + 5)
  }
  const handleDecrPageSize = () => {
    if (pageSize === 5) return
    setPageSize((prevState) => prevState - 5)
  }

  useEffect(() => {
    if (currentPage >= pagesCount) setCurrentPage(pagesCount)
  }, [currentPage, pagesCount])

  const itemsCrop = paginate(sortedAttributes, currentPage, pageSize)

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
            <li key={idx}>
              <span className="mx-3">
                <input
                  type="checkbox"
                  checked={col.isVisible}
                  onChange={() => checkClick(idx)}
                />
                <span> {col.name}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <table className="table align-middle table-bordered mt-4 tableContent">
        <thead>
          <tr>
            {columns
              ?.filter((e) => e.isVisible)
              ?.map((column, index) => (
                <th
                  style={{ textAlign: "center", paddingTop: "0px" }}
                  key={index}
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
          {itemsCrop.map((file) => (
            <tr key={file.id}>
              {columns[0].isVisible && (
                <td
                  className="tableContent"
                  style={{ wordBreak: "break-word" }}
                >
                  {decodeURI(file.filename.split("/")[5])}
                </td>
              )}
              {columns[1].isVisible && (
                <td className="tableContent">
                  {Moment(file.created_date)
                    .locale("rus", localization)
                    .format("LLL")}
                </td>
              )}

              {columns[2].isVisible && (
                <td className="tableContent">{formatBytes(file.filesize)}</td>
              )}

              {columns[3].isVisible && (
                <td className="tableContent">{file.import_total_rows}</td>
              )}
              {columns[4].isVisible && (
                <td className="tableContent">{file.import_update_rows}</td>
              )}
              {columns[5].isVisible && (
                <td className="tableContent">{file.import_new_rows}</td>
              )}

              {/* unload_date ??? */}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        itemsCount={itemsCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPageForward={handlePageForward}
        onPageBack={handlePageBack}
        OnIncrPageSize={handleIncrPageSize}
        OnDecrPageSize={handleDecrPageSize}
      />
    </>
  )
}

export default HistoryDownloadTable
