import React from 'react';
import { Link } from 'react-router-dom';

 const Header = () => {
const [isOpen, setIsOpen] = React.useState(false);

const toggleMenu = () => {
    setIsOpen(!isOpen);
};

return (
  <header className="bg-gradient-to-r from-pink-500 to-purple-700 text-white mt-auto">
    <div className="container mx-auto px-4 py-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Foodie App</h1>
      <div className="flex items-center space-x-4">
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      <nav className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-200">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-200">
              Readme
            </Link>
          </li>
        </ul>
      </nav>

    </div>
  </header>
);
};

export default Header