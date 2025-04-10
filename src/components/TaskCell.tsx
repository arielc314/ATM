import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { getTaskDate } from '../utils/dateUtils';
import generateTitle from '../utils/generateTitle';
import TaskItem from './TaskItem';
import DatePickerModal from './DatePickerModal.tsx';
import { getDatesOfWeek } from '../utils/getDatesOfWeek.ts';

// הגדרת הטיפוסים של הפרופס
interface TaskCellProps {
    course: any; // רצוי להגדיר טיפוס ספציפי יותר
    component: any; // רצוי להגדיר טיפוס ספציפי יותר
    week: number;
    onAddTask: (courseId: string, componentId: string, task: any) => void;
    onEditTask: (courseId: string, componentId: string, taskId: string, updatedTask: any) => void;
    onDeleteTask: (courseId: string, componentId: string, taskId: string) => void;
}

const TaskCell: React.FC<TaskCellProps> = ({ course, component, week, onAddTask, onEditTask, onDeleteTask }) => {
    const [hovered, setHovered] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTask, setEditedTask] = useState({});
    const [hoveredTaskId, setHoveredTaskId] = useState(null);
    const [activeTaskId, setActiveTaskId] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const tooltipTimeout = useRef(null);
    const cellRef = useRef(null);

    const tasks = [...component.tasks]
        .filter(task => task.week === week)
        .sort((a, b) => getTaskDate(a).localeCompare(getTaskDate(b)));

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (cellRef.current && !cellRef.current.contains(e.target as Node)) {
                setHovered(false);
                setHoveredTaskId(null);
                setActiveTaskId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!hovered) {
            setHoveredTaskId(null);
            setActiveTaskId(null);
        }
    }, [hovered]);

    const handleDateSelected = (date: Date) => {
        const serial = component.tasks.filter(t => t.week === week).length + 1;
        const newTask = {
            id: `${course.id}-${component.id}-${week}-${Date.now()}`,
            week,
            serialNumber: serial,
            title: generateTitle(component.name, serial),
            completed: false,
            note: '',
            ...(component.name === 'מטלות' || component.name === 'תרגילים'
                ? { dueDate: date.toISOString().split('T')[0] }
                : { date: date.toISOString().split('T')[0] }),
        };
        onAddTask(course.id, component.id, newTask);
        setShowDatePicker(false);
    };

    const availableDates = getDatesOfWeek(week);

    const weekRange = {
        start: availableDates[0]?.toISOString().split('T')[0],
        end: availableDates[6]?.toISOString().split('T')[0],
    };


    return (
        <td
            ref={cellRef}
            className="relative p-2 align-top border border-gray-200 bg-white transition"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                setHoveredTaskId(null);
                setActiveTaskId(null);
                if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
            }}
        >
            <div className="space-y-1">
                {tasks.map(task => (
                    <React.Fragment key={task.id}>
                        <TaskItem
                            task={task}
                            isEditing={editingTaskId === task.id}
                            hoveredTaskId={hoveredTaskId}
                            activeTaskId={activeTaskId}
                            editedTask={editedTask}
                            setEditedTask={setEditedTask}
                            setEditingTaskId={setEditingTaskId}
                            setHoveredTaskId={setHoveredTaskId}
                            setActiveTaskId={setActiveTaskId}
                            tooltipTimeout={tooltipTimeout}
                            onEditTask={onEditTask}
                            onDeleteTask={onDeleteTask}
                            component={component}
                            course={course}
                            weekRange={weekRange}
                        />
                    </React.Fragment>
                ))}
            </div>

            <div className="flex justify-center items-center mt-2">
                <button
                    className="text-gray-400 hover:text-green-600 transition"
                    onClick={() => setShowDatePicker(true)}
                >
                    <Plus size={16} />
                </button>
            </div>
            <DatePickerModal
                isOpen={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                onSelectDate={handleDateSelected}
                availableDates={availableDates}
            />
        </td>
    );
};

export default TaskCell;