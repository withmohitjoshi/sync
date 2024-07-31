import theme from "@/theme/theme.config";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export const ContactListItemBox = ({
  contact,
  isActionButton = true,
  handleRenderActionButton,
}: {
  contact: { username: string; _id: string };
  isActionButton?: boolean;
  handleRenderActionButton: (_: any) => React.ReactNode;
}) => {
  const { username } = contact;
  return (
    <ListItem
      secondaryAction={
        isActionButton ? handleRenderActionButton(contact) : <></>
      }
      sx={{
        "&:hover": {
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          cursor: "pointer",
        },
      }}
    >
      <ListItemAvatar>
        <Avatar>{username[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={username} />
    </ListItem>
  );
};
