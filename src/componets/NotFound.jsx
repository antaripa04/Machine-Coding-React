import { NavLink } from "react-router";

const NotFound = () => {
  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <h1 className="text-4xl font-bold mb-6">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <NavLink to="/" className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800">
        ← Back to all challenges
      </NavLink>
    </div>
  );
};

export default NotFound;
