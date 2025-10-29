import React from 'react';

interface NetWorthChartProps {
    data: number[];
}

const NetWorthChart: React.FC<NetWorthChartProps> = ({ data }) => {
    const width = 300;
    const height = 150;
    const padding = 20;

    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);

    const getX = (index: number) => padding + (index / (data.length - 1)) * (width - 2 * padding);
    const getY = (value: number) => height - padding - ((value - minVal) / (maxVal - minVal)) * (height - 2 * padding);

    const points = data.map((d, i) => `${getX(i)},${getY(d)}`).join(' ');
    
    const areaPoints = `${getX(0)},${height - padding} ${points} ${getX(data.length - 1)},${height - padding}`;

    // Y-axis labels
    const yLabels = Array.from({ length: 5 }, (_, i) => {
        const value = minVal + (i / 4) * (maxVal - minVal);
        return { value, y: getY(value) };
    });

    return (
        <div className="relative h-full w-full">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00f6ff" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#00f6ff" stopOpacity="0" />
                    </linearGradient>
                     <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#00f6ff" />
                    </linearGradient>
                </defs>

                {/* Y-axis grid lines and labels */}
                {yLabels.map(label => (
                    <g key={label.value}>
                        <line x1={padding} y1={label.y} x2={width - padding} y2={label.y} stroke="#334155" strokeWidth="0.5" />
                        <text x={padding - 5} y={label.y + 3} fill="#94a3b8" fontSize="8" textAnchor="end">
                            {`${(label.value / 100000).toFixed(1)}L`}
                        </text>
                    </g>
                ))}

                {/* Area fill */}
                <polygon points={areaPoints} fill="url(#areaGradient)" />

                {/* Line */}
                <polyline points={points} fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                {/* Last point circle */}
                <circle cx={getX(data.length - 1)} cy={getY(data[data.length - 1])} r="4" fill="#00f6ff" stroke="#0a102a" strokeWidth="2" />
            </svg>
        </div>
    );
};

export default NetWorthChart;