"use client";

import { X } from "lucide-react";
import Button from "./Button";

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-card-hover">
          <h3 className="text-base sm:text-lg font-semibold truncate pr-2">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-secondary hover:text-foreground flex-shrink-0 p-1"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-3 sm:p-4">{children}</div>
        {footer && (
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 p-3 sm:p-4 border-t border-card-hover">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
