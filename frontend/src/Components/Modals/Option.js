import React, { useState } from "react";
import useCollapse from "react-collapsed";

const Option = ({ option, selectRoute }) => {
  // State for option expanded or not
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  // Called when user selects route index
  const selectIndex = (id) => {
    selectRoute(id);
  };
  return (
    <div>
      <li
        key={option.id}
        className="px-6 py-0.5 text-left text-sm md:text-sm rounded-lg bg-zinc-900 hover:bg-amber-800 text-slate-100  my-4"
      >
        <button
          className="w-full block"
          {...getToggleProps({
            onClick: () => {
              setExpanded((prevExpanded) => !prevExpanded);
              selectIndex(option.id);
            },
          })}
        >
          <div className="flex">
            <div className="flex 1 text-left tracking-wide font-light text-xs md:text-base">
              Route {option.id} {option.duration}
            </div>
            <div className=" flex-1 text-right"> {isExpanded ? "-" : "+"}</div>
          </div>
        </button>
      </li>
      <section {...getCollapseProps()} className="text-xs md:text-sm text-left">
        <div className="max-h-15 md:max-h-18 overflow-scroll px-5 tracking-wide font-extralight leading-5 border border-gray-700 rounded-lg">
          {option.instructions.map((instruction) => (
            <p className="text-slate-300	">{instruction}</p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Option;
