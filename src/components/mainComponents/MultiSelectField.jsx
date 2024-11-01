import React, { useState, useRef, useEffect, useMemo, memo } from "react";
import { RequiredFieldLabel } from "./RequiredFieldLabel";

const MultiSelectField = memo(
  ({
    labelText,
    placeholderText,
    dropdownOptions,
    selectedOptions,
    onChange,
    required,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef();
    const [customOption, setCustomOption] = useState(false);
    const [customOptionText, setCustomOptionText] = useState("");
    console.log("labelText", labelText, "selectedOptions", selectedOptions);
    const totalOptions =
      selectedOptions.length != 0
        ? Array.from(new Set(dropdownOptions.concat(selectedOptions)))
        : dropdownOptions;
    console.log("totalOptions", totalOptions);

    const modifiedOptions = totalOptions.map((op, ind) => {
      if (selectedOptions.includes(op)) {
        return { value: ind + 1, label: op, selected: true };
      } else return { value: ind + 1, label: op, selected: false };
    });

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleTagSelect = (option) => {
      if (option.label == "Other provider") {
        setCustomOption(true);
      } else {
        onChange(labelText, option.label, false);
      }
    };

    const handleTagRemove = (e, option) => {
      e.stopPropagation(); // Stop the click event from propagating to handleClickOutside

      onChange(labelText, option.label, true);
    };
    const selectedValues = useMemo(
      () => modifiedOptions.filter((op) => op.selected),
      [modifiedOptions]
    );

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleCustomOption = (e) => {
      console.log("value", customOptionText);
      onChange(labelText, customOptionText, false);
      setCustomOptionText("");
      setCustomOption(false);
    };
    useEffect(() => {
      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }, []);
    return (
      <div ref={containerRef} className="w-full relative  text-sm md:text-base">
        <RequiredFieldLabel labelText={labelText == 'Orientation' ? 'Sexual Orientation': labelText} required={required} />

        <div
          id="wrapper"
          className="rounded mt-1 border border-gray-400 cursor-text p-1 md:p-2 flex justify-between gap-x-2 items-center"
          onClick={toggleDropdown}
        >
          <div
            id="selectedValues"
            className="w-full flex flex-wrap gap-x-2 md:gap-x-3 gap-y-2 "
          >
            {customOption ? (
              <div className="flex gap-x-4 w-full items-center">
                <input
                  value={customOptionText}
                  onChange={(e) => setCustomOptionText(e.target.value)}
                  placeholder="Enter other's name here"
                  className="bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 "
                />
                <button
                  className="text-white bg-green-600 px-2 py-2 rounded-lg"
                  onClick={handleCustomOption}
                >
                  done
                </button>
              </div>
            ) : selectedValues.length !== 0 ? (
              selectedValues.map((val) => (
                <div
                  key={val.value}
                  className="w-fit flex gap-x-1.5 md:gap-x-3 py-0.5 px-1 rounded-md flex items-center text-t-option bg-b-option border border-[#0372B2]"
                >
                  <div className="item-label" data-value={val.value}>
                    {val.label}
                  </div>
                  <img
                    className="h-3 md:h-4 cursor-pointer"
                    onClick={(e) => handleTagRemove(e, val)}
                    src="/assets/icons/xMark.svg"
                    alt=""
                  />
                </div>
              ))
            ) : (
              <p className="text-c-placeholder">{placeholderText}</p>
            )}
          </div>
          <div id="dropdown-toggle" className="btn-container border-l pl-2">
            <button
              type="button"
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src="/assets/icons/angleDown.svg"
                className="h-6 font-bold"
                alt=""
              />
            </button>
          </div>
        </div>
        {isOpen && (
          <Dropdown options={modifiedOptions} onSelect={handleTagSelect} />
        )}
      </div>
    );
  }
);

const Dropdown = ({ options, onSelect }) => {
  console.log("dropdown rendered");
  const [inputVal, seInputVal] = useState("");
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputVal.toLowerCase())
  );
  const inputRef = useRef(null);
  const handleChange = (e) => {
    seInputVal(e.target.value);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div
      id="filteredOptions"
      className={`absolute border border-t-0 mt-1 bg-white max-h-60 z-40 overflow-y-auto w-full`}
    >
      <div className="">
        <input
          className="bg-transparent rounded p-2 text-gray-700 outline-none w-full mb-2"
          placeholder={"Search..."}
          value={inputVal}
          ref={inputRef}
          onChange={handleChange}
        />
      </div>
      <ul className="">
        {filteredOptions.map((option) => (
          <li
            key={option.value}
            className={`p-2 rounded cursor-pointer  ${
              option.selected ? "bg-b-option" : "hover:bg-gray-100"
            }`}
            onClick={() => onSelect(option)}
          >
            <input
              type="checkbox"
              checked={option.selected}
              readOnly
              className="mr-2"
            />
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
export { MultiSelectField };
