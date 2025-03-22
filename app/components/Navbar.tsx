import Image from "next/image";
import Link from "next/link";
// import Logo from "@/public/logo.png";
import Logo from "@/public/invoicelogo.png";
import { RainbowButton } from "@/components/registry/magicui/rainbow-button";
import { Button } from "@/components/ui/button";
// import { RainbowButton } from "@/components/registry/magicui/rainbow-button";
// import { RainbowButton } from "@/components/ui/rainbow-button";



export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" className="size-10" />
        <h3 className="text-3xl font-semibold">
          Invoice<span className="text-blue-500">Management</span>
        </h3>
      </Link>
      <Link href="/login">
      <Button>Get Started</Button>
      </Link>
    </div>
  );
}