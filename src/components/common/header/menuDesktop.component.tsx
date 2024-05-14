import { Link, useLocation } from "react-router-dom";
import { MenuList } from "@/interface/generics/";
import { IUser } from "@/interface/services";
import { useSelector } from "react-redux";
import { AppStore } from "@/storage/store";

interface IProps {
  links: MenuList[];
  isLogged: boolean;
  handleSignOut?: () => void;
}

function MenuDesktop({ links, isLogged, handleSignOut }: IProps) {
  const location = useLocation();
  const user: IUser = useSelector((storage: AppStore) => storage.user);

  return (
    <>
      <ul className="hidden lg:flex gap-8 items-center">
        {links.map((item) => {
          if (!isLogged && item.private) return null;
          return (
            <li key={item.id} className="text-white hover:opacity-70">
              {item.icon && (
                <span className="inline-block mr-2 align-middle">
                  <img
                    src={`/assets/icons/w-${item.icon}-icon.svg`}
                    height={20}
                    width={20}
                    alt="Ícono de inicio de sesión"
                  />
                </span>
              )}
              <Link
                to={item.href === "/expert" ? `/expert/${user._id}` : item.href}
                className="text-[14px]"
              >
                {item.label}
              </Link>
            </li>
          );
        })}

        {!isLogged ? (
          <>
            <Link
              to="/signup"
              className={`text-[.875rem] rounded-[2rem] font-bold py-2 px-7 ${
                location.pathname !== "/"
                  ? "text-[#18C29C] bg-white hover:opacity-70"
                  : "text-white bg-secondary hover:bg-secondary-hover"
              } duration-300`}
            >
              Crear mi cuenta
            </Link>
            <Link
              to="/signin"
              className="text-white text-[14px] hover:opacity-70"
            >
              <span className=" inline-block mr-2 align-middle">
                <img
                  src="/assets/icons/signin-icon-white.svg"
                  height={20}
                  width={20}
                  alt="Ícono de inicio de sesión"
                />
              </span>
              Iniciar sesión
            </Link>
          </>
        ) : (
          <button
            className="text-alert-danger text-sm hover:opacity-70"
            onClick={handleSignOut}
          >
            <span className=" inline-block mr-2 align-middle">
              <img
                src="/assets/icons/signout-icon-white.svg"
                height={20}
                width={20}
                alt="Ícono de cerrar sesión"
              />
            </span>
          </button>
        )}
      </ul>
    </>
  );
}

export default MenuDesktop;
