"use client";
import { BoxLayout } from "@/components";
import { Divider, Tab, Tabs } from "@mui/material";
import React from "react";
import { ContactsList } from "./components/ContactsList";
import { RequestReceivedList } from "./components/RequestReceivedList";
import { RequestSentList } from "./components/RequestSentList";

export type ContactListT = {
  _id: string;
  username: string;
};

const ViewRequests = () => {
  const [value, setValue] = React.useState(1);
  return (
    <BoxLayout>
      <>
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
      </>
    </BoxLayout>
  );
};

export default ViewRequests;
