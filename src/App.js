import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import * as ROUTES from "./routes/routes";
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile";
import ExploreEventsPage from "./pages/ExploreEventsPage";
import CreatePostPage from "./pages/CreatePostPage";
import ExploreFriendsPage from "./pages/ExploreFriendsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route
            exact
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path={ROUTES.EXPLORE_FRIENDS}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ExploreFriendsPage />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path={ROUTES.CREATE_POST}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CreatePostPage />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path={ROUTES.EVENTS}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ExploreEventsPage />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
