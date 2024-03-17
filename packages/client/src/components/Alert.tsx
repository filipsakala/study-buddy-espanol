import { Close } from "@mui/icons-material";
import { Alert as MUIAlert, Collapse, IconButton } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  severity?: "error";
  message: string;
  open?: boolean;
  className?: string;
};

const Alert = ({
  severity = "error",
  message,
  open: attrOpen = false,
  className,
}: Props) => {
  const [open, setOpen] = useState<boolean>(attrOpen);

  useEffect(() => {
    setOpen(attrOpen);
  }, [attrOpen]);

  return (
    <Collapse in={open} className={className}>
      <MUIAlert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </MUIAlert>
    </Collapse>
  );
};

export default Alert;
