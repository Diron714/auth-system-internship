import React, { useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Divider,
  Container,
  Link,
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import {
  Google,
  Apple,
  Facebook,
  VisibilityOff
} from "@mui/icons-material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

 
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    validateForm();
    
  };

  
  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = result.user.accessToken;
      navigate("/token", { state: { token } });
    } catch {
      alert("Google login failed");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        overflow: "hidden",
        backgroundColor: "#fff"
      }}
    >
      <Grid container sx={{ height: "100%", width: "100%" }}>
        
        {/* LEFT SIDE */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Container maxWidth="xs">
            <Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, mb: 1, color: "#000" }}
              >
                Welcome back!
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#757575", mb: 4 }}
              >
                Simplify your workflow and boost your productivity with{" "}
                <strong>Tuga’s App.</strong>
              </Typography>

              <Box component="form" onSubmit={handleLoginSubmit} noValidate>
                
                {/* EMAIL */}
                <TextField
                  fullWidth
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "50px",
                      backgroundColor: "#e8f0fe",
                      "& fieldset": { border: "none" }
                    }
                  }}
                />

                {/* PASSWORD */}
                <TextField
                  fullWidth
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <VisibilityOff />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "50px",
                      backgroundColor: "#e8f0fe",
                      "& fieldset": { border: "none" }
                    }
                  }}
                />

                <Box
                  display="flex"
                  justifyContent="flex-end"
                  sx={{ mt: 1, mb: 3 }}
                >
                  <Link
                    href="#"
                    underline="none"
                    sx={{ color: "#000", fontSize: "0.75rem", fontWeight: 800 }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    py: 1.5,
                    borderRadius: "50px",
                    backgroundColor: "#000",
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "none",
                    "&:hover": { backgroundColor: "#333" }
                  }}
                >
                  Login
                </Button>
              </Box>

              <Divider sx={{ my: 4 }}>
                <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
                  or continue with
                </Typography>
              </Divider>

              <Box display="flex" justifyContent="center" gap={2}>
                <IconButton
                  onClick={googleLogin}
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#000",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#333" }
                  }}
                >
                  <Google fontSize="small" />
                </IconButton>

                <IconButton sx={{ width: 50, height: 50, backgroundColor: "#000", color: "#fff" }}>
                  <Apple fontSize="small" />
                </IconButton>

                <IconButton sx={{ width: 50, height: 50, backgroundColor: "#000", color: "#fff" }}>
                  <Facebook fontSize="small" />
                </IconButton>
              </Box>

              <Typography
                variant="body2"
                textAlign="center"
                sx={{ mt: 4, color: "#757575" }}
              >
                Not a member?{" "}
                <Link
                  href="#"
                  underline="none"
                  sx={{ color: "#2e7d32", fontWeight: 700 }}
                >
                  Register now
                </Link>
              </Typography>
            </Box>
          </Container>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid
          item
          xs={false}
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f4f9f4",
            margin: "20px",
            borderRadius: "40px"
          }}
        >
          <Box textAlign="center" px={4}>
            <Box
              component="img"
              src="/illustration.png"
              alt="Illustration"
              sx={{ width: "100%", maxWidth: "420px", mb: 4 }}
            />

            <Typography variant="h4" sx={{ fontWeight: 800, color: "#000" }}>
              Make your work easier and organized with Tuga’s App
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
