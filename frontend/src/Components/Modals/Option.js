import React, { useState } from "react";
import useCollapse from "react-collapsed";
import { ReactComponent as BusLogo } from "../../Assets/buslogo.svg";
import { ReactComponent as WalkLogo } from "../../Assets/walklogo.svg";
import { ReactComponent as DotsLogo } from "../../Assets/dotslogo.svg";

const Option = ({ option, selectRoute }) => {
  // State for option expanded or not
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  // Called when user selects route index
  const selectIndex = (id) => {
    selectRoute(id);
  };
  let busIndex = -1;
  return (
    <div>
      <li
        key={option.id}
        className="max-w-full px-1 py-0.5 text-center text-sm md:text-sm rounded-lg bg-zinc-900 hover:bg-amber-800 text-slate-100  my-4"
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
            {option.instructions.map((instruction) => {
              // If we are at the last element, don't show dots after otherwise do
              if (
                instruction !==
                option.instructions[option.instructions.length - 1]
              ) {
                if (instruction.startsWith("Walk")) {
                  return (
                    <>
                      <WalkLogo
                        className="h-8 flex-1 self-center "
                        alt="Walking Logo"
                      />
                      <DotsLogo
                        className="h-5 flex-1 self-center"
                        alt="Dots Logo"
                        fill="#ffffff"
                        stroke="#ffffff"
                      />
                    </>
                  );
                } else {
                  busIndex++;
                  return (
                    <>
                      <BusLogo
                        fill="#ffffff"
                        className="h-12 flex-1 px-2 self-center"
                        stroke="#ffffff"
                        alt="Bus Logo"
                      />
                      <p className="basis-1 text-xs self-center py-0.5 px-1 rounded bg-yellow-500 text-slate-50">
                        {option.buses[busIndex]}
                      </p>
                      <DotsLogo
                        className="h-5 flex-1 self-center"
                        alt="Dots Logo"
                        fill="#ffffff"
                        stroke="#ffffff"
                      />
                    </>
                  );
                }
              } else {
                if (instruction.startsWith("Walk")) {
                  return (
                    <>
                      <WalkLogo
                        className="h-8 flex-1 self-center "
                        alt="Walking Logo"
                      />
                      <p className="text-center basis-2/12 text-xs md:text-s self-center">
                        {option.duration}
                      </p>
                    </>
                  );
                } else {
                  return (
                    <>
                      <BusLogo
                        fill="#ffffff"
                        className="h-12 flex-1 px-2 self-center"
                        stroke="#ffffff"
                        alt="Bus Logo"
                      />
                      <p className="basis-1 text-xs self-center py-0.5 px-1 rounded bg-yellow-500 text-slate-50">
                        {option.buses[option.buses.length - 1]}
                      </p>
                      <p className="text-left basis-2/12 text-xs md:text-s self-center py-1">
                        {option.duration}
                      </p>
                    </>
                  );
                }
              }
            })}
            <div className="flex-1 text-center self-center text-lg	">
              {" "}
              {isExpanded ? "-" : "+"}
            </div>
          </div>
        </button>
      </li>
      <section {...getCollapseProps()} className="text-xs md:text-sm text-left">
        <div className="max-h-15 md:max-h-18 overflow-scroll px-5 tracking-wide font-extralight leading-5 border border-gray-700 rounded-lg">
          {option.instructions.map((instruction, index) => (
            <p key={index} className="text-slate-300	">
              {instruction}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Option;
