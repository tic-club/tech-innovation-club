import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative w-80">
        <Skeleton
          className="absolute top-0 right-0 mt-1 mr-2"
          style={{ width: "28px", height: "28px" }}
        />
      </div>

      <div className="mt-14 flex flex-col gap-9">
        <Skeleton className="h-8 w-24" />
        <div className="cursor-pointer">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
        <div className="cursor-pointer">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
