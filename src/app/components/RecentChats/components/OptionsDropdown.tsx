import React, { useRef } from "react";
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useRouter } from "next/navigation";

export const OptionsDropdown = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const handleClose = () => setOpen(false);
  return (
    <>
      <IconButton ref={ref} onClick={() => setOpen((p) => !p)}>
        <MoreVertRoundedIcon />
      </IconButton>
      <Popper
        open={open}
        placement="bottom-end"
        anchorEl={ref.current}
        transition
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "top right",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  <MenuItem onClick={() => router.push("/view-requests")}>
                    View Requests
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
