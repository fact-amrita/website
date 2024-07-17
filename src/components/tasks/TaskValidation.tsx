import React, { useState } from 'react';
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

const TaskLists = [
  {
    task: 'Task 1',
    people: [{ name: 'Person A' }, { name: 'Person B' }],
  },
  {
    task: 'Task 2',
    people: [{ name: 'Person C' }, { name: 'Person D' }],
  },
];

const TaskValidation = () => {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const [openPersonIndex, setOpenPersonIndex] = useState<number | null>(null);
  const [isValidationStarted, setIsValidationStarted] = useState<boolean>(false);


  const handleTaskClick = (index: number) => {
    setSelectedTaskIndex(selectedTaskIndex === index ? null : index);
    setOpenPersonIndex(null); 
  };

  const handlePersonClick = (index: number) => {
    setOpenPersonIndex(openPersonIndex === index ? null : index);
    setIsValidationStarted(false); 
  };

  const startValidation = () => {
    setIsValidationStarted(true);
  };

  const closeDrawer = () => {
    setOpenPersonIndex(null);
  };


  return (
    <div className="lg:w-1/2 flex-1 border rounded-lg p-4 bg-slate-600 shadow-md flex">
      <div className="w-1/3 border-r p-4">
        <h1 className="text-white text-2xl text-center mb-5">This is the Task List</h1>
        <div className="grid grid-cols-1 gap-4">
          {TaskLists.map((task, index) => (
            <button
              key={index}
              onClick={() => handleTaskClick(index)}
              className="border rounded-lg p-4 bg-white shadow-md w-full"
            >
              <h3 className="font-bold">{task.task}</h3>
            </button>
          ))}
        </div>
      </div>
      
      <div className="w-2/3 p-4">
        {selectedTaskIndex !== null && (
          <div>
            <h3 className="text-white text-xl mb-4">{TaskLists[selectedTaskIndex].task}</h3>
            <div className="bg-gray-200 p-4 rounded">
              <h4 className="font-bold">People who completed this task:</h4>
              {TaskLists[selectedTaskIndex].people.map((person, personIndex) => (
                <button
                  key={personIndex}
                  onClick={() => handlePersonClick(personIndex)}
                  className="border rounded-lg p-2 bg-white shadow-md w-full mt-2"
                >
                  {person.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Drawer open={openPersonIndex !== null} onClose={closeDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Evaluation</DrawerTitle>
            <DrawerDescription>Evaluate the selected person's submission.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            {!isValidationStarted ? (
              <button
                className="bg-blue-500 text-white p-2 rounded mb-4"
                onClick={startValidation}
              >
                Start Validation
              </button>
            ) : (
              <>
                <button className="bg-blue-500 text-white p-2 rounded mb-4">Download File</button>
                <div className="mt-4">
                  <label className="block font-bold mb-2">Enter Points:</label>
                  <input
                    type="number"
                    className="border rounded p-2 w-full"
                    placeholder="Enter points"
                  />
                </div>
              </>
            )}
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button  onClick={closeDrawer}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default TaskValidation;
