import React from "react"

const TextField = ({
  label,
  name,
  value,
  onChange,
  error,
  clientData,
  type,
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return "text form-control mt-1 mr-2" + (error ? " is-invalid" : "")
  }

  return (
    <div className="mb-4 p-2">
      <label htmlFor={name}>{label}</label>
      {/* <div className=" input-group mb-3 has-validation"> Убрал input-gruop для того, чтоб не было наланения поверх других полей*/}
      <div className="mb-3 has-validation">
        <input
          className={getInputClasses()}
          type={type || "text"}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        />
        {error && <div className="invalid-feedback ">{error}</div>}
        {clientData.inn && !error && (
          <div className="text-warning">
            Внимание! ИНН может содержать 10 или 12 знаков!
          </div>
        )}
      </div>
    </div>
  )
}

export default TextField
