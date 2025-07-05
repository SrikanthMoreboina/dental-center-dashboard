import type { ReactNode } from 'react';

// Ultra-compact modal for forms with ensured visibility
interface DialogBoxProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const DialogBox = ({ isVisible, onClose, children }: DialogBoxProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-3">
      <div
        className="clinic-card max-w-md w-full max-h-[80vh] overflow-y-auto relative rounded-md bg-white shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-gray-600 hover:text-gray-800 z-10 text-sm"
        >
          ✕
        </button>
        <div className="p-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
