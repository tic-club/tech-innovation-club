"use client";
import Resetpassword from "@/components/form/Resetpassword";

type Params = {
  params: {
    token: string;
  };
};

export default function page({ params: { token } }: Params) {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Resetpassword token={token} />
    </div>
  );
}
