import { Header } from "@/components";
import { Box, Grid, Toolbar } from "@mui/material";

export default function HomePage() {
  return (
    <>
      <Header />
      <Box component="main" sx={{ py: 1, px: 3, width: "100%" }}>
        <Toolbar />{" "}
        {/* empty toolbar to get the heigt of a toolbar cause toolbar is not static */}
        <Box display="flex">
          <Grid container spacing={2}>
            <Grid item sm={3}>
              <Box>Chat list</Box>
            </Grid>
            <Grid item sm={9}>
              <Box>Chat Area</Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
