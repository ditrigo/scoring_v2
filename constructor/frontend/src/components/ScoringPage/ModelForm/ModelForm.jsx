import React, { useEffect, useState } from "react";
import MyButton from "../../UI/MyButton/MyButton";
import MyInput from "../../UI/MyInput/MyInput";

const ModelForm = ({ create }) => {
  const [model, setModel] = useState({ model_name: "", description: "" });

  const addNewModel = (e) => {
    e.preventDefault();
    const newModel = {
      ...model,
      author_id: "Denis",
      status: "DF",
      version: 1,
      active: true,
    };
    create(newModel);
    setModel({ name_model: "", description: "" });
  };

  return (
    <form>
      <MyInput
        value={model.name_model}
        onChange={(e) => setModel({ ...model, model_name: e.target.value })}
        type="text"
        placeholder="Название модели"
      />
      <MyInput
        value={model.description}
        onChange={(e) => setModel({ ...model, description: e.target.value })}
        type="text"
        placeholder="Описание модели"
      />
      <MyButton onClick={addNewModel}>Создать модель</MyButton>
    </form>
  );
};

export default ModelForm;
