import { Link } from 'react-router-dom';
import { ProfileHeader } from "@/components/common/profileHeader/";
import { IUser } from '@/interface/services';
import { Role } from '@/interface/enums';



const menuOptions = [
    {
        id: 1,
        href: '/profile/about-me',
        label: 'Mis datos personales',
    },
    {
        id: 2,
        href: '/profile/about-me',
        label: 'Mi clínica',
    },
    {
        id: 3,
        href: '/profile/about-me',
        label: 'Favoritos',
    },
    {
        id: 4,
        href: '/profile/about-me',
        label: 'Mis contactos',
    },
];

interface IProps {
    style?: string;
    children?: React.ReactNode;
    user: IUser;
    viewport: number
}


export default function ProfileComponent({ style, children, user, viewport }: IProps) {
    return (
        <main className={`bg-white-bg pb-6 min-h-screen md:pb-10 ${style || ''}`}>
            <ProfileHeader
                data={{
                    name: `${user?.firstName} ${user?.lastName}`,
                    isOwner: true,
                }}
            >
                {
                    user?.role === Role.EXPERT ? (
                        <Link className='btn btn-primary text-sm mt-4 ml-auto mr-0 text-center' to={`/expert/${user?._id}`}>Ver mi perfil de experto</Link>
                    ) : null
                }
            </ProfileHeader>

            <hr className="my-6 md:mb-8 lg:mb-12 separator w-11/12 mx-auto max-w-[1200px]" />
            <div className="flex content-sections md:px-8 lg:gap-8">
                <div className="px-4 flex w-full flex-col gap-6 lg:max-w-xs lg:min-w-[288px] lg:px-0 sticky top-10 h-fit">
                    {menuOptions.map((item) => {
                        if (item.id === 2 && !!user?.expert?.id) return;
                        return (
                            <Link
                                to={item.href}
                                className="content-box md:px-5  flex justify-between items-center cursor-default hover:border-primary hover:shadow-input md:max-w-xl mx-auto w-full "
                                key={item.id}
                            >
                                <span className="font-bold text-sm md:text-base text-text-100">
                                    {item.label}
                                </span>
                                <img
                                    src="/assets/icons/chevron-right-icon.svg"
                                    width={8}
                                    height={15}
                                    alt="Flecha derecha"
                                />
                            </Link>
                        )
                    }
                    )}
                </div>
                {
                    viewport >= 1024 ? (
                        <div className="w-full">{children}</div>
                    ) : null
                }
            </div>
        </main>
    );
}
