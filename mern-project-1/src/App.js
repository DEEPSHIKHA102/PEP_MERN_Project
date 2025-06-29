import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Applayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import axios from "axios";
import Logout from "./pages/Logout";
import Error from "./pages/Error";
import { serverEndpoint } from "./config/config";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "./redux/user/actions";
 import UserLayout from "./layout/UserLayout";

function App() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.post(
          `${serverEndpoint}/auth/is-user-logged-in`,
          {},
          { withCredentials: true }
        );
        dispatch({
          type: SET_USER,
          payload: response.data.user,
        });
      } catch (error) {
        console.log("User not logged in:", error);
      }
    };

    checkLogin();
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          userDetails ? <UserLayout>
<Navigate to='/dashboard' />
</UserLayout> :
            <Applayout>
              <Home />
            </Applayout>
          
        }
      />
      <Route
        path="/login"
        element={
          userDetails ? 
          <UserLayout>
 <Dashboard />
</UserLayout> :

            <Applayout>
              <Login />
            </Applayout>
          
        }
      />
      <Route
        path="/register"
        element={
          userDetails ? 
            <Navigate to="/dashboard" />:
          
            <Applayout>
              <Register />
            </Applayout>
          
        }
      />
      <Route
        path="/dashboard"
        element={userDetails ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/logout"
        element={userDetails ? <Logout /> : <Navigate to="/login" />}
      />
      <Route
        path="/error"
        element={
          userDetails ?
          <UserLayout>
 <Error />
</UserLayout> :
            <Applayout>
              <Error />
            </Applayout>
          
        }
      />
    </Routes>
  );
}

export default App;
