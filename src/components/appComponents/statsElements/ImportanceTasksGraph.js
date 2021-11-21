import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const ImportanceTasksGraph = ({ todos }) => {
    
    const high = todos.filter(t => t.priority === 'high').length;
    const medium = todos.filter(t => t.priority === 'mid').length;
    const low = todos.filter(t => t.priority === 'low').length;

    const data = [
        { name: 'Low', value: low },
        { name: 'Medium', value: medium },
        { name: 'High', value: high },
    ];

    const COLORS = ['#26C485', '#ffbe0a', '#dc3545'];

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
