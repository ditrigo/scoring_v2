import React from "react"

const TextField = ({ label, name, value, onChange, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return "form-control mt-1 mr-2" + (error ? " is-invalid" : "")
  }

  return (
    <div className="mb-4 p-2">
      <label htmlFor={name}>{label}</label>
      <div className="input-group mb-3 has-validation">
        <input
          className={getInputClasses()}
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        />
        {error && <div className="invalid-feedback ">{error}</div>}
      </div>
    </div>
  )
}

export default TextField
