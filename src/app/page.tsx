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
        <Grid container sx={{ width: "100%", height: "1%", flexGrow: 1 }}>
          <Grid item sm={4} sx={{ height: "100%" }}>
            <RecentChats />
          </Grid>
          <Grid item sm={8} sx={{ height: "100%" }}>
            <ChatArea />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
