import { Link, useLocation, useNavigate } from 'react-router-dom';

import MenuMobile from './menuMobile.component';
import MenuDesktop from './menuDesktop.component';

import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '@/storage/store';
import { IUser } from '@/interface/services/auth';
import { resetUser } from '@/storage/slice/user.slice';
import { useEffect } from 'react';

interface MenuList {
    label: string;
    href: string;
    icon?: string;
    id: number;
    private?: boolean;
}

const Links: MenuList[] = [
    
    {
        label: 'Buscar Expertos',
        href: '/find-experts',
        icon: 'search-expert',
        id: 9,
    },
    {
        label: 'Buscar Clínicas',
        href: '/find-clinics',
        icon: 'search-clinics',
        id: 10,
    },
    {
        label: 'Contacto',
        href: '/contact',
        id: 11,
    },
    {
        label: 'Mi perfil',
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
    const location = useLocation();

    const handleSignOut = () => {
        dispatch(resetUser());
        navigate("/");
    }

    return (
        <>
            <header className={`px-4 ${location.pathname === '/' ? 'bg-transparent absolute top-0 left-0 z-50 w-full py-4 md:py-4': 'bg-primary py-3 md:py-3'}`}>
                <div className="content-sections w-full flex justify-between items-center">
                    <div className="logo">
                        <Link to="/" className='flex gap-2 hover:opacity-70'>
                            <img
                                src="/assets/icons/fue-icon-transparent.svg"
                                width={100}
                                height={100}
                                alt="Logo Fue-lancers"
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
