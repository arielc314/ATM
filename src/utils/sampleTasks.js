// utils/sampleTasks.js

export const addSampleTasks = (data) => {
    const calculus = data.courses[0];
    calculus.components[0].tasks.push(
        { id: 1, week: 1, serialNumber: 1, date: "2025-03-10", completed: true, grade: null },
        { id: 2, week: 1, serialNumber: 2, date: "2025-03-13", completed: true, grade: null },
        { id: 3, week: 2, serialNumber: 3, date: "2025-03-17", completed: true, grade: null },
        { id: 4, week: 2, serialNumber: 4, date: "2025-03-20", completed: true, grade: null },
        { id: 5, week: 3, serialNumber: 5, date: "2025-03-24", completed: true, grade: null },
        { id: 6, week: 3, serialNumber: 6, date: "2025-03-27", completed: true, grade: null },
        { id: 7, week: 4, serialNumber: 7, date: "2025-03-31", completed: true, grade: null },
        { id: 8, week: 4, serialNumber: 8, date: "2025-04-03", completed: true, grade: null },
        { id: 9, week: 5, serialNumber: 9, date: "2025-04-07", completed: false, grade: null }
    );
    calculus.components[1].tasks.push(
        { id: 1, week: 1, serialNumber: 1, date: "2025-03-12", completed: true, grade: null },
        { id: 2, week: 2, serialNumber: 2, date: "2025-03-19", completed: true, grade: null },
        { id: 3, week: 3, serialNumber: 3, date: "2025-03-26", completed: true, grade: null },
        { id: 4, week: 4, serialNumber: 4, date: "2025-04-02", completed: true, grade: null },
        { id: 5, week: 5, serialNumber: 5, date: "2025-04-09", completed: false, grade: null }
    );
    calculus.components[2].tasks.push(
        { id: 1, week: 1, serialNumber: 1, dueDate: "2025-03-19", completed: true, grade: 92, weight: 5 },
        { id: 2, week: 2, serialNumber: 2, dueDate: "2025-03-26", completed: true, grade: 88, weight: 5 },
        { id: 3, week: 3, serialNumber: 3, dueDate: "2025-04-02", completed: true, grade: 90, weight: 5 },
        { id: 4, week: 5, serialNumber: 4, dueDate: "2025-04-09", completed: false, grade: null, weight: 5 }
    );
    calculus.components[3].tasks.push(
        { id: 1, week: 1, serialNumber: 1, date: "2025-03-14", completed: true, grade: 95, weight: 5 },
        { id: 2, week: 2, serialNumber: 2, date: "2025-03-21", completed: true, grade: 90, weight: 5 },
        { id: 3, week: 3, serialNumber: 3, date: "2025-03-28", completed: true, grade: 88, weight: 5 },
        { id: 4, week: 4, serialNumber: 4, date: "2025-04-04", completed: true, grade: 92, weight: 5 }
    );

    const probability = data.courses[1];
    probability.components[0].tasks.push(
        { id: 1, week: 1, serialNumber: 1, date: "2025-03-11", completed: true, grade: null },
        { id: 2, week: 2, serialNumber: 2, date: "2025-03-18", completed: true, grade: null },
        { id: 3, week: 3, serialNumber: 3, date: "2025-03-25", completed: true, grade: null },
        { id: 4, week: 4, serialNumber: 4, date: "2025-04-01", completed: true, grade: null },
        { id: 5, week: 5, serialNumber: 5, date: "2025-04-08", completed: false, grade: null }
    );
    probability.components[1].tasks.push(
        { id: 1, week: 1, serialNumber: 1, date: "2025-03-13", completed: true, grade: null },
        { id: 2, week: 2, serialNumber: 2, date: "2025-03-20", completed: true, grade: null },
        { id: 3, week: 3, serialNumber: 3, date: "2025-03-27", completed: true, grade: null },
        { id: 4, week: 4, serialNumber: 4, date: "2025-04-03", completed: true, grade: null },
        { id: 5, week: 5, serialNumber: 5, date: "2025-04-10", completed: false, grade: null }
    );
    probability.components[2].tasks.push(
        { id: 1, week: 1, serialNumber: 1, dueDate: "2025-03-20", completed: true, grade: 85, weight: 10 },
        { id: 2, week: 2, serialNumber: 2, dueDate: "2025-03-27", completed: true, grade: 82, weight: 10 },
        { id: 3, week: 3, serialNumber: 3, dueDate: "2025-04-03", completed: false, grade: null, weight: 10 },
        { id: 4, week: 5, serialNumber: 4, dueDate: "2025-04-10", completed: false, grade: null, weight: 10 }
    );

    const nand = data.courses[2];
    nand.components[0].tasks.push(
        { id: 1, week: 1, serialNumber: 1, date: "2025-03-10", completed: true, grade: null },
        { id: 2, week: 1, serialNumber: 2, date: "2025-03-14", completed: true, grade: null },
        { id: 3, week: 3, serialNumber: 3, date: "2025-03-24", completed: true, grade: null },
        { id: 4, week: 5, serialNumber: 4, date: "2025-04-07", completed: false, grade: null }
    );
    nand.components[1].tasks.push(
        { id: 1, week: 1, serialNumber: 1, dueDate: "2025-03-21", completed: true, grade: 95, weight: 10 },
        { id: 2, week: 2, serialNumber: 2, dueDate: "2025-03-28", completed: true, grade: 90, weight: 10 },
        { id: 3, week: 5, serialNumber: 3, dueDate: "2025-04-11", completed: false, grade: null, weight: 10 }
    );

    const cognition = data.courses[3];
    cognition.components[0].tasks.push(
        { id: 1, week: 1, serialNumber: 1, date: "2025-03-12", completed: true, grade: null },
        { id: 2, week: 2, serialNumber: 2, date: "2025-03-19", completed: true, grade: null },
        { id: 3, week: 3, serialNumber: 3, date: "2025-03-26", completed: true, grade: null },
        { id: 4, week: 4, serialNumber: 4, date: "2025-04-02", completed: true, grade: null },
        { id: 5, week: 5, serialNumber: 5, date: "2025-04-09", completed: false, grade: null }
    );
    cognition.components[1].tasks.push(
        { id: 1, week: 2, serialNumber: 1, dueDate: "2025-03-26", completed: true, grade: 88, weight: 20 },
        { id: 2, week: 5, serialNumber: 2, dueDate: "2025-04-09", completed: false, grade: null, weight: 20 }
    );

    return data;
};