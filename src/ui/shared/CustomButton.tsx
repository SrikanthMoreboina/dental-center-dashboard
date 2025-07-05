import type { ButtonHTMLAttributes } from 'react';

// Ultra-compact button with ensured visibility
interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const CustomButton = ({
  className = '',
  children,
  ...props
}: CustomButtonProps) => {
  return (
    <button
      className={`px-2 py-1 rounded-sm transition-all duration-200 border border-gray-500 bg-white text-black hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
