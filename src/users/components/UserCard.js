import React, { useContext, useEffect, useState } from "react";

import "./UserCard.css";
import { AuthContext } from "../../shared/context/auth-context";

const UserCard = (props) => {
  const auth = useContext(AuthContext);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const loadPdf = async () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + auth.token);
      const response = await fetch(
        `${process.env.REACT_APP_USER_ROUTE}/pdf/${auth.userId}`,
        {
          method: "GET",
          headers: myHeaders,
        }
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };
    loadPdf();
  }, [auth.userId, auth.token]);

  return (
    <div className="user-item">
      <div className="user-item__content">
        <div className="user-item__image">
          <h3>{props.name[0].toUpperCase()}</h3>
        </div>
        <div className="user-item__info">
          <h2>{props.name}</h2>
          <h3>{props.email}</h3>
        </div>
      </div>
      <div className="pdf-viewer">
        {pdfUrl && (
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer"><button>View Resume</button></a>
        )}
      </div>
    </div>
  );
};

export default UserCard;
