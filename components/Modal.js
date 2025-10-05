"use client";

import { X } from "lucide-react";
import Button from "./Button";

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="glass-card w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-bounce-in rounded-3xl">
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-border/20">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate pr-4">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="touch-target text-foreground-secondary hover:text-foreground flex-shrink-0 p-3 rounded-2xl hover:bg-surface-hover transition-all duration-200 focus-ring"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 sm:p-8 lg:p-10">{children}</div>
        {footer && (
          <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 p-6 sm:p-8 border-t border-border/20">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
