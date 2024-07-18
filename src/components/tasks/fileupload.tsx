import React, { useState, useRef } from 'react';
import { FaUpload } from "react-icons/fa";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface FileUploadProps {
  taskid?: string;
  factid?: string;
}

const FileUpload: React.FC<FileUploadProps> = (data) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MySwal = withReactContent(Swal)

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

  const truncateFilename = (filename: string, maxWords = 3) => {
    const words = filename.split(' ');
    return words.length > maxWords
      ? `${words.slice(0, maxWords).join(' ')}...`
      : filename;
  };

  const handleUpload = async () => {
    if (!file) {
      MySwal.fire({
        title: "Failed !",
        text: "No file selected for upload.",
        icon: "error"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      MySwal.fire({
        title: "Failed !",
        text: "File size exceeds the maximum limit of 5MB.",
        icon: "error"
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    if (!data.factid || !data.taskid) {
      MySwal.fire({
        title: "Failed !",
        text: "No factid or taskid",
        icon: "error"
      });
    };

    try {
      const response = await fetch(`/api/upload/${data.factid}/${data.taskid}`, {
        method: 'POST',
        body: formData,
      });

      const reader = response.body?.getReader();
      const contentLength = response.headers.get('Content-Length');

      if (reader && contentLength) {
        const totalLength = parseInt(contentLength, 10);
        let receivedLength = 0;
        const chunks = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          chunks.push(value);
          receivedLength += value.length;
          setUploadProgress((receivedLength / totalLength) * 100);
        }
      }

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      alert((await response.json()).message);

      console.log('File uploaded successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setFile(null);
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
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col justify-center items-center h-60 w-80 border-2 border-dashed rounded-lg ${file || isDraggingOver ? 'border-green-500 ' : 'border-red-500 '
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
              <div className="truncate">{truncateFilename(file.name)}</div>
            </div>
          ) : (

            <div className="text-blue-500" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
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

      {file && (
        <button className='text-blue-700 mt-6' onClick={handleUpload}>
          Submit
        </button>
      )}

      {/* button to clear the uploaded data */}

      {file && (
        <button
          className="text-red-700 mt-6"
          style={{ marginLeft: '10px' }}
          onClick={() => setFile(null)}
        >
          Clear
        </button>
      )}

      {uploadProgress > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Upload Progress</h2>
          <progress value={uploadProgress} max="100" />
          <p>{Math.round(uploadProgress)}%</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
