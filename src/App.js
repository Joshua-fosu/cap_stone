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
  console.log("is Logged in", isLoggedIn);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.EXPLORE_FRIENDS}
            element={
              <ProtectedRoute>
                <ExploreFriendsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.CREATE_POST}
            element={
              <ProtectedRoute>
                <CreatePostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.EVENTS}
            element={
              <ProtectedRoute>
                <ExploreEventsPage />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
