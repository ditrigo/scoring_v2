import React, { useState, useEffect } from "react"
import MyButton from "../../UI/MyButton/MyButton"
import MyInput from "../../UI/MyInput/MyInput"
import Select from "react-select"
import axios from "axios"
import { CopyToClipboard } from "react-copy-to-clipboard"
import configFile from "../../../config.json"

const AtributForm = ({ create, setVisible }) => {
  const [marker, setMarker] = useState({
    name_marker_attr: "",
    attr_formulas: "",
  })
  const [importedAttributes, setImportedAttributes] = useState([])
  const [countedAttributes, setCountedAttributes] = useState([])
  const [copiedValue, setCopiedValue] = useState({
    value: "",
    copied: false,
  })
  const [balancedError, setBalancedError] = useState("")
  const [targerFormulaValue, setTargerFormulaValue] = useState("")

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   console.log(e.target);
  // };

  const handleChangeSelect = (target) => {
    // Накинуть копирование элементов в формулы
    console.log("target", target)
    setCopiedValue({ value: target.value })
    // setCountedAttributes((prevState) => ({
    //   ...prevState,
    //   [target.name]: target.value,
    // }))
    console.log(copiedValue)
  }
  // console.log(copiedValue)

  const handleCancle = (e) => {
    e.preventDefault()
    setVisible(false)
  }

  function isBalanced(string) {
    console.log(
      "🚀 ~ file: AtributForm.jsx:44 ~ isBalanced ~ isBalanced:",
      isBalanced
    )
    const start = "{[("
    const end = "}])"
    const queue = []

    const map = {
      "}": "{",
      "]": "[",
      ")": "(",
    }

    for (let i = 0; i < string.length; i++) {
      const char = string[i]

      if (start.includes(char)) {
        queue.push(char)
      } else if (end.includes(char)) {
        const last = queue.pop()
        if (map[char] !== last) return false
      }
    }
    return !queue.length
  }

  const addNewMarker = (e) => {
    e.preventDefault()
    // console.log("balanced: ", isBalanced(marker.attr_formulas))
    if (isBalanced(marker.attr_formulas)) {
      setBalancedError("")
      const newMarker = {
        ...marker,
        description: "Description",
        nested_level: 1,
        author_id: "Тестовый пользователь",
        target_formula_value: targerFormulaValue
      }
      create(newMarker)

      setMarker({ name_marker_attr: "", attr_formulas: "" })
    } else {
      setBalancedError("Скобки не сбалансированы!")
    }
  }

  async function getAttributes() {
    axios
      .get(`${configFile.apiEndPoint}/catalog_fields/`)
      .then((res) => {
        res.data.data.forEach((element) => {
          if (element.main_catalog_id.origin_name === "counted_attributes") {
            setCountedAttributes((current) => [
              ...current,
              {
                label:
                  // element.main_catalog_id.origin_name +
                  // "." +
                  // element.origin +
                  // " - " +
                  element.description,
                value:
                  element.main_catalog_id.origin_name + "." + element.origin,
                // +
                // "." +
                // element.origin +
                // " - " +
                // element.description,
                name:
                  element.main_catalog_id.origin_name +
                  "." +
                  element.origin +
                  " - " +
                  element.description,
              },
            ])
          } else if (
            element.main_catalog_id.origin_name === "imported_attributes"
          ) {
            setImportedAttributes((current1) => [
              ...current1,
              {
                label:
                  // element.main_catalog_id.origin_name +
                  // "." +
                  // element.origin +
                  // " - " +
                  element.description,
                value:
                  element.main_catalog_id.origin_name + "." + element.origin,
                // +
                // " - " +
                // element.description,
                name:
                  element.main_catalog_id.origin_name +
                  "." +
                  element.origin +
                  " - " +
                  element.description,
              },
            ])
          }
        })
      })
      .catch((e) => {
        console.log(e)
      })
    // console.log("attr", countedAttributes);
  }
  useEffect(() => {
    getAttributes()
  }, [])

  return (
    <div className="container">
      <h3>Новый маркер</h3>
      <form>
        {/* <div className="row "> */}
        <MyInput
          value={marker.name_marker_attr}
          onChange={(e) =>
            setMarker({ ...marker, name_marker_attr: e.target.value })
          }
          type="text"
          placeholder="Наименование маркера"
        />
        {/* </div> */}
        <div className="row mt-3">
          <div className="col">
            <div className="row">
              <label> Загружаемые Атрибуты</label>
            </div>
            <div className="row mb-3">
              <Select
                options={importedAttributes}
                onChange={handleChangeSelect}
                name="Загружаемые атрибуты"
                placeholder="Выберите загружаемые атрибуты"
              />
            </div>
          </div>
          <div className="col">
            <div className="row">
              <label>Вычисляемые Атрибуты</label>
            </div>
            <div className="row md-auto">
              <Select
                options={countedAttributes}
                onChange={handleChangeSelect}
                name="Вычисляемые атрибуты"
                placeholder="Выберите вычисляемые атрибуты"
              />
            </div>
          </div>
        </div>
        <div className="row m-0 mb-3 mt-3 justify-content-md-center">
          {/* <div className="col"> */}
          <CopyToClipboard
            text={copiedValue.value}
          // onCopy={() => this.setState({ copied: true })}
          >
            <MyButton onClick={(e) => e.preventDefault()}>
              Cкопировать атрибут
            </MyButton>
          </CopyToClipboard>
          {/* </div> */}
        </div>
        <textarea
          className="form-control"
          placeholder="Формула"
          // className="w-100 textarea"
          value={marker.attr_formulas}
          onChange={(e) =>
            setMarker({ ...marker, attr_formulas: e.target.value })
          }
        ></textarea>
        <div className="row m-0 mb-3 mt-3">
          <MyInput
            type="text"
            placeholder="Целевое значение формулы"
            value={targerFormulaValue}
            onChange={(e) =>
              // console.log(e.target.value)
              setTargerFormulaValue(e.target.value)
            }
          />
        </div>

        {/* <MyInput
          value={marker.attr_formulas}
          onChange={(e) =>
            setMarker({ ...marker, attr_formulas: e.target.value })
          }
          type="text"
          placeholder="Формула"
        /> */}
        <div className="row mt-3">
          {balancedError && <p className="text-danger">{balancedError}</p>}
          <div className="col-md-auto">
            <MyButton className="btn-outline-primary" onClick={addNewMarker}>
              Сохранить
            </MyButton>
          </div>
          {/* <div className="col-md-auto">
            <MyButton className="btn-outline-primary disabled">
              Валидация формулы маркера
            </MyButton>
          </div> */}
          <div className="col-md-auto">
            <MyButton
              className="btn btn-outline-secondary"
              onClick={handleCancle}
            >
              Отменить
            </MyButton>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AtributForm
