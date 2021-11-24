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

            <div className="stats__infoDiv">
                <h3>Priority</h3>
                <div className="stats__numbers">

                    <div className="stats__high stats__marker">
                        <h4>High</h4>
                        <span>{high}</span>
                    </div>
                    <div className="stats__medium stats__marker">
                        <h4>Medium</h4>
                        <span>{medium}</span>
                    </div>
                    <div className="stats__low stats__marker">
                        <h4>Low</h4>
                        <span>{low}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
