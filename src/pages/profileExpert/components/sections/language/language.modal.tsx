import { useFormValues } from "@/hooks/form/useFormValues";
import Modal from "@/layouts/modal/modal.component";
import Input from "@/components/form/input/input.component";
import Select from "@/components/form/select/select.component";
import { TypeLists, TypeListsSelect } from "@/interface/generics";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@/storage/store";
import { handleUpdateService } from "@/storage/slice/listGeneralsServices.slice";
import { useFetch } from "@/hooks/services/useFetch";
import { IResponse } from "@/interface/services";
import { getListService } from "@/services/generic/getLists.service";
import { experts, genericsRoutes } from "@/core/routesServices";
import { FormatListToSelect } from "@/lib/formatList";
import { ExpertsServiceCreate } from "@/services/experts/experts.service";
import { useUpdateExpert } from "@/hooks/services/useUpdateExpert";
// interface

interface IProps {
  showModal: boolean;
  label: string;
  labelButton?: string;
  onClose: () => void;
}

interface FormValues {
  language: TypeListsSelect;
  proficiency: TypeListsSelect;
}

const formData: FormValues = {
  language: {
    _id: "",
    label: "",
    value: "",
  },
  proficiency: {
    _id: "",
    label: "",
    value: "",
  },
};

export default function UpsertLanguage({
  showModal,
  onClose,
  label,
  labelButton = "Add",
}: IProps) {
  const dispatch = useDispatch();

  const { values, handleChangeSelect } = useFormValues<FormValues>(formData);

  const { listGeneralServices, user } = useSelector((store: AppStore) => store);
  const { callEndpoint } = useFetch();
  const { updateExpertService } = useUpdateExpert()

  // NOTE: check if data exists
  useEffect(() => {
    if (!listGeneralServices.list_languages.length) {
      callEndpoint<IResponse<TypeLists[]>>(
        getListService(genericsRoutes.list_language)
      ).then(({ response }) => {
        if (!response) return;

        const data = FormatListToSelect(response.data);
        dispatch(
          handleUpdateService({
            list_languages: data,
          })
        );
      });
    }

    if (!listGeneralServices.list_proficiency.length) {
      callEndpoint<IResponse<TypeLists[]>>(
        getListService(genericsRoutes.list_proficiency)
      ).then(({ response }) => {
        if (!response) return;

        const data = FormatListToSelect(response.data);
        dispatch(
          handleUpdateService({
            list_proficiency: data,
          })
        );
      });
    }
  }, []);

  const handleSave = async () => {
    try {
      const formatData = {
        id_language: values.language._id,
        id_proficiency: values.proficiency._id,
        id_exp: user._id,
      };
      
      const expertUpdated = await callEndpoint<IResponse<TypeLists[]>>(
      ExpertsServiceCreate(formatData, experts.experts_languages)
      );
      if (expertUpdated.response) {
        await updateExpertService();
        onClose();
      };
    } catch (err) {}
  };

  return (
    <Modal
      show={showModal}
      onClose={onClose}
      title={label}
      labelButton={labelButton}
      handleAction={handleSave}
    >
      <Select
        data={{
          label: "Language",
          name: "language",
          placeholder: "Language",
          value: values.language,
          options: listGeneralServices.list_languages,
          onSelect: (option) => handleChangeSelect(option, "language"),
        }}
      />
      <Select
        data={{
          label: "Proficiency",
          name: "proficiency",
          placeholder: "Proficiency",
          value: values.proficiency,
          options: listGeneralServices.list_proficiency,
          onSelect: (option) => handleChangeSelect(option, "proficiency"),
        }}
      />
    </Modal>
  );
}
