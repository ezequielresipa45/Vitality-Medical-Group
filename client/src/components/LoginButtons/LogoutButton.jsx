import { useAuth0 } from "@auth0/auth0-react";
import { logoutLogin } from "../../redux/actions"
import { useDispatch } from "react-redux"

const LogoutButton = () => {
    const { logout } = useAuth0();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutLogin());
        logout({
                logoutParamns: 
                    { 
                        returnTo: window.location.origin 
                    }
                })
    }

    return(
        <button onClick={logoutHandler}>
            Logout
        </button>
    )
}

export default LogoutButton