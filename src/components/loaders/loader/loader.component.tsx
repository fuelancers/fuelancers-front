'use-client';
import { createPortal } from 'react-dom';

import '../../../styles/loader.styles.scss';

interface IProps {
    loading: boolean;
}

function Loader({ loading = true }: IProps) {
    if (!loading) {
        return null;
    }

    return createPortal(
        <div className="loader fixed h-screen w-screen inset-0 z-20">
            <div className="content-loader inline-block absolute w-60 h-20 z-50  ">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
            <div className="overlay w-screen absolute z-40 insert-0 h-screen bg-text-90 opacity-25" />
        </div>,
        document.querySelector('#modals') as HTMLElement
    );
}

export default Loader;
