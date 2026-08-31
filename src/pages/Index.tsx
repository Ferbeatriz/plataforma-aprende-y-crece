import React, { useState } from "react";
import { UserRole, SubjectId, LessonTopic, AchievementBadge, CuriosityFact } from "@/types";
import { Navbar } from "@/components/Navbar";
import { Sidebar, ActiveView } from "@/components/Sidebar";
import { SubjectView } from "@/components/SubjectView";
import { DashboardHome } from "@/components/DashboardHome";
import { AchievementsView } from "@/components/AchievementsView";
import { CuriositiesView } from "@/components/CuriositiesView";
import { ActivityModal } from "@/components/ActivityModal";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { INITIAL_LESSONS, MOCK_ACHIEVEMENTS, CURIOSITIES } from "@/data/mockData";
import { toast } from "sonner";

const Index: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>("student");
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");

  // App data states
  const [lessons, setLessons] = useState<LessonTopic[]>(INITIAL_LESSONS);
  const [achievements, setAchievements] = useState<AchievementBadge[]>(MOCK_ACHIEVEMENTS);
  const [curiosities] = useState<CuriosityFact[]>(CURIOSITIES);
  const [totalStars, setTotalStars] = useState<number>(340);

  // Active quiz modal
  const [activeLessonModal, setActiveLessonModal] = useState<LessonTopic | null>(null);

  const handleSelectSubject = (id: SubjectId) => {
    setSelectedSubject(id);
    setActiveView("subject");
  };

  const handleNavigateHome = () => {
    setSelectedSubject(null);
    setActiveView("dashboard");
  };

  const handleOpenAchievements = () => {
    setActiveView("achievements");
  };

  const handleOpenCuriosities = () => {
    setActiveView("curiosities");
  };

  const handleStartLesson = (lesson: LessonTopic) => {
    setActiveLessonModal(lesson);
  };

  const handleEarnStars = (points: number) => {
    setTotalStars((prev) => {
      const newTotal = prev + points;
      // Auto unlock badges if threshold met
      setAchievements((achList) =>
        achList.map((ach) => {
          if (newTotal >= ach.requiredStars && !ach.unlocked) {
            toast.success(`¡Nueva Medalla Desbloqueada: ${ach.title}! 🏆`, {
              description: "¡Revisa tu álbum de logros para ver tu nuevo sticker!",
            });
            return { ...ach, unlocked: true, unlockedDate: "¡Hoy!" };
          }
          return ach;
        })
      );
      return newTotal;
    });
  };

  const handleLessonComplete = (lessonId: string, points: number) => {
    handleEarnStars(points);
    setLessons((prev) =>
      prev.map((l) => (l.id === lessonId ? { ...l, completed: true } : l))
    );
  };

  const handleCreateLesson = (newLesson: LessonTopic) => {
    setLessons((prev) => [newLesson, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FF]">
      {/* Top Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onNavigateHome={handleNavigateHome}
      />

      {/* Body Layout: Sidebar + Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        <Sidebar
          selectedSubject={selectedSubject}
          activeView={activeView}
          onSelectSubject={handleSelectSubject}
          onNavigateHome={handleNavigateHome}
          onOpenAchievements={handleOpenAchievements}
          onOpenCuriosities={handleOpenCuriosities}
          currentRole={currentRole}
        />

        {/* Dynamic Main View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeView === "subject" && selectedSubject ? (
            <SubjectView
              subjectId={selectedSubject}
              currentRole={currentRole}
              lessons={lessons}
              onBack={handleNavigateHome}
              onStartLesson={handleStartLesson}
              onCreateLesson={handleCreateLesson}
              onEarnStars={handleEarnStars}
            />
          ) : activeView === "achievements" ? (
            <AchievementsView
              achievements={achievements}
              totalStars={totalStars}
              onBack={handleNavigateHome}
            />
          ) : activeView === "curiosities" ? (
            <CuriositiesView
              facts={curiosities}
              onBack={handleNavigateHome}
            />
          ) : (
            <DashboardHome
              currentRole={currentRole}
              onSelectSubject={handleSelectSubject}
              onOpenAchievements={handleOpenAchievements}
              onOpenCuriosities={handleOpenCuriosities}
            />
          )}
        </main>
      </div>

      {/* Interactive Quiz / Lesson Player Modal */}
      <ActivityModal
        lesson={activeLessonModal}
        isOpen={Boolean(activeLessonModal)}
        onClose={() => setActiveLessonModal(null)}
        onLessonComplete={handleLessonComplete}
      />

      {/* Footer */}
      <footer className="border-t border-purple-100/70 bg-white/50 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-purple-500">
          <p>© {new Date().getFullYear()} EduSphere Kids. Diseñado con amor para aprender jugando.</p>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Index;