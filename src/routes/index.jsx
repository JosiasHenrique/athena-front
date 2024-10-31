import { BrowserRouter } from "react-router-dom";
import OtherRoutes from "./OtherRoutes";
import AuthRoutes from "./AuthRoutes";
import { useAuth } from "../context/AuthContext";

export function Routes(){   
    const { user } = useAuth();   

    return(
        <BrowserRouter>
            { user ? <OtherRoutes /> : <AuthRoutes /> }
        </BrowserRouter>
    )
}