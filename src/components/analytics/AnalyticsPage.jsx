import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { mockTrendData, mockCategoryData, generateHeatmapData } from '../../data/mockData';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
    const heatmapData = generateHeatmapData();

    return (
        <div className="analytics-page-container">
            <header className="page-header">
                <h1>Analytics</h1>
                <p className="subtitle">Quantify your progress.</p>
            </header>

            {/* 1. The Life Grid (Heatmap) */}
            <section className="analytics-section">
                <h2 className="section-title">Consistency Map (Last 365 Days)</h2>
                <div className="heatmap-container glass-panel">
                    <div className="heatmap-grid">
                        {heatmapData.map((day, idx) => (
                            <div
                                key={idx}
                                className={`heatmap-cell intensity-${day.intensity}`}
                                title={`${day.date}: Level ${day.intensity}`}
                            />
                        ))}
                    </div>
                    <div className="heatmap-legend">
                        <span>Less</span>
                        <div className="legend-cells">
                            <div className="heatmap-cell intensity-0"></div>
                            <div className="heatmap-cell intensity-1"></div>
                            <div className="heatmap-cell intensity-2"></div>
                            <div className="heatmap-cell intensity-3"></div>
                            <div className="heatmap-cell intensity-4"></div>
                        </div>
                        <span>More</span>
                    </div>
                </div>
            </section>

            <div className="analytics-charts-row">
                {/* 2. Productivity Trend */}
                <section className="analytics-section half-width glass-panel">
                    <h2 className="section-title">Weekly Focus Trend</h2>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={mockTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <XAxis
                                    dataKey="day"
                                    stroke="var(--text-3)"
                                    tick={{ fill: 'var(--text-3)', fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--bg-surface-1)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="var(--primary)"
                                    strokeWidth={3}
                                    dot={{ fill: 'var(--bg-body)', stroke: 'var(--primary)', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, fill: 'var(--accent)' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* 3. Category Balance */}
                <section className="analytics-section half-width glass-panel">
                    <h2 className="section-title">Life Balance</h2>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockCategoryData}>
                                <PolarGrid stroke="var(--bg-surface-3)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-2)', fontSize: 11 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar
                                    name="Performance"
                                    dataKey="A"
                                    stroke="var(--accent)"
                                    fill="var(--accent)"
                                    fillOpacity={0.4}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AnalyticsPage;
