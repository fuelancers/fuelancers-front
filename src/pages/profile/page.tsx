import { useEffect, useState } from 'react';
import ProfileComponent from './components/profile.component';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStore } from '@/storage/store';

export default function Profile() {

    const [viewport, setViewport] = useState<number | null>(null);
    const user = useSelector((storage: AppStore) => storage.user)
    
    useEffect(() => {
        setViewport(window.innerWidth);
    }, []);

    return (
        <>
            {
                !!viewport && viewport <= 1024 ? (
                    <ProfileComponent user={user} viewport={viewport} />
                ) : (
                    <div>
                        <h3 className='text-center'>¡Edita tu perfil aquí!</h3>
                    </div>
                )
            }
        </>

    )
}
