// src/components/common/Loading.js
import React from 'react';

const Loading = ({ fullScreen = true }) => {
  const loadingContent = (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {loadingContent}
      </div>
    );
  }

  return loadingContent;
};

export default Loading;