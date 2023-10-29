import Button from "@/components/common/buttons/button/button.component";
import { createPortal } from "react-dom";
import "./modal.styles.scss";

interface IProps {
    show: boolean;
    onClose: () => void;
    handleAction?: () => void;
    title: string;
    labelButton: string;
    children: React.ReactNode;
}

export default function Modal({
    show,
    onClose,
    title,
    labelButton,
    handleAction,
    children,
}: IProps) {
    if (!show) return null;

    return createPortal(
        <div className="modal fixed inset-0 h-full z-20 grid place-items-center">
            <section className="p-4 md:p-6 content-modal bg-white w-11/12 max-w-xl absolute z-30 h-auto top-10 left-2/4 -translate-x-2/4 rounded-lg shadow-box">
                <button
                    className="close-button w-6 h-6 flex justify-center items-center rounded-full shadow-square p-1 absolute -top-2.5 -right-2.5 bg-white-bg"
                    onClick={onClose}
                >
                    <img
                        src="/assets/icons/close-icon.svg"
                        width={10}
                        height={10}
                        alt="Close icon"
                    />
                </button>

                <div className="content max-h-85vh overflow-y-auto overflow-x-hidden ">
                    <div className="top relative">
                        <h4 className="title-modal font-bold text-sm text-primary uppercase">
                            {title}
                        </h4>
                        <hr className="mt-3 mb-6  border-text-50" />
                    </div>
                    <div className="body">{children}</div>
                    <div className="bottom mt-12">
                        <Button
                            data={{
                                label: labelButton,
                                onClick: handleAction,
                            }}
                        />
                        <Button
                            data={{
                                label: "Discard",
                                customStyles: "btn-discard mx-auto mt-4 mb-0 text-sm",
                                onClick: onClose,
                            }}
                        />
                    </div>
                </div>
            </section>
            <div
                className="overlay w-full absolute z-20 insert-0 h-full bg-text-90 opacity-25"
                id="overlay"
                onClick={onClose}
            ></div>
        </div>,
        document.querySelector("#modals") as HTMLElement
    );
}
