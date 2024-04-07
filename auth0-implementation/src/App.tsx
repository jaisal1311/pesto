import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Todos from "./components/Todos";

function App() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="App" style={{padding: "16px"}}>
      {/* <div className="banner" /> */}
        {isLoading && <h1>Loading ...</h1>}
        {!isAuthenticated ? (
          <div>
            <button className="button" onClick={() => loginWithRedirect()}>
              Log In
            </button>
          </div>
        ) : (
          <Todos />
        )}
    </div>
  );
}

export default App;
