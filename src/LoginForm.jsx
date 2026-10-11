import React, { useRef, useState } from "react";
import "./LoginForm.css";

function LoginForm() {
  // Uncontrolled input references
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const rememberRef = useRef(null);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState("");

  // Check password strength while typing
  const checkPasswordStrength = () => {
    const password = passwordRef.current.value;

    if (password.length === 0) {
      setPasswordStrength("");
    } else if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  };

  // Submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setSuccessMessage("");
    setLoginAttempts((previous) => previous + 1);

    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const rememberMe = rememberRef.current.checked;

    // Username validation
    if (username.length < 3) {
      setError("Username must contain at least 3 characters.");
      usernameRef.current.focus();
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      emailRef.current.focus();
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      passwordRef.current.focus();
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      confirmPasswordRef.current.focus();
      return;
    }

    // Display safe submitted information
    setSubmittedData({
      username: username,
      email: email,
      rememberMe: rememberMe,
      submittedAt: new Date().toLocaleString(),
    });

    setSuccessMessage("Your form was submitted successfully!");

    // Clear form values after submission
    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
    rememberRef.current.checked = false;

    setShowPassword(false);
    setShowConfirmPassword(false);
    setPasswordStrength("");
  };

  // Reset entire form
  const handleReset = () => {
    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
    rememberRef.current.checked = false;

    setError("");
    setSuccessMessage("");
    setSubmittedData(null);
    setPasswordStrength("");
    setShowPassword(false);
    setShowConfirmPassword(false);

    usernameRef.current.focus();
  };

  // Clear previous result and messages
  const handleClearResult = () => {
    setSubmittedData(null);
    setError("");
    setSuccessMessage("");
  };

  // Demo forgot-password action
  const handleForgotPassword = () => {
    setError(
      "Password recovery is a demo feature. Contact your administrator."
    );
    setSuccessMessage("");
  };

  return (
    <div className="login-page">
      <div className="background-circle circle-one"></div>
      <div className="background-circle circle-two"></div>

      <main className="login-layout">
        {/* Login Card */}
        <section className="login-card">
          <header className="login-header">
            <div className="login-logo">🔐</div>

            <h1>Welcome Back!</h1>

            <p>
              Sign in to continue to your account
            </p>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">
                Username <span>*</span>
              </label>

              <input
                type="text"
                id="username"
                ref={usernameRef}
                placeholder="Enter your username"
                autoComplete="username"
                required
              />

              <small>Minimum 3 characters required.</small>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email Address <span>*</span>
              </label>

              <input
                type="email"
                id="email"
                ref={emailRef}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">
                Password <span>*</span>
              </label>

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  ref={passwordRef}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  onChange={checkPasswordStrength}
                  required
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {passwordStrength && (
                <p
                  className={`strength strength-${passwordStrength.toLowerCase()}`}
                >
                  Password strength: {passwordStrength}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password <span>*</span>
              </label>

              <div className="password-wrapper">
                <input
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  id="confirmPassword"
                  ref={confirmPasswordRef}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="form-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  ref={rememberRef}
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="text-button"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-error" role="alert">
                <span>⚠️</span>
                <p>{error}</p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div
                className="alert alert-success"
                role="status"
              >
                <span>✅</span>
                <p>{successMessage}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="button-container">
              <button type="submit" className="primary-button">
                Login Now
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={handleReset}
              >
                Reset Form
              </button>
            </div>
          </form>

          {/* Result Section */}
          {submittedData && (
            <section className="result-card">
              <div className="result-heading">
                <span className="result-icon">🎉</span>
                <h2>Submitted Information</h2>
              </div>

              <div className="result-row">
                <strong>Username:</strong>
                <span>{submittedData.username}</span>
              </div>

              <div className="result-row">
                <strong>Email:</strong>
                <span>{submittedData.email}</span>
              </div>

              <div className="result-row">
                <strong>Remember Me:</strong>
                <span>
                  {submittedData.rememberMe ? "Yes" : "No"}
                </span>
              </div>

              <div className="result-row">
                <strong>Submitted At:</strong>
                <span>{submittedData.submittedAt}</span>
              </div>

              <p className="security-note">
                Your password is not displayed.
              </p>

              <button
                type="button"
                className="clear-button"
                onClick={handleClearResult}
              >
                Clear Result
              </button>
            </section>
          )}

          {/* Statistics */}
          <div className="attempt-info">
            Form submission attempts: {loginAttempts}
          </div>

          {/* Footer */}
          <footer className="login-footer">
            <p>React Uncontrolled Form Practical</p>
            <p>Designed for learning React Hooks</p>
          </footer>
        </section>

        {/* Information Panel */}
        <aside className="info-panel">
          <h2>Login Features</h2>

          <p>
            This practical demonstrates an uncontrolled form
            using React references.
          </p>

          <ul>
            <li>Username and email validation</li>
            <li>Password strength feedback</li>
            <li>Show and hide password</li>
            <li>Confirm password verification</li>
            <li>Remember me checkbox</li>
            <li>Reset and clear actions</li>
            <li>Submitted information summary</li>
          </ul>

          <div className="info-note">
            <strong>Learning tip</strong>
            <p>
              The useRef Hook reads input values when the
              form is submitted instead of updating React
              state on every keystroke.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default LoginForm;

