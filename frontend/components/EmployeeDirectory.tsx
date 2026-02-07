
import React, { useState } from 'react';
import { Employee } from '../types';
import { EmployeeService } from '../services/employee.service';

interface Props {
  employees: Employee[];
  onDelete: (id: string) => void;
}

export const EmployeeDirectory: React.FC<Props> = ({ employees, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = employees.filter(emp =>
    emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.district?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="glass-panel p-8 rounded-[2rem] border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center justify-between grow">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Active Agents</h2>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">Onboarding Registry: {employees.length} Records</p>
          </div>
          <button
            onClick={() => EmployeeService.exportEmployees()}
            className="px-6 py-3 bg-[#00B5B5]/10 border border-[#00B5B5]/30 text-[#00B5B5] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#00B5B5]/20 transition-all flex items-center"
          >
            <i className="fas fa-file-excel mr-2"></i>
            Export Registry
          </button>
        </div>
        <div className="relative group">
          <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-[#00B5B5]/40 group-focus-within:text-[#00B5B5] transition-colors"></i>
          <input
            type="text"
            placeholder="Search Network..."
            className="pl-14 pr-6 py-4 border border-white/5 bg-[#051A15] text-white rounded-[1.5rem] focus:ring-1 focus:ring-[#00B5B5]/50 outline-none w-full md:w-80 transition-all font-medium"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-panel rounded-[2rem] p-24 text-center">
          <i className="fas fa-ghost text-6xl text-[#00B5B5]/10 mb-6"></i>
          <h3 className="text-xl font-bold text-white">No matches detected</h3>
          <p className="text-gray-500 mt-2">Adjust your search parameters or register a new agent.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map(emp => (
            <div key={emp.id} className="glass-panel p-8 rounded-[2rem] hover:border-[#00B5B5]/40 transition-all group relative animate-fadeIn">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center space-x-5">
                  <div className="h-20 w-20 rounded-[1.5rem] bg-gradient-to-br from-[#051A15] to-black border border-white/10 flex items-center justify-center text-[#00B5B5] text-3xl font-black shadow-inner">
                    {emp.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{emp.fullName}</h3>
                    <p className="text-[#00B5B5] font-black text-[10px] uppercase tracking-widest">{emp.jobTitle}</p>
                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mt-0.5">{emp.department} Unit</p>
                  </div>
                </div>
                <button
                  onClick={() => onDelete(emp.id)}
                  className="w-10 h-10 rounded-xl bg-white/5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all"
                >
                  <i className="fas fa-trash-alt text-sm"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                    <p className="text-[9px] text-gray-500 font-black uppercase mb-2 tracking-widest">Connectivity</p>
                    <p className="text-xs text-white font-bold truncate">{emp.phone}</p>
                    <p className="text-[10px] text-[#00B5B5] font-black mt-2">Verified Uplink</p>
                  </div>
                  <div className="bg-black/40 p-4 rounded-2xl border border-white/5 text-right">
                    <p className="text-[9px] text-gray-500 font-black uppercase mb-2 tracking-widest">Origin Point</p>
                    <p className="text-xs text-white font-bold truncate">{emp.district}</p>
                    <p className="text-[10px] text-gray-500 font-black mt-2">{emp.country}</p>
                  </div>
                </div>

                <div className="p-4 bg-[#00B5B5]/5 border border-[#00B5B5]/20 rounded-2xl">
                  <p className="text-[9px] text-[#00B5B5] font-black uppercase mb-2 tracking-widest">Skill Architecture</p>
                  <div className="flex flex-wrap gap-2">
                    {emp.skills.slice(0, 4).map(skill => (
                      <span key={skill} className="px-2 py-1 bg-black/50 text-white text-[9px] font-black uppercase rounded-lg border border-white/5">
                        {skill}
                      </span>
                    ))}
                    {emp.skills.length > 4 && <span className="text-[9px] text-gray-500 font-bold pt-1">+{emp.skills.length - 4} more</span>}
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <SocialIcon href={emp.linkedIn} icon="fab fa-linkedin-in" />
                  <SocialIcon href={emp.leetCode} icon="fas fa-terminal" />
                  <SocialIcon href={emp.hackerRank} icon="fab fa-hackerrank" />

                  {emp.resumeName && (
                    <div className="ml-auto flex items-center space-x-2 text-[9px] font-black text-[#00B5B5] bg-[#00B5B5]/10 px-3 py-2 rounded-xl">
                      <i className="fas fa-file-invoice"></i>
                      <span className="uppercase tracking-widest">Asset Loaded</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SocialIcon: React.FC<{ href?: string, icon: string }> = ({ href, icon }) => (
  href ? (
    <a href={href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#00B5B5] hover:bg-[#00B5B5]/10 transition-all">
      <i className={`${icon} text-sm`}></i>
    </a>
  ) : null
);
