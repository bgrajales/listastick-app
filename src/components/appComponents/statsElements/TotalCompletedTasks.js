import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const TotalCompletedTasks = ({ todos }) => {
    
    const completed = todos.filter(t => t.completed)
    
    const data = [
        { name: 'Total', value: ((todos.length - 1) - (completed.length - 1)) },
        { name: 'Completed', value: completed.length - 1 }
    ];

    const COLORS = ['#0088FE', '#00C49F'];

    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        startAngle={0}
                        endAngle={360}
                        labelLine={false}
                        label={true}
                        innerRadius={50}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}
