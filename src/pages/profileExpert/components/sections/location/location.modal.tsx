import { useFormValues } from "@/hooks/form/useFormValues";
import Modal from "@/layouts/modal/modal.component";
import Select from "@/components/form/select/select.component";
import { TypeListsSelect } from "@/interface/generics";

// interface

interface IProps {
  showModal: boolean;
  label: string;
  labelButton?: string;
  onClose: () => void;
}

interface FormValues {
  location: TypeListsSelect;
}

const formData: FormValues = {
  location: {
    _id: "0",
    label: "",
    value: "",
  },
};

export default function UpsertLocation({
  showModal,
  onClose,
  label,
  labelButton = "Add",
}: IProps) {
  const { values, handleChangeInput } = useFormValues<FormValues>(formData);

  return (
    <Modal
      show={showModal}
      onClose={onClose}
      title={label}
      labelButton={labelButton}
    >
      <Select
        data={{
          label: "Select your location",
          name: "location",
          options: [],
          value: values.location,
          onSelect: () => console.log("hola"),
        }}
      />
    </Modal>
  );
}
