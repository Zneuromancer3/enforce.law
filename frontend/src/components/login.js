import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper, Alert, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import eye icons
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Track password visibility
    const navigate = useNavigate();

    const credentials = {
        admin: { username: "admin", password: "admin123" },
        user: { username: "user", password: "user123" },
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (
            username === credentials.admin.username &&
            password === credentials.admin.password
        ) {
            onLogin("admin"); // Login as admin
            navigate("/"); // Redirect to home page
        } else if (
            username === credentials.user.username &&
            password === credentials.user.password
        ) {
            onLogin("user"); // Login as regular user
            navigate("/"); // Redirect to home page
        } else {
            setError("Invalid username or password");
        }
    };

    // Toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: "2rem",
                    width: "400px",
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
                    Login
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"} // Toggle type based on showPassword state
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    position="end"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: "1rem" }}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginPage;
