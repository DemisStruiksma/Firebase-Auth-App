import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-secondary">
            <h1 className="text-4xl text-body">Url was not found.</h1>
            <p className="text-body">Go back to the <Link to="/" className="text-primary hover:underline">home page</Link></p>
        </div>
    )
}

export default NotFound;