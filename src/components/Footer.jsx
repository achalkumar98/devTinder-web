const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-gray-900 text-gray-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-2">
      <aside className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="fill-current"
          aria-label="logo"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
        </svg>
        <p className="text-sm text-center sm:text-left">
          © {new Date().getFullYear()} DevTinder. All rights reserved.
        </p>
      </aside>

      <nav className="flex gap-4">
        {/* Social icons can go here */}
      </nav>
    </footer>
  );
};

export default Footer;
