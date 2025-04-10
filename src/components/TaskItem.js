import React, { useState } from 'react';
import { Edit, Trash2, Save, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate, getTaskDate, setTaskDate } from '../utils/dateUtils';
import DatePickerModal from './DatePickerModal.tsx';
import { getDatesOfWeek } from '../utils/getDatesOfWeek.ts';



const TaskItem = ({
  task,
  isEditing,
  hoveredTaskId,
  activeTaskId,
  editedTask,
  setEditedTask,
  setEditingTaskId,
  setHoveredTaskId,
  setActiveTaskId,
  tooltipTimeout,
  onEditTask,
  onDeleteTask,
  component,
  course,
  weekRange
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const exitEditMode = () => {
    setEditingTaskId(null);
    setHoveredTaskId(null);
    setActiveTaskId(null);
  };

  const handleSave = () => {
    onEditTask(course.id, component.id, editedTask.id, editedTask);
    exitEditMode();
  };

  const handleCheckboxToggle = () => {
    onEditTask(course.id, component.id, task.id, {
      ...task,
      completed: !task.completed
    });
  };

  const handleDateSelected = (date) => {
    // Create a new date to ensure timezone consistency
    const selectedDate = new Date(date);
    // Set time to noon to avoid timezone issues
    selectedDate.setHours(12, 0, 0, 0);

    // Format date as YYYY-MM-DD for consistency
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setEditedTask(setTaskDate(editedTask, formattedDate));
    setShowDatePicker(false);
  };

  // Get available dates based on weekRange
  const getAvailableDatesForWeek = () => {
    if (!task.week && typeof task.week !== 'number') {
      console.error('Missing week number for task');
      return [];
    }
    return getDatesOfWeek(task.week);
  };

  const taskDate = getTaskDate(task);
  const dayOfWeek = taskDate
    ? new Date(taskDate).toLocaleDateString('he-IL', { weekday: 'long' })
    : '';

  const labelMap = {
    'הרצאות': 'התקיימה ב:',
    'תרגולים': 'התקיים ב:',
    'תרגולים פעילים': 'התקיים ב:',
    'תרגילים': 'להגשה עד:',
    'מטלות': 'להגשה עד:'
  };
  const typeLabel = labelMap[component?.name] || 'תאריך:';

  return (
    <div
      className="relative border rounded p-1 bg-gray-100 hover:shadow"
      onMouseEnter={() => {
        setActiveTaskId(task.id);
        clearTimeout(tooltipTimeout.current);
        tooltipTimeout.current = setTimeout(() => setHoveredTaskId(task.id), 400);
      }}
      onMouseLeave={() => {
        setActiveTaskId(null);
        clearTimeout(tooltipTimeout.current);
        setHoveredTaskId(null);
      }}
    >
      {isEditing ? (
        <div className="space-y-1 text-xs">
          <h2 className="text-sm font-bold text-center">{editedTask.title}</h2>
          <label className="block text-[11px] text-gray-700">{typeLabel}</label>

          {/* Date selector button instead of input */}
          <button
            onClick={() => setShowDatePicker(true)}
            className="w-full flex items-center justify-between border rounded px-2 py-1 text-[11px] bg-white hover:bg-gray-50"
          >
            <span>{getTaskDate(editedTask) ? formatDate(getTaskDate(editedTask)) : 'בחר תאריך'}</span>
            <Calendar size={12} />
          </button>

          <textarea
            className="w-full border rounded px-1 py-0.5 text-xs"
            rows={2}
            placeholder="הערה"
            value={editedTask.note || ''}
            onChange={(e) => setEditedTask({ ...editedTask, note: e.target.value })}
          />
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={editedTask.completed}
              onChange={(e) =>
                setEditedTask({ ...editedTask, completed: e.target.checked })
              }
              className="accent-green-600"
            />
            <span className="text-xs">סמן כהושלם</span>
          </div>
          <div className="flex justify-end space-x-1 space-x-reverse">
            <button onClick={handleSave} className="text-green-600 hover:text-green-800">
              <Save size={14} />
            </button>
            <button onClick={exitEditMode} className="text-gray-500 hover:text-red-600">
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-0.5 group relative">
          <div className="flex items-start justify-between gap-1">
            <label className="flex items-center gap-1 text-xs font-bold max-w-[120px]">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={handleCheckboxToggle}
                className="accent-green-600"
              />
              <span className="truncate">{task.title}</span>
            </label>
            {activeTaskId === task.id && (
              <div className="flex flex-col items-end gap-1">
                <button onClick={() => {
                  setEditingTaskId(task.id);
                  setEditedTask({ ...task });
                }} className="text-blue-600 hover:text-blue-800">
                  <Edit size={12} />
                </button>
                <button onClick={() => onDeleteTask(course.id, component.id, task.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={12} />
                </button>
              </div>
            )}
          </div>

          <AnimatePresence>
            {hoveredTaskId === task.id && task.note && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 0.85, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-1 px-3 py-2 bg-black/60 text-white text-[11px] rounded-lg shadow-xl max-w-[220px] whitespace-pre-wrap backdrop-blur-sm"
              >
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-black/60 rotate-45 -mt-1 z-0" />
                {task.note}
              </motion.div>
            )}
          </AnimatePresence>

          {dayOfWeek && (
            <div className="text-[10px] text-gray-400 leading-tight">
              {dayOfWeek}
            </div>
          )}
          <div className="text-[10px] text-gray-500">
            {formatDate(getTaskDate(task))}
          </div>
        </div>
      )}

      {/* Custom DatePicker Modal */}
      <DatePickerModal
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelectDate={handleDateSelected}
        availableDates={getAvailableDatesForWeek()}
      />
    </div>
  );
};

export default TaskItem;