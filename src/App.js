import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main'
import StudyRegister from './pages/StudyRegister'
import StudyView from './pages/StudyView'
import ReviewRegister from './pages/ReviewRegister'
import StudyUpdate from './pages/StudyUpdate'
import EmptyPage from './pages/EmptyPage';
import Login from './pages/Login';
import OAuth2Redirect from './pages/OAuth2Redirect';
import AllStudyList from './pages/AllStudyList';
import OAuth2Logout from './pages/OAuth2Logout';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/studyList" element={<AllStudyList />}></Route>
          <Route path="/study/:studyId" element={<StudyView />}></Route>
          <Route path="/review/register" element={<ReviewRegister/>}></Route>
          <Route path="/study/register" element={<StudyRegister />}></Route>
          <Route path="/study/update/:studyId" element={<StudyUpdate/>}></Route>
          <Route path="/oauth2/redirect" element={<OAuth2Redirect/>}></Route>
          <Route path="/logout" element={<OAuth2Logout/>}></Route>
          <Route path="*" element={<EmptyPage/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
