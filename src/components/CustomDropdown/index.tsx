import { useState } from "react";

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: DropdownOption[];
  onSelect: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : "Select an option"}
      </button>
      {isOpen && (
        <ul>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
