// AcademicTaskManager.tsx

import React from 'react';
import useAcademicTasks from '../hooks/useAcademicTasks.tsx';
import ResetConfirmModal from './ResetConfirmModal.tsx';
import SummaryPanel from './SummaryPanel.tsx';
import AcademicMatrix from './AcademicMatrix.tsx';

const AcademicTaskManager = () => {
    const {
        data,
        setData,
        showResetConfirm,
        setShowResetConfirm,
        handleResetData,
        totalIncompleteTasks,
        getUrgentTasks,
        updateSerialNumbers,
    } = useAcademicTasks();

    const handleAddTask = (courseId, componentId, newTask) => {
        setData(prev => {
            const copy = { ...prev };
            const course = copy.courses.find(c => c.id === courseId);
            if (!course) return prev;

            const component = course.components.find(c => c.id === componentId);
            if (!component) return prev;

            if (!component.tasks.some(t => t.id === newTask.id)) {
                component.tasks.push(newTask);
            }
            return copy;
        });
        updateSerialNumbers(courseId, componentId);
    };

    const handleEditTask = (courseId, componentId, taskId, updatedTaskOrArray) => {
        setData(prev => {
            const copy = { ...prev };
            const course = copy.courses.find(c => c.id === courseId);
            if (!course) return prev;

            const component = course.components.find(c => c.id === componentId);
            if (!component) return prev;

            if (taskId === null && Array.isArray(updatedTaskOrArray)) {
                component.tasks = updatedTaskOrArray;
            } else {
                const idx = component.tasks.findIndex(t => t.id === taskId);
                if (idx !== -1) component.tasks[idx] = updatedTaskOrArray;
            }
            return copy;
        });

        updateSerialNumbers(courseId, componentId);
    };

    const handleDeleteTask = (courseId, componentId, taskId) => {
        setData(prev => {
            const copy = { ...prev };
            const course = copy.courses.find(c => c.id === courseId);
            if (!course) return prev;

            const component = course.components.find(c => c.id === componentId);
            if (!component) return prev;

            component.tasks = component.tasks.filter(t => t.id !== taskId);
            return copy;
        });
        updateSerialNumbers(courseId, componentId);
    };

    return (
        <div className="p-4 relative">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-center font-serif text-3xl font-bold text-gray-800">
                    <span className="inline-block border-b-2 border-indigo-500 pb-1">Academic Tasks Manager</span>
                </h1>
                <p className="text-center text-gray-500 mt-2 text-sm font-light">Organize your academic schedule efficiently</p>
            </div>

            <SummaryPanel
                data={data}
                totalIncompleteTasks={totalIncompleteTasks}
                urgentTasks={getUrgentTasks()}
            />

            <div className="mt-4">
                <AcademicMatrix
                    data={data}
                    onAddTask={handleAddTask}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                />
            </div>

            <div className="flex justify-center mt-6">
                <button
                    onClick={() => setShowResetConfirm(true)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                    איפוס
                </button>
            </div>

            {showResetConfirm && (
                <ResetConfirmModal
                    onCancel={() => setShowResetConfirm(false)}
                    onConfirm={handleResetData}
                />
            )}

            {/* Floating action buttons, if you still want them */}
            <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
                <button
                    className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg"
                    title="הגדרות"
                >
                    ⚙️
                </button>
                <button
                    className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg"
                    title="צור קשר"
                >
                    📩
                </button>
                <button
                    className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg"
                    title="התחברות"
                >
                    🔐
                </button>
            </div>
        </div>
    );
};

export default AcademicTaskManager;