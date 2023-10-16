"use client";

import { UserCircle2, VerifiedIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";

interface Props {
  first_name: string;
  last_name: string;
  gr_no: string;
  branch: string;
  email: string;
  admin: boolean;
}

export default function UserCard({
  first_name,
  last_name,
  gr_no,
  branch,
  email,
  admin,
}: Props) {
  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <div className="relative h-12 w-12">
          <UserCircle2 height={40} width={40} />
        </div>

        <div className="flex-1 text-ellipsis cursor-pointer">
          <h4 className="text-base-semibold text-light-1 flex items-center gap-1">
            {first_name} {last_name}{" "}
            {admin ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <VerifiedIcon
                      height={20}
                      width={20}
                      color="#049fec"
                      strokeWidth={3}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Verified</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              ""
            )}
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
