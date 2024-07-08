"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TaskCreate } from '@/lib/TaskOperations';

interface FormData {
  taskTitle: string;
  description: string;
  startDate: string;
  deadline: string;
  Duration: number;
  domain: "physical" | "digital" | "common";
  points: number;
  file: File;
}

const TaskForm: React.FC = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {

    const formData = new FormData();
    if (file) {
      formData.append('file', file as File);
    }
    formData.append('taskTitle', data.taskTitle);
    formData.append('description', data.description);
    formData.append('startDate', data.startDate);
    formData.append('deadline', data.deadline);
    formData.append('Duration', data.Duration.toString());
    formData.append('domain', data.domain);
    formData.append('points', data.points.toString());
    formData.append("creator", window.localStorage.getItem("factId") as string);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMessage(data.message);
        // setMessage('File uploaded successfully!');
      } else {
        setMessage('Some error occured.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file.');
    }

    // console.log('Submitted data:', data);
    // var result = await TaskCreate(data.taskTitle, data.description, data.points, data.domain, data.startDate, data.deadline, data.Duration.toString());
    // setResult(result);
  };

  const isStartDateValid = !errors.startDate;
  const isDurationValid = !errors.Duration;


  return (
    <div className='bg-black h-screen flex items-start justify-center pt-8'>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-8 rounded shadow-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/4'>
        <div className='mb-4'>
          <label htmlFor="taskTitle" className='block text-gray-700'>Task Title</label>
          <input type="text" required {...register('taskTitle')} id="taskTitle" className='form-input mt-1 block w-full border' />
        </div>

        <div className='mb-4'>
          <label htmlFor="description" className='block text-gray-700'>Description</label>
          <textarea {...register('description')} required id="description" className='form-textarea mt-1 block w-full border borderline' />
        </div>

        <div className='mb-4'>
          <label htmlFor="points" className='block text-gray-700'>Points</label>
          <input
            type="number"
            {...register('points', {
              validate: (value: number) => value > 0 || 'Points should be a positive number'
            })}
            id="points"
            className={`form-input mt-1 block w-full border ${errors.points ? 'border-red-500' : ''}`}
          />
          {errors.points && <p className='text-red-500'>{errors.points.message}</p>}
        </div>

        <div className='mb-4'>
          <label htmlFor="domain" className='block text-gray-700'>Domain</label>
          <select required {...register('domain')} id="domain" className='form-select mt-1 block w-full border'>
            <option value="">Select...</option>
            <option value="physical">Physical</option>
            <option value="digital">Digital</option>
            <option value="common">Common</option>
          </select>
        </div>

        <div className='mb-4'>
          <label htmlFor="StartDate" className='block text-gray-700'>Task Start</label>
          <input
            type="date"
            {...register('startDate', {
              validate: (value: string) => new Date(value) > new Date() || 'Start date should be in the future'
            })}
            id="StartDate"
            className={`form-input mt-1 block w-full border ${!isStartDateValid ? 'border-red-500' : ''}`}
          />
          {errors.startDate && <p className='text-red-500'>{errors.startDate.message}</p>}
        </div>

        <div className='mb-4'>
          <label htmlFor="Duration" className='block text-gray-700'>Duration (Days)</label>
          <input
            type="number"
            {...register('Duration', {
              validate: (value: number) => value > 0 || 'Duration should be a positive number'
            })}
            id="Duration"
            className={`form-input mt-1 block w-full border ${!isDurationValid ? 'border-red-500' : ''}`}
          />
          {errors.Duration && <p className='text-red-500'>{errors.Duration.message}</p>}
        </div>

        <div className='mb-4'>
          <label htmlFor="Deadline" className='block text-gray-700'>Deadline</label>
          <input
            type="date"
            {...register('deadline', {
              validate: (value: string) => new Date(value) > new Date(watch('startDate')) || 'Deadline should be after the start date'
            })}
            id="Deadline"
            className={`form-input mt-1 block w-full border ${errors.deadline ? 'border-red-500' : ''}`}
          />
          {errors.deadline && <p className='text-red-500'>{errors.deadline.message}</p>}
        </div>

        <input type="file" name="TaskFile" onChange={handleFileChange} />

        {result && <p className='text-green-500'>The created task ID is {result}</p>}
        {message && <p>{message}</p>}

        <div className='flex justify-center items-center'>
          <button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
            Submit
          </button>
        </div>
      </form >
    </div >
  );
};

export default TaskForm;