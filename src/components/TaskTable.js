import React from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';

const TaskTable = ({ data, expandedWeeks, toggleWeek, ...rest }) => {
    const allWeeks = Array.from({ length: data.totalWeeks }, (_, i) => i + 1);

    return (
        <div className="overflow-x-auto mb-2 max-h-[60vh] overflow-y-auto">
            <table className="w-full rounded-lg shadow border-2 border-gray-200 table-fixed text-xs">
                <TableHead data={data} />
                <TableHead weeks={allWeeks} components={data.courses?.[0]?.components || []} />

            </table>
        </div>
    );
};

export default TaskTable;
