import React, { useState } from "react"
import "./SearchBar.module.css"
import MyButton from "../../UI/MyButton/MyButton"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import MyModal from "../../ScoringPage/MyModal/MyModal"
import MyEditForm from "../MyEditForm/MyEditForm"
import MarkersTable from "../../MarkersTable"
// import "bootstrap/dist/js/bootstrap.js";

const SearchBar = ({ attributes, postLink, nameModel }) => {
  const [expanded, setExpanded] = useState(false)
  const [selections, setSelections] = useState([])
  const [statusButton, setStatusButton] = useState("DF")
  const [modal, setModal] = useState(false)

  const toggleExpanded = () => {
    if (!expanded) {
      setExpanded(true)
    } else {
      setExpanded(false)
    }
  }

  const handleChange = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    if (event.target.checked) {
      return setSelections([...selections, event.target.name])
    }

    const filtered = selections.filter((name) => name !== event.target.name)
    return setSelections(filtered)
  }

  const handleSubmit = (e, status) => {
    e.preventDefault()
    console.log("Submitted. Values are submitted", selections)
    // if (status === "AP") {
    //     setStatusButton("AP");
    // };
    console.log("handleSubmit", statusButton)
    setStatusButton(status)
    postLink(selections, statusButton)
  }

  return (
    <div>
      <h3>Добавление элементов для модели {nameModel}</h3>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-1/2 h-16 text-black-100 flex items-center justify-center text-xl">
          <form onSubmit={handleSubmit} className="w-full">
            <div>
              <div onClick={toggleExpanded}>
                {/* <h6>Маркеры</h6> */}
                <MarkersTable />
                <div
                  className={`font-semibold cursor-pointer ${
                    expanded ? "up-arrow" : "down-arrow"
                  }`}
                >
                  {selections.length
                    ? selections.map((_, i) => (
                        <span key={i}>
                          {i ? ", " : null}
                          {attributes[i].name_counted_attr}
                        </span>
                      ))
                    : "Маркеры не выбраны"}
                </div>
              </div>
              {expanded && (
                <div className="border-gray-200 border border-solid">
                  {attributes.map((attribute, index) => (
                    <label
                      className="custom-select custom-select-lg mb-3"
                      key={index}
                    >
                      <input
                        type="checkbox"
                        name={attribute.id}
                        value={attribute.name_counted_attr}
                        onChange={handleChange}
                        className="m-3 cursor-pointer"
                      />
                      {attribute.name_counted_attr}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="row">
              <MyButton type="submit" onClick={(e) => handleSubmit(e, "AP")}>
                Утвердить
              </MyButton>
              <MyButton type="submit" onClick={(e) => handleSubmit(e, "DF")}>
                Сохранить
              </MyButton>
              <MyButton type="button" onClick={() => setModal(true)}>
                Добавить новый маркер
              </MyButton>
              <Link
                to={`/scoring`}
                className="btn btn-outline-secondary"
                // type="submit"
              >
                Выйти
              </Link>
            </div>
          </form>
        </div>
      </div>
      <MyModal visible={modal} setVisible={setModal}>
        <MyEditForm />
        {/* <ModelForm create={createModel} /> */}
      </MyModal>
    </div>
  )
}

export default SearchBar
