// components/TableBody.js

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TableBody = ({ data, allWeeks, expandedWeeks, toggleWeek }) => {
    const getTasksForWeekAndComponent = (week, component) =>
        component.tasks?.filter(task => task.week === week) || [];

    return (
        <tbody>
            {allWeeks.map(week => (
                <tr key={week} className={week === data.currentWeek ? "bg-blue-50" : week < data.currentWeek ? "bg-gray-50" : ""}>
                    {/* עמודת שבוע בצד ימין */}
                    <td
                        className={`py-1 px-2 border-b border-r font-bold sticky left-0 cursor-pointer ${week === data.currentWeek ? "bg-blue-100" : week < data.currentWeek ? "bg-gray-50" : "bg-white"
                            }`}
                        onClick={() => toggleWeek(week)}
                    >
                        <div className="flex items-center justify-between">
                            <span>שבוע {week}</span>
                            {expandedWeeks?.[week] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </div>
                        {week === data.currentWeek && (
                            <div className="text-xs font-normal text-blue-600">(נוכחי)</div>
                        )}
                    </td>

                    {/* כל התאים של רכיבים */}
                    {data.courses.flatMap(course =>
                        course.components.map(component => {
                            const tasks = getTasksForWeekAndComponent(week, component);
                            return (
                                <td
                                    key={`${week}-${course.id}-${component.id}`}
                                    className="py-1 px-1 border-b border-r align-top"
                                    style={{ backgroundColor: `${course.color}10` }}
                                >
                                    <div className="space-y-1">
                                        {tasks.map(task => (
                                            <div
                                                key={task.id}
                                                className={`p-1 rounded border text-xs ${task.completed
                                                        ? "bg-green-50 border-green-200"
                                                        : "bg-white border-gray-300"
                                                    }`}
                                            >
                                                <div>#{task.serialNumber}</div>
                                                {task.dueDate && <div>להגשה: {task.dueDate}</div>}
                                                {task.grade != null && <div>ציון: {task.grade}</div>}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            );
                        })
                    )}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;
