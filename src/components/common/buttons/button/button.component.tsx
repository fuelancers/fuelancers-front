interface IProps {
    data: {
        label: string;
        customStyles?: string;
        onClick?: () => void | Promise<any>;
        disabled?: boolean;
    };
}

export default function Button({ data }: IProps) {
    const { label, onClick, customStyles, disabled = false } = data;

    return (
        <button
            className={`btn ${!customStyles ? 'btn-primary' : customStyles} lg:cursor-pointer`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}
