import { useEffect, useState } from 'react';
import ProfileComponent from './components/profile.component';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStore } from '@/storage/store';

export default function Profile() {

    const [viewport, setViewport] = useState<number | null>(null);
    const user = useSelector((storage: AppStore) => storage.user)

    useEffect(() => {
        setViewport(window.innerWidth);
    }, []);

    if (!user._id) {
        return (
            <Navigate to={"/signin"} />
        )
    }
    return (
        !!viewport && viewport <= 1024 ? (
            <Outlet />
        ) : (
            <>
                <ProfileComponent user={user} viewport={viewport as number}>
                    <Outlet />
                </ProfileComponent>
            </>
        ));
}
