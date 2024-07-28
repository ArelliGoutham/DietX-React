import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../middleware/userMiddleWare";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authError = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      navigate('/home');
    }
  }, [isAuthenticated]);


  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Clear form fields when toggling
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("user");
    setErrors({});
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!validateEmail(email)) {
      formErrors.email = "Invalid email address";
    }

    if (!isLogin) {
      if (password !== confirmPassword) {
        formErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});

    if (isLogin) {
      dispatch(login(email, password), navigate);
    } else {
      dispatch(signup({ name: name, email: email, password: password, role: role }), navigate);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">{isLogin ? "Login" : "Signup"}</h2>
        {authError && <div className="alert alert-danger">{authError}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label
              htmlFor={isLogin ? "loginEmail" : "signupEmail"}
              className="form-label"
            >
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id={isLogin ? "loginEmail" : "signupEmail"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label
              htmlFor={isLogin ? "loginPassword" : "signupPassword"}
              className="form-label"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id={isLogin ? "loginPassword" : "signupPassword"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <>
              <div className="mb-3">
                <label htmlFor="signupConfirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="signupConfirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {errors.confirmPassword && (
                  <div className="text-danger">{errors.confirmPassword}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="signupRole" className="form-label">
                  Role
                </label>
                <select
                  id="signupRole"
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="user">User</option>
                  <option value="dietitian">Dietitian</option>
                </select>
              </div>
            </>
          )}
          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? "Login" : "Signup"}
          </button>
          <p className="text-center mt-3">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={toggleForm}
                >
                  Signup
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={toggleForm}
                >
                  Login
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
