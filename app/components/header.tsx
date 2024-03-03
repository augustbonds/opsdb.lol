import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white body-font shadow w-full">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <span className="ml-3 text-xl">YourLogo</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:text-gray-900" href="/">
            Home
          </Link>
          <Link className="mr-5 hover:text-gray-900" href="/typees">
            Typees
          </Link>
          <Link className="mr-5 hover:text-gray-900" href="/profile">
            Profile
          </Link>
        </nav>
        <Link href="/api/auth/login">
          <button className="inline-flex items-center bg-gray-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
            Login
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
