import Image from "next/image";
import { Button } from "@repo/ui/button";
import "@repo/ui/globalcss"
import { Bug } from "@repo/ui/bug";

export default function Home() {
  return (
    <div>

      <p className="bg-red-700">hello from web</p>
      <Bug/>
    </div>
  );
}


