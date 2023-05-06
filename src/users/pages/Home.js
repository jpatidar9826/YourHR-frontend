import React, { useContext, useEffect, useState } from "react";

import "./Home.css";
import Footer from "../../shared/components/Footer/Footer";
import { AuthContext } from "../../shared/context/auth-context";
import UserCard from "../components/UserCard";

const Home = () => {
  const auth = useContext(AuthContext);
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    if (!!auth.token) {
      const fetchUsers = async () => {
        try {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer " + auth.token);
          const response = await fetch(
            `${process.env.REACT_APP_USER_ROUTE}/${auth.userId}`,
            {
              method: "GET",
              headers: myHeaders,
            }
          );
          const responseData = await response.json();
          setLoadedUsers(responseData.user);
        } catch (err) {}
      };
      fetchUsers();
    }
  }, [auth.userId, auth.token]);

  return (
    <React.Fragment>
      <div className="home-content-wrap">
        {auth.isLoggedIn && loadedUsers ? (
          <UserCard name={loadedUsers.name} email={loadedUsers.email} resume={loadedUsers.resume} />
        ): <h1>Not logged in, try login or sign up first</h1>}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
