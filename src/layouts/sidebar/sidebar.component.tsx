import './sidebar.scss';

interface IProps {
    onClose: () => void;
    label: string;
    children: React.ReactNode;
}

export default function Sidebar({ onClose, children, label }: IProps) {
    const handleClose = () => {
        // TODO: close animate nav

        // add class to close nav
        const nav = document.querySelector('#content-nav');
        const overlay = document.querySelector('#overlay');

        nav?.classList.add('close-nav');
        overlay?.classList.add('close-overlay');

        setTimeout(() => {
            onClose();
        }, 1300);
    };

    return (
        <div className="fixed inset-0 h-full z-30 nav-menu">
            <div
                className="content-nav w-4/5 max-w-xs h-full absolute z-40 right-0 top-0 bg-white px-4 py-6"
                id="content-nav"
            >
                <div className="label mb-6 mt-4">
                    <h5 className="font-bold text-text-100 md:text-lg">{label}</h5>
                    <hr className="border-text-50 mt-2" />
                </div>
                <div className="max-h-[80vh] overflow-y-auto h-full">{children}</div>
            </div>
            <div
                className="overlay w-full absolute z-30 insert-0 h-full bg-text-90 opacity-25"
                id="overlay"
                onClick={handleClose}
            ></div>
        </div>
    );
}
