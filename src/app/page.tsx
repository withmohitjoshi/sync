import { ChatArea, ConactsList, Header } from "@/components";
import { Box, Grid, Toolbar } from "@mui/material";

export default function HomePage() {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <Grid container sx={{ flexGrow: 1, width: "100%" }}>
          <Grid item sm={3} flexGrow={1}>
            <ConactsList />
          </Grid>
          <Grid item sm={9} flexGrow={1}>
            <ChatArea />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
