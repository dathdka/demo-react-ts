import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useAppSelector } from "../../hooks";
import { useAppDispatch } from "../../hooks";
import { useState, useEffect } from "react";
import { unsetAlert } from "../alert/alert.slice";
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
    const turnOffAlert = () => setTimeout(()=>{
      dispatch(unsetAlert())
    },8000)
    turnOffAlert()
    clearTimeout(turnOffAlert())
  }, [alertStatus]);
  return (
    <>
      {open ? (
        <Stack sx={{ width: "100%", position: 'fixed', alignItems : 'end'}}>
          <Alert severity={isError ? "error" : "success"}>{message}</Alert>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};
