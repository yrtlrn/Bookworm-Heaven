// Logo Import
import logoImage from "../../assets/logo.png";

const NavBar = () => {
  return (
    <header className="flex justify-between border-b-2">
      <section>
        <button className="flex flex-col items-center">
          <img
            src={logoImage}
            alt="Logo Image"
            height={50}
            width={50}
            className="items-center"
          />
          <h1 className="font-bold">Bookworm Heaven</h1>
        </button>
      </section>
      <section className="flex items-center">
        <button className="flex flex-col gap-2">
          <div className="bg-black w-9 h-1" />
          <div className="bg-black w-9 h-1" />
          <div className="bg-black w-9 h-1" />
        </button>
      </section>
    </header>
  );
};
export default NavBar;
