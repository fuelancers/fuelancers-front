import EmptyBox from "@/components/common/emptyBox/emptyBox";
import Box from "../../../../../layouts/contentBox/contentBox.component";
import ButtonEdit from "@/components/common/buttons/buttonEdit/buttonEdit.common";

import useModal from "@/hooks/states/useModal";
import { ActionModal, QuerysURL } from "@/interface/enums";
import { IExpertService } from "@/interface/services";
import { useSearchParams } from "react-router-dom";

interface IProps {
    isOwner: boolean;
    data: IExpertService[];
}

export default function Services({ isOwner, data }: IProps) {
    const { handleToggleModalWithLabel } = useModal();
    const [searchParams, setSearchParams] = useSearchParams();


    const handleEdit = (id: string) => {
        setSearchParams({ [QuerysURL.id_service]: id.toString() });
        handleToggleModalWithLabel(
            "modal_services",
            "Editar Servicios",
            ActionModal.open,
            "Guardar"
        )
    }

    return (
        <Box
            data={{
                label: "Servicios",
                id: "servicios",
                onClickEdit: () =>
                    handleToggleModalWithLabel(
                        "modal_services",
                        "Agregar Servicios",
                        ActionModal.open,
                        "Guardar"
                    ),
            }}
            isOwner={isOwner}
            icon="add"
        >
            {!!data && !!data.length ? (
                data.map((item, index) => (
                    <div className="card w-full shadow-into border-[1px] border-text-30 mx-auto rounded-md p-4 relative" key={`service-${index}`}>
                        <div className="top flex justify-between relative gap-3 items-center ">
                            <h5 className="text-sm text-text-100">{item.title}</h5>
                            <div className="flex gap-4">
                                <span className="text-primary font-bold text-right">
                                    € {item.price}.00{" "}
                                </span>
                                {isOwner ? (
                                    <ButtonEdit
                                        showText={false}
                                        onClick={() => handleEdit(item._id)
                                        }
                                    />
                                ) : null}
                            </div>
                        </div>
                        <hr className="separator" />
                        <p className="text-text-90 text-sm text-justify mb-8">
                            {item.description}
                        </p>
                        <button className="absolute right-0 bottom-0 rounded-tl-md rounded-br-md bg-extra px-4 py-2 text-center text-sm font-bold text-white uppercase ">
                            Contratar ahora
                        </button>
                    </div>
                ))
            ) : (
                <EmptyBox
                    labelButton="Agregar Servicio"
                    onClick={() =>
                        handleToggleModalWithLabel(
                            "modal_services",
                            "Agregar Servicios",
                            ActionModal.open,
                            "Guardar"
                        )
                    }
                />
            )}
        </Box>
    );
}
