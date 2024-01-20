import { ThemeToggle } from "../theme";
import { MainNav } from "./main-nav";

const Navbar = () => {
  return (
    <div className="border-bottom">
      <div className="flex h-16 items-center px-4">
        {/* <StoreSwitcher items={stores} /> */}
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
