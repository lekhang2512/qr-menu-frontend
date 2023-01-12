import * as React from 'react'
import Snackbar from "@mui/material/Snackbar"
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { hide } from '../../features/notify/notify-slice'
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export interface NotifyProps {
}

export default function Notify (props: NotifyProps) {
	const notifyState = useAppSelector((state) => state.notify)
	const dispatch = useAppDispatch()

	const handleClose = () => {
        dispatch(dispatch(hide()));
    }

	return (
		<Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={notifyState.active}
            onClose={handleClose}
            autoHideDuration={5000}
            key={`ogo-snackbar`}
            classes={{ root: "ogo-snackbar" }}
        >
			<Alert onClose={handleClose} severity={notifyState.severity} sx={{ width: '100%' }}>
				{notifyState.content}
			</Alert>
		</Snackbar>
	)
}
