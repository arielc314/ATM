// TableHead.js
import React from 'react';
import { getDateRangeForWeek } from '../utils/dateUtils';

const TableHead = ({ weeks, components }) => {
    return (
        <thead>
            <tr>
                <th className="bg-gray-100 border p-2 text-center w-20">
                    שבוע
                </th>
                {weeks.map(week => (
                    <th key={week} className="bg-gray-100 border p-2 text-center w-20">
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-sm">שבוע {week}</span>
                            <span className="text-xs text-gray-500">{getDateRangeForWeek(week)}</span>
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;
