import Navbar from './Navbar';
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="page-not-found">
            <Navbar />
            <div className="content">
                <h1>Apologies!</h1>
                <p>Page not found.</p>
                <Link to="/">Return to the Home Page</Link>
            </div>
        </div>
    );
}
 
export default PageNotFound;