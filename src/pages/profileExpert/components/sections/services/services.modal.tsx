import { useFormValues } from "@/hooks/form/useFormValues";
import Modal from "@/layouts/modal/modal.component";
import Input from "@/components/form/input/input.component";
// interface
import TextArea from "@/components/form/textArea/textArea";
import { InputNumber } from "antd";
import CustomInputNumber from "@/components/form/inputNumber/customInputNumber.component";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "@/hooks/services/useFetch";
import { useUpdateExpert } from "@/hooks/services/useUpdateExpert";
import { useEffect, useMemo } from "react";
import { QuerysURL } from "@/interface/enums";
import { IExpertService } from "@/interface/forms/IExpertService.interface";
import { Expert } from "@/interface/services";
import { DeleteExpertService, ExpertsServiceCreate, ExpertsServiceUpdate } from "@/services/experts/experts.service";
import { experts } from "@/core/routesServices";

interface IProps {
  showModal: boolean;
  label: string;
  labelButton?: string;
  onClose: () => void;
  expert: Expert
}

export default function UpsertService({
  showModal,
  onClose,
  label,
  labelButton = "Agregar",
  expert
}: IProps) {
  const { values, handleChangeInput, handleChangeTextArea, handleChangeInputNumber, setValues } =
    useFormValues<IExpertService>(new IExpertService());

  const [searchParams, setSearchParams] = useSearchParams();

  const { callEndpoint } = useFetch();
  const { updateExpertService } = useUpdateExpert()

  const idService = useMemo(() => {
    return searchParams.get(QuerysURL.id_service);
  }, [searchParams])

  useEffect(() => {
    if (!idService) return;

    // TODO: este es un modal de edición;
    const getService = expert.services.filter((service) => service._id === idService);

    if (!getService.length) return;

    setValues({
      description: getService[0].description,
      title: getService[0].title,
      price: getService[0].price.toString(),
    })
  }, [idService])

  const handleSave = async () => {
    // TODO: guardar el servicio
    const parseData = {
      ...values,
      price: parseInt(values.price),
    }

    if (!idService) {
      await saveData(parseData)
    } else {
      await updateData(parseData)
    }
    await updateExpertService()

    setValues(new IExpertService())
    onClose()
  }

  const saveData = async (parseData: any) => {
    await callEndpoint(ExpertsServiceCreate(parseData, `${experts.experts_services}`,))
  }

  const updateData = async (parseData: any) => {
    await callEndpoint(ExpertsServiceUpdate(parseData, `${experts.experts_services}?id_service=${idService}`,))
  }

  const handleDeleteDegree = async () => {
    await callEndpoint(DeleteExpertService(`${experts.experts_services}?id_service=${idService}`,))
    await updateExpertService()
    onClose()
  }


  return (
    <Modal
      show={showModal}
      onClose={onClose}
      title={label}
      labelButton={labelButton}
      handleAction={handleSave}
    >
      <Input
        data={{
          label: "Título",
          name: "title",
          value: values.title,
          placeholder: "Título",
          onChange: handleChangeInput,
        }}
      />
      <CustomInputNumber
        data={{
          label: "Precio",
          name: "price",
          value: values.price,
          placeholder: "Precio",
          prefix: "€",
          onChange: handleChangeInputNumber,
        }}
      />
      <TextArea
        data={{
          label: "Descripción",
          name: "description",
          value: values.description,
          placeholder: "Descripción",
          onChange: handleChangeTextArea,
        }}
      />

      {
        !!idService ? (
          <div>
            <button className="btn text-alert-danger text-sm mx-0 my-5 w-fit cursor-pointer" onClick={handleDeleteDegree}>
              Eliminar servicio
            </button>
          </div>
        ) : null
      }
    </Modal>
  );
}
