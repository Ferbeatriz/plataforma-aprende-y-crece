import React, { useState } from "react";
import { UserRole, SubjectId } from "@/types";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { SubjectView } from "@/components/SubjectView";
import { DashboardHome } from "@/components/DashboardHome";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>("student");
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FF]">
      {/* Top Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onNavigateHome={() => setSelectedSubject(null)}
      />

      {/* Body Layout: Sidebar + Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        <Sidebar
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject}
          currentRole={currentRole}
        />

        {/* Dynamic Main View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {selectedSubject ? (
            <SubjectView
              subjectId={selectedSubject}
              currentRole={currentRole}
              onBack={() => setSelectedSubject(null)}
            />
          ) : (
            <DashboardHome
              currentRole={currentRole}
              onSelectSubject={setSelectedSubject}
            />
          )}
        </main>
      </div>

      {/* Footer footer */}
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