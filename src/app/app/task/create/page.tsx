"use client";

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  taskTitle: string;
  description: string;
  evaluationState: 'not_started' | 'in_progress' | 'done';
  timeConstraints: string;
  taskLink: string;
  fileUpload: FileList;
}

const TaskForm: React.FC = () => {  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Submitted data:', data);
  };

  return (
    <div className='bg-black h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-8 rounded shadow-md w-2/4 h-3/4'>
        <div className='mb-4'>
          <label htmlFor="taskTitle" className='block text-gray-700'>Task Title</label>
          <input type="text" {...register('taskTitle')} id="taskTitle" className='form-input mt-1 block w-full border' />
        </div>
            
        <div className='mb-4'>
          <label htmlFor="description" className='block text-gray-700'>Description</label>
          <textarea {...register('description')} id="description" className='form-textarea mt-1 block w-full border borderline' />
        </div>

        <div className='mb-4'>
          <label htmlFor="evaluationState" className='block text-gray-700'>Evaluation State</label>
          <select {...register('evaluationState')} id="evaluationState" className='form-select mt-1 block w-full'>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor="timeConstraints" className='block text-gray-700'>Time Constraints</label>
          <input type="text" {...register('timeConstraints')} id="timeConstraints" className='form-input mt-1 block w-full border' />
        </div>

        <div className='mb-4'>
          <label htmlFor="taskLink" className='block text-gray-700'>Task Link</label>
          <input type="url" {...register('taskLink')} id="taskLink" className='form-input mt-1 block w-full border' />
        </div>

        <div className='mb-4'>
          <label htmlFor="fileUpload" className='block text-gray-700'>File Upload</label>
          <input type="file" {...register('fileUpload')} id="fileUpload" className='form-input mt-1 block w-full ' multiple />
        </div>
        <div className='flex justify-center items-center'>
        <button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
          Submit
        </button>

        </div>
      </form>
    </div>
  );
};

export default TaskForm;