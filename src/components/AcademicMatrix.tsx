// AcademicMatrix.tsx

import React, { useState, useRef } from 'react';
import TaskCell from './TaskCell.tsx';
import {
    generateWeeksBySundayToSaturday,
    formatWeekRange,
} from '../utils/dateUtils';

const AcademicMatrix = ({ data, onAddTask, onEditTask, onDeleteTask }) => {
    // Adjust these if the semester changes
    const startSemester = '2025-03-20';
    const endSemester = '2025-07-04';

    const weeks = generateWeeksBySundayToSaturday(startSemester, endSemester);

    // Hover state to show/hide the date range under the week label
    const [hoveredWeekIndex, setHoveredWeekIndex] = useState(null);
    const tooltipTimeout = useRef(null);

    return (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="w-full border-collapse table-fixed">
                <thead>
                    <tr>
                        <th className="sticky right-0 z-20 bg-gray-100 border px-2 py-2 text-center text-sm">
                            שבוע
                        </th>
                        {data.courses.map((course, cIdx) => (
                            <th
                                key={course.id}
                                colSpan={course.components.length}
                                className={`text-white text-sm px-2 py-2 border-l 
                  ${cIdx % 2 === 0
                                        ? 'bg-gray-800'
                                        : 'bg-gray-700'
                                    }`}
                                style={{ backgroundColor: course.color || '' }}
                            >
                                {course.name}
                            </th>
                        ))}
                    </tr>
                    <tr className="bg-gray-50">
                        <th className="sticky right-0 z-20 border px-2 py-1" />
                        {data.courses.map((course, cIdx) =>
                            course.components.map(component => (
                                <th
                                    key={`${course.id}-${component.id}`}
                                    className={`border px-2 py-1 text-xs font-medium text-center 
                    ${cIdx % 2 === 0
                                            ? 'bg-gray-50'
                                            : 'bg-gray-100'
                                        }`}
                                >
                                    {component.name}
                                </th>
                            ))
                        )}
                    </tr>
                </thead>

                <tbody>
                    {weeks.map(({ weekIndex, start, end }) => (
                        <tr
                            key={weekIndex}
                            className={`odd:bg-white even:bg-gray-50 transition-colors`}
                        >
                            <td
                                className="sticky right-0 z-10 border font-bold px-2 py-1 text-center bg-white relative"
                                onMouseEnter={() => {
                                    if (tooltipTimeout.current !== null) {
                                        clearTimeout(tooltipTimeout.current);
                                    }
                                    tooltipTimeout.current = setTimeout(() => {
                                        setHoveredWeekIndex(weekIndex);
                                    }, 200);
                                }}
                                onMouseLeave={() => {
                                    if (tooltipTimeout.current !== null) {
                                        clearTimeout(tooltipTimeout.current);
                                    }
                                    setHoveredWeekIndex(null);
                                }}
                            >
                                <div className="flex flex-col items-center">
                                    <span className="text-sm">שבוע {weekIndex}</span>

                                    {/* Date range line appears on hover */}
                                    {hoveredWeekIndex === weekIndex && (
                                        <div className="mt-1 marquee-container text-gray-500 text-[10px]">
                                            <div className="marquee-content">
                                                {/* משכפלים את הטקסט פעם או פעמיים */}
                                                <span className="marquee-text-dup">{formatWeekRange(start, end)}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>

                            {data.courses.map(course =>
                                course.components.map(component => (
                                    <React.Fragment key={`${course.id}-${component.id}-${weekIndex}`}>
                                        <TaskCell
                                            course={course}
                                            component={component}
                                            week={weekIndex}
                                            onAddTask={onAddTask}
                                            onEditTask={onEditTask}
                                            onDeleteTask={onDeleteTask}
                                        />
                                    </React.Fragment>
                                ))
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AcademicMatrix;