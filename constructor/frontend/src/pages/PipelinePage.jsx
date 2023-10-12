import React, { useState } from "react";
import MyButton from "../components/UI/MyButton/MyButton";

const PipelinePage = () => {
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState([
    {name: "Статические данные", open: false}, 
    {name: "Расчет модели", open: false}, 
    {name: "Выписка СКУАД", open: false}, 
    {name: "Журнал скоринга", open: false}, 
  ])

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-auto">
            <MyButton>Статические данные</MyButton>
          </div>
          <div class="col-md-auto">
            <MyButton>Расчет модели</MyButton>
          </div>
          <div class="col-md-auto">
            <MyButton>Выписка СКУАД</MyButton>
          </div>
          <div class="col-md-auto">
            <MyButton onClick={toggle}>Результаты скоринга</MyButton>
          </div>
          <div class="col-md-auto">
            <MyButton>Журнал скоринга</MyButton>
          </div>
        </div>
      </div>

      {open && (
        <div class="table-responsive-sm">
        <table className="table text-left table-bordered mt-5">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Дата загрузки</th>
            <th scope="col">ИНН</th>
            <th scope="col">Дата выгрузки отчета</th>
          </tr>
        </thead>
        </table>
        </div>
      )}
    </div>
  );
};


export default PipelinePage;
