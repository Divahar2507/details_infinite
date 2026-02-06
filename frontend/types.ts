
export enum Department {
  ENGINEERING = 'Engineering',
  MARKETING = 'Marketing',
  SALES = 'Sales',
  HR = 'Human Resources',
  DESIGN = 'Design',
  FINANCE = 'Finance'
}

export interface Employee {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  parentPhone: string;
  dob: string;
  address: string;
  district: string;
  country: string;
  pincode: string;
  department: Department;
  jobTitle: string;
  joiningDate: string;
  skills: string[];
  bio: string;
  school: string;
  previousSchool?: string;
  college: string;
  degree: string;
  major?: string;
  graduationYear?: string;
  linkedIn?: string;
  leetCode?: string;
  hackerRank?: string;
  resumeName?: string;
  submittedAt: string;
}

export type ViewState = 'FORM' | 'DIRECTORY' | 'DASHBOARD';
