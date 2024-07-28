import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";
import LandingPage from "../pages/Landing";
import HomePage from "../pages/Home";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
					<Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
