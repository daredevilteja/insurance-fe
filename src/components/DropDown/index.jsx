import { useState } from "react";

function DropDown({ labelData, options, handleChange }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (event) => {
    handleChange(event.target.value);
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label>
        {labelData}:
        <select value={selectedOption} onChange={handleDropdownChange}>
          {options.map((val, idx) => (
            <option key={`${val}_${idx}`} value={val}>
              {val}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default DropDown;
