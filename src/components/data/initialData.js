// data/initialData.js

import { currentWeek } from "../../utils/currentWeek.js";

export const initialData = {
    semester: "B",
    currentYear: "2025",
    startSemester: '2025-03-20',
    endSemester: '2025-07-04',
    zeroWeek: "12",
    currentWeek: currentWeek - 12, // phasing
    totalWeeks: 16,
    courses: [
        {
            id: "1",
            name: "אינפי 2",
            color: "#4299e1",
            components: [
                { id: "1", name: "הרצאות", tasks: [] },
                { id: "2", name: "תרגולים", tasks: [] },
                { id: "3", name: "תרגילים", tasks: [] },
                { id: "4", name: "תרגולים פעילים", tasks: [] }
            ],
            finalExams: [
                { id: "1", name: "מועד א'", date: "2025-07-01", weight: 70, grade: null },
                { id: "2", name: "מועד ב'", date: "2025-08-01", weight: 70, grade: null }
            ],
            tasksWeight: 30
        },
        {
            id: "2",
            name: "הסתברות",
            color: "#48bb78",
            components: [
                { id: "1", name: "הרצאות", tasks: [] },
                { id: "2", name: "תרגולים", tasks: [] },
                { id: "3", name: "תרגילים", tasks: [] }
            ],
            finalExams: [
                { id: "1", name: "מועד א'", date: "2025-07-10", weight: 70, grade: null },
                { id: "2", name: "מועד ב'", date: "2025-08-10", weight: 70, grade: null }
            ],
            tasksWeight: 30
        },
        {
            id: "3",
            name: "נאנד",
            color: "#ed8936",
            components: [
                { id: "1", name: "הרצאות", tasks: [] },
                { id: "2", name: "תרגילים", tasks: [] }
            ],
            finalExams: [
                { id: "1", name: "מועד א'", date: "2025-07-15", weight: 80, grade: null },
                { id: "2", name: "מועד ב'", date: "2025-08-15", weight: 80, grade: null }
            ],
            tasksWeight: 20
        },
        {
            id: "4",
            name: "מבוא לתורת ההכרה",
            color: "#9f7aea",
            components: [
                { id: "1", name: "הרצאות", tasks: [] },
                { id: "2", name: "מטלות", tasks: [] }
            ],
            finalExams: [
                { id: "1", name: "עבודה סופית מועד א'", date: "2025-07-20", weight: 60, grade: null },
                { id: "2", name: "עבודה סופית מועד ב'", date: "2025-08-20", weight: 60, grade: null }
            ],
            tasksWeight: 40
        }
    ]
};
