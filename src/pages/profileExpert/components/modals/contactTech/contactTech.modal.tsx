import { useState } from "react";

import { useFormValues } from "@/hooks/form/useFormValues";
import Modal from "@/layouts/modal/modal.component";
import TextArea from "@/components/form/textArea/textArea";
import Select from "@/components/form/select/select.component";
// interface
import { TypeListsSelect } from "@/interface/generics/";
import { SingleValue } from "react-select";

interface IProps {
    showModal: boolean;
    onClose: () => void;
}

interface FormValues {
    message: string;
    service: TypeListsSelect;
}

const formData: FormValues = {
    message: "",
    service: {
        _id: "",
        value: "",
        label: "",
    },
};

const OptionsServices: TypeListsSelect[] = [
    {
        _id: "1",
        label: "Services 1",
        value: "Services-1",
    },
    {
        _id: "2",
        label: "Services 2",
        value: "Services-2",
    },
];

export default function ContactTech({ showModal, onClose }: IProps) {
    const { values, handleChangeTextArea } = useFormValues<FormValues>(formData);
    const [service, setService] = useState<SingleValue<TypeListsSelect>>({
        _id: "0",
        label: "",
        value: "",
    });

    const handleValue = (option: SingleValue<TypeListsSelect>) => {
        setService(option);
    };

    return (
        <Modal
            show={showModal}
            onClose={onClose}
            title="Contact with the technician"
            labelButton="Send"
        >
            <span className="text-sm text-text-90 mb-4 block">
                We&apos;ll send a message to Ignaz Semmelweis technician
            </span>
            <Select
                data={{
                    label: "What service do you need?",
                    name: "service",
                    placeholder: "Select",
                    value: service,
                    options: OptionsServices,
                    onSelect: handleValue,
                }}
            />

            <TextArea
                data={{
                    label: "Send a message",
                    name: "message",
                    value: values.message,
                    placeholder: "Send your message to the technician",
                    onChange: handleChangeTextArea,
                }}
            />
        </Modal>
    );
}
