/* eslint-disable react-hooks/exhaustive-deps */
// hooks
import { useEffect, useState } from "react";
import { useFormValues } from "@/hooks/form/useFormValues";
import { useFetch } from "@/hooks/services/useFetch";
// components
import Modal from "@/layouts/modal/modal.component";
import Input from "@/components/form/input/input.component";
import TextArea from "@/components/form/textArea/textArea";
import Select from "@/components/form/select/select.component";
import { SingleValue } from "react-select";
// interface
import { TypeLists, TypeListsSelect } from "@/interface/generics/";
import { IPersonalInfoExpert } from "@/interface/forms/";
import { IResponse } from "@/interface/services/";
import { IExpertExperience, IExpertStatus, IExpertWorkMode, PersonalInfo } from "@/interface/services/experts/";
// service
import { genericsRoutes, experts } from "@/core/routesServices";
import { getListService } from "@/services/generic/getLists.service";
import { ExpertsServiceUpdate } from "@/services/experts/experts.service";
// utils
import { FormatListToSelect, FormatSingleListToSelect } from "@/lib/formatList";
import { useUpdateExpert } from "@/hooks/services/useUpdateExpert";

interface IProps {
    showModal: boolean;
    onClose: () => void;
    data: { expert: PersonalInfo | null, status: IExpertStatus, experience: IExpertExperience | null, workmode: IExpertWorkMode | null, token: string | null };
    idExpert: string;
}

const defaultValueList = {
    _id: "",
    label: "",
    value: "",
}

export default function EditProfile({
    showModal,
    onClose,
    data,
    idExpert,
}: IProps) {
    const { callEndpoint, error } = useFetch();
    const { updateExpertService } = useUpdateExpert()

    const { values, setValues, handleChangeInput, handleChangeTextArea } =
        useFormValues<IPersonalInfoExpert>(new IPersonalInfoExpert());
    const [listStatus, setListStatus] = useState<TypeListsSelect[]>([]);
    const [listExperience, setListExperience] = useState<TypeListsSelect[]>([]);
    const [listWorkMode, setListWorkMode] = useState<TypeListsSelect[]>([]);

    const [status, setStatus] = useState<SingleValue<TypeListsSelect>>(defaultValueList);
    const [experience, setExperience] = useState<SingleValue<TypeListsSelect>>(defaultValueList);
    const [workmode, setWorkmode] = useState<SingleValue<TypeListsSelect>>(defaultValueList);
    
    useEffect(() => {
        if (!showModal) return;

        if (!!data.expert) {
            setValues({
                description: data.expert.description,
                title: data.expert.title
            });
        }

        // NOTE: STATUS
        if (!!data.status?.status) {
            const list = FormatSingleListToSelect(data.status?.status);
            setStatus((list))
        }

        // NOTE: EXPERIENCE
        if (!!data.experience?.experience) {
            const list = FormatSingleListToSelect(data.experience?.experience);
            setExperience((list))
        }
        // NOTE: WORK MODE
        if (!!data.workmode?.workmode) {
            const list = FormatSingleListToSelect(data.workmode?.workmode);
            setWorkmode((list))
        }

        // NOTE: LIST STATUS
        if (!listStatus.length) {
            callServicer(genericsRoutes.list_status)
                .then((response) => {
                    setListStatus(response);
                })
                .catch((err) => console.log(err));
        }
        // NOTE: LIST EXPERIENCE
        if (!listExperience.length) {
            callServicer(genericsRoutes.list_experience)
                .then((response) => {
                    setListExperience(response);
                })
                .catch((err) => console.log(err));
        }
        // NOTE: LIST WORK MODE
        if (!listWorkMode.length) {
            callServicer(genericsRoutes.list_workmode)
                .then((response) => {
                    setListWorkMode(response);
                })
                .catch((err) => console.log(err));
        }
    }, [showModal]);

    const callServicer = async (url: string) => {
        const { response } = await callEndpoint<IResponse<TypeLists[]>>(
            getListService(url)
        );
        return FormatListToSelect(response?.data as TypeLists[]);
    }

    // NOTE: UPDATE STATUS EXPERT
    const handleChangeStatus = async (option: SingleValue<TypeListsSelect>) => {
        const parseData = {
            id_status: option?._id,
            id_exp: idExpert
        }
        setStatus(option);
        await callEndpoint(ExpertsServiceUpdate(parseData, `${experts.experts_status}`, data.token))
        await updateExpertService()
    }

    // NOTE: UPDATE EXPERIENCE EXPERT
    const handleChangeExperience = async (option: SingleValue<TypeListsSelect>) => {
        const parseData = {
            id_experience: option?._id,
            id_exp: idExpert
        }
        setExperience(option);
        await callEndpoint(ExpertsServiceUpdate(parseData, `${experts.experts_experience}`, data.token))
        await updateExpertService()
    }
    // NOTE: UPDATE EXPERIENCE EXPERT
    const handleChangeWorkMode = async (option: SingleValue<TypeListsSelect>) => {
        const parseData = {
            id_work_mode: option?._id,
            id_exp: idExpert
        }
        setWorkmode(option);
        await callEndpoint(ExpertsServiceUpdate(parseData, `${experts.experts_workmode}`, data.token))
        await updateExpertService()
    }
    // NOTE: UPDATE PERSONAL INFO
    const handleEdit = async () => {
        const dataToSend = {
            title: values.title,
            description: values.description,
        };

        await callEndpoint<IResponse<string>>(
            ExpertsServiceUpdate(dataToSend, `${experts.edit_personal_info}`, data.token)
        );
        await updateExpertService()
        onClose();
    };

    return (
        <Modal
            show={showModal}
            onClose={onClose}
            title="Edit Profile"
            labelButton="Save"
            handleAction={() => void handleEdit()}
        >
            <h4 className="label font-bold text-sm text-text-100 mb-4">Profile</h4>
            <Input
                data={{
                    label: "Title",
                    name: "title",
                    value: values.title,
                    placeholder: "Medical hair doctor",
                    onChange: handleChangeInput,
                }}
            />
            <TextArea
                data={{
                    label: "Description",
                    name: "description",
                    value: values.description,
                    placeholder: "Talk about you",
                    onChange: handleChangeTextArea,
                }}
            />
            <h4 className="label font-bold text-sm text-text-100 mb-4">
                Experience
            </h4>

            <Select
                data={{
                    label: "Select your experience time",
                    name: "experience",
                    placeholder: "Experience",
                    options: listExperience,
                    value: experience,
                    onSelect: handleChangeExperience,
                }}
            />

            <h4 className="label font-bold text-sm text-text-100 mb-4">
                Work mode
            </h4>

            <Select
                data={{
                    label: "Select your work-mode",
                    name: "experience",
                    placeholder: "Experience",
                    options: listWorkMode,
                    value: workmode,
                    onSelect: handleChangeWorkMode,
                }}
            />

            <h4 className="label font-bold text-sm text-text-100 mb-4">
                Status
            </h4>

            <Select
                data={{
                    label: "Change status",
                    name: "status",
                    placeholder: "Status",
                    options: listStatus,
                    value: status,
                    onSelect: handleChangeStatus,
                }}
            />
        </Modal>
    );
}
