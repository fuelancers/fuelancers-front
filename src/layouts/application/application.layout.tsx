import Header from '@/components/common/header/header.component'
import WhatsappFloatingButton from '@/components/common/whatsappFloatingButton'
import Loader from '@/components/loaders/loader/loader.component'
import { AppStore } from '@/storage/store'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

function Application() {

    const general = useSelector((storage: AppStore) => storage.general);

    return (
        <>
            <Header />
            <Outlet />
            <WhatsappFloatingButton />
            <Loader loading={general.loading_page} />
        </>
    )
}

export default Application