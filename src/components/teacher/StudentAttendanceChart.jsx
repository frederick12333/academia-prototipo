import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const RED = '#C0392B';

const StudentAttendanceChart = () => {
  const data = [
    { week: '01', attendance: 60 },
    { week: '02', attendance: 75 },
    { week: '03', attendance: 85 },
    { week: '04', attendance: 78 },
    { week: '05', attendance: 72 },
    { week: '06', attendance: 95 },
    { week: '07', attendance: 98 },
    { week: '08', attendance: 85 },
    { week: '09', attendance: 65 },
    { week: '10', attendance: 82 },
    { week: '11', attendance: 88 },
    { week: '12', attendance: 55 },
  ];

  return (
    <div className="bg-white rounded-xl py-5 pl-0 pr-6">
      <div className="flex items-center justify-between mb-4 px-6">
        <h3 className="text-base font-semibold text-gray-900">Asistencia semanal de alumnos</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: RED }} />
          <span className="text-sm text-gray-600">Semana con mayor asistencia</span>
          <span className="text-sm font-bold text-gray-900">07</span>
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
            />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
              formatter={(value) => [`${value}%`, 'Asistencia']}
            />
            <Line
              type="monotone"
              dataKey="attendance"
              stroke={RED}
              strokeWidth={2.5}
              dot={{ fill: RED, strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, fill: RED }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentAttendanceChart;
