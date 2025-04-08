import React, { useState, useEffect } from 'react';
import { Bell, Check, Clock } from 'lucide-react';

// מבנה נתונים ראשוני
const initialData = {
    currentWeek: 3,
    totalWeeks: 16,
    courses: [
        {
            id: 1,
            name: "אינפי 2",
            components: [
                { id: 1, name: "הרצאות", tasks: [] },
                { id: 2, name: "תרגולים", tasks: [] },
                { id: 3, name: "תרגילי בית", tasks: [] },
                { id: 4, name: "תרגול פעיל", tasks: [] }
            ],
            finalExams: [
                { id: 1, name: "מועד א'", date: "2025-07-01", weight: 70, grade: null },
                { id: 2, name: "מועד ב'", date: "2025-08-01", weight: 70, grade: null }
            ],
            tasksWeight: 30 // משקל המטלות והתרגילים בציון הסופי
        },
        {
            id: 2,
            name: "הסתברות",
            components: [
                { id: 1, name: "הרצאות", tasks: [] },
                { id: 2, name: "תרגולים", tasks: [] },
                { id: 3, name: "תרגילי בית", tasks: [] }
            ],
            finalExams: [
                { id: 1, name: "מועד א'", date: "2025-07-10", weight: 70, grade: null },
                { id: 2, name: "מועד ב'", date: "2025-08-10", weight: 70, grade: null }
            ],
            tasksWeight: 30
        },
        {
            id: 3,
            name: "נאנד",
            components: [
                { id: 1, name: "הרצאות", tasks: [] },
                { id: 2, name: "תרגילים", tasks: [] }
            ],
            finalExams: [
                { id: 1, name: "מועד א'", date: "2025-07-15", weight: 80, grade: null },
                { id: 2, name: "מועד ב'", date: "2025-08-15", weight: 80, grade: null }
            ],
            tasksWeight: 20
        },
        {
            id: 4,
            name: "מבוא לתורת ההכרה",
            components: [
                { id: 1, name: "הרצאות", tasks: [] },
                { id: 2, name: "מטלות", tasks: [] }
            ],
            finalExams: [
                { id: 1, name: "עבודה סופית מועד א'", date: "2025-07-20", weight: 60, grade: null },
                { id: 2, name: "עבודה סופית מועד ב'", date: "2025-08-20", weight: 60, grade: null }
            ],
            tasksWeight: 40
        }
    ]
};

