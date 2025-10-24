import { FaUser } from "react-icons/fa6";
export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between border-b-[0.5] py-5 w-[100%] border-gray-400">
      <h2 className="font-bold text-blue-500 ml-5 text-xl">TodoApp</h2>
      <div className="flex flex-row items-center justify-evenly gap-5 mr-5">
        <span>Todos</span>
        <FaUser />
        <button>Login</button>
      </div>
    </header>
  );
}
