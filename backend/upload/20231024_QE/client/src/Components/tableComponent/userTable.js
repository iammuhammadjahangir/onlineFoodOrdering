import React from 'react';
import moment from 'moment';
const UserTable = ({ userData, columns }) => {
    const getColumnValue = (user, field, format, render) => {
        if (format === 'date' || format === 'time' || format === 'bool') {
          return renderDateValue(user, field, format);
        } else if (field.includes('.')) {
          // Handle nested fields
          const nestedFields = field.split('.');
          let value = user;
          for (const nestedField of nestedFields) {
            if (value && value.hasOwnProperty(nestedField)) {
              value = value[nestedField];
            } else {
              value = ''; // Handle the case where a nested field is missing
              break;
            }
          }
          return value;
        } else {
          return user[field];
        }
      };
      
      // Function to render date values using moment.js
      const renderDateValue = (user, field, format) => {
        const date = user[field];
      
        if (!date) {
          return ''; // Handle the case where the date is undefined or null
        }
      
        if (format === 'date') {
          return moment(date).format('YYYY-MM-DD');
        } else if (format === 'time') {
          return moment(date).format('HH:mm:ss');
        } else if (format === 'bool') {
          // Example: return 'Yes' for true, 'No' for false
          return user[field] ? 'Yes' : 'No';
        }
      
        return ''; // Handle unsupported formats or return an empty string
      };
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.field}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {userData.map((user) => (
          <tr key={user._id}>
            {columns.map((column) => (
              <td key={column.field}>
                      {/* {getColumnValue(user, column.field, column.format, column.render)} */}
                {column.render ? column.render(user) : getColumnValue(user, column.field, column.format, column.render)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
