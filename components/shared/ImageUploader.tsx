'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { db } from '@/db';
import { toast } from 'sonner';

export default function ImageUploader({ onImageChange }) {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef();

  const MAX_SIZE_MB = 500;
  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndPreview(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) validateAndPreview(file);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const validateAndPreview = (file) => {
    setError('');

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only PNG, JPG, and JPEG files are allowed.');
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError('File is too large. Max size is 500MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      if (onImageChange) {
        onImageChange(file); // Pass raw File object to parent
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview(null);
    setError('');
    fileInputRef.current.value = null;
    if (onImageChange) {
      onImageChange(null);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging ? 'bg-blue-50 border-blue-400' : 'bg-gray-200 border-gray-300'
        }`}
      >
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
          {isDragging
            ? <p className="text-gray-500">Drop the image here...</p>
            : preview
            ? <p className="text-gray-500">Click to replace the image</p>
            : <><div>Drag and drop files, or Browse</div><div>Support formats : png, jpg, jpeg.</div><div>Max size : 500Mb</div></>
           }
      </div>

      {error && (
        <p className="text-red-600 mt-3 text-center text-sm">{error}</p>
      )}

      {preview && (
        <div className="mt-6 text-center">
          <div className="relative w-full max-w-xs mx-auto aspect-[4/3]">
            <Image
              src={preview}
              alt="Image Preview"
              fill
              className="object-contain rounded-md shadow"
              unoptimized
            />
          </div>
          <button
            onClick={removeImage}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
}
