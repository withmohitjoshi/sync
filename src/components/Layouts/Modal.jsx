import { X } from "lucide-react";
import React from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  shouldCloseOnOutsideClick = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => shouldCloseOnOutsideClick && onClose()}
    >
      <div
        className="w-full max-w-md p-6 rounded-lg bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
