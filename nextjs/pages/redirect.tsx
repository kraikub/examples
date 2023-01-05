import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { clientId, oauthClaimApi, secret } from "../config";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.query;
  const body = {
    code: code,
    client_id: clientId,
    client_secret: secret,
    grant_type: "authorization_code",
  };
  if (!code) {
    return {
      props: {
        data: undefined,
      },
    };
  }
  const res = await axios.post(oauthClaimApi, body);
  return {
    props: {
      data: res.data,
    },
  };
};

interface RedirectProps {
  data: any;
}

const Redirect: NextPage<RedirectProps> = ({ data }) => {
  return (
    <div
      style={{
        fontFamily: "monospace",
      }}
    >
      {JSON.stringify(data)}
    </div>
  );
};

export default Redirect;
