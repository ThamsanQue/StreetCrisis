const Footer = () => {
  return (
    <footer className=" border-t ">
      <div className="mx-auto py-10">
        <p className="text-center text-sm text-black">
          © {new Date().getFullYear()}{" "}
          <span className="text-primary">StreetCrisis Store</span>. All rights
          reserved - Powered by
          <a
            href="https://openkommerce.africa"
            target="_blank"
            rel="noreferrer"
            className="text-primary"
          >
            {" "}
            OpenKommerce
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
