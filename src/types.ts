// types.ts

export type Task = {
    id: string;
    title: string;
    dueDate?: string;
    extension?: string;
    completed: boolean;
    [key: string]: any;
};

export type Component = {
    id: string;
    name: string;
    tasks: Task[];
};

export type FinalExam = {
    id: string;
    name: string;
    date: string;
    weight: number;
    grade: number | null;
};

export type Course = {
    id: string;
    name: string;
    color: string;
    components: Component[];
    finalExams: FinalExam[];
    tasksWeight: number;
};

export type AcademicData = {
    currentWeek: number;
    totalWeeks: number;
    courses: Course[];
};
