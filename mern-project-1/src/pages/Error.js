import { Link } from "react-router-dom"
function Error(){
    return(
        <div className="container text-center">
            <h1>Something wnet wrong</h1>
            <Link to="/">Go Home Page</Link>
        </div>
    );
}

export default Error;