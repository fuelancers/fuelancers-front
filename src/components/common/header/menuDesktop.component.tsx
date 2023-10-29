import { Link } from 'react-router-dom';
import { MenuList } from '@/interface/generics/';

interface IProps {
    links: MenuList[];
    isLogged: boolean;
    handleSignOut?: () => void
}

function MenuDesktop({ links, isLogged, handleSignOut }: IProps) {

    return (
        <div>
            <ul className="hidden lg:flex gap-6 ">
                {links.map((item) => {
                    if (!isLogged && item.private) return null;
                    return (
                        <li key={item.id} className="text-white" >
                            <span className="inline-block mr-2 align-middle">
                                <img
                                    src={`/assets/icons/w-${item.icon}-icon.svg`}
                                    height={20}
                                    width={20}
                                    alt="Sign in icon"
                                />
                            </span>
                            <Link to={item.href}  className="text-[14px]">{item.label}</Link>
                        </li>
                    );
                })}

                {!isLogged ? (
                    <div>
                        <Link
                            to="/signup"
                            className="text-white text-sm font-bold py-2 px-6 rounded-xl bg-secondary hover:bg-secondary-hover duration-300"
                        >
                            Create my account
                        </Link>
                        <Link to="/signin" className="text-white text-[14px]">
                            <span className=" inline-block mr-2 align-middle">
                                <img
                                    src="/assets/icons/signin-icon.svg"
                                    height={20}
                                    width={20}
                                    alt="Sign in icon"
                                />
                            </span>
                            Sign in
                        </Link>
                    </div>
                ) : (
                    <button className="text-alert-danger text-sm " onClick={handleSignOut}>
                        <span className=" inline-block mr-2 align-middle">
                            <img
                                src="/assets/icons/signout-icon.svg"
                                height={20}
                                width={20}
                                alt="Sign up icon"
                            />
                        </span>
                    </button>
                )}
            </ul>
        </div>
    );
}

export default MenuDesktop;
