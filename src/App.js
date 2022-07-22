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
import BaseAuthenticatedPage from "./pages/BaseAuthenticatedPage";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <div>
        <Routes>
          <Route
            exact
            path={ROUTES.BASE_AUTHENTICATED}
            element={
              <ProtectedRoute>
                <BaseAuthenticatedPage />
              </ProtectedRoute>
            }
          />
          <Route exact path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
