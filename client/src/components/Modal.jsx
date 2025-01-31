import React from "react";
import profile from "../assets/profile.png";
const Modal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null; // Do not render if modal is not open
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-80">
        <h2 className="text-xl font-semibold mb-2 text-center">User Details</h2>
        <img
          class="w-24 h-24 mb-3 rounded-full shadow-lg mx-auto"
          src={profile}
          alt="profile image"
        />
        <p class="text-center text-pretty">
          <strong>Username:</strong> {user.email.substring(0,8)}
        </p>
        <p class="text-center text-pretty">
          <strong>Email:</strong> {user.email}
        </p>

        {/* <p><strong>Other Details:</strong> {user.otherDetails}</p> */}
        <div class="flex items-center justify-center gap-8">
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-zinc-400 text-white rounded hover:bg-purple-700"
          >
            Close
          </button>
          <a href="/update">
            <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              Update Password
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
