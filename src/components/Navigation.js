// src/components/invoice/Navigation.js
import React from 'react';

const Navigation = ({ activeSection, onSectionClick }) => {
  const sections = [
    { id: 'vendor', label: 'Vendor Details' },
    { id: 'invoice', label: 'Invoice Details' },
    { id: 'comments', label: 'Comments Details' }
  ];

  return (
    <div className="flex gap-6 border-b mb-8 justify-end">
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className={`pb-2 ${
            activeSection === section.id
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-600'
          }`}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
};

export default Navigation;