import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { AppRouter } from "./routes/AppRouter";

const App = () => {
  const { status } = useContext(AuthContext);

  if (status === "checking") {
    return (
      <p className="loading">
        <span>Checking credentials, wait a moment...</span>
      </p>
    );
  }

  return <AppRouter />;
};

export default App;
