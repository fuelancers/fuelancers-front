import { EDateFormat } from "@/interface/enums/EDateFormat.enum";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface IProps {
    data: {
        label?: string;
        name: string;
        value: string;
        placeholder: string;
        format: EDateFormat;
        disabled?: boolean;
        onChange: (date: Dayjs | null, dateString: string, name: string) => void;
    };
    children?: React.ReactNode
}

export default function Date({ data, children }: IProps) {
    const { label, name, value, onChange, format, placeholder, disabled = false } = data;

    return (
        <div className={`content-input flex flex-col gap-2 w-full mb-6`}>
            <label
                htmlFor={name}
                className={`text-sm w-10/12 mx-auto relative block`}
            >
                {label}

                <DatePicker
                    format={format}
                    picker="month"
                    value={!!value ? dayjs(value, format) : undefined}
                    onChange={(date: Dayjs | null, dateString: string) =>
                        onChange(date, dateString, name)
                    }
                    placeholder={placeholder}
                    disabled={disabled}
                    className="mt-2 block"
                />
                {
                    children
                }
            </label>
        </div>
    );
}
