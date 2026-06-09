export interface Subordinate {
  name: string;
  role: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  category: "Leadership" | "Engineering" | "Design";
  bio: string;
  fullBio: string;
  academics: { degree: string; institution: string; year: string }[];
  techStack: { category: string; skills: string[] }[];
  image: string;
  initials: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    facebook?: string;
    tiktok?: string;
    instagram?: string;
    email?: string;
  };
  // Hierarchy management
  directReports?: Subordinate[];
}