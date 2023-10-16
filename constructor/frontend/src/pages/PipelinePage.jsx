import React, { useState } from "react";
import MyButton from "../components/UI/MyButton/MyButton";
import MyInput from "../components/UI/MyInput/MyInput";
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap/dist/css/bootstrap.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const PipelinePage = () => {
  const [open, setOpen] = useState(false);
  //   Для отображения в дальнейшем различных элементов
  const [block, setBlock] = useState([
    { name: "Статические данные", open: false },
    { name: "Расчет модели", open: false },
    { name: "Выписка СКУАД", open: false },
    { name: "Журнал скоринга", open: false },
  ]);
  const [startDate, setStartDate] = useState(new Date());

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-auto">
            <MyButton>Статические данные</MyButton>
          </div>
          <div className="col-md-auto">
            <MyButton>Расчет модели</MyButton>
          </div>
          <div className="col-md-auto">
            <MyButton>Выписка СКУАД</MyButton>
          </div>
          <div className="col-md-auto">
            <MyButton onClick={toggle}>Результаты скоринга</MyButton>
          </div>
          <div className="col-md-auto">
            <MyButton>Журнал скоринга</MyButton>
          </div>
        </div>
      </div>

      {open && (
        <div>
          <div className="table-responsive-sm">
            <table className="table text-left table-bordered mt-5">
              <thead>
                <tr>
                  <th scope="col">Атрибут</th>
                  <th>Условие фильтра</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ИНН</td>
                  <td>
                    <table>
                      <thead>
                        <tr>
                          <td>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="0"
                            >
                              <option value="0" disabled>
                                Выбрать инн для скоринга
                              </option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </td>
                          <td>
                            <MyInput placeholder="Массовая вставка ИНН"></MyInput>
                          </td>
                        </tr>
                      </thead>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>Модель скоринга</td>
                  <td>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      defaultValue="0"
                    >
                      <option value="0" disabled>
                        Выбрать модель для скоринга
                      </option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Отчетная дата</td>
                  <td>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      isClearable
                      placeholderText="I have been cleared!"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="container">
              <div className="row">
                <div className="col-md-auto">
                  <MyButton>Запустить скоринг</MyButton>
                </div>
                <div className="col-md-auto">
                  <MyButton>Журнал скоринга</MyButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelinePage;
