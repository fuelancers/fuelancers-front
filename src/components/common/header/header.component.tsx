import { Link, useNavigate } from 'react-router-dom';

import MenuMobile from './menuMobile.component';
import MenuDesktop from './menuDesktop.component';

import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '@/storage/store';
import { IUser } from '@/interface/services/auth';
import { resetUser } from '@/storage/slice/user.slice';

interface MenuList {
    label: string;
    href: string;
    icon: string;
    id: number;
    private?: boolean;
}

const Links: MenuList[] = [
    {
        label: 'Find experts',
        href: '/find-experts',
        icon: 'search-expert',
        id: 11,
    },
    {
        label: 'My profile',
        href: '/profile',
        icon: 'profile',
        private: true,
        id: 12,
    },
];
// private: true,

export default function Header() {
    const dispatch = useDispatch();
    const user: IUser = useSelector((storage: AppStore) => storage.user);
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(resetUser());
        navigate("/");
    }

    return (
        <>
            <header className="px-4 md:px-8 py-2 md:py-4 bg-primary">
                <div className="content-sections w-full flex justify-between items-center">
                    <div className="logo">
                        <Link to="/" className='flex gap-2'>
                            <img
                                src="/assets/icons/fue-icon.svg"
                                width={100}
                                height={100}
                                alt="Logo FUElancers"
                            />
                            {/* <h3 className="font-bold text-lg text-white">THRICOS</h3> */}
                        </Link>
                    </div>

                    <MenuDesktop links={Links} isLogged={!!user._id} handleSignOut={handleSignOut} />

                    <MenuMobile links={Links} isLogged={!!user._id} />
                </div>
            </header>
        </>
    );
}
