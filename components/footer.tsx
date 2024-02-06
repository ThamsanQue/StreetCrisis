const Footer = () => {
  return (
    <footer className=" border-t ">
      <div className="mx-auto py-10">
        <p className="text-center text-sm text-black">
          © {new Date().getFullYear()}{" "}
          <span className="text-primary">StreetCrisis Store</span>. All rights
          reserved - Built by
          <a
            href="https://thamsanqaj-fea43.web.app/"
            target="_blank"
            rel="noreferrer"
            className="text-primary"
          >
            {" "}
            Thamsanqa J
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
