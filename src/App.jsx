import React, { useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ErrorBoundary from './components/shared/ErrorBoundary';
import Documentation from './components/shared/Documentation';

// Teacher Pages
import DashboardTeacher from './pages/Teacher/DashboardTeacher';
import StudentsList from './pages/Teacher/StudentsList';
import Schedule from './pages/Teacher/Schedule ';
import Exams from './pages/Teacher/Exams';
import Assignments from './pages/Teacher/Assignments';
import GradesTeacher from './pages/Teacher/Grades';
import Attendance from './pages/Teacher/Attendance';
import TeacherProfile from './pages/Teacher/TeacherProfile';
import StudentListPage from './pages/Teacher/StudentListPage';
import AttendanceDaily from './pages/Teacher/AttendanceDaily';

// Student Pages
import StudentProfile from './pages/Student/StudentProfile';
import DashboardStudent from './pages/Student/DashboardStudent';
import GradesStudent from './pages/Student/Grades';
import SubjectsList from './pages/Student/SubjectsList ';
import TeachersList from './pages/Student/TeachersList ';
import SubjectFullData from './pages/Student/SubjectFullData';
import ScheduleStudent from './pages/Student/Schedule ';
import ExamsStudent from './pages/Student/Exams';
import AssignmentsStudent from './pages/Student/Assignments';
import AttendanceStudent from './pages/Student/Attendance';
import AnnouncementsStudent from './pages/Student/Announcenents';

import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import { AuthProvider } from './contexts/AuthContext';
import { CourseProvider } from './contexts/CourseContext';
import { AcademicProvider } from './contexts/AcademicContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { SaveNotificationProvider } from './contexts/SaveNotificationContext';
import { ModalProvider } from './contexts/ModalProvider';
import NotFound from './pages/NotFound';

function App() {
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <SaveNotificationProvider>
            <ModalProvider>
              <CourseProvider>
                <AcademicProvider>
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700 font-semibold text-sm">
                      Cargando sistema...
                    </div>
                  }>
                    <BrowserRouter>
                      <Routes>
                        <Route
                          path="/"
                          element={
                            <PublicRoute>
                              <Login />
                            </PublicRoute>
                          }
                        />

                        {/* Teacher Routes */}
                        <Route
                          path="/teacher/dashboard"
                          element={
                            <ProtectedRoute requiredRole="teacher">
                              <DashboardTeacher />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/teacher/students-list"
                          element={
                            <ProtectedRoute requiredRole="teacher">
                              <StudentListPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/teacher/schedule"
                          element={
                            <ProtectedRoute requiredRole="teacher">
                              <Schedule />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/teacher/exams"
                          element={
                            <ProtectedRoute requiredRole="teacher">
                              <Exams />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/teacher/assignments"
                          element={
                            <ProtectedRoute requiredRole="teacher">
                              <Assignments />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/teacher/grades"
                          element={
                            <ProtectedRoute requiredRole="teacher">
                              <GradesTeacher />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/teacher/attendance"
                          element={
                            <ProtectedRoute requiredRole="teacher">
                              <Attendance />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/teacher/attendance-daily"
                          element={
                            <ProtectedRoute requiredRole="teacher">
                              <AttendanceDaily />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/teacher/teacher-profile/*"
                          element={
                            <ProtectedRoute requiredRole="teacher">
                              <TeacherProfile />
                            </ProtectedRoute>
                          }
                        />

                        {/* Student Routes */}
                        <Route
                          path="/student/dashboard"
                          element={
                            <ProtectedRoute requiredRole="student">
                              <DashboardStudent />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/student/student-profile/*"
                          element={
                            <ProtectedRoute requiredRole="student">
                              <StudentProfile />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/student/grades"
                          element={
                            <ProtectedRoute requiredRole="student">
                              <GradesStudent />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/student/courses-list"
                          element={
                            <ProtectedRoute requiredRole="student">
                              <SubjectsList />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/student/courses/*"
                          element={
                            <ProtectedRoute requiredRole="student">
                              <SubjectFullData />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/student/teachers-list"
                          element={
                            <ProtectedRoute requiredRole="student">
                              <TeachersList />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/student/schedule"
                          element={
                            <ProtectedRoute requiredRole="student">
                              <ScheduleStudent />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/student/exams"
                          element={
                            <ProtectedRoute requiredRole="student">
                              <ExamsStudent />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/student/assignments"
                          element={
                            <ProtectedRoute requiredRole="student">
                              <AssignmentsStudent />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/student/attendance"
                          element={
                            <ProtectedRoute requiredRole="student">
                              <AttendanceStudent />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/student/announcements"
                          element={
                            <ProtectedRoute requiredRole="student">
                              <AnnouncementsStudent />
                            </ProtectedRoute>
                          }
                        />

                        {/* 404 Route */}
                        <Route
                          path="*"
                          element={
                            <ProtectedRoute>
                              <NotFound />
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                    </BrowserRouter>

                    <Documentation
                      isOpen={isDocumentationOpen}
                      onClose={() => setIsDocumentationOpen(false)}
                    />
                  </Suspense>
                </AcademicProvider>
              </CourseProvider>
            </ModalProvider>
          </SaveNotificationProvider>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
