import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const SearchTextField = styled(TextField)({
  "& label": {
    color: "#950101",
  },
  "& label.Mui-focused": {
    color: "#FF0000",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#3D0000",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#3D0000",
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: "#950101",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FF0000",
    },
  },
});

export default SearchTextField;
