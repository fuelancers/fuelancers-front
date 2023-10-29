import useModal from '@/hooks/states/useModal';
import Box from '../../../../../layouts/contentBox/contentBox.component';

import { ActionModal } from '@/interface/enums';

interface IProps {
    isOwner: boolean
}

export default function Languages({ isOwner }: IProps) {
    const { handleToggleModalWithLabel } = useModal();

    return (
        <Box
            data={{
                label: 'Languages',
                onClickEdit: () => handleToggleModalWithLabel('modal_language', 'Add language', ActionModal.open, 'Save'),
                id: "languages"
            }}
            isOwner={isOwner}
            icon="add"
        >
            <ul className="list-none p-0 flex flex-wrap gap-4 w-11/12 mx-auto">
                <li className="w-2/5">
                    <span className="block text-sm text-text-90 font-bold text-center">
                        English
                    </span>
                    <span className="text-sm text-text-70 block text-center">Native</span>
                </li>
                <li className="w-2/5">
                    <span className="block text-sm text-text-90 font-bold text-center">
                        Spanish
                    </span>
                    <span className="text-sm text-text-70 block text-center">Conversational</span>
                </li>
                <li className="w-2/5">
                    <span className="block text-sm text-text-90 font-bold text-center">French</span>
                    <span className="text-sm text-text-70 block text-center">Conversational</span>
                </li>
            </ul>
        </Box>
    );
}
