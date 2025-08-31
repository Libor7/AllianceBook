/** LIBRARIES */
import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => (
  <CircularProgress
    size={75}
    sx={{
      color: "primary.main",
      position: "absolute",
      op: "calc(50% - 37.5px)",
      left: "calc(50% - 37.5px)",
      transform: "translate(-50%, -50%)",
    }}
  />
);
export default LoadingSpinner;
