import Box from "../../../../../layouts/contentBox/contentBox.component";
import ButtonEdit from "@/components/common/buttons/buttonEdit/buttonEdit.common";
import { ActionModal, QuerysURL } from "@/interface/enums";
import useModal from "@/hooks/states/useModal";
import { useSearchParams } from "react-router-dom";
import { IExpertDegree } from "@/interface/services";
import { getCurrentYear, getYear } from "@/lib/dates";
import EmptyBox from "@/components/common/emptyBox/emptyBox";

interface IProps {
    isOwner: boolean;
    data: IExpertDegree[] | undefined
}

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    
    return `${year}/${month}`;
  };


export default function Degree({ isOwner, data }: IProps) {

    const { handleToggleModalWithLabel } = useModal();
    const [searchParams, setSearchParams] = useSearchParams();


    const handleEdit = (id: string) => {
        setSearchParams({ [QuerysURL.id_degree]: id.toString() });
        handleToggleModalWithLabel("modal_degree", "Editar grado", ActionModal.open, "Guardar")
    }

    return (
        <Box
            data={{
                label: "Grado",
                id: "degrees",
                onClickEdit: () => handleToggleModalWithLabel("modal_degree", "Añadir grado", ActionModal.open, "Guardar")
            }}
            isOwner={isOwner}
            icon="add"
        >
            <div className="flex gap-8 flex-col">
                {
                    !!data && !!data.length ? data.map((item, index: number) => (
                        <div className="card w-full shadow-into border-[1px] border-text-30 mx-auto rounded-md p-4" key={`degree-${index}`}>
                            <div className="top flex justify-between relative gap-3 items-center ">
                                <h5 className="text-sm text-text-100">{item.school}</h5>
                                <span className="text-xs text-text-70 flex-auto text-right">
                                    {`${formatDate(new Date(item.start))} - ${formatDate(new Date(item.end))}`}
                                </span>
                                {isOwner ? (
                                    <ButtonEdit
                                        showText={false}
                                        onClick={() => handleEdit(item._id)}
                                    />
                                ) : null}
                            </div>
                            <hr className="separator" />
                            <span className="text-text-100 font-bold block">{item.field}</span>
                            <span className="text-sm text-extra">{item.academicDegree}</span>
                        </div>
                    )) : (
                        <EmptyBox labelButton="Añadir grado" onClick={() => handleToggleModalWithLabel("modal_degree", "Añadir grado", ActionModal.open, "Guardar")} />
                    )
                }
            </div>
        </Box>
    );
}
