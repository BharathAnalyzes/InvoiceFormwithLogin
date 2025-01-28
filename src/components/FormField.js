// src/components/common/FormField.js
import React from 'react';

const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  required, 
  error, 
  touched, 
  children, 
  ...props 
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children || (
        type === 'select' ? (
          <select
            name={name}
            className={`w-full border rounded-lg p-2 ${
              error && touched ? 'border-red-500' : 'border-gray-300'
            }`}
            {...props}
          >
            {props.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            className={`w-full border rounded-lg p-2 ${
              error && touched ? 'border-red-500' : 'border-gray-300'
            }`}
            {...props}
          />
        )
      )}
      {error && touched && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
};

export default FormField;