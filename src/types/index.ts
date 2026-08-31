export type UserRole = "student" | "teacher" | "admin";

export type SubjectId = "lenguaje" | "historia" | "matematicas";

export type SchoolGrade = "4to" | "5to" | "6to";

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

export interface LessonTopic {
  id: string;
  subjectId: SubjectId;
  title: string;
  description: string;
  grade: SchoolGrade;
  durationMinutes: number;
  pointsReward: number;
  icon: string;
  difficulty: "Fácil" | "Medio" | "Desafío";
  completed?: boolean;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  subject: SubjectId | "general";
  icon: string;
  description: string;
  unlocked: boolean;
  requiredStars: number;
  unlockedDate?: string;
}

export interface CuriosityFact {
  id: string;
  title: string;
  category: SubjectId;
  emoji: string;
  content: string;
  funFact: string;
  author: string;
}