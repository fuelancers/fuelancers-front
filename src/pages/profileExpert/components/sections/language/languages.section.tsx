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
                label: 'Idiomas',
                onClickEdit: () => handleToggleModalWithLabel('modal_language', 'Agregar idioma', ActionModal.open, 'Guardar'),
                id: "languages"
            }}
            isOwner={isOwner}
            icon="add"
        >
            <ul className="list-none p-0 flex flex-wrap gap-4 w-11/12 mx-auto">
                <li className="w-2/5">
                    <span className="block text-sm text-text-90 font-bold text-center">
                        Inglés
                    </span>
                    <span className="text-sm text-text-70 block text-center">Nativo</span>
                </li>
                <li className="w-2/5">
                    <span className="block text-sm text-text-90 font-bold text-center">
                        Español
                    </span>
                    <span className="text-sm text-text-70 block text-center">Conversacional</span>
                </li>
                <li className="w-2/5">
                    <span className="block text-sm text-text-90 font-bold text-center">Francés</span>
                    <span className="text-sm text-text-70 block text-center">Conversacional</span>
                </li>
            </ul>
        </Box>
    );
}
