import React from 'react';
import './TimeChart.css';

const TimeChart = ({ data }) => {
    // Calculate total for percentage
    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    // Generate conic gradient string
    let currentDeg = 0;
    const gradientSegments = data.map(item => {
        const percent = item.value / total;
        const deg = percent * 360;
        const segment = `${item.color} ${currentDeg}deg ${currentDeg + deg}deg`;
        currentDeg += deg;
        return segment;
    });

    const gradientString = `conic-gradient(${gradientSegments.join(', ')})`;

    return (
        <div className="time-chart-container">
            <div className="chart-wrapper">
                <div className="pie-chart" style={{ background: gradientString }}>
                    <div className="chart-inner">
                        <div className="inner-text">
                            <span className="total-hours">8h</span>
                            <span className="total-label">Logged</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="chart-legend">
                {data.map(item => (
                    <div key={item.id} className="legend-item">
                        <div className="legend-dot" style={{ background: item.color }} />
                        <span className="legend-label">{item.label}</span>
                        <span className="legend-val">{Math.round((item.value / total) * 100)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeChart;
