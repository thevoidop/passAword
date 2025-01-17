import React from "react";

const Footer = () => {
    return (
        <footer className="bg-sky-800 text-white py-4 mt-auto">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} passAword. All rights
                    reserved.
                </p>
                <p className="text-xs mt-2">
                    Built with 💙 by{" "}
                    <a
                        href="https://github.com/thevoidop"
                        className="underline"
                    >
                        TheVoidOP
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
