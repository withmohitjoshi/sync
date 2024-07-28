"use client";
import { dispatchAddAlert } from "@/helpers/customevents";
import theme from "@/theme/theme.config";
import { Alert, AlertProps, Box, Snackbar } from "@mui/material";
import { createContext, useCallback, useEffect, useState } from "react";

export type AlertBoxT = AlertProps & {
  timestamp: number;
  message: string;
  closesIn?: number;
};

type AlertContextT = {
  addAlert: (_: Omit<AlertBoxT, "timestamp">) => void;
};

export const AlertContext = createContext<AlertContextT>({
  addAlert: () => {},
});

export class GenerateAlert {
  constructor(_: Omit<AlertBoxT, "timestamp">) {
    dispatchAddAlert(_);
  }
  static onSuccess(message: string) {
    new GenerateAlert({
      message,
      severity: "success",
    });
  }
}

export const AlertProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [alerts, setAlerts] = useState<AlertBoxT[]>([]);

  const addAlert = (_: Omit<AlertBoxT, "timestamp">) => {
    setAlerts((prev) => [...prev, { ..._, timestamp: Date.now() }]);
  };

  const handleClearAlert = useCallback((index: number) => {
    setAlerts((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <Snackbar open={alerts.length > 0}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(2),
            width: "100%",
          }}
        >
          {alerts.map((alert: AlertBoxT, index: number) => {
            return (
              <AlertBox
                key={index}
                {...alert}
                clearAlert={() => handleClearAlert(index)}
              />
            );
          })}
        </Box>
      </Snackbar>
    </AlertContext.Provider>
  );
};

const AlertBox = ({
  clearAlert,
  message,
  timestamp,
  closesIn = 2500,
  ...rest
}: AlertBoxT & { clearAlert: () => void }) => {
  useEffect(() => {
    const elapsedTime = Date.now() - timestamp;
    const remainingTime = Math.max(closesIn - elapsedTime, 0);
    const id = setTimeout(() => {
      clearAlert();
    }, remainingTime);
    return () => clearTimeout(id);
  }, [clearAlert, timestamp, closesIn]);

  return (
    <Alert
      onClose={() => clearAlert()}
      variant="filled"
      sx={{ width: "100%" }}
      {...rest}
    >
      {message}
    </Alert>
  );
};
