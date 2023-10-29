import { ActionModal } from '@/interface/enums';
import { useDispatch } from 'react-redux';
import { updateModal } from '@/storage/slice/statusModals.slice';
import { useSearchParams } from 'react-router-dom';

export default function useModal() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();


    const handleToggleModal = (key: string, action: ActionModal) => {
        dispatch(updateModal({ [key]: action === ActionModal.open ? true : false }));
        clearQueryParams(action)
    };

    const handleToggleModalWithLabel = (key: string, label: string, action: ActionModal, labelButton: string) => {
        dispatch(updateModal({
            [key]: {
                show: action === ActionModal.open ? true : false,
                label,
                labelButton,
            }
        }))
        clearQueryParams(action)
    };

    const clearQueryParams = (action: ActionModal) => {
        if (action === ActionModal.close) {
            setSearchParams();
        }
    }

    return {
        handleToggleModal,
        handleToggleModalWithLabel,
    };
}
