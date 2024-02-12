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
        label: "Servicio 1",
        value: "Servicio-1",
    },
    {
        _id: "2",
        label: "Servicio 2",
        value: "Servicio-2",
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
            title="Contactar con el técnico"
            labelButton="Enviar"
        >
            <span className="text-sm text-text-90 mb-4 block">
                Enviaremos un mensaje al técnico Ignaz Semmelweis
            </span>
            <Select
                data={{
                    label: "¿Qué servicio necesitas?",
                    name: "service",
                    placeholder: "Seleccionar",
                    value: service,
                    options: OptionsServices,
                    onSelect: handleValue,
                }}
            />

            <TextArea
                data={{
                    label: "Enviar un mensaje",
                    name: "message",
                    value: values.message,
                    placeholder: "Envía tu mensaje al técnico",
                    onChange: handleChangeTextArea,
                }}
            />
        </Modal>
    );
}
