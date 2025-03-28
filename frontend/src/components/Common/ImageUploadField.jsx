import React, { useState } from 'react';

const ImageUploadField = ({ 
  label, 
  currentImageUrl, 
  onFileChange, 
  fieldName
}) => {
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || '');

  const handleFileChange = (e) => {
    console.log(e)
    const file = e.target.files[0];
    if (file) {
      onFileChange(fieldName, file);
      console.log(file)
      // Create a preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {previewUrl && (
        <div className="mt-2 mb-2">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="h-32 w-auto object-contain border rounded-md" 
          />
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-purple-50 file:text-purple-700
            hover:file:bg-purple-100"
        />
        
        {currentImageUrl && (
          <span className="text-xs text-gray-500 truncate max-w-xs">
            Current: {currentImageUrl.split('/').pop()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageUploadField;