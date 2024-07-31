"use client";
import React from "react";
import { BoxLayout } from "@/components";
import { Box, Divider, Tab, Tabs } from "@mui/material";
import { ContactsList } from "./components/ContactsList";
import { RequestReceivedList } from "./components/RequestReceivedList";
import { RequestSentList } from "./components/RequestSentList";

const ViewRequests = () => {
  const [value, setValue] = React.useState(1);
  return (
    <BoxLayout>
      <Box sx={{ height: "60vh", overflowY: "auto" }}>
        <Tabs
          variant="fullWidth"
          centered
          value={value}
          onChange={(_, i) => setValue(i)}
          sx={{ borderBottom: 0, borderColor: "divider" }}
        >
          <Tab label="My Contacts" value={1} />
          <Tab label="Request received" value={2} />
          <Tab label="Request sent" value={3} />
        </Tabs>
        <Divider />
        {value === 1 && <ContactsList />}
        {value === 2 && <RequestReceivedList />}
        {value === 3 && <RequestSentList />}
      </Box>
    </BoxLayout>
  );
};

export default ViewRequests;
