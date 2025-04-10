// SummaryPanel.tsx

import React, { useState } from 'react';
import {
    calculateCourseProgress,
    calculateComponentProgress,
    calculateCourseAverage,
    calculateEstimatedFinalGrade
} from '../utils/calculations';
import { motion, AnimatePresence } from 'framer-motion';

const SummaryPanel = ({ data, totalIncompleteTasks, urgentTasks }) => {
    const [showPanel, setShowPanel] = useState(false);
    const [expandedCourses, setExpandedCourses] = useState([]);

    if (!data || !Array.isArray(data.courses)) return null;

    const togglePanel = () => setShowPanel(prev => !prev);

    const toggleCourse = (courseId) => {
        setExpandedCourses(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    return (
        <div className="mt-2 flex flex-col items-center">
            {/* The button is centered and acts as a heading */}
            <button
                onClick={togglePanel}
                className="text-white bg-gray-800 hover:bg-gray-700 font-medium py-2 px-6 rounded-lg transition-colors duration-200 shadow-sm border border-gray-600"
            >
                {showPanel ? 'הסתר דו״ח הספקים' : 'הצג דו״ח הספקים'}
            </button>

            <AnimatePresence>
                {showPanel && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-800 text-white p-4 rounded-lg shadow w-full max-w-3xl mt-2"
                    >
                        <div className="flex justify-evenly mb-4 text-sm">
                            <div>
                                משימות שנותרו: <span className="font-bold">{totalIncompleteTasks}</span>
                            </div>
                            <div>
                                משימות דחופות: <span className="font-bold">{urgentTasks?.length || 0}</span>
                            </div>
                        </div>

                        {data.courses.map(course => {
                            const courseProgress = calculateCourseProgress(course);
                            const average = calculateCourseAverage(course);
                            const estimatedFinal = calculateEstimatedFinalGrade(course);
                            const expanded = expandedCourses.includes(course.id);

                            return (
                                <div key={course.id} className="bg-gray-700 p-3 mb-2 rounded">
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleCourse(course.id)}
                                    >
                                        <span className="font-bold text-sm" style={{ color: course.color || '#fff' }}>
                                            {course.name}
                                        </span>
                                        <span className="text-gray-200 text-xs">
                                            ממוצע: <b>{average}</b> | ציון משוער: <b>{estimatedFinal}</b>
                                        </span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <div className="w-full bg-gray-300 rounded-full h-2 mr-1">
                                            <div
                                                className="h-2 rounded-full"
                                                style={{ width: `${courseProgress}%`, backgroundColor: course.color }}
                                            />
                                        </div>
                                        <span className="text-xs font-medium">{courseProgress}%</span>
                                    </div>

                                    <AnimatePresence>
                                        {expanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-3 space-y-2 overflow-hidden"
                                            >
                                                {course.components.map(component => {
                                                    const compProg = calculateComponentProgress(component);
                                                    return (
                                                        <div key={component.id} className="text-xs">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span>{component.name}</span>
                                                                <span>{compProg}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-600 rounded-full h-1">
                                                                <div
                                                                    className="h-1 rounded-full"
                                                                    style={{ width: `${compProg}%`, backgroundColor: course.color }}
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SummaryPanel;
