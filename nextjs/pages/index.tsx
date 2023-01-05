import { CSSProperties } from "react";
import { clientId, redirectUri, signinUrl } from "../config";

function mapQueryStringToUrl(base: string, query: { [key: string]: any }) {
  let result = base + "?";
  const queryKeys = Object.keys(query);
  for (const key of queryKeys) {
    result += `&${key}=${query[key]}`;
  }
  return result;
}

// Just a CSS properties -- please ignore them.

const containerStyles: CSSProperties = {
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const buttonStyles: CSSProperties = {
  height: "60px",
  padding: "5px 20px",
  cursor: "pointer",
  borderRadius: "8px",
  fontSize: "18px",
  border: "none",
  backgroundColor: "#4FD1C5",
  fontWeight: 500,
};

export default function Home() {
  function redirectToSignIn() {
    location.href = mapQueryStringToUrl(signinUrl, {
      client_id: clientId,
      scope: "openid%20student%20educations",
      redirect_uri: redirectUri,
      response_type: "code",
    });
  }

  return (
    <>
      <div style={containerStyles}>
        <button style={buttonStyles} onClick={redirectToSignIn}>
          Sign in with KU
        </button>
      </div>
    </>
  );
}
