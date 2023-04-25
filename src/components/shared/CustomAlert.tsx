import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useAppSelector } from "../../hooks";
import { useAppDispatch } from "../../hooks";
import { useState, useEffect } from "react";
import { setAlert, unsetAlert } from "../alert/alert.slice";
interface errorAlert {
  errorMessage? : string
}

export const CustomAlert: React.FC<errorAlert> = () => {
  const dispatch = useAppDispatch();
  const alertStatus = useAppSelector((state) => state.alert);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(alertStatus.open)
  useEffect(() => {
    setIsError(alertStatus.isError);
    setMessage(alertStatus.message);
    setOpen(alertStatus.open)
    setTimeout(()=>{
      dispatch(unsetAlert())
    },8000)
  }, [alertStatus]);
  return (
    <>
      {open ? (
        <Stack sx={{ width: "100%" }}>
          <Alert severity={isError ? "error" : "success"}>{message}</Alert>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};
