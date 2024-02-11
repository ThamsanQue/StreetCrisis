import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCollections from "@/actions/get-collections";
import NavbarActions from "./navbar-actions";
import Image from "next/image";
import SClogo from "../Assets/scLogo.png";

const Navbar = async () => {
  const collections = await getCollections();

  return (
    <div className="">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/home" className="ml-4 flex lg:ml-0 gap-x-2">
            <Image
              src={SClogo}
              alt="logo"
              fill
              className="rounded-md w-10 h-10"
            />
          </Link>
          <MainNav data={collections} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
