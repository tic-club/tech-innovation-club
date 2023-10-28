import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

export default function Profilecertificatecard() {
  return (
    <div className="md:grid md:grid-cols-2 md:grid-rows-1 md:gap-4">
      <Card className="">
        <CardHeader>
          <CardTitle>The Complete 2023 Web Development Bootcamp</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <Button className="w-full">View</Button>
        </CardFooter>
      </Card>
      <Card className="">
        <CardHeader>
          <CardTitle>The Complete 2023 Web Development Bootcamp</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <Button className="w-full">View</Button>
        </CardFooter>
      </Card>
      <Card className="">
        <CardHeader>
          <CardTitle>The Complete 2023 Web Development Bootcamp</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <Button className="w-full">View</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
