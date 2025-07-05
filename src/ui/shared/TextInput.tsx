import type { InputHTMLAttributes } from 'react';

// Reusable input with custom styling
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextInput = ({ label, ...props }: TextInputProps) => {
  return (
    <div className="mb-3">
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        className="w-full px-2 py-1.5 bg-white text-sm border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-clinicBlue focus:border-clinicBlue"
        {...props}
      />
    </div>
  );
};

export default TextInput;
