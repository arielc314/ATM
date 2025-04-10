import React from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSelectDate: (date: Date) => void;
    availableDates: Date[];
};

function DatePickerModal({ isOpen, onClose, onSelectDate, availableDates }: Props) {
    if (!isOpen) return null;

    // Function to handle date selection while ensuring timezone consistency
    const handleDateSelect = (date: Date) => {
        // Create a new date to avoid timezone issues
        const selectedDate = new Date(date);
        // Ensure we're working with the local date by resetting hours
        selectedDate.setHours(12, 0, 0, 0);
        onSelectDate(selectedDate);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-lg font-semibold mb-4 text-center">בחר תאריך למשימה</h2>
                <ul className="space-y-2">
                    {availableDates.map((date, idx) => (
                        <li key={idx}>
                            <button
                                className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
                                onClick={() => handleDateSelect(date)}
                            >
                                {date.toLocaleDateString('he-IL', {
                                    weekday: 'long',
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 flex justify-center">
                    <button
                        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={onClose}
                    >
                        ביטול
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DatePickerModal;