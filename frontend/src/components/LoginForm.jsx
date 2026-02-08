import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    alert("Validation passed (no backend login)");
  };

  return (
    <Box>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        error={!!error}
        helperText={error}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
      />

      <Button fullWidth variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}
