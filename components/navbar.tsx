import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCollections from "@/actions/get-collections";
import NavbarActions from "./navbar-actions";

const Navbar = async () => {
  const collections = await getCollections();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">Store</p>
          </Link>
          <MainNav data={collections} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
