import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
	let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <>
            {
                isAuthenticated ? (element) : (<Navigate to='/' />)
            }
        </>
    )

}

export default PrivateRoute;