import React from "react";
import { User } from "@/types";

type ProfileProps = {
  data: User;
};

const Profile: React.FC<ProfileProps> = ({ data }) => {
  return (
    <div>
      My Profile <h1>{data.first_name}</h1>
    </div>
  );
};

export default Profile;
