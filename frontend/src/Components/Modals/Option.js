import React, { useState } from "react";
import useCollapse from "react-collapsed";

const Option = ({ option, chosenIndex, selectRoute }) => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  // Called when user selects route index
  const selectIndex = (id) => {
    selectRoute(id);
  };

  // Shows option selected
  const selectedColour = (id) => {
    if (id === chosenIndex) {
      return { backgroundColor: "#92400e" };
    }
    return;
  };
  return (
    <div>
      <li
        key={option.id}
        style={selectedColour(option.id)}
        className="px-6 py-0.5 text-left text-sm rounded-lg bg-zinc-900 hover:bg-amber-800 text-slate-100 border border-gray-700 my-2"
      >
        <button
          {...getToggleProps({
            onClick: () => {
              setExpanded((prevExpanded) => !prevExpanded);
              selectIndex(option.id);
            },
          })}
        >
          Route {option.id} {option.duration}
          <br />
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </li>
      <section {...getCollapseProps()}>{option.instructions}</section>
    </div>
  );
};

export default Option;
