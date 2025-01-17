import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const [isToastVisible, setToastVisible] = useState(false);

    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const showPassword = () => {
        const passwordBox = document.getElementById("passwordBox");
        const eyeIcon = document.getElementById("eyeIcon");

        if (passwordBox.type === "password") {
            passwordBox.type = "text";
            eyeIcon.src = "/icons/eye.svg";
        } else {
            passwordBox.type = "password";
            eyeIcon.src = "/icons/eyecross.svg";
        }
    };

    const savePassword = () => {
        const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
        localStorage.setItem(
            "passwords",
            JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
        );
        setPasswordArray(newPasswordArray);
        setForm({ site: "", username: "", password: "" });
    };

    const deletePassword = (id) => {
        let confirmation = confirm(
            "Do you really want to delete this information?"
        );
        if (confirmation) {
            setPasswordArray(passwordArray.filter((item) => item.id != id));
            console.log(`Deleting id ${id}`);
            localStorage.setItem(
                "passwords",
                JSON.stringify(passwordArray.filter((item) => item.id != id))
            );
        }
    };

    const editPassword = (id) => {
        setForm(passwordArray.filter((item) => item.id === id)[0]);
        setPasswordArray(passwordArray.filter((item) => item.id != id));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setToastVisible(true);
                setTimeout(() => setToastVisible(false), 3000);
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    };

    return (
        <main className="w-full flex flex-col items-center">
            {isToastVisible && (
                <div className="fixed top-24 right-5 bg-sky-500 text-white px-4 py-2 rounded-lg shadow-lg">
                    <p className="font-semibold">Text copied to clipboard!</p>
                </div>
            )}
            <div className="w-5/6 bg-sky-200 mt-14 p-5 rounded-lg max-lg:w-[95%]">
                <div className="header flex gap-1 justify-center items-center cursor-pointer text-4xl">
                    <img
                        src="/icons/logo.svg"
                        alt="passAwordA Logo"
                        className="w-16"
                        href="/"
                    />
                    <span className="font-bold text-sky-800">passAword</span>
                </div>
                <div className="tagLine text-center text-sky-800">
                    Your local password Manager :)
                </div>
                <div className="accountInfo flex flex-col justify-center items-center mt-8 gap-4">
                    <span className="site w-[80%] mx-auto max-sm:w-full">
                        <input
                            type="text"
                            value={form.site}
                            onChange={handleChange}
                            className="w-full rounded-xl border-2 px-4 border-sky-400 active:border-sky-700 outline-sky-700 py-1"
                            name="site"
                            id="siteURL"
                            placeholder="Enter site URL"
                        />
                    </span>
                    <span className="credentials flex gap-4 w-[80%] mx-auto max-sm:flex-col max-sm:w-full">
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="rounded-xl w-full px-4 border-2 border-sky-400 active:border-sky-700 outline-sky-700 py-1"
                            id="userid"
                            placeholder="Enter Username/Email"
                        />
                        <div
                            className={`password flex justify-between rounded-xl w-full px-4 border-2 py-1 bg-white ${
                                isFocused ? "border-sky-700" : "border-sky-400"
                            } `}
                        >
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="outline-none w-full"
                                id="passwordBox"
                                placeholder="Enter Password"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                            <img
                                src="/icons/eyecross.svg"
                                alt="eye"
                                width={25}
                                className="cursor-pointer"
                                id="eyeIcon"
                                onClick={showPassword}
                            />
                        </div>
                    </span>
                    <button
                        className="border-2 flex justify-center items-center border-sky-400 py-1 px-8 rounded-2xl bg-sky-300 text-white hover:bg-sky-600"
                        onClick={savePassword}
                    >
                        <img src="/icons/add.svg" alt="add Image" />
                        <span className="font-bold">Add</span>
                    </button>
                </div>
            </div>
            <div className="passwords mt-8 w-5/6 mx-auto rounded-lg overflow-hidden border-2 border-white max-lg:w-[95%]">
                <h1 className="text-center my-3 font-bold text-2xl">
                    Your Passwords
                </h1>
                {passwordArray.length === 0 && (
                    <div className="text-center">[No Passwords Stored]</div>
                )}
                {passwordArray.length !== 0 && (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
                        <table className="w-full text-sm text-left rtl:text-right text-sky-700">
                            <thead className="text-xs uppercase bg-sky-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Site URL
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Username / Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Password
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className="odd:bg-white even:bg-sky-100 hover:bg-sky-200"
                                        >
                                            <td className="px-6 py-4 font-medium text-sky-700 whitespace-nowrap">
                                                <a
                                                    href={item.site}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {item.site}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-start items-center gap-3">
                                                    <span className="truncate max-w-[150px]">
                                                        {item.username}
                                                    </span>
                                                    <span>
                                                        <img
                                                            src="/icons/copy.svg"
                                                            alt="copy icon"
                                                            width={20}
                                                            className="cursor-pointer"
                                                            onClick={() =>
                                                                copyText(
                                                                    item.username
                                                                )
                                                            }
                                                        />
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-start items-center gap-3">
                                                    <span className="truncate max-w-[150px]">
                                                        ********
                                                    </span>
                                                    <span>
                                                        <img
                                                            src="/icons/copy.svg"
                                                            alt="copy icon"
                                                            width={20}
                                                            className="cursor-pointer"
                                                            onClick={() =>
                                                                copyText(
                                                                    item.password
                                                                )
                                                            }
                                                        />
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
                                                        onClick={() =>
                                                            editPassword(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                                        onClick={() =>
                                                            deletePassword(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Manager;
