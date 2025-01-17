import React from "react";

const About = () => {
    return (
        <div className="w-full max-w-3xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-semibold text-sky-800 mb-4">
                About passAword
            </h1>
            <p className="text-lg text-sky-700">
                passAword is a simple and secure password manager designed to
                help you store and manage your passwords locally. With
                passAword, you can easily save passwords for various sites,
                access them later, and even copy them to your clipboard for
                convenience.
            </p>
            <p className="text-lg text-sky-700 mt-4">
                This tool is built with privacy in mind — your passwords are
                stored locally in your browser and are never shared with anyone.
            </p>
            <p className="text-lg text-sky-700 mt-4">
                Whether you're managing a few passwords or many, passAword is
                the easy way to keep your credentials organized and secure.
            </p>
        </div>
    );
};

export default About;
