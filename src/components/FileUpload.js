// src/components/invoice/FileUpload.js
import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const FileUpload = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelection(file);
  };

  const handleFileSelection = (file) => {
    if (file) {
      setUploadedFile(file);
      onFileUpload?.(file);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center min-h-[400px] transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <h2 className="text-lg font-semibold mb-2">Upload Your Invoice</h2>
      <p className="text-gray-500 mb-8">To auto-populate fields and save time</p>
      
      <div className="bg-blue-500 rounded-full p-8 mb-8">
        <div className="bg-white p-4 rounded-lg w-16 h-16 flex items-center justify-center">
          {uploadedFile ? (
            <div className="text-green-500 text-2xl">✓</div>
          ) : (
            <Upload className="text-blue-500" size={24} />
          )}
        </div>
      </div>

      <label className="cursor-pointer">
        <input
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          onChange={(e) => handleFileSelection(e.target.files[0])}
        />
        <div className="border rounded-lg px-4 py-2 mb-2 hover:bg-gray-50">
          <Upload className="inline-block mr-2" size={16} />
          Upload File
        </div>
      </label>
      <p className="text-sm text-blue-500">Click to upload</p>
      <p className="text-sm text-gray-500">or Drag and drop</p>
      
      {uploadedFile && (
        <div className="mt-4 text-sm text-gray-600">
          File uploaded: {uploadedFile.name}
        </div>
      )}
    </div>
  );
};

export default FileUpload;