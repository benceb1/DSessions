import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FlexMidWrapper from "@/components/FlexMidWrapper";

const Home = () => {
  const smDevice = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <FlexMidWrapper>
      <Paper
        variant="outlined"
        sx={{
          padding: "1rem",
          width: smDevice ? "100%" : "450px",
          margin: "0.5rem",
        }}
      >
        <Typography variant="h5">Join Session</Typography>
        <Box sx={{ margin: "0.5rem 0" }}>
          <TextField
            size="small"
            fullWidth
            label="Session ID"
            variant="outlined"
          />
        </Box>
        <Box sx={{ margin: "0.5rem 0" }}>
          <TextField
            size="small"
            fullWidth
            label="Your Name"
            variant="outlined"
          />
        </Box>
        <Button variant="outlined">Join</Button>
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          padding: "1rem",
          width: smDevice ? "100%" : "450px",
          margin: "1rem",
        }}
      >
        <Typography variant="h5">Create Session</Typography>

        <Box sx={{ margin: "0.5rem 0" }}>
          <FormControl fullWidth size="small">
            <InputLabel id="hely">Hey</InputLabel>
            <Select labelId="hely" id="hely" value={10} label="Hely">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ margin: "0.5rem 0" }}>
          <TextField
            size="small"
            fullWidth
            label="Session ID"
            variant="outlined"
          />
        </Box>
        <Box sx={{ margin: "0.5rem 0" }}>
          <TextField
            size="small"
            fullWidth
            label="Your Name"
            variant="outlined"
          />
        </Box>
        <Button variant="outlined">Create</Button>
      </Paper>
    </FlexMidWrapper>
  );
};

export default Home;
