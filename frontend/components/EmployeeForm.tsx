
import React, { useState, useRef } from 'react';
import { Employee, Department } from '../types';
import { geminiService } from '../services/geminiService';

interface Props {
  onSubmit: (employee: Employee) => void;
}

type StepType = 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea' | 'file' | 'skills' | 'bio' | 'links';

interface FormStep {
  id: keyof Employee | 'resume' | 'social_links';
  label: string;
  field: string;
  type: StepType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  description?: string;
}

const FORM_STRUCTURE: FormStep[] = [
  { id: 'fullName', label: 'Full Identity Name', field: 'fullName', type: 'text', required: true, placeholder: 'Ex: Alex Rivera' },
  { id: 'companyName', label: 'Current Company', field: 'companyName', type: 'text', required: true, placeholder: 'Infinite Tech AI' },
  { id: 'email', label: 'Primary Email Node', field: 'email', type: 'email', required: true, placeholder: 'alex@infinite.ai' },
  { id: 'phone', label: 'Personal Uplink (Phone)', field: 'phone', type: 'tel', required: true, placeholder: '+91 00000 00000' },
  { id: 'parentPhone', label: 'Guardian Contact', field: 'parentPhone', type: 'tel', required: true, placeholder: '+91 00000 00000' },
  { id: 'dob', label: 'Date of Genesis (DOB)', field: 'dob', type: 'date', required: true },
  { id: 'address', label: 'Location Vector (Street)', field: 'address', type: 'textarea', required: true, placeholder: 'Street, Landmark, Apartment...' },
  { id: 'district', label: 'District Node', field: 'district', type: 'text', required: true, placeholder: 'Chennai' },
  { id: 'pincode', label: 'Pincode', field: 'pincode', type: 'text', required: true, placeholder: '600001' },
  { id: 'country', label: 'Country Code', field: 'country', type: 'text', required: true, placeholder: 'India' },
  { id: 'college', label: 'Education Institution', field: 'college', type: 'text', required: true, placeholder: 'University Name' },
  { id: 'degree', label: 'Certified Degree', field: 'degree', type: 'text', required: true, placeholder: 'B.E / B.Tech' },
  { id: 'major', label: 'Academic Major', field: 'major', type: 'text', placeholder: 'AI & ML' },
  { id: 'graduationYear', label: 'Exit Year', field: 'graduationYear', type: 'text', placeholder: '2024' },
  { id: 'school', label: 'Secondary Institute', field: 'school', type: 'text', placeholder: 'High School Name' },
  { id: 'linkedIn', label: 'LinkedIn Vector', field: 'linkedIn', type: 'text', placeholder: 'https://linkedin.com/in/username' },
  { id: 'leetCode', label: 'LeetCode Node', field: 'leetCode', type: 'text', placeholder: 'Username / URL' },
  { id: 'hackerRank', label: 'HackerRank Node', field: 'hackerRank', type: 'text', placeholder: 'Username / URL' },
  { id: 'department', label: 'Target Division', field: 'department', type: 'select', required: true, options: Object.values(Department) },
  { id: 'jobTitle', label: 'Designation', field: 'jobTitle', type: 'text', required: true, placeholder: 'Junior Engineer' },
  { id: 'skills', label: 'Expertise Stack', field: 'skills', type: 'skills', description: 'Separated by commas' },
  { id: 'bio', label: 'Professional Narrative', field: 'bio', type: 'bio' },
  { id: 'resume', label: 'Asset Deployment (Resume)', field: 'resumeName', type: 'file' }
];

