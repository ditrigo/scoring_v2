import React from "react"
import _ from "lodash"
const Pagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
  onPageForward,
  onPageBack,
  OnIncrPageSize,
  OnDecrPageSize,
}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize)
  if (pagesCount === 1) return null
  const pages = _.range(1, pagesCount + 1)

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            aria-label="Previous"
            onClick={onPageBack}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Назад</span>
          </button>
        </li>
        {pages.map((page, ind) => {
          if (ind > currentPage - 5 && ind < currentPage + 4)
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
            <span className="sr-only">Вперед</span>
          </button>
        </li>
        <div className="mt-1 ms-4">
          <button
            type="button"
            class="btn btn-outline-secondary"
            onClick={OnDecrPageSize}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-down-circle-fill"
              viewBox="0 0 16 16"
              data-darkreader-inline-fill=""
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"></path>
            </svg>
            <span class="visually-hidden">Кнопка</span>
          </button>
          <span className="ms-1 me-1">{pageSize}</span>
          <button
            type="button"
            class="btn btn-outline-secondary"
            onClick={OnIncrPageSize}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-up-circle-fill"
              viewBox="0 0 16 16"
              data-darkreader-inline-fill=""
            >
              <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"></path>
            </svg>
            <span class="visually-hidden">Кнопка</span>
          </button>
        </div>
      </ul>
    </nav>
  )
}

export default Pagination
