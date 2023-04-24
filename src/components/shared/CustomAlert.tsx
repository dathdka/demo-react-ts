import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useAppSelector } from "../../hooks";
import { useState, useEffect } from "react";
import { store } from "../../redux/store";

export const CustomAlert: React.FC = () => {
  const alertStatus = useAppSelector((state) => state.alert);
  const [isError, setIsError] = useState(alertStatus.isError);
  const [message, setMessage] = useState(alertStatus.message);
  useEffect(() => {
    setIsError(alertStatus.isError);
    setMessage(alertStatus.message);
  }, [alertStatus]);

  return (
    <>
      {isError ? (
        <Stack sx={{ width: "100%" }}>
          <Alert severity={isError ? "error" : "success"}>{message}</Alert>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};
