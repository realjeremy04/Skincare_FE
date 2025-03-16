import React from "react";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-pink-200 h-screen fixed top-0 left-0 pt-24 px-4 flex flex-col gap-6">
      <div className="text-pink-800 font-semibold text-lg">Profile Menu</div>
      <ul className="flex flex-col gap-4">
        <li>
          <a
            href="#"
            className="text-pink-700 hover:text-pink-900 hover:bg-pink-300 p-2 rounded-md block"
          >
            Edit Profile
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-pink-700 hover:text-pink-900 hover:bg-pink-300 p-2 rounded-md block"
          >
            Settings
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-pink-700 hover:text-pink-900 hover:bg-pink-300 p-2 rounded-md block"
          >
            Friends
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-pink-700 hover:text-pink-900 hover:bg-pink-300 p-2 rounded-md block"
          >
            Logout
          </a>
        </li>
      </ul>
    </aside>
  );
};
