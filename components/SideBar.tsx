import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { BiHighlight } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { GiNotebook } from "react-icons/gi";
import { MdArrowBackIosNew, MdOutlineFavoriteBorder } from "react-icons/md";
import user from "../assets/images/user.jpg";

const links = [
  {
    icons: GiNotebook,
    label: "All Notes",
  },
  {
    icons: FiBell,
    label: "Reminders",
  },
  {
    icons: FaTasks,
    label: "Tasks",
  },
  {
    icons: MdOutlineFavoriteBorder,
    label: "Favorites",
  },
  {
    icons: BiHighlight,
    label: "Highlights",
  },
  {
    icons: BsClock,
    label: "Activities",
  },
];

const SideBar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`absolute h-[calc(100vh_-_40px)] w-72 bg-gray-900 text-white rounded-l-2xl p-5 duration-300 ${
        open ? "w-72" : "w-16"
      }`}
    >
      <div className="h-5">
        <MdArrowBackIosNew
          className={`absolute w-5 h-5 rounded-full hover:bg-gray-800 hover:p-1 cursor-pointer duration-300 ${
            open ? "rotate-0 right-3" : "rotate-180 right-6"
          }`}
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="flex flex-col justify-between h-full pb-5">
        <div className={`py-5 duration-300`}>
          <h3
            className={`font-bold whitespace-pre duration-300 ${
              !open && "-translate-x-10 opacity-0 invisible"
            }`}
          >
            Quick links
          </h3>
          <ul className={`space-y-1`}>
            {links.map((link, index) => (
              <li
                key={index}
                className={`py-1.5 rounded-md flex items-center gap-3.5 cursor-pointer ${
                  open && "pl-3 hover:bg-blue-500"
                } duration-300`}
              >
                <div className={`${open ? "text-lg" : "text-xl"} duration-300`}>
                  {React.createElement(link.icons)}
                </div>
                <h3
                  style={{ transitionDelay: `${open && index + 1 + "00ms"}` }}
                  className={`whitespace-pre ${
                    !open && "translate-x-10 opacity-0 invisible"
                  } duration-300`}
                >
                  {link.label}
                </h3>
              </li>
            ))}
          </ul>
        </div>
        <div className=" flex items-center gap-2">
          <div className="shrink-0">
            <Image
              src={user}
              alt=""
              className={`${
                open ? "w-10 h-10" : "w-6 h-6"
              } rounded-full duration-500`}
            />
          </div>
          <div
            className={`${
              !open && "translate-x-10 opacity-0 invisible"
            } shrink-0 duration-300`}
          >
            <h3>Thomas Williams</h3>
            <h6 className="text-gray-500 text-sm">Admin</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
