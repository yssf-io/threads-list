// Modal.tsx
import React from "react";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Welcome!
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  This is a beta version of the app
                </p>
                <p className="text-sm mt-4 text-left text-gray-500">
                  You can only use it as a guest/anonymous user because
                  Threads/Insta does not yet support a way for third party apps
                  to login, but we're working on it!
                </p>
                <p className="text-sm mt-4 text-left text-gray-500">
                  This means that we don't have access to your following yet,
                  and your lists/preferences will be stored locally (on this
                  device).
                </p>

                <p className="text-sm mt-6 text-left text-gray-500">
                  Features on the roadmap:
                </p>
                <ul className="list-disc text-sm mt-3 text-left w-4/5 m-auto text-gray-500">
                  <li>Video & GIF support</li>
                  <li>Bookmarks</li>
                  <li>Ability to login (and get access to your following)</li>
                  <li>Ability to share lists</li>
                  <li>
                    Ability to import lists (from a CSV or from public lists)
                  </li>
                </ul>

                <p className="text-sm mt-6 text-left text-gray-500">
                  If you have feedback (or bugs), please reach out to me on{" "}
                  <a
                    className="text-blue-500"
                    href="https://threads.net/@yssf_io"
                  >
                    Threads
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              onClick={onClose}
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
