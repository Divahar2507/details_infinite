
import React, { useState, useEffect } from 'react';
import { EmployeeForm } from './components/EmployeeForm';
import { Employee } from './types';
import { EmployeeService } from './services/employee.service';

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await EmployeeService.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };

  const handleFormSubmit = async (newEmployee: Employee) => {
    try {
      // We can optionally remove the ID here if we want the backend to generate it,
      // but if the backend is configured to accept assigned UUIDs or use them, we can keep it.
      // For now, let's try sending it as is.
      const savedEmployee = await EmployeeService.createEmployee(newEmployee);
      setEmployees([...employees, savedEmployee]);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to create employee", error);
      // Optional: Show error to user
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col">
      {/* Branding Header */}
      <header className="w-full border-b border-white/5 bg-[#0A0A0B]/80 backdrop-blur-md py-4 sm:py-6 px-6 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <i className="fas fa-infinity text-2xl sm:text-3xl text-[#00B5B5] animate-pulse"></i>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#00B5B5] rounded-full"></div>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tighter uppercase leading-none">
                Infinite <span className="text-[#00B5B5]">Tech AI</span>
              </h1>
              <p className="text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Data Deployment Terminal</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Status: Operational</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-3xl transition-all duration-500">
          {!submitted ? (
            <EmployeeForm onSubmit={handleFormSubmit} />
          ) : (
            <div className="glass-panel p-10 sm:p-20 rounded-[2.5rem] text-center space-y-8 animate-fadeIn">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#00B5B5]/10 rounded-[2rem] border border-[#00B5B5]/30 flex items-center justify-center text-[#00B5B5] text-4xl mx-auto shadow-lg shadow-[#00B5B5]/10">
                <i className="fas fa-check-double"></i>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-black text-white">Protocol Complete</h2>
                <p className="text-gray-500 font-medium max-w-sm mx-auto">Your identity has been successfully synchronized with the Infinite Tech AI network.</p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-10 py-4 bg-[#1A1A1C] border border-white/5 text-[#00B5B5] text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-[#00B5B5]/10 transition-all"
              >
                New Onboarding Entry
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 text-center text-gray-700">
        <p className="text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.3em]">
          Powered by <span className="text-[#00B5B5]">Infinite Tech AI</span> Solutions © 2025
        </p>
      </footer>
    </div>
  );
};

export default App;
