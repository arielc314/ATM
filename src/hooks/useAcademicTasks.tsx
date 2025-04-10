import { useState, useEffect } from 'react';
import { initialData } from "../components/data/initialData";
import generateTitle from '../utils/generateTitle';
import { getTaskDate } from '../utils/dateUtils';
import { AcademicData, Course, Component, Task } from '../types';

type UrgentTask = { course: Course; component: Component; task: Task };

const useAcademicTasks = () => {
  const [data, setData] = useState(() => ({ ...initialData }) as AcademicData);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetData = () => {
    const resetData: AcademicData = {
      ...initialData,
      courses: initialData.courses.map(course => ({
        ...course,
        components: course.components.map(component => ({
          ...component,
          tasks: [],
        })),
        finalExams: course.finalExams.map(exam => ({
          ...exam,
          grade: null,
        })),
      })),
    };
    setData(resetData);
    setShowResetConfirm(false);
    localStorage.removeItem("academicTasksData");
  };

  const getUrgentTasks = (): UrgentTask[] => {
    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);

    const urgentTasks: UrgentTask[] = [];

    data.courses.forEach(course => {
      course.components.forEach(component => {
        component.tasks.forEach(task => {
          const dueDate = task.extension || task.dueDate;
          if (dueDate && !task.completed) {
            const due = new Date(dueDate);
            if (due >= now && due <= nextWeek) {
              urgentTasks.push({ course, component, task });
            }
          }
        });
      });
    });

    return urgentTasks;
  };

  const updateSerialNumbers = (courseId, componentId) => {
    setData(prevData => {
      const updated = { ...prevData };

      updated.courses.forEach(course => {
        if (course.id !== courseId) return;

        course.components.forEach(component => {
          if (component.id !== componentId) return;

          component.tasks = component.tasks
            .slice()
            .sort((a, b) => new Date(getTaskDate(a)).getTime() - new Date(getTaskDate(b)).getTime())
            .map((task, index) => ({
              ...task,
              serialNumber: index + 1,
              title: generateTitle(component.name, index + 1),
            }));
        });
      });

      return updated;
    });
  };


  const allWeeks = Array.from({ length: data.totalWeeks }, (_, i) => i + 1);

  const totalIncompleteTasks = data.courses.reduce((total, course) => {
    return total + course.components.reduce((sum, comp) => {
      return sum + comp.tasks.filter(task => !task.completed).length;
    }, 0);
  }, 0);

  useEffect(() => {
    const saved = localStorage.getItem("academicTasksData");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("academicTasksData", JSON.stringify(data));
  }, [data]);

  return {
    data,
    setData,
    showResetConfirm,
    setShowResetConfirm,
    handleResetData,
    getUrgentTasks,
    allWeeks,
    totalIncompleteTasks,
    updateSerialNumbers,
  };
};

export default useAcademicTasks;