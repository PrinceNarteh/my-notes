import { Dispatch, SetStateAction } from "react";
import { MdArrowBackIosNew } from "react-icons/md";

const SideBar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`fixed h-[calc(100vh_-_40px)] w-72 bg-gray-900 text-white rounded-l-2xl p-5 duration-300 ${
        open ? "w-72" : "w-10"
      }`}
    >
      <MdArrowBackIosNew
        className={`absolute right-3 cursor-pointer duration-300 ${
          open ? "rotate-0" : "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />
    </div>
  );
};

export default SideBar;
