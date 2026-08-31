export type UserRole = "student" | "teacher" | "admin";

export type SubjectId = "lenguaje" | "historia" | "matematicas";

export interface SubjectConfig {
  id: SubjectId;
  name: string;
  subtitle: string;
  iconName: string;
  colorScheme: {
    bgLight: string;
    bgAccent: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    gradient: string;
  };
  description: string;
  topicsCount: number;
}