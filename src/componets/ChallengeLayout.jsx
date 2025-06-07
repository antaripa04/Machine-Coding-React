import { NavLink, Outlet } from "react-router";

export const ChallengeLayout = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <NavLink to="/" className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800">
        ← Back to all challenges
      </NavLink>
      <Outlet />
    </div>
  );
};
