import { MenuList } from '@/interface/generics/';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../../../layouts/sidebar/sidebar.component';
import { IUser } from '@/interface/services';
import { useSelector } from 'react-redux';
import { AppStore } from '@/storage/store';

interface IProps {
    links: MenuList[];
    isLogged: boolean;
}

function MenuMobile({ links, isLogged }: IProps) {
    const [nav, setNav] = useState<boolean>(false);
    const user: IUser = useSelector((storage: AppStore) => storage.user);

    const handleChangeNav = () => setNav(!nav);

    const handleCloseNav = () => setNav(false);

    return (
        <>
            <div className="nav lg:cursor-pointer lg:hidden" onClick={handleChangeNav}>
                <img src="/assets/icons/menu-icon.svg" height={18} width={18} alt="Menú" />
            </div>
            {nav ? (
                <Sidebar onClose={handleCloseNav} label="Menú">
                    <ul className="list-none p-0 flex gap-6 flex-col h-[75%]">
                        {links.map((item) => {
                            if (!isLogged && item.private) return null;

                            return (
                                <li
                                    className="text-text-100 hover:text-primary"
                                    key={item.id}
                                    onClick={handleCloseNav}
                                >
                                    <Link to={item.href === "/expert" ? `/expert/${user._id}` : item.href}>
                                        {/* <span className=" inline-block mr-3 align-middle">
                                        {item.icon ? <img
                                                src={`/assets/icons/${item.icon}-icon.svg`}
                                                height={24}
                                                width={24}
                                                alt="Ícono de inicio de sesión"
                                            /> : <div className="w-[24px] h-[24px]"></div>}
                                        </span> */}
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-auto">
                        {!isLogged ? (
                            <Link
                                to="/signin"
                                className="text-sm"
                                onClick={handleChangeNav}
                            >
                                <span className=" inline-block mr-2 align-middle">
                                    <img
                                        src="/assets/icons/signin-icon.svg"
                                        height={20}
                                        width={20}
                                        alt="Ícono de inicio de sesión"
                                    />
                                </span>
                                Iniciar sesión
                            </Link>
                        ) : (
                            <button className="text-alert-danger text-sm ">
                                <span className=" inline-block mr-2 align-middle">
                                    <img
                                        src="/assets/icons/signout-icon.svg"
                                        height={20}
                                        width={20}
                                        alt="Ícono de inicio de sesión"
                                    />
                                </span>
                                Cerrar sesión
                            </button>
                        )}
                    </div>
                </Sidebar>
            ) : null}
        </>
    );
}

export default MenuMobile;
