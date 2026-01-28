import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
// import { toast } from "react-toastify";
import { signinUser } from "../../services/auth";
import { useAuth } from "../../providers/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin1 = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      // toast.error("Email and password required");
      alert("Email and password required");
      return;
    }

    try {
      const credentials = { email, password };

      // API CALL
      const response = await signinUser(credentials);

      /**
       * response = {
       *  token,
       *  name,
       *  role,
       *  message
       * }
       */

      // Store token
      sessionStorage.setItem("token", response.token);

      // Store full user
      sessionStorage.setItem("user", JSON.stringify(response));

      // Set AuthContext user
      setUser(response);

      // toast.success(response.message || "Login successful");
      alert("Login successful");

      // Redirect (change later if role-based)
      navigate("/dashboard");
    } catch (error) {
      // toast.error(
      //   error?.response?.data?.message || "Invalid email or password",
      // );
      alert("error 56");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      // toast.error("Email and password required");
      alert("Email and password required");
      return;
    }

    try {
      const credentials = { email, password };
      const response = await signinUser(credentials);

      // dashboard will remain there
      if (!response?.token) {
        // toast.error("Invalid email or password");
        alert("Invalid email or password");
        return;
      }

      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("user", JSON.stringify(response));
      setUser(response);

      // toast.success(response.message || "Login successful");
      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      // toast.error(error?.response?.data?.message || "Login failed");
      alert("Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/src/assets/images/login-bg.png')" }}
    >
      <div className="absolute inset-0 bg-gray-300/60" />

      <Box className="relative w-full max-w-md bg-white p-10 shadow-xl rounded-xl z-10">
        <div className="text-center mb-6">
          <Typography variant="h4" fontWeight="bold">
            User Login
          </Typography>
          <Typography color="text.secondary">
            Access your shipping dashboard
          </Typography>
        </div>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email Address"
            size="small"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            size="small"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            type="submit"
            sx={{ mt: 2, py: 1.4, fontWeight: "bold" }}
            variant="contained"
          >
            LOGIN
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Login;
