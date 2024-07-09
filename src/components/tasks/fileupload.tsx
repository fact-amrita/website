import React, { useState, useRef } from 'react';
import { FaUpload } from "react-icons/fa";

interface FileUploadProps {
  taskid?: string;
  factid?: string;
  onUpload?: (file: File, taskid: string, factid: string) => void;
}

const FileUpload: React.FC = (taskid, factid) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected for upload.');
      return;
    }

    const formData = new FormData(); // Use FormData for multipart file uploads
    formData.append('file', file); // Add the file to the FormData

    // Add taskid and factid if provided (optional)
    if (taskid) {
      formData.append('taskid', taskid);
    }
    if (factid) {
      formData.append('factid', factid);
    }

    try {
      // Send the FormData to your server using fetch or a library like Axios
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      // Handle successful upload (e.g., display success message)
      console.log('File uploaded successfully!');
      if (onUpload) {
        onUpload(file, taskid, factid); // Call the provided callback function
      }
    } catch (error) {
      console.error('Upload error:', error);
      // Handle upload errors (e.g., display error message)
    } finally {
      setFile(null); // Clear the selected file after upload
    }
  };


  return (
    <div className="App p-8">
      <input
        type="file"
        onChange={handleFileSelect}
        ref={fileInputRef}
        className="hidden" 
      />
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative flex flex-col justify-center items-center h-60 w-80 border-2 border-dashed rounded-lg ${
          file || isDraggingOver ? 'border-green-500 ' : 'border-red-500 '
        }`}
      >
        <div className="text-center">
          {file ? (
            <div className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <div className="truncate">{file.name}</div>
            </div>
          ) : (
                
            <div className="text-blue-500" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
                <FaUpload className="w-8 h-8 text-blue-400 mb-4" />
                Drag and drop a file here or click to browse
            </div>
        

          )}
        </div>
      </div>
      {file && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Uploaded File</h2>
          <p className="mt-2">{file.name}</p>
        </div>
      )}

        <button className='text-blue-700 mt-6' onClick={handleUpload}>
          Submit
        </button>
    </div>
  );
};

export default FileUpload;
