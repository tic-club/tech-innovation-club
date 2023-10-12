import React from "react";
import { User } from "@/types";

type ProfileProps = {
  data: User;
};

const Profile: React.FC<ProfileProps> = ({ data }) => {
  return (
    <div>
      My Profile <h1>{data.first_name}</h1>
      <h1>{ data.last_name}</h1>
      <h1>{data.email}</h1>
      <h1>{data.gender}</h1>
    </div>
  );
};

export default Profile;
