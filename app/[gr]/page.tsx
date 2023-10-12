"use client";
import Profile from "@/components/shared/Profile";
import Profilevisit from "@/components/shared/Profilevisit";
import axios from "axios";
import { useEffect, useState } from "react";

type Params = {
  params: {
    gr: number;
  };
};

export default function Page({ params: { gr } }: Params) {
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const isUserResponse = await axios.post("/api/isUser", gr);
        const isUser = isUserResponse.data.isUser;
        const userData = isUserResponse.data.user;

        console.log(isUserResponse);

        setIsCurrentUser(isUser);
        setUserData(userData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [gr]);

  return (
    <>
      {isCurrentUser ? (
        userData ? (
          <Profile data={userData} />
        ) : null
      ) : userData ? (
        <Profilevisit data={userData} />
      ) : null}
    </>
  );
}
