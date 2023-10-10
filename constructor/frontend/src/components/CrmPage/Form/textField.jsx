import React from "react"

const TextField = ({ label, name, value, onChange }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  return (
    <div className="mb-4 p-2 ">
      <label htmlFor={name}>{label}</label>
      <div className="input-group mb-3 has-validation">
        <input
          className="form-control mt-1 mr-2"
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default TextField;