// פונקציה להוספת משימות דוגמה
const addSampleTasks = (data) => {
    // אינפי 2
    const calculus = data.courses[0];

    // הרצאות אינפי
    calculus.components[0].tasks.push(
        { id: 1, week: 1, serialNumber: 1, date: "2025-03-10", completed: true, grade: null },
        { id: 2, week: 1, serialNumber: 2, date: "2025-03-13", completed: true, grade: null },
        { id: 3, week: 2, serialNumber: 3, date: "2025-03-17", completed: true, grade: null },
        { id: 4, week: 2, serialNumber: 4, date: "2025-03-20", completed: true, grade: null },
        { id: 5, week: 3, serialNumber: 5, date: "2025-03-24", completed: false, grade: null },
        { id: 6, week: 3, serialNumber: 6, date: "2025-03-27", completed: false, grade: null }
    );

    // תרגולים אינפי
    calculus.components[1].tasks.push(
        { id: 1, week: 1, serialNumber: 1, date: "2025-03-12", completed: true, grade: null },
        { id: 2, week: 2, serialNumber: 2, date: "2025-03-19", completed: true, grade: null },
        { id: 3, week: 3, serialNumber: 3, date: "2025-03-26", completed: false, grade: null }
    );

    // תרגילי בית אינפי
    calculus.components[2].tasks.push(
        { id: 1, week: 1, serialNumber: 1, dueDate: "2025-03-19", completed: true, grade: 92, weight: 5 },
        { id: 2, week: 2, serialNumber: 2, dueDate: "2025-03-26", completed: true, grade: 88, weight: 5 },
        { id: 3, week: 3, serialNumber: 3, dueDate: "2025-04-02", completed: false, grade: null, weight: 5, extension: "2025-04-04" }
    );

    // תרגולים פעילים אינפי
    calculus.components[3].tasks.push(
        { id: 1, week: 1, serialNumber: 1, date: "2025-03-14", completed: true, grade: 95, weight: 5 },
        { id: 2, week: 2, serialNumber: 2, date: "2025-03-21", completed: true, grade: 90, weight: 5 },
        { id: 3, week: 3, serialNumber: 3, date: "2025-03-28", completed: false, grade: null, weight: 5 }
    );

    // הסתברות
    const probability = data.courses[1];

    // הרצאות הסתברות
    probability.components[0].tasks.push(
        { id: 1, week: 1, serialNumber: 1, date: "2025-03-11", completed: true, grade: null },
        { id: 2, week: 2, serialNumber: 2, date: "2025-03-18", completed: true, grade: null },
        { id: 3, week: 3, serialNumber: 3, date: "2025-03-25", completed: false, grade: null }
    );

    // תרגולים הסתברות
    probability.components[1].tasks.push(
        { id: 1, week: 1, serialNumber: 1, date: "2025-03-13", completed: true, grade: null },
        { id: 2, week: 2, serialNumber: 2, date: "2025-03-20", completed: true, grade: null },
        { id: 3, week: 3, serialNumber: 3, date: "2025-03-27", completed: false, grade: null }
    );

    // תרגילי בית הסתברות
    probability.components[2].tasks.push(
        { id: 1, week: 1, serialNumber: 1, dueDate: "2025-03-20", completed: true, grade: 85, weight: 10 },
        { id: 2, week: 2, serialNumber: 2, dueDate: "2025-03-27", completed: false, grade: null, weight: 10 },
        { id: 3, week: 3, serialNumber: 3, dueDate: "2025-04-03", completed: false, grade: null, weight: 10 }
    );

    // נאנד
    const nand = data.courses[2];

    // הרצאות נאנד
    nand.components[0].tasks.push(
        { id: 1, week: 1, serialNumber: 1, date: "2025-03-10", completed: true, grade: null },
        { id: 2, week: 1, serialNumber: 2, date: "2025-03-14", completed: true, grade: null },
        { id: 3, week: 3, serialNumber: 3, date: "2025-03-24", completed: false, grade: null }
    );

    // תרגילים נאנד
    nand.components[1].tasks.push(
        { id: 1, week: 1, serialNumber: 1, dueDate: "2025-03-21", completed: true, grade: 95, weight: 10 },
        { id: 2, week: 2, serialNumber: 2, dueDate: "2025-03-28", completed: false, grade: null, weight: 10 }
    );

    // מבוא לתורת ההכרה
    const cognition = data.courses[3];

    // הרצאות מבוא לתורת ההכרה
    cognition.components[0].tasks.push(
        { id: 1, week: 1, serialNumber: 1, date: "2025-03-12", completed: true, grade: null },
        { id: 2, week: 2, serialNumber: 2, date: "2025-03-19", completed: true, grade: null },
        { id: 3, week: 3, serialNumber: 3, date: "2025-03-26", completed: false, grade: null }
    );

    // מטלות מבוא לתורת ההכרה
    cognition.components[1].tasks.push(
        { id: 1, week: 2, serialNumber: 1, dueDate: "2025-03-26", completed: true, grade: 88, weight: 20 },
        { id: 2, week: 4, serialNumber: 2, dueDate: "2025-04-09", completed: false, grade: null, weight: 20 }
    );

    return data;
};

