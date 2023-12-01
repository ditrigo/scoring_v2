import React from "react"
import _ from "lodash"
const Pagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
  onPageForward,
  onPageBack,
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
          if (ind > currentPage - 10 && ind < currentPage + 9)
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
      </ul>
    </nav>
  )
}

export default Pagination
