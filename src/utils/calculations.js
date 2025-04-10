// utils/calculations.js

export const calculateCourseProgress = (course) => {
    const allTasks = course.components.flatMap(component => component.tasks);
    const total = allTasks.length;
    if (total === 0) return 0;
    const completed = allTasks.filter(task => task.completed).length;
    return Math.round((completed / total) * 100);
};


export const calculateCourseAverage = (course) => {
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

export const calculateEstimatedFinalGrade = (course) => {
    const taskAverage = calculateCourseAverage(course);
    if (taskAverage === "-") return "-";

    const finalExam = course.finalExams.find(exam => exam.grade !== null);
    if (!finalExam) {
        return Math.round((taskAverage * course.tasksWeight) / 100);
    }

    return Math.round((taskAverage * course.tasksWeight + finalExam.grade * finalExam.weight) / 100);
};

export const calculateComponentProgress = (component) => {
    const total = component.tasks.length;
    if (total === 0) return 0;
    const completed = component.tasks.filter(task => task.completed).length;
    return Math.round((completed / total) * 100);
};

