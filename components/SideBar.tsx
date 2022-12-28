import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { BiHighlight } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { GiNotebook } from "react-icons/gi";
import { MdArrowBackIosNew, MdOutlineFavoriteBorder } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { signOut } from "next-auth/react";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";

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
      className={`absolute h-[calc(100vh_-_40px)] bg-gray-900 text-white rounded-l-2xl p-5 duration-300 ${
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
        <div>
          <Link
            href={"/notes/add"}
            className="bg-blue-500 w-full mt-5 py-1 rounded-full flex items-center justify-center"
          >
            <IoMdAdd className="" />
            <span
              className={`whitespace-pre ${
                !open && "translate-x-10 opacity-0 invisible"
              } duration-300`}
            >
              Add Note
            </span>
          </Link>

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
                  <div
                    className={`${open ? "text-lg" : "text-xl"} duration-300`}
                  >
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
        </div>
        <div
          className={`py-1.5 rounded-md flex items-center gap-3.5 cursor-pointer ${
            open && "pl-3 hover:bg-blue-500"
          } duration-300`}
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
        >
          <div className={`${open ? "text-lg" : "text-xl"} duration-300`}>
            <TbLogout />
          </div>
          <h3
            style={{ transitionDelay: `${1 + "00ms"}` }}
            className={`whitespace-pre ${
              !open && "translate-x-10 opacity-0 invisible"
            } duration-300`}
          >
            Logout
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
