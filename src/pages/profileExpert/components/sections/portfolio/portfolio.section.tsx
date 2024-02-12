import useModal from "@/hooks/states/useModal";
import Box from "../../../../../layouts/contentBox/contentBox.component";
import Button from "@/components/common/buttons//button/button.component";

import { ActionModal, QuerysURL } from "@/interface/enums";
import { IExpertPortfolio } from "@/interface/services";
import EmptyBox from "@/components/common/emptyBox/emptyBox";
import ButtonEdit from "@/components/common/buttons/buttonEdit/buttonEdit.common";
import { useSearchParams } from "react-router-dom";

interface IProps {
    isOwner: boolean;
    data: { portfolio: IExpertPortfolio, createdAt: string }[] | undefined
}

export default function Portfolio({ isOwner, data }: IProps) {
    const { handleToggleModalWithLabel } = useModal();

    const [searchParams, setSearchParams] = useSearchParams();


    const handleEdit = (id: string) => {
        setSearchParams({ [QuerysURL.id_portfolio]: id.toString() });
        handleToggleModalWithLabel("modal_portfolio", "Editar Resultado", ActionModal.open, "Guardar")
    }
    return (
        <Box
            data={{
                label: "Portafolio",
                id: "portfolio",
                onClickEdit: () =>
                    handleToggleModalWithLabel(
                        "modal_portfolio",
                        "Añadir Resultado",
                        ActionModal.open,
                        "Guardar"
                    ),
            }}
            isOwner={isOwner}
            icon="add"
        >
            <div className="flex gap-5 overflow-x-auto max-w-full">
                {
                    !!data?.length ? data.map((item, index: number) => (
                        <div className="card min-w-[12rem] h-48 w-48 min-h-[12rem] shadow-into border-[1px] border-text-30 rounded-md relative flex-wrap" key={`portfolio-${index}`}>
                            {isOwner ? (
                                <ButtonEdit
                                    showText={false}
                                    onClick={() => handleEdit(item.portfolio._id)}
                                    customStyle="top-2 right-3"
                                    inline
                                />
                            ) : null}

                            <img src={item.portfolio.image} alt={item.portfolio.cite} className="aspect-square w-full" />

                            <div className="w-full absolute bottom-0 left-0 bg-gradient-to-t from-text-100 from-70% h-20 flex items-end pb-2">
                                <span className="text-xs italic text-center px-2 text-white block ">
                                    {item.portfolio.cite}
                                </span>
                            </div>
                        </div>
                    )) : (
                        <EmptyBox labelButton="Añadir Portafolio" onClick={() => handleToggleModalWithLabel("modal_portfolio", "Añadir Resultado", ActionModal.open, "Guardar")} />
                    )
                }
            </div>
        </Box>
    );
}