export const EmployeeForm: React.FC<Props> = ({ onSubmit }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    parentPhone: '',
    dob: '',
    address: '',
    district: '',
    country: 'India',
    pincode: '',
    department: Department.ENGINEERING,
    jobTitle: '',
    joiningDate: new Date().toISOString().split('T')[0],
    skills: '',
    bio: '',
    school: '',
    college: '',
    degree: '',
    major: '',
    graduationYear: '',
    linkedIn: '',
    leetCode: '',
    hackerRank: '',
    resumeName: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const step = FORM_STRUCTURE[currentStep];
  const progress = ((currentStep + 1) / FORM_STRUCTURE.length) * 100;

  const handleNext = () => {
    if (step.required && !formData[step.field as string]) return;
    if (currentStep < FORM_STRUCTURE.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finalizeSubmission();
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const finalizeSubmission = () => {
    const skillsArray = formData.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
    const employee: Employee = {
      ...formData,
      id: crypto.randomUUID(),
      skills: skillsArray,
      submittedAt: new Date().toISOString()
    };
    onSubmit(employee);
  };

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    if (step.type === 'bio') {
      const bio = await geminiService.generateBio(
        formData.fullName, formData.jobTitle, formData.department,
        formData.skills.split(','), formData.college, formData.degree, formData.major
      );
      setFormData({ ...formData, bio });
    } else if (step.type === 'skills') {
      const suggested = await geminiService.suggestSkills(formData.jobTitle);
      const current = formData.skills ? formData.skills.split(',').map((s: string) => s.trim()) : [];
      const combined = Array.from(new Set([...current, ...suggested])).join(', ');
      setFormData({ ...formData, skills: combined });
    }
    setIsGenerating(false);
  };

  const renderInput = () => {
    // Reduced padding from p-5/p-6 to p-3/p-4 to make it smaller
    const commonClasses = "w-full p-3 sm:p-4 bg-[#051A15] border border-white/5 rounded-xl sm:rounded-2xl focus:border-[#00B5B5]/50 outline-none text-white transition-all";

    switch (step.type) {
      case 'textarea':
      case 'bio':
        return (
          <div className="space-y-4">
            <textarea
              autoFocus
              className={`${commonClasses} text-sm sm:text-base min-h-[120px] sm:min-h-[160px] resize-none`}
              value={formData[step.field]}
              onChange={e => setFormData({ ...formData, [step.field]: e.target.value })}
              placeholder={step.placeholder}
            />
            {step.type === 'bio' && (
              <button
                type="button"
                onClick={handleAIGenerate}
                disabled={isGenerating}
                className="w-full py-3 bg-[#00B5B5]/10 border border-[#00B5B5]/30 text-[#00B5B5] text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#00B5B5]/20 transition-all"
              >
                {isGenerating ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-magic mr-2"></i>}
                AI Synthesize Narrative
              </button>
            )}
          </div>
        );
      case 'select':
        return (
          <select
            className={`${commonClasses} text-base sm:text-lg appearance-none cursor-pointer`}
            value={formData[step.field]}
            onChange={e => setFormData({ ...formData, [step.field]: e.target.value })}
          >
            {step.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        );
      case 'file':
        return (
          <div
            className="w-full p-6 sm:p-10 border-2 border-dashed border-[#00B5B5]/20 rounded-[1.5rem] sm:rounded-[2rem] bg-[#00B5B5]/5 hover:bg-[#00B5B5]/10 transition-all cursor-pointer flex flex-col items-center justify-center text-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" className="hidden" ref={fileInputRef} onChange={e => {
              const file = e.target.files?.[0];
              if (file) setFormData({ ...formData, resumeName: file.name });
            }} />
            <div className="w-12 h-12 bg-[#051A15] rounded-[1rem] flex items-center justify-center text-[#00B5B5] mb-3 shadow-xl">
              <i className="fas fa-cloud-arrow-up text-xl"></i>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-1">{formData.resumeName || "Deploy CV / Resume"}</h3>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Tap to select asset</p>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-4">
            <input
              autoFocus
              className={`${commonClasses} text-base sm:text-lg`}
              value={formData[step.field]}
              onChange={e => setFormData({ ...formData, [step.field]: e.target.value })}
              placeholder={step.placeholder || "React, Python, OpenCV..."}
            />
            <button type="button" onClick={handleAIGenerate} disabled={isGenerating} className="w-full py-3 bg-[#00B5B5]/10 border border-[#00B5B5]/30 text-[#00B5B5] text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-[#00B5B5]/20 transition-all">
              {isGenerating ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-brain mr-2"></i>}
              Analyze & Suggest Skills
            </button>
          </div>
        );
      default:
        return (
          <input
            autoFocus
            type={step.type}
            // Reduced text size from text-xl/2xl/3xl to text-lg/xl
            className={`${commonClasses} text-lg sm:text-xl font-medium placeholder:text-white/5`}
            value={formData[step.field]}

            onChange={e => setFormData({ ...formData, [step.field]: e.target.value })}
            placeholder={step.placeholder}
            onKeyDown={e => e.key === 'Enter' && handleNext()}
          />
        );
    }
  };

  return (
    <div className="w-full space-y-6 sm:space-y-10 animate-fadeIn">
      {/* Dynamic Progress Header */}
      <div className="flex justify-between items-end px-2">
        <div className="flex-1 max-w-[200px] sm:max-w-xs">
          <p className="text-[#00B5B5] font-black text-[9px] sm:text-[10px] uppercase tracking-[0.25em] mb-2 sm:mb-3">Protocol {currentStep + 1} / {FORM_STRUCTURE.length}</p>
          <div className="h-1 sm:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-[#00B5B5] transition-all duration-700 ease-out shadow-[0_0_15px_rgba(0,181,181,0.5)]" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="hidden sm:block">
          <span className="text-4xl font-black text-white/5 uppercase select-none tracking-tighter">DATA NODE</span>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-12 md:p-16 rounded-[2rem] sm:rounded-[3.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B5B5]/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>

        <div className="relative z-10 space-y-8 sm:space-y-12">
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-[10px] sm:text-[11px] font-black text-[#00B5B5] uppercase tracking-[0.4em] opacity-80">{step.id.toString().replace(/([A-Z])/g, ' $1')}</h2>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">{step.label}</h1>
            {step.description && <p className="text-gray-500 text-xs sm:text-sm font-medium">{step.description}</p>}
          </div>

          <div className="min-h-[80px] sm:min-h-[100px]">
            {renderInput()}
          </div>

          <div className="flex items-center justify-between pt-4 sm:pt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${currentStep === 0 ? 'opacity-0' : 'text-gray-500 hover:text-white'}`}
            >
              <i className="fas fa-arrow-left"></i>
              <span className="hidden sm:inline">Back</span>
            </button>

            <button
              onClick={handleNext}
              className="px-8 sm:px-12 py-4 sm:py-5 bg-[#00B5B5] text-white text-[10px] sm:text-xs font-black rounded-xl sm:rounded-2xl shadow-lg shadow-[#00B5B5]/20 hover:-translate-y-1 active:scale-95 transition-all uppercase tracking-[0.2em] flex items-center group"
            >
              <span>{currentStep === FORM_STRUCTURE.length - 1 ? 'Deploy Identity' : 'Continue'}</span>
              <i className="fas fa-chevron-right ml-3 sm:ml-4 text-[10px] group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="text-center opacity-30 select-none">
        <p className="text-[8px] sm:text-[10px] font-bold text-white uppercase tracking-[0.5em]">Infinite Tech AI Security Layer Active</p>
      </div>
    </div>
  );
};
