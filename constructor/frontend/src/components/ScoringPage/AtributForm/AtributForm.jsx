import React, { useState, useEffect } from "react";
import MyButton from "../../UI/MyButton/MyButton";
import MyInput from "../../UI/MyInput/MyInput";
import Select from "react-select";
import axios from "axios";

const AtributForm = ({ create, setVisible }) => {
  const [marker, setMarker] = useState({
    name_marker_attr: "",
    attr_formulas: "",
  });
  const [importedAttributes, setImportedAttributes] = useState([]);
  const [countedAttributes, setCountedAttributes] = useState([]);

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   console.log(e.target);
  // };

  const handleChangeSelect = (target) => {
    // Накинуть копирование элементов в формулы
    console.log("target", target);
    // setCountedAttributes((prevState) => ({
    //   ...prevState,
    //   [target.name]: target.value,
    // }))
  };

  const handleCancle = (e) => {
    e.preventDefault();
    setVisible(false);
  };

  const addNewMarker = (e) => {
    e.preventDefault();
    const newMarker = {
      ...marker,
      description: "some description",
      nested_level: 1,
      author_id: "Gr",
    };

    create(newMarker);

    setMarker({ name_marker_attr: "", attr_formulas: "" });
  };

  async function getAttributes() {
    axios
      .get("http://127.0.0.1:8000/api/catalog_fields/")
      .then((res) => {
        res.data.data.forEach((element) => {
          if (element.main_catalog_id.origin_name === "counted_attributes") {
            setCountedAttributes((current) => [
              ...current,
              {
                label:
                  element.main_catalog_id.origin_name +
                  "." +
                  element.origin +
                  " - " +
                  element.description,
                value:
                  element.main_catalog_id.origin_name +
                  "." +
                  element.origin +
                  " - " +
                  element.description,
                name:
                  element.main_catalog_id.origin_name +
                  "." +
                  element.origin +
                  " - " +
                  element.description,
              },
            ]);
          } else if (
            element.main_catalog_id.origin_name === "imported_attributes"
          ) {
            setImportedAttributes((current1) => [
              ...current1,
              {
                label:
                  element.main_catalog_id.origin_name +
                  "." +
                  element.origin +
                  " - " +
                  element.description,
                value:
                  element.main_catalog_id.origin_name +
                  "." +
                  element.origin +
                  " - " +
                  element.description,
                name:
                  element.main_catalog_id.origin_name +
                  "." +
                  element.origin +
                  " - " +
                  element.description,
              },
            ]);
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("attr", countedAttributes);
  }
  useEffect(() => {
    getAttributes();
  }, []);

  return (
    <div className="container">
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
                placeholder="Выберите Загружаемые атрибуты"
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
                placeholder="Выберите Вычисляемые атрибуты"
              />
            </div>
          </div>
        </div>
        <MyInput
          value={marker.attr_formulas}
          onChange={(e) =>
            setMarker({ ...marker, attr_formulas: e.target.value })
          }
          type="text"
          placeholder="Формула"
        />
        <div className="row mt-3">
          <div className="col-md-auto">
            <MyButton className="btn-outline-primary" onClick={addNewMarker}>
              Сохранить
            </MyButton>
          </div>
          <div className="col-md-auto">
            <MyButton className="btn-outline-primary">
              Валидация формулы маркера
            </MyButton>
          </div>
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
  );
};

export default AtributForm;
