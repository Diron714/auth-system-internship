import { useLocation } from "react-router-dom";
import { Typography, Box } from "@mui/material";

export default function TokenPage() {
  const { state } = useLocation();

  return (
    <Box p={4}>
      <Typography variant="h6">ACCESS TOKEN:</Typography>
      <Typography sx={{ wordBreak: "break-all" }}>
        {state?.token || "No token found"}
      </Typography>
    </Box>
  );
}
