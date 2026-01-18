import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { api } from '../../services/api';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [heatmapData, setHeatmapData] = useState([]);
    const [trendData, setTrendData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshots = await api.getAnalytics();
                setAnalyticsData(snapshots);

                // Process Data for Charts

                // 1. Trend Data (Last 7 snapshots or less)
                const recent = snapshots.slice(-7);
                const trends = recent.map(s => ({
                    day: new Date(s.date).toLocaleDateString('en-US', { weekday: 'short' }),
                    score: s.metrics.productivityScore
                }));
                setTrendData(trends);

                // 2. Category Data (Average from snapshots)
                if (snapshots.length > 0) {
                    // Sum up
                    const totals = { Work: 0, Health: 0, Growth: 0, Life: 0 };
                    snapshots.forEach(s => {
                        totals.Work += s.categoryDistribution.Work || 0;
                        totals.Health += s.categoryDistribution.Health || 0;
                        totals.Growth += s.categoryDistribution.Growth || 0;
                        totals.Life += s.categoryDistribution.Life || 0;
                    });
                    // Avgs
                    const count = snapshots.length;
                    const cats = [
                        { subject: 'Work', A: totals.Work / count, fullMark: 100 },
                        { subject: 'Health', A: totals.Health / count, fullMark: 100 },
                        { subject: 'Growth', A: totals.Growth / count, fullMark: 100 },
                        { subject: 'Life', A: totals.Life / count, fullMark: 100 },
                    ];
                    setCategoryData(cats);
                }

                // 3. Heatmap (365 days)
                // For now, we generate the grid but overlay our real data
                const grid = [];
                const today = new Date();
                // Create a lookup map for existing data
                const lookup = {};
                snapshots.forEach(s => {
                    lookup[s.date] = s.metrics.productivityScore;
                });

                for (let i = 364; i >= 0; i--) {
                    const d = new Date(today);
                    d.setDate(d.getDate() - i);
                    const dateStr = d.toISOString().split('T')[0];

                    let intensity = 0;
                    // If we have real data, use it
                    if (lookup[dateStr]) {
                        const score = lookup[dateStr];
                        if (score > 80) intensity = 4;
                        else if (score > 60) intensity = 3;
                        else if (score > 40) intensity = 2;
                        else intensity = 1;
                    }

                    grid.push({ date: dateStr, intensity });
                }
                setHeatmapData(grid);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="p-10 text-center">Loading Analytics...</div>;

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
                            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={categoryData}>
                                <PolarGrid stroke="var(--bg-surface-3)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-2)', fontSize: 11 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
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
