import { Sidebar } from "@/components";
import { MenuOpen } from "@mui/icons-material";
import { Box, Grid, IconButton } from "@mui/material";

export default async function HomePage() {
  return (
    <Box display="flex" height="100vh" gap={2}>
      <Box flexGrow={0}>
        <Sidebar />
      </Box>
      <Box flexGrow={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box>Chat list</Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box>Chat Area</Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
