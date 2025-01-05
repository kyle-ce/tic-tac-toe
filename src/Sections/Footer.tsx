const Footer = () => (
  <footer className="absolute flex justify-center items-center bottom-0 py-4 bg-[#333] w-full text-slate-300 text-sm">
    <p>
      Music: "Fast" by Zé Trigueiros, from{" "}
      <a
        className="text-blue-500 hover:underline"
        href="https://freemusicarchive.org/music/Z_Trigueiros/Sombra/02_ze_trigueiros_-_fast/"
        target="_blank"
      >
        Free Music Archive
      </a>
      . Licensed under{" "}
      <a
        className="text-blue-500 hover:underline"
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
        target="_blank"
        rel="noopener noreferrer"
      >
        CC BY-NC-SA
      </a>
      .
    </p>
  </footer>
);

export default Footer;
