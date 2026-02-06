
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Employee, Department } from '../types';

interface Props {
  employees: Employee[];
}

const COLORS = ['#00B5B5', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#f43f5e'];

export const Dashboard: React.FC<Props> = ({ employees }) => {
  const deptData = Object.values(Department).map(dept => ({
    name: dept,
    value: employees.filter(e => e.department === dept).length
  })).filter(d => d.value > 0);

  const skillCounts: Record<string, number> = {};
  employees.forEach(e => e.skills.forEach(s => skillCounts[s] = (skillCounts[s] || 0) + 1));
  const skillsData = Object.entries(skillCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value).slice(0, 5);

  if (employees.length === 0) {
    return (
      <div className="glass-panel p-24 rounded-[3rem] text-center max-w-2xl mx-auto">
        <i className="fas fa-chart-line text-6xl text-[#00B5B5]/10 mb-6"></i>
        <h2 className="text-2xl font-bold text-white">System Data Offline</h2>
        <p className="text-gray-500 mt-2 font-medium">Synchronize agent records to initialize analytics.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Agents" value={employees.length} icon="fa-user-ninja" glow="#00B5B5" />
        <StatCard title="Division Groups" value={deptData.length} icon="fa-layer-group" glow="#8b5cf6" />
        <StatCard title="Capability Core" value={Object.keys(skillCounts).length} icon="fa-bolt" glow="#f59e0b" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-10 rounded-[2.5rem] h-[450px]">
          <h3 className="text-xl font-black text-white mb-8 flex items-center">
            <span className="w-2 h-2 bg-[#00B5B5] rounded-full mr-3 animate-pulse"></span>
            Division Allocation
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie data={deptData} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value">
                {deptData.map((_, index) => <Cell key={`c-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1A1C', border: '1px solid #00B5B5', borderRadius: '1rem', color: '#fff' }}
                itemStyle={{ color: '#00B5B5' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel p-10 rounded-[2.5rem] h-[450px]">
          <h3 className="text-xl font-black text-white mb-8 flex items-center">
             <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 animate-pulse"></span>
             Network Capability
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={skillsData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={120} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
              <Tooltip cursor={{fill: 'rgba(0,181,181,0.05)'}} contentStyle={{ backgroundColor: '#1A1A1C', border: '1px solid #00B5B5', borderRadius: '1rem' }} />
              <Bar dataKey="value" fill="#00B5B5" radius={[0, 10, 10, 0]} barSize={25} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{title: string, value: number, icon: string, glow: string}> = ({title, value, icon, glow}) => (
  <div className="glass-panel p-8 rounded-[2rem] relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-20 -mr-12 -mt-12 transition-all group-hover:opacity-40" style={{backgroundColor: glow}}></div>
    <div className="flex items-center space-x-6 relative z-10">
      <div className="w-14 h-14 rounded-2xl bg-[#1A1A1C] border border-white/5 flex items-center justify-center text-white text-xl" style={{color: glow}}>
        <i className={`fas ${icon}`}></i>
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{title}</p>
        <h4 className="text-3xl font-black text-white">{value}</h4>
      </div>
    </div>
  </div>
);
