import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-sky-800 text-white flex justify-between px-14 py-2 w-[100%] max-sm:flex-col max-sm:gap-8">
            <span className="logo flex gap-1 justify-center items-center cursor-pointer">
                <Link to="/" className="flex gap-1 justify-center items-center">
                    <img
                        src="/icons/logo.svg"
                        alt="passAwordA Logo"
                        className="w-16"
                    />
                    <span className="font-bold text-2xl">passAword</span>
                </Link>
            </span>

            <span className="links flex items-center justify-center gap-8 text-lg max-sm:flex-col">
                <Link to="/" className="hover:underline">
                    Home
                </Link>
                <Link to="/about" className="hover:underline">
                    About
                </Link>
            </span>
        </nav>
    );
};

export default Navbar;