// פונקציה לחישוב זמן נותר (עבור תצוגת ספירה לאחור)
const getRemainingTime = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;

    if (diff <= 0) return "עבר הזמן!";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days} ימים ${hours} שעות`;
    if (hours > 0) return `${hours} שעות ${minutes} דקות`;
    return `${minutes} דקות`;
};

// האפליקציה הראשית
const AcademicTaskManager = () => {
    const [data, setData] = useState(() => addSampleTasks({ ...initialData }));
    const [selectedWeek, setSelectedWeek] = useState(data.currentWeek);

    // פונקציה לעדכון סטטוס השלמה של משימה
    const toggleTaskCompletion = (courseId, componentId, taskId) => {
        setData(prevData => {
            const newData = { ...prevData };
            const course = newData.courses.find(c => c.id === courseId);
            const component = course.components.find(c => c.id === componentId);
            const task = component.tasks.find(t => t.id === taskId);
            task.completed = !task.completed;
            return newData;
        });
    };

    // פונקציה לעדכון ציון של משימה
    const updateTaskGrade = (courseId, componentId, taskId, grade) => {
        setData(prevData => {
            const newData = { ...prevData };
            const course = newData.courses.find(c => c.id === courseId);
            const component = course.components.find(c => c.id === componentId);
            const task = component.tasks.find(t => t.id === taskId);
            task.grade = parseInt(grade, 10);
            return newData;
        });
    };

    // חישוב התקדמות בקורס
    const calculateCourseProgress = (course) => {
        let totalTasks = 0;
        let completedTasks = 0;

        course.components.forEach(component => {
            // מחשבים רק עבור רכיבים עם משימות כמו תרגילי בית ומטלות
            if (component.name === "תרגילי בית" || component.name === "תרגילים" || component.name === "מטלות" || component.name === "תרגול פעיל") {
                totalTasks += component.tasks.length;
                completedTasks += component.tasks.filter(task => task.completed).length;
            }
        });

        return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    };

    // חישוב ציון ממוצע בקורס (לפני מבחן סופי)
    const calculateCourseAverage = (course) => {
        let totalWeight = 0;
        let weightedSum = 0;

        course.components.forEach(component => {
            component.tasks.forEach(task => {
                if (task.completed && task.grade !== null && task.weight) {
                    totalWeight += task.weight;
                    weightedSum += task.grade * task.weight;
                }
            });
        });

        return totalWeight === 0 ? "-" : Math.round(weightedSum / totalWeight);
    };

    // חישוב ציון סופי משוער בקורס (כולל מבחן סופי אם יש)
    const calculateEstimatedFinalGrade = (course) => {
        const taskAverage = calculateCourseAverage(course);
        if (taskAverage === "-") return "-";

        // בדיקה אם יש כבר ציון במבחן הסופי
        const finalExam = course.finalExams.find(exam => exam.grade !== null);
        if (!finalExam) {
            // אם אין ציון במבחן, מציגים את הממוצע הנוכחי לפי משקל המטלות
            return Math.round((taskAverage * course.tasksWeight) / 100);
        }

        // אם יש ציון במבחן, משקללים את הציון הסופי
        return Math.round((taskAverage * course.tasksWeight + finalExam.grade * finalExam.weight) / 100);
    };

    // מציאת המשימות הדחופות (לפי תאריך הגשה ב-7 הימים הקרובים)
    const getUrgentTasks = () => {
        const now = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(now.getDate() + 7);

        const urgentTasks = [];

        data.courses.forEach(course => {
            course.components.forEach(component => {
                component.tasks.forEach(task => {
                    if ((task.dueDate || task.extension) && !task.completed) {
                        const dueDate = new Date(task.extension || task.dueDate);
                        if (dueDate >= now && dueDate <= nextWeek) {
                            urgentTasks.push({
                                course: course.name,
                                component: component.name,
                                task,
                                remainingTime: getRemainingTime(task.extension || task.dueDate)
                            });
                        }
                    }
                });
            });
        });

        return urgentTasks.sort((a, b) => {
            const dateA = new Date(a.task.extension || a.task.dueDate);
            const dateB = new Date(b.task.extension || b.task.dueDate);
            return dateA - dateB;
        });
    };

    // המרת תאריך לפורמט מקומי
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit' });
    };

    // בדיקה אם משימה דחופה (פחות מ-3 ימים להגשה)
    const isUrgent = (dateString) => {
        if (!dateString) return false;

        const now = new Date();
        const dueDate = new Date(dateString);
        const diffInDays = Math.floor((dueDate - now) / (1000 * 60 * 60 * 24));

        return diffInDays >= 0 && diffInDays < 3;
    };

    // רשימת השבועות לבחירה
    const weekOptions = Array.from({ length: data.totalWeeks }, (_, i) => i + 1);

    // שמירת הנתונים ב-LocalStorage בכל עדכון
    useEffect(() => {
        localStorage.setItem('academicTasksData', JSON.stringify(data));
    }, [data]);

    // טעינת נתונים מ-LocalStorage בעת טעינת האפליקציה
    useEffect(() => {
        const savedData = localStorage.getItem('academicTasksData');
        if (savedData) {
            try {
                setData(JSON.parse(savedData));
            } catch (error) {
                console.error('Error loading data from localStorage:', error);
            }
        }
    }, []);

    return (
        <div className="bg-gray-100 p-6 max-w-full overflow-x-auto font-sans" dir="rtl">
            <h1 className="text-2xl font-bold text-center mb-4">מנהל המשימות האקדמיות</h1>

            {/* בחירת שבוע */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <label className="ml-2 font-bold">שבוע: </label>
                    <select
                        value={selectedWeek}
                        onChange={(e) => setSelectedWeek(parseInt(e.target.value, 10))}
                        className="p-1 border rounded"
                    >
                        {weekOptions.map(week => (
                            <option key={week} value={week}>
                                {week === data.currentWeek ? `${week} (שבוע נוכחי)` : week}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="bg-white py-1 px-3 rounded-full border">
                    <span className="font-bold">שבוע נוכחי: {data.currentWeek} / {data.totalWeeks}</span>
                </div>
            </div>

            {/* טבלת משימות */}
            <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow border-2 border-gray-200 mb-6">
                    <thead>
                        <tr className="bg-blue-50">
                            <th className="py-3 px-2 border-b border-r">שבוע {selectedWeek}</th>
                            {data.courses.map(course => (
                                <th key={course.id} className="py-3 px-4 border-b border-r text-center" colSpan={course.components.length}>
                                    {course.name}
                                </th>
                            ))}
                        </tr>
                        <tr className="bg-gray-50">
                            <th className="py-2 px-2 border-b border-r"></th>
                            {data.courses.map(course =>
                                course.components.map(component => (
                                    <th key={`${course.id}-${component.id}`} className="py-2 px-3 border-b border-r">
                                        {component.name}
                                    </th>
                                ))
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-4 px-2 border-b border-r align-top">
                                שבוע {selectedWeek}
                            </td>

                            {data.courses.map(course =>
                                course.components.map(component => (
                                    <td key={`${course.id}-${component.id}`} className="py-2 px-2 border-b border-r align-top">
                                        <div className="space-y-3">
                                            {component.tasks
                                                .filter(task => task.week === selectedWeek)
                                                .map(task => (
                                                    <div
                                                        key={task.id}
                                                        className={`p-2 rounded ${isUrgent(task.dueDate || task.extension) && !task.completed
                                                                ? 'bg-red-50 border border-red-200'
                                                                : (task.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border')
                                                            }`}
                                                    >
                                                        <div className="flex justify-between items-start mb-1">
                                                            <div className="font-semibold">
                                                                {component.name === "הרצאות" || component.name === "תרגולים"
                                                                    ? `#${task.serialNumber} (${formatDate(task.date)})`
                                                                    : `#${task.serialNumber} להגשה: ${formatDate(task.dueDate)}`
                                                                }
                                                            </div>

                                                            {task.completed ? (
                                                                <Check size={18} className="text-green-500" />
                                                            ) : (
                                                                component.name !== "הרצאות" && component.name !== "תרגולים" && (
                                                                    <div className="flex items-center">
                                                                        <Clock size={16} className="text-red-500 ml-1" />
                                                                        <span className="text-xs text-red-500">
                                                                            {getRemainingTime(task.extension || task.dueDate)}
                                                                        </span>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>

                                                        {task.extension && (
                                                            <div className="text-xs text-blue-600 mb-1">
                                                                (הארכה עד {formatDate(task.extension)})
                                                            </div>
                                                        )}

                                                        <div className="flex items-center justify-between mt-1">
                                                            <div className="flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={task.completed}
                                                                    onChange={() => toggleTaskCompletion(course.id, component.id, task.id)}
                                                                    className="ml-2"
                                                                />
                                                                <label className="text-sm">הושלם</label>
                                                            </div>

                                                            {(component.name === "תרגילי בית" || component.name === "תרגילים" ||
                                                                component.name === "מטלות" || component.name === "תרגול פעיל") && (
                                                                    <div className="flex items-center">
                                                                        <label className="text-sm ml-1">ציון:</label>
                                                                        <input
                                                                            type="number"
                                                                            min="0"
                                                                            max="100"
                                                                            value={task.grade || ''}
                                                                            onChange={(e) => updateTaskGrade(course.id, component.id, task.id, e.target.value)}
                                                                            className="w-12 p-1 text-xs border rounded"
                                                                            placeholder="-"
                                                                        />
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </td>
                                ))
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* לוח מחוונים */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* סיכום קורסים */}
                <div className="bg-white p-4 rounded-lg shadow border">
                    <h2 className="text-lg font-bold mb-3">סיכום קורסים</h2>
                    <div className="space-y-4">
                        {data.courses.map(course => (
                            <div key={course.id} className="border-b pb-2">
                                <div className="flex justify-between mb-1">
                                    <h3 className="font-bold">{course.name}</h3>
                                    <span className="text-sm">
                                        ממוצע: <span className="font-bold">{calculateCourseAverage(course)}</span>
                                    </span>
                                </div>

                                <div className="flex items-center mb-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                        <div
                                            className="bg-blue-600 h-2.5 rounded-full"
                                            style={{ width: `${calculateCourseProgress(course)}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-medium">{calculateCourseProgress(course)}%</span>
                                </div>

                                <div className="text-sm text-gray-600">
                                    ציון משוער: <span className="font-bold">{calculateEstimatedFinalGrade(course)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* משימות דחופות */}
                <div className="bg-white p-4 rounded-lg shadow border">
                    <h2 className="text-lg font-bold mb-3">משימות דחופות (7 ימים הקרובים)</h2>
                    <div className="space-y-2">
                        {getUrgentTasks().length > 0 ? (
                            getUrgentTasks().map((item, index) => (
                                <div key={index} className="flex items-start p-2 border rounded bg-red-50">
                                    <Bell size={18} className="text-red-500 mt-1 ml-2" />
                                    <div>
                                        <div className="font-bold">{item.course} - {item.component} #{item.task.serialNumber}</div>
                                        <div className="text-sm">
                                            להגשה: {formatDate(item.task.extension || item.task.dueDate)}
                                            <span className="text-red-500 mr-2">({item.remainingTime})</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 p-4">
                                אין משימות דחופות בשבוע הקרוב - כל הכבוד!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicTaskManager;