import React from 'react';
import UploadImage from './uploadImage.modal';
import useModal from '@/hooks/states/useModal';
import { ActionModal } from '@/interface/enums';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '@/storage/store';
import { useFetch } from '@/hooks/services/useFetch';
import { UploadImageService } from '@/services/user/uploadImage.service';
import { users } from '@/core/routesServices';
import { base64ToBlob } from '@/lib/base64ToBlob';
import { MeService } from '@/services/user/me.service';
import { IResponse, IUser } from '@/interface/services';
import { updateUser } from '@/storage/slice/user.slice';
import { handleImageUpload } from '@/storage/slice/general.slice';
import { useUpdateUser } from '@/hooks/services/useUpdateUser';

interface IProps {
    data: {
        name: string;
        title?: string;
        isOwner?: boolean;
    };
    children?: React.ReactNode;
}

export default function ProfileHeader({ data, children }: IProps) {
    const { name, title, isOwner } = data;
    const { handleToggleModalWithLabel } = useModal();

    const { statusModals, general: generalStorage, user: userStorage, expert } = useSelector((storage: AppStore) => storage);
    const dispatch = useDispatch()

    const { callEndpoint } = useFetch();
    const { updateUserService } = useUpdateUser()

    const handleClickCover = () => {
        handleToggleModalWithLabel("modal_profile_header", 'Agregar Imagen', ActionModal.open, 'Guardar');
    };
    const handleClickBgCover = () => {
        handleToggleModalWithLabel("modal_profile_bg_header", 'Agregar Imagen', ActionModal.open, 'Guardar');
    };

    const handleUploadImage = async () => {
        // TODO: VALIDAR CAMPOS
        if (!generalStorage.imageUpload.length) {
            return;
        }

        let url = users.upload_image;
        if (statusModals.modal_profile_bg_header.show) {
            url = users.upload_bg_image;
        }

        const blob = await base64ToBlob(generalStorage.imageUpload[0].data_url);
        const formData = new FormData();
        formData.append("image", blob)
        // función para guardar los datos
        await callEndpoint(
            UploadImageService(`${url}`, formData, userStorage.token)
        )

        await updateUserService();

        dispatch(handleImageUpload({ imageUpload: [] }))
        handleToggleModalWithLabel('modal_profile_header', '', ActionModal.close, '')
        handleToggleModalWithLabel('modal_profile_bg_header', '', ActionModal.close, '')

    }

    return (
        <div className="header-profile relative xl:pt-6">
            <div className="content-sections relative">
                <div className="bg w-full h-48 md:h-56 lg:h-64 bg-text-70 xl:rounded-xl  overflow-hidden">
                    <div className="h-full w-full">
                        <img
                            src={expert.bgPhoto || userStorage.bgPhoto || "https://ibb.co/nkHWfpM"}
                            width={1200}
                            height={600}
                            alt="Foto de portada"
                            className="object-cover object-center h-full w-full xl:rounded-xl max-h-[400px]"
                        />
                    </div>
                    {
                        isOwner ? (
                            <div className="content-camera-icon absolute w-9 h-9 rounded-full bg-primary top-4 right-4">
                                <button onClick={handleClickBgCover} className='p-2'>
                                    <img
                                        src="/assets/icons/camera-icon.svg"
                                        width={24}
                                        height={24}
                                        alt="Ícono de cámara"
                                    />
                                </button>
                            </div>
                        ) : false
                    }
                </div>
                <div className="p-1 photo w-36 h-36 rounded-full border-[1px] border-extra shadow-extra mx-auto absolute top-24 md:top-32 lg:top-44 left-4 md:left-8">
                    <div className="image bg-white w-full h-full rounded-full border-text-70 relative">
                        <div className="w-full h-full rounded-full overflow-hidden">
                            <img
                                src={expert.picture || userStorage.picture || "https://ibb.co/KW52rjV"}
                                width={244}
                                height={244}
                                alt="Foto"
                                className="object-cover object-center h-full"
                            />
                        </div>
                        {
                            isOwner ? (
                                <div className="content-camera-icon absolute w-9 h-9 rounded-full bg-primary -bottom-0 -right-0">
                                    <button onClick={handleClickCover} className='p-2'>
                                        <img
                                            src="/assets/icons/camera-icon.svg"
                                            width={24}
                                            height={24}
                                            alt="Ícono de cámara"
                                        />
                                    </button>
                                </div>
                            ) : false
                        }
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 mb-4 md:mb-10">
                    <div className="info mt-14 px-4 md:px-8 lg:mt-3 lg:ml-44">
                        <h5 className="font-bold text-lg md:text-xl text-text-100 capitalize">{name}</h5>
                        {title ? (
                            <span className="text-sm md:text-base text-text-90">{title}</span>
                        ) : null}
                    </div>

                    {children}
                </div>
            </div>

            <UploadImage
                showModal={statusModals.modal_profile_header.show}
                onClose={() => handleToggleModalWithLabel('modal_profile_header', 'Agregar Imagen', ActionModal.close, '')}
                label={statusModals.modal_profile_header.label}
                labelButton={statusModals.modal_profile_header.labelButton}
                handleAction={handleUploadImage}
            />

            <UploadImage
                showModal={statusModals.modal_profile_bg_header.show}
                onClose={() => handleToggleModalWithLabel('modal_profile_bg_header', 'Agregar Imagen', ActionModal.close, '')}
                label={statusModals.modal_profile_bg_header.label}
                labelButton={statusModals.modal_profile_bg_header.labelButton}
                handleAction={handleUploadImage}
            />
        </div>
    );
}
