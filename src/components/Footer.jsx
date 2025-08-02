const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
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
        <p className="text-sm">
          © {new Date().getFullYear()} DevTinder. All rights reserved.
        </p>
      </aside>

      <nav className="flex gap-4 md:place-self-center md:justify-self-end">
        <a href="#" aria-label="Twitter" className="hover:opacity-80 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3c-.935.555-1.97.959-3.072 1.184A4.916 4.916 0 0 0 16.616 3c-2.736 0-4.956 2.223-4.956 4.957 0 .388.043.765.127 1.126C7.728 8.856 4.1 6.87 1.671 3.901a4.93 4.93 0 0 0-.667 2.49c0 1.72.875 3.236 2.205 4.124a4.904 4.904 0 0 1-2.246-.619v.063c0 2.404 1.71 4.41 3.977 4.864a4.996 4.996 0 0 1-2.24.084c.631 1.963 2.462 3.392 4.63 3.433A9.873 9.873 0 0 1 0 19.539 13.951 13.951 0 0 0 7.548 21c9.057 0 14.01-7.504 14.01-14.01 0-.213-.005-.425-.014-.636A10.006 10.006 0 0 0 24 4.557z" />
          </svg>
        </a>
        <a href="#" aria-label="YouTube" className="hover:opacity-80 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M23.498 6.186a2.969 2.969 0 0 0-2.087-2.106C19.585 3.5 12 3.5 12 3.5s-7.585 0-9.411.58a2.969 2.969 0 0 0-2.087 2.106C0 8.012 0 12 0 12s0 3.988.502 5.814a2.969 2.969 0 0 0 2.087 2.106c1.826.58 9.411.58 9.411.58s7.585 0 9.411-.58a2.969 2.969 0 0 0 2.087-2.106C24 15.988 24 12 24 12s0-3.988-.502-5.814zM9.75 15.568V8.432L15.75 12l-6 3.568z" />
          </svg>
        </a>
        <a href="#" aria-label="Facebook" className="hover:opacity-80 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M22.675 0h-21.35C.592 0 0 .593 0 1.326v21.348C0 23.406.592 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.311h3.59l-.467 3.622h-3.123V24h6.116C23.408 24 24 23.406 24 22.674V1.326C24 .593 23.408 0 22.675 0z" />
          </svg>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
