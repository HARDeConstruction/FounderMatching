export interface ProfilePreviewCard {
  profileID: number; 
  isStartup: boolean; 
  name: string; 
  occupation: string; 
  avatar: string; 
  tags: string[];
}

export interface ProfileData {
  profileID: number;
  isStartup: boolean;
  name: string;
  email: string;
  dateOfBirth: string;
  avatar?: File | string;
  industry: string;
  phoneNumber: string;
  country: string;
  city: string;
  websiteLink?: string;
  linkedInURL?: string;
  gender: string;
  slogan?: string;
  description?: string;
  tags: string[];
  statement?: string;
  aboutUs?: string;
  hobbyInterest?: string;
  education?: string;
  currentStage: string;
  experiences?: Experience[];
  certificates?: Certificate[];
  achievements?: Achievement[];
  jobPositions?: JobPosition[];
}

interface Experience {
  companyName: string;
  role: string;
  location: string;
  description: string;
  startDate?: string;
  endDate?: string;
}

interface Certificate {
  name: string;
  skill: string;
  description: string;
  startDate?: string;
  endDate?: string;
  gpa?: number;
}

interface Achievement {
  name: string;
  description: string;
  date?: string;
}

interface JobPosition {
  jobTitle: string;
  isOpening: boolean;
  country?: string;
  city?: string;
  startDate?: string;
  description: string;
  tags?: string[];
}
