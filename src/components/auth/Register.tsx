import { useForm } from "../../hooks/useForm";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export const Register = () => {
  const { handleRegisterWithCredentials } = useContext(AuthContext);

  const { handleChange, email, pass } = useForm({
    initialState: {
      email: "",
      pass: "",
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegisterWithCredentials(email, pass);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Create an account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            onChange={handleChange}
            value={email}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
          <input
            name="pass"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={pass}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
