import React from "react"
import _ from "lodash"
const Pagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
  onPageForward,
  onPageBack,
  onGoToStart,
  onGoToEnd,
  OnIncrPageSize,
  OnDecrPageSize,
}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize)
  if (pagesCount === 1) return null
  const pages = _.range(1, pagesCount + 1)

  return (
    <nav>
      <ul className="pagination d-flex justify-content-between">
        <div className="pagination">
          <button
            className="page-link"
            aria-label="Previous"
            onClick={onGoToStart}
          >
            <span aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left-square"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                />
              </svg>
            </span>
          </button>
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Previous"
              onClick={onPageBack}
            >
              <span aria-hidden="true">&laquo;</span>
              {/* <span className="sr-only">Назад</span> */}
            </button>
          </li>

          {pages.map((page, ind) => {
            if (ind > currentPage - 4 && ind < currentPage + 2)
              return (
                <li
                  className={
                    "page-item " + (page === currentPage ? "active" : "")
                  }
                  key={"page_" + page}
                >
                  <button
                    className="page-link"
                    onClick={() => {
                      onPageChange(page)
                    }}
                  >
                    {page}
                  </button>
                </li>
              )
          })}
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Next"
              onClick={onPageForward}
            >
              <span aria-hidden="true">&raquo;</span>
              {/* <span className="sr-only">Вперед</span> */}
            </button>
          </li>
          <button className="page-link" aria-label="Next" onClick={onGoToEnd}>
            <span aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right-square"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                />
              </svg>
            </span>
          </button>
        </div>

        <div className="mt-1 ms-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={OnDecrPageSize}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-down-circle-fill"
              viewBox="0 0 16 16"
              data-darkreader-inline-fill=""
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"></path>
            </svg>
            <span className="visually-hidden">Кнопка</span>
          </button>
          <span className="ms-1 me-1">{pageSize}</span>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={OnIncrPageSize}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-up-circle-fill"
              viewBox="0 0 16 16"
              data-darkreader-inline-fill=""
            >
              <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"></path>
            </svg>
            <span className="visually-hidden">Кнопка</span>
          </button>
        </div>
      </ul>
    </nav>
  )
}

export default Pagination
