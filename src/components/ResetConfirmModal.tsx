// ResetConfirmModal.tsx

import React from 'react';

const ResetConfirmModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-xl max-w-sm w-full">
                <h2 className="text-lg font-bold mb-2">אישור איפוס</h2>
                <p className="mb-4">האם אתה בטוח שברצונך למחוק את כל המשימות? פעולה זו אינה ניתנת לביטול.</p>
                <div className="flex justify-end space-x-2 space-x-reverse">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
                        onClick={onCancel}
                    >
                        בטל
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={onConfirm}
                    >
                        מחק הכל
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetConfirmModal;
