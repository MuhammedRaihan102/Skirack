import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { Skill } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SkillProgressChartProps {
  skills: Skill[];
}

const SkillProgressChart: React.FC<SkillProgressChartProps> = ({ skills }) => {
  // Mock progress data - in a real app, this would come from the database
  const getRandomProgress = () => Math.floor(Math.random() * 100);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: number) => `${value}%`,
        },
      },
    },
  };
  
  const data = {
    labels: skills.map(skill => skill.name),
    datasets: [
      {
        label: 'Progress',
        data: skills.map(() => getRandomProgress()),
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
        borderRadius: 4,
      },
    ],
  };
  
  return (
    <div className="h-64">
      {skills.length > 0 ? (
        <Bar options={options} data={data} />
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">Add skills to see your progress chart</p>
        </div>
      )}
    </div>
  );
};

export default SkillProgressChart;