import TextField from "@mui/material/TextField";
import { input } from "../../types/input";

const Input: React.FC<input> = ({ text, handler, type }) => {
  return (
      <TextField
        id="outlined-basic"
        label={text}
        variant="outlined"
        onChange={handler}
        style={{width: '400px'}}
        type={type}
      />
  );
};

export default Input;
