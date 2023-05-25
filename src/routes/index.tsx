import { UserRole } from 'entities/User';
import FocusTime from 'pages/focusTime';
import Study from 'pages/studyIndividual';
import StudyDiary from 'pages/studyDiary';
import Summary from 'pages/summary';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import links from '../framework/links';
import ForgotPassword from 'pages/forgotPassword';
import Login from 'pages/login';
import StudentProfile from 'pages/profile';
import Register from 'pages/register';
import ResetPassword from 'pages/resetPassword';
import LookUp from 'pages/lookUp';
import Dashboard from 'pages/dashboard';
import StudyCards from 'pages/studyCardsLibrary';
import StudyCardsDiscover from 'pages/studyCardsDiscover';
import CardSetDetailsPage from 'pages/studyCardsDiscover/components/CardSetDetailsPage';
import CreateStudyCardsPage from 'pages/studyCardsCreate/components/CreateStudyCardsPage';
import StudyCardsLearn from 'pages/studyCardsLearn';
import StudyCardsSession from 'pages/studyCardsLearn/components/StudyCardsSession';
import StudyCardsGeneralKnowledge from 'pages/studyCardsGeneralKnowledge';
import Ido from 'components/ui/Ido';
import StudyNotes from 'pages/studyNotes';
import Search from 'pages/search';
import PrivateRoute from 'components/containers/PrivateRoute';

interface RootRouterProps {
  userRole: UserRole | undefined;
}

const RootRouter: React.FC<RootRouterProps> = ({ userRole }) => (
  <>
    {!userRole && (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={links.student.login} element={<Login />} />
        <Route path={links.student.register} element={<Register />} />
        <Route path={links.student.forgotPassword} element={<ForgotPassword />} />
        <Route path={links.student.resetPassword} element={<ResetPassword />} />
        <Route path="*" element={<Navigate replace to={links.student.login} />}></Route>
      </Routes>
    )}
    {userRole && (
      <Routes>
        <Route
          path={links.student.login}
          element={<Navigate replace to={links.student.dashboard} />}
        ></Route>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.studyDiary}
          element={
            <PrivateRoute>
              <StudyDiary />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.profile}
          element={
            <PrivateRoute>
              <StudentProfile />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.dashboard}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.studyCardsCreate}
          element={
            <PrivateRoute>
              <CreateStudyCardsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.focusTime}
          element={
            <PrivateRoute>
              <FocusTime />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.studyCardsEditSet}
          element={
            <PrivateRoute>
              <CreateStudyCardsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.studyCardsDiscover}
          element={
            <PrivateRoute>
              <StudyCardsDiscover />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.studyCardsGeneralKnowledge}
          element={
            <PrivateRoute>
              <StudyCardsGeneralKnowledge />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.studyCards}
          element={
            <PrivateRoute>
              <StudyCards />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.study}
          element={
            <PrivateRoute>
              <Study />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.lookUp}
          element={
            <PrivateRoute>
              <LookUp />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.summary}
          element={
            <PrivateRoute>
              <Summary />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.studyCardsDiscoverSet}
          element={
            <PrivateRoute>
              <CardSetDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.studyCardsSet}
          element={
            <PrivateRoute>
              <CardSetDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.studyCardsLearnOverview}
          element={
            <PrivateRoute>
              <StudyCardsLearn />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.studyCardsLearnSession}
          element={
            <PrivateRoute>
              <StudyCardsSession
                cards={[]}
                setTitle={''}
                subjectTitle={''}
                setId={''}
                onBackButton={function (): void {
                  throw new Error('Function not implemented.');
                }}
                reloadSet={function (): void {
                  throw new Error('Function not implemented.');
                }}
                withTimer={false}
              />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.studyNotes}
          element={
            <PrivateRoute>
              <StudyNotes />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.search}
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path={links.student.ido}
          element={
            <PrivateRoute>
              <Ido />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate replace to={links.student.dashboard} />} />
      </Routes>
    )}
  </>
);

export default RootRouter;
