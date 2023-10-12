import React from "react";
import { User } from "@/types";

type ProfileProps = {
  data: User;
};

const Profilevisit: React.FC<ProfileProps> = ({ data }) => {
  return (
    <div>
      Users Profile <h1>{data.first_name}</h1>
    </div>
  );
};

export default Profilevisit;
