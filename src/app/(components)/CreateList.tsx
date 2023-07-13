"use client";
import React, { useState } from "react";

export interface User {
  username: string;
  id: string;
}

export interface List {
  name: string;
  users: User[];
  show?: boolean;
}

const CreateList = ({ close }: { close: () => void }) => {
  const [listName, setListName] = useState("");
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState<User[]>([]);

  const handleAddUser = async () => {
    const user = { username, id: "" };
    if (user) {
      setUserList((userList) => [...userList, user]);
      setUsername("");
    } else {
      alert("User not found");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existingLists = JSON.parse(localStorage.getItem("lists") || "[]");

    existingLists.push({ name: listName, users: userList });

    localStorage.setItem("lists", JSON.stringify(existingLists));

    setListName("");
    setUserList([]);

    console.log(
      "Saved lists:",
      JSON.parse(localStorage.getItem("lists") || "[]")
    );
  };

  const handleDeleteUser = (userToRemove: User) => {
    setUserList((userList) => userList.filter((user) => user !== userToRemove));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 space-y-8 border border-black min-w-[500px] max-w-[500px]"
    >
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Create a list</h1>
        <button onClick={close} className="px-2 py-1 text-black underline">
          Cancel
        </button>
      </div>
      <input
        type="text"
        placeholder="List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handleAddUser}
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
        >
          +
        </button>
      </div>
      <ul className="space-y-2">
        {userList.map((user, index) => (
          <li
            key={index}
            className="flex items-center justify-between px-4 py-2 bg-gray-200 rounded-md"
          >
            <span>{user.username}</span>
            <button
              onClick={() => handleDeleteUser(user)}
              className="px-2 py-1 text-white bg-red-500 rounded-md"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="submit"
        value="Submit List"
        className="px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer"
      />
    </form>
  );
};

export default CreateList;
