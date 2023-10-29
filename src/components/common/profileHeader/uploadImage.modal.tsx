import Modal from "@/layouts/modal/modal.component";
import { ImageUploader } from "@/components/common/imageUploader/";

// interface
interface IProps {
  showModal: boolean;
  label: string;
  labelButton?: string;
  onClose: () => void;
  handleAction: () => void
}

export default function UploadImage({
  showModal,
  onClose,
  label,
  labelButton = "Add",
  handleAction
}: IProps) {
  return (
    <Modal
      show={showModal}
      onClose={onClose}
      title={label}
      labelButton={labelButton}
      handleAction={handleAction}
    >
      <ImageUploader isMultiple={false} />
    </Modal>
  );
}
