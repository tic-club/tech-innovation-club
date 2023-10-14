import React from "react";
import { User } from "@/types";

type ProfileProps = {
  data: User;
};

const Profilevisit: React.FC<ProfileProps> = ({ data }) => {
  return (
    <div className=" gap-4">
      <h1 className=" text-5xl">User Profile</h1>
      <h1 className=" text-xl">
        {data.first_name} {data.last_name}
      </h1>
      <h1 className=" text-xl">{data.email}</h1>
      <h1 className=" text-xl">{data.gender}</h1>
    </div>
  );
};

export default Profilevisit;
