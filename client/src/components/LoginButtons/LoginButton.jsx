import { useAuth0 } from "@auth0/auth0-react";
import LoginIcon from '@mui/icons-material/Login';
import { IconButton, Tooltip } from "@mui/material";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();


    return(

        <Tooltip title='Log In'>
            <IconButton onClick={() => loginWithRedirect()}>
                <LoginIcon sx={{ fontSize: 30 }}/>
            </IconButton>
        </Tooltip>

    );
};

export default LoginButton;