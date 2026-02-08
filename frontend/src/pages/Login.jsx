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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
        backgroundColor: "#fff",
        overflow: "hidden"
      }}
    >
      <Grid container sx={{ height: "100%" }} wrap="nowrap">
        
        {/* LEFT SIDE: Form Section */}
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "350px", // Maintains form shape when window is small
            backgroundColor: "#fff"
          }}
        >
          <Container maxWidth="xs">
            <Box>
              <Typography
                variant="h4"
                sx={{ 
                  fontWeight: 800, 
                  mb: 1, 
                  color: "#000",
                  fontSize: { xs: "1.8rem", md: "2.5rem" } 
                }}
              >
                Welcome back!
              </Typography>

              <Typography variant="body2" sx={{ color: "#757575", mb: 4 }}>
                Simplify your workflow and boost your productivity with{" "}
                <strong>Tuga’s App.</strong>
              </Typography>

              <Box component="form" onSubmit={handleLoginSubmit} noValidate>
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

                <Box display="flex" justifyContent="flex-end" sx={{ mt: 1, mb: 3 }}>
                  <Link href="#" underline="none" sx={{ color: "#000", fontSize: "0.75rem", fontWeight: 800 }}>
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
                <IconButton onClick={googleLogin} sx={{ width: 45, height: 45, backgroundColor: "#000", color: "#fff", "&:hover": { backgroundColor: "#333" } }}>
                  <Google fontSize="small" />
                </IconButton>
                <IconButton sx={{ width: 45, height: 45, backgroundColor: "#000", color: "#fff" }}>
                  <Apple fontSize="small" />
                </IconButton>
                <IconButton sx={{ width: 45, height: 45, backgroundColor: "#000", color: "#fff" }}>
                  <Facebook fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </Grid>

        {/* RIGHT SIDE: Fully Adjusted Section */}
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            height: "100%",
            backgroundColor: "#f4f9f4" // Background color now applied to the whole grid
          }}
        >
          <Box 
            sx={{ 
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: 6 // More horizontal padding for better text containment
            }}
          >
            <Box
              component="img"
              src="/illustration.png"
              alt="Illustration"
              sx={{ 
                width: "100%", 
                maxWidth: "420px", 
                height: "auto",
                maxHeight: "55vh", 
                objectFit: "contain",
                mb: 4
              }}
            />

            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 800, 
                color: "#000",
                maxWidth: "90%",
                fontSize: { sm: "1.2rem", md: "1.8rem", lg: "2.2rem" },
                lineHeight: 1.3
              }}
            >
              Make your work easier and organized with Tuga’s App
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}