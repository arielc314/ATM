// WeekDetails.js
import React from 'react';

const WeekDetails = ({ week, data }) => {
    return (
        <div className="text-xs space-y-2">
            {data.courses.map(course =>
                course.components.map(component => {
                    const tasks = component.tasks.filter(task => task.week === week);
                    if (tasks.length === 0) return null;

                    return (
                        <div key={`${course.id}-${component.id}`}>
                            <div className="font-bold" style={{ color: course.color }}>
                                {course.name} - {component.name}
                            </div>
                            <ul className="list-disc pl-5">
                                {tasks.map(task => (
                                    <li key={task.id}>
                                        {component.name === "תרגילים" || component.name === "מטלות"
                                            ? `משימה #${task.serialNumber} - תאריך: ${task.dueDate}`
                                            : `שיעור #${task.serialNumber} - תאריך: ${task.date}`
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default WeekDetails;
