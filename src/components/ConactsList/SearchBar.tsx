import { Box, InputBase } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { USERNAME_MAX_LENGTH, USERNAME_REGEX } from "@/helpers/constants";
import { useState } from "react";

const Search = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.paper, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.paper, 0.5),
  },
  width: "100%",
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search by username"
        inputProps={{ maxLength: USERNAME_MAX_LENGTH }}
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      {/* searched contacts will be here */}
    </Search>
  );
};
