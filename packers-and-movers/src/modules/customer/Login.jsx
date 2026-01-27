import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) return;

        const userData = { email, name: "Mathew Anderson" };
        localStorage.setItem("customer_user", JSON.stringify(userData));

        navigate("/customer");
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
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        size="small"
                        margin="normal"
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