import { useFormValues } from "@/hooks/form/useFormValues";
import Modal from "@/layouts/modal/modal.component";
import Select from "@/components/form/select/select.component";
import { TypeListsSelect } from "@/interface/generics";
import Input from "@/components/form/input/input.component";
import { ExpertLocation } from "@/interface/services";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "@/hooks/services/useFetch";
import { useUpdateExpert } from "@/hooks/services/useUpdateExpert";
import { ExpertsServiceCreate, ExpertsServiceUpdate } from "@/services/experts/experts.service";
import { experts } from "@/core/routesServices";
import { useGooglePlacesAutocomplete } from "@/hooks/services/useGooglePlacesAutocomplete";

// interface

interface IProps {
  showModal: boolean;
  label: string;
  labelButton?: string;
  onClose: () => void;
  data: { location: ExpertLocation };
}

export default function UpsertLocation({
  showModal,
  onClose,
  label,
  labelButton = "Add",
  data,
}: IProps) {
  const searchInput = useRef(null);
  const { callEndpoint } = useFetch();
  const { updateExpertService } = useUpdateExpert()
  const { location } =  useGooglePlacesAutocomplete(data?.location, searchInput);

  const handleSave = async () => {
    await saveData(location)
  
    await updateExpertService()

    onClose()
  }

  const saveData = async (parseData: any) => {
    await callEndpoint(ExpertsServiceUpdate(parseData, `${experts.experts_location}`,))
  }

  return (
    <Modal
      show={showModal}
      onClose={onClose}
      title={label}
      labelButton={labelButton}
      handleAction={handleSave}
    >
      <div className={`px-4 content-input flex flex-col gap-2 w-full mb-4`}>
        <label
          htmlFor="location"
          className={`text-sm w-11/12 relative flex gap-3 items-center font-bold`}
        >
          Location
        </label>
        <input
          className={`py-2 px-4 border-[1px] text-sm rounded-md border-text-50 block w-full outline-none focus:border-primary focus:shadow-input transition-all ease-linear duration-300 mt-2`}
          ref={searchInput}
          type="text"
          placeholder={(location as ExpertLocation)?.name || "Search location...."}
        />
      </div>
    </Modal>
  );
}
