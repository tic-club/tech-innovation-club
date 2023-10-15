"use client";

import { UserCircle2 } from "lucide-react";
import { Badge } from "../ui/badge";

interface Props {
  first_name: string;
  last_name: string;
  gr_no: string;
  branch: string;
  email: string;
}

export default function UserCard({
  first_name,
  last_name,
  gr_no,
  branch,
  email,
}: Props) {
  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <div className="relative h-12 w-12">
          <UserCircle2 height={40} width={40} />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">
            {first_name} {last_name}
          </h4>
          <p className="text-small-medium text-gray-1">
            @{gr_no} | {email}
          </p>
        </div>
        <Badge variant="default" className="hidden md:block">
          {branch}
        </Badge>
      </div>
    </article>
  );
}
