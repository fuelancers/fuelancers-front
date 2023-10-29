import Modal from "@/layouts/modal/modal.component";
import ImageUploader from "@/components/common/imageUploader/imageUploader.component";
import Input from "@/components/form/input/input.component";
import { useFormValues } from "@/hooks/form/useFormValues";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@/storage/store";
import { useFetch } from "@/hooks/services/useFetch";
import { base64ToBlob } from "@/lib/base64ToBlob";
import { UpdateUploadImageService, UploadImageService } from "@/services/user/uploadImage.service";
import { experts } from "@/core/routesServices";
import { handleImageUpload } from "@/storage/slice/general.slice";
import useModal from "@/hooks/states/useModal";
import { ActionModal, QuerysURL } from "@/interface/enums";
import { useUpdateExpert } from "@/hooks/services/useUpdateExpert";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { DeleteExpertService } from "@/services/experts/experts.service";

// interface
interface IProps {
  showModal: boolean;
  label: string;
  labelButton?: string;
  onClose: () => void;
}

type IForm = {
  cite: string;
};
const InitialFormState = {
  cite: "",
};

export default function UpsertResults({
  showModal,
  onClose,
  label,
  labelButton = "Add",
}: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { values, handleChangeInput, setValues } = useFormValues<IForm>(InitialFormState);
  const { general: generalStorage, expert, user: userStorage } = useSelector((storage: AppStore) => storage);
  const dispatch = useDispatch()

  const { callEndpoint } = useFetch();
  const { updateExpertService } = useUpdateExpert();

  const idPortfolio = useMemo(() => {
    return searchParams.get(QuerysURL.id_portfolio);
  }, [searchParams])

  useEffect(() => {
    if (!idPortfolio) return;

    // TODO: this is a edit modal;
    const getPortfolio = expert.portfolios.filter((portfolio) => portfolio.portfolio._id === idPortfolio);

    if (!getPortfolio.length) return;

    setValues((prev) => ({
      cite: getPortfolio[0].portfolio.cite,
    }))
    dispatch(handleImageUpload({ imageUpload: [{ data_url: getPortfolio[0].portfolio.image, file: null }] }))

  }, [idPortfolio])

  const handleUploadImage = async () => {
    // TODO: VALIDATE FIELDS
    if (!generalStorage.imageUpload.length) {
      return;
    }

    const formData = new FormData();

    if (generalStorage.imageUpload[0].data_url?.includes("base64")) {
      const blob = await base64ToBlob(generalStorage.imageUpload[0].data_url);
      formData.append("image", blob);
    }
    formData.append("cite", values.cite)

    if (!!idPortfolio) {
      // function to create update portfolio
      await callEndpoint(
        UpdateUploadImageService(`${experts.experts_portfolio}?id_portfolio=${idPortfolio}`, formData, userStorage.token)
      )
    } else {
      // function to create new portfolio
      await callEndpoint(
        UploadImageService(`${experts.experts_portfolio}`, formData, userStorage.token)
      )
    }

    await updateExpertService();

    dispatch(handleImageUpload({ imageUpload: [] }))
    onClose()
  }

  const handleDeleteDegree = async () => {
    await callEndpoint(DeleteExpertService(`${experts.experts_portfolio}?id_portfolio=${idPortfolio}`,))
    await updateExpertService()
    onClose()
  }

  return (
    <Modal
      show={showModal}
      onClose={onClose}
      title={label}
      labelButton={labelButton}
      handleAction={handleUploadImage}
    >
      <ImageUploader isMultiple={false} />
      <Input
        data={{
          label: "Cite",
          name: "cite",
          value: values.cite,
          placeholder: "My first job",
          onChange: handleChangeInput,
        }}
      />
      {
        !!idPortfolio ? (
          <div>
            <button className="btn text-alert-danger text-sm mx-0 my-5 w-fit cursor-pointer" onClick={handleDeleteDegree}>
              Delete result
            </button>
          </div>
        ) : null
      }
    </Modal>
  );
}
