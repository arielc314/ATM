// generateTitle.js

const singularMap = {
    'תרגולים': 'תרגול',
    'תרגילים': 'תרגיל',
    'הרצאות': 'הרצאה',
    'מטלות': 'מטלה',
    'תרגולים פעילים': 'ת״פ'
};

const generateTitle = (componentName, serialNumber) => {
    const base = singularMap[componentName] || componentName;
    return `${base} ${serialNumber}`;
};

export default generateTitle;
