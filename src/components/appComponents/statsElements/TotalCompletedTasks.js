import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const TotalCompletedTasks = ({ todos }) => {
    
    const completed = todos.filter(t => t.completed)
    
    const data = [
        { name: 'Incomplete', value: ((todos.length - 1) - (completed.length - 1)) },
        { name: 'Completed', value: completed.length - 1 }
    ];

    const COLORS = ['#0088FE', '#26C485'];

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

            <div className="stats__infoDiv">
                <h3>Tasks</h3>
                <div className="stats__numbers">

                    <div>
                        <h4>Total</h4>
                        <span>{todos.length}</span>
                    </div>
                    <div className="stats__completed stats__marker">
                        <h4>Completed</h4>
                        <span>{completed.length}</span>
                    </div>
                    <div className="stats__incomplete stats__marker">
                        <h4>Incomplete</h4>
                        <span>{(todos.length) - (completed.length)}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
