import React, { useState } from "react"
import "./SearchBar.module.css"
import MyButton from "../../UI/MyButton/MyButton"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
// import MyModal from "../../ScoringPage/MyModal/MyModal"
// import MyEditForm from "../MyEditForm/MyEditForm"
import MarkersTable from "../MarkersTable/MarkersTable"
// import "bootstrap/dist/js/bootstrap.js";

const SearchBar = ({
  attributes,
  postLink,
  nameModel,
  idModel,
  statusModel,
  model,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [selections, setSelections] = useState([])
  const [statusButton, setStatusButton] = useState(statusModel)
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
    // setStatusButton(status)
    // console.log("status", status)
    e.preventDefault()
    // console.log("Submitted. Values are submitted", selections)
    setStatusButton(status)
    postLink(selections, status)
  }

  return (
    <div className="container mt-10">
      <div className="row">
        <h3>Добавление элементов для модели {nameModel}</h3>
        <MarkersTable modelId={idModel} model={model} />
      </div>
      <div className="row">
        {/* <div className="row"> */}
        <form className="" onSubmit={handleSubmit}>
          <div className="row">
            {/* <MarkersTable /> */}
            <div onClick={toggleExpanded}>
              <div
                className={`row font-semibold cursor-pointer ${
                  expanded ? "up-arrow" : "down-arrow"
                }`}
              >
                {selections.length
                  ? selections.map((_, i) => (
                      <span className="row" key={i}>
                        {i ? ", " : null}
                        {attributes[i].name_marker_attr}
                      </span>
                    ))
                  : "Маркеры не выбраны"}
              </div>
            </div>
            {expanded && (
              <div className="">
                {attributes.map((attribute, index) => (
                  <label
                    className="custom-select custom-select-lg mb-3"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      name={attribute.id}
                      value={attribute.name_marker_attr}
                      onChange={handleChange}
                      className="m-3 cursor-pointer"
                    />
                    {attribute.name_marker_attr}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="row">
            <div className="row mb-2">
              <MyButton
                type="submit"
                className={statusButton === "AP" ? "disabled" : ""}
                onClick={(e) => handleSubmit(e, "AP")}
              >
                Утвердить
              </MyButton>
            </div>
            <div className="row mb-2">
              <MyButton
                type="submit"
                className={statusButton === "AP" ? "disabled" : ""}
                onClick={(e) => handleSubmit(e, "DF")}
              >
                Сохранить
              </MyButton>
            </div>

            {/* <MyButton type="button" onClick={() => setModal(true)}>
                Добавить новый маркер
              </MyButton> */}
            <div className="row">
              <Link to={`/scoring`} className="btn btn-outline-secondary">
                Выйти
              </Link>
            </div>
          </div>
        </form>
        {/* </div> */}
      </div>
      {/*<MyModal visible={modal} setVisible={setModal}>
        <MyEditForm />
         <ModelForm create={createModel} /> 
      </MyModal>*/}
    </div>
  )
}

export default SearchBar
