import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TasksGet, TasksSubmitted, isTaskValidating, markTaskasValidating, AwardMarks } from "@/lib/TaskOperations";

interface TaskValidationProps {
  domain: string;
}

const TaskValidation: React.FC<TaskValidationProps> = ({ domain }) => {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const [isValidationStarted, setIsValidationStarted] = useState<boolean>(false);
  const [TaskLists, setTaskLists] = useState<any[]>([]);
  const [submittedTasksList, setSubmittedTasksList] = useState<any[]>([]);
  const [taskData, settaskData] = useState<any>(null);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const fetchTaskData = async () => {
      var fetchedTaskLists = await TasksGet(domain);
      fetchedTaskLists = fetchedTaskLists.filter((task: any) => new Date(task.startDate) <= new Date());
      setTaskLists(fetchedTaskLists);
    };
    fetchTaskData();
  }, [domain]);


  const handleTaskClick = async (taskId: string) => {
    var submittedTasks = await TasksSubmitted(taskId);
    setSubmittedTasksList(submittedTasks);
    setSelectedTaskIndex(submittedTasks.length);
    setSelectedPerson(null);
  };

  const handlePersonClick = async (entry: any) => {
    setSelectedPerson(entry);
    const validationStatus = await isTaskValidating(entry.FactID, entry.taskId);
    setIsValidationStarted(validationStatus);
  };

  const startValidation = async (factId: string, taskId: string) => {
    await markTaskasValidating(factId, taskId);
    setIsValidationStarted(true);
  };

  const closeDrawer = () => {
    setSelectedPerson(null);
  };

  const downloadFile = async (filekey: string) => {
    const formData = new FormData();
    if (filekey !== null) {
      formData.append('filekey', filekey);
    }

    try {
      const response = await fetch('/api/getFile', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const fileBlob = await response.blob();
        const fileUrl = URL.createObjectURL(fileBlob);
        window.open(fileUrl);
      } else {
        console.error('Error getting file:', response.status);
      }
    } catch (error) {
      console.error('Error getting file:', error);
    }
  }


  return (
    <div className="lg:w-1/2 flex-1 border rounded-lg p-4 bg-slate-600 shadow-md flex">
      <div className="w-1/3 border-r p-4">
        <h1 className="text-white text-2xl text-center mb-5">Available Tasks to Evaluate</h1>
        <div className="grid grid-cols-1 gap-4">
          {TaskLists.map((task, index) => (
            <button
              key={index}
              onClick={() => {
                handleTaskClick(task.TaskId);
                settaskData(task);
              }}
              className="border rounded-lg p-4 bg-white shadow-md w-full"
            >
              <h3 className="font-bold">{task.task}</h3>
            </button>
          ))}
        </div>
      </div>

      <div className="w-2/3 p-4">
        {((selectedTaskIndex !== null) && ((selectedTaskIndex > 0))) && (
          <div>
            <h3 className="text-white text-xl mb-4">{taskData.task}</h3>
            <div className="bg-gray-200 p-4 rounded">
              <h4 className="font-bold">People who completed this task:</h4>

              {submittedTasksList.map((entry: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handlePersonClick(entry)}
                  className="border rounded-lg p-2 bg-white shadow-md w-full mt-2"
                >
                  {entry.FactID}
                </button>
              ))}
            </div>
          </div>
        )}
        {(selectedTaskIndex !== null && selectedTaskIndex === 0) && (
          <>
            <h3 className="text-white text-xl mb-4">{taskData.task}</h3>
            <h3 className="text-white text-xl">No one has submitted this task yet.</h3>
          </>
        )}
      </div>

      <Drawer open={selectedPerson !== null} onClose={closeDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Evaluation</DrawerTitle>
            <DrawerDescription>Evaluate the selected person's submission.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            {!isValidationStarted ? (
              <button
                className="bg-blue-500 text-white p-2 rounded mb-4"
                onClick={() => {
                  startValidation(selectedPerson.FactID, selectedPerson.taskId);
                }}
              >
                Start Validation
              </button>
            ) : (
              <>
                {selectedPerson && (<h3 className="font-bold text-black">Evaluating submission of {selectedPerson.FactID}</h3>)}
                <button className="bg-blue-500 text-white p-2 rounded mb-4" onClick={() => { downloadFile(taskData.fileKey) }} >Download Question File</button>
                <br />
                <button className="bg-blue-500 text-white p-2 rounded mb-4" onClick={() => { downloadFile(selectedPerson.Filekey) }} >Download Submitted File</button>
                <div className="mt-4">
                  <label className="block font-bold mb-2">Enter Points: (Maximum: {taskData.points})</label>
                  <input
                    type="number"
                    className="border rounded p-2 w-full"
                    placeholder="Enter points"
                    min="0"
                    max={taskData.points}
                    value={points}
                    onChange={(e) => { if ((e.target.value <= taskData.points) && (e.target.value >= "0")) setPoints(parseInt(e.target.value)) }}
                  />
                </div>
              </>
            )}
          </div>
          <DrawerFooter>
            <Button onClick={
              async () => {
                // console.log(selectedPerson.taskId, selectedPerson.FactID, points);
                await AwardMarks(selectedPerson.taskId, selectedPerson.FactID, points);
                closeDrawer();
              }}>Submit</Button>
            <DrawerClose asChild>
              <Button onClick={closeDrawer}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default TaskValidation;
