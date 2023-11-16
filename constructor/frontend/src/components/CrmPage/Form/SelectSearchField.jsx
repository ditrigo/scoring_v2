import React from "react"
import Select from "react-select"

const SelectSearchField = ({
  label,
  name,
  options,
  onChange,
  error,
  placeholder,
  disabled,
}) => {
  const getInputClasses = () => {
    return "select form-control mt-1 mr-2" + (error ? " is-invalid" : "")
  }

  return (
    <div className="mb-4 p-2">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <div className="mb-3 has-validation">
        <Select
          options={options}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          className={getInputClasses()}
          isDisabled={disabled}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

export default SelectSearchField
