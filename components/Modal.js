"use client";

import { X } from "lucide-react";
import Button from "./Button";

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-[95vw] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-card-hover">
          <h3 className="text-lg sm:text-xl font-semibold truncate pr-3">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="touch-target text-secondary hover:text-foreground flex-shrink-0 p-2 rounded-lg hover:bg-card-hover transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 sm:p-5 lg:p-6">{children}</div>
        {footer && (
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 p-4 sm:p-5 border-t border-card-hover">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
