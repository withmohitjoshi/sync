import { Box, Grid, Toolbar } from "@mui/material";
import { ChatArea, Header, RecentChats } from "./components";

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
          <Grid item sm={4} flexGrow={1}>
            <RecentChats />
          </Grid>
          <Grid item sm={8} flexGrow={1}>
            <ChatArea />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
