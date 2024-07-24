import Image from "next/image";
import { Button } from "@repo/ui/button";
import '@repo/ui/globalcss'
import { Bug } from "@repo/ui/bug";

export default function Home() {
  return (
    <div>
           <p className="bg-gray-500">hello from docs</p>
           <Bug/>
          </div>
  );
}
