import useModal from '@/hooks/states/useModal';
import Box from '../../../../../layouts/contentBox/contentBox.component';

import { ActionModal } from '@/interface/enums';

interface IProps {
    isOwner: boolean
}

export default function Location({ isOwner }: IProps) {
    const { handleToggleModalWithLabel } = useModal();

    return (
        <Box
            data={{
                label: 'Location',
                onClickEdit: () => handleToggleModalWithLabel('modal_location', 'Add Location', ActionModal.open, 'Save'),
            }}
            isOwner={isOwner}
            icon="add"
        >
            <div className="w-full">
                <img
                    src="/assets/images/mapa.jpg"
                    width={250}
                    height={150}
                    alt="mapa"
                    className="w-full"
                />
            </div>

        </Box>
    );
}
