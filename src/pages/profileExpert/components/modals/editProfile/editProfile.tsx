/* eslint-disable react-hooks/exhaustive-deps */
// hooks
import { useEffect, useRef, useState } from "react";
import { useFormValues } from "@/hooks/form/useFormValues";
import { useFetch } from "@/hooks/services/useFetch";
// components
import Modal from "@/layouts/modal/modal.component";
import Input from "@/components/form/input/input.component";
import TextArea from "@/components/form/textArea/textArea";
import Select from "@/components/form/select/select.component";
import { MultiValue, SingleValue } from "react-select";
// interface
import { TypeLists, TypeListsSelect } from "@/interface/generics/";
import { IPersonalInfoExpert } from "@/interface/forms/";
import { IResponse } from "@/interface/services/";
import {
  IExpertExperience,
  IExpertStatus,
  IExpertWorkMode,
  PersonalInfo,
} from "@/interface/services/experts/";
// service
import { genericsRoutes, experts } from "@/core/routesServices";
import { getListService } from "@/services/generic/getLists.service";
import { ExpertsServiceUpdate } from "@/services/experts/experts.service";
// utils
import { FormatListToSelect, FormatSingleListToSelect } from "@/lib/formatList";
import { useUpdateExpert } from "@/hooks/services/useUpdateExpert";
import CustomMultiSelect from "@/components/form/multiSelect/select.component";
import RangeInput from "@/components/form/range/range.component";
import ExperienceRangeInput from "@/components/form/range/experienceRange/experienceRange.component";

interface IProps {
  showModal: boolean;
  onClose: () => void;
  data: {
    expert: PersonalInfo | null;
    status: IExpertStatus;
    experience: number | null;
    workmode: IExpertWorkMode | null;
    token: string | null;
    skills: TypeLists[];
  };
  idExpert: string;
}

const defaultValueList = {
  _id: "",
  label: "",
  value: "",
};

export default function EditProfile({
  showModal,
  onClose,
  data,
  idExpert,
}: IProps) {
  const { callEndpoint, error } = useFetch();
  const { updateExpertService } = useUpdateExpert();

  const { values, setValues, handleChangeInput, handleChangeTextArea } =
    useFormValues<IPersonalInfoExpert>(new IPersonalInfoExpert());
  const [listStatus, setListStatus] = useState<TypeListsSelect[]>([]);
  //   const [listExperience, setListExperience] = useState<TypeListsSelect[]>([]);
  const [listWorkMode, setListWorkMode] = useState<TypeListsSelect[]>([]);
  const [listSkills, setListSkills] = useState<TypeListsSelect[]>([]);

  const [status, setStatus] =
    useState<SingleValue<TypeListsSelect>>(defaultValueList);
  const [experience, setExperience] = useState<number>(0);
  const [workmode, setWorkmode] =
    useState<SingleValue<TypeListsSelect>>(defaultValueList);
  const [skills, setSkills] = useState<MultiValue<TypeListsSelect>>([]);
  const experienceDebounce = useRef<any>(null);

  useEffect(() => {
    if (!showModal) return;

    if (!!data.expert) {
      setValues({
        description: data.expert.description,
        title: data.expert.title,
      });
    }

    // NOTA: ESTADO
    if (!!data.status?.status) {
      const list = FormatSingleListToSelect(data.status?.status);
      setStatus(list);
    }

    // NOTA: EXPERIENCIA
    if (typeof data.experience === "number") {
      //   const list = FormatSingleListToSelect(data.experience);
      setExperience(data.experience);
    }
    // NOTA: MODO DE TRABAJO
    if (!!data.workmode?.workmode) {
      const list = FormatSingleListToSelect(data.workmode?.workmode);
      setWorkmode(list);
    }

    // NOTA: MODO DE TRABAJO
    if (!!data.skills) {
      const list = FormatListToSelect(data.skills);
      setSkills(list);
    }

    // NOTA: LISTA DE ESTADOS
    if (!listStatus.length) {
      callServicer(genericsRoutes.list_status)
        .then((response) => {
          setListStatus(response);
        })
        .catch((err) => console.log(err));
    }
    // NOTA: LISTA DE EXPERIENCIA
    // if (!listExperience.length) {
    //   callServicer(genericsRoutes.list_experience)
    //     .then((response) => {
    //       setListExperience(response);
    //     })
    //     .catch((err) => console.log(err));
    // }
    // NOTA: LISTA DE MODO DE TRABAJO
    if (!listWorkMode.length) {
      callServicer(genericsRoutes.list_workmode)
        .then((response) => {
          setListWorkMode(response);
        })
        .catch((err) => console.log(err));
    }
    // NOTA: LISTA DE HABILIDADES
    if (!listSkills.length) {
      callServicer(genericsRoutes.list_skills)
        .then((response) => {
          setListSkills(response);
        })
        .catch((err) => console.log(err));
    }
  }, [showModal]);

  const callServicer = async (url: string) => {
    const { response } = await callEndpoint<IResponse<TypeLists[]>>(
      getListService(url)
    );
    return FormatListToSelect(response?.data as TypeLists[]);
  };

  // NOTA: ACTUALIZAR ESTADO DEL EXPERTO
  const handleChangeStatus = async (option: SingleValue<TypeListsSelect>) => {
    const parseData = {
      id_status: option?._id,
      id_exp: idExpert,
    };
    setStatus(option);
    await callEndpoint(
      ExpertsServiceUpdate(parseData, `${experts.experts_status}`, data.token)
    );
    await updateExpertService();
  };

  // NOTA: ACTUALIZAR EXPERIENCIA DEL EXPERTO
  const handleChangeExperience = async (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const years = Number((e.target as HTMLInputElement).value);
    setExperience(years);
  };

  const handleMouseUpExperience = async (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const years = Number((e.target as HTMLInputElement).value);
    if (experienceDebounce.current) clearTimeout(experienceDebounce.current);

    const parseData = {
      years,
      id_exp: idExpert,
    };
    await callEndpoint(
      ExpertsServiceUpdate(
        parseData,
        `${experts.experts_experience}`,
        data.token
      )
    );
    await updateExpertService();
  }

  // NOTA: ACTUALIZAR MODO DE TRABAJO DEL EXPERTO
  const handleChangeWorkMode = async (option: SingleValue<TypeListsSelect>) => {
    const parseData = {
      id_work_mode: option?._id,
      id_exp: idExpert,
    };
    setWorkmode(option);
    await callEndpoint(
      ExpertsServiceUpdate(parseData, `${experts.experts_workmode}`, data.token)
    );
    await updateExpertService();
  };

  const handleChangeSkills = async (options: MultiValue<TypeListsSelect>) => {
    const parseData = {
      id_skills: options.map((o) => o._id),
      id_exp: idExpert,
    };
    setSkills(options);
    await callEndpoint(
      ExpertsServiceUpdate(parseData, `${experts.experts_skills}`, data.token)
    );
    await updateExpertService();
  };
  // NOTA: ACTUALIZAR INFORMACIÓN PERSONAL
  const handleEdit = async () => {
    const dataToSend = {
      title: values.title,
      description: values.description,
    };

    await callEndpoint<IResponse<string>>(
      ExpertsServiceUpdate(
        dataToSend,
        `${experts.edit_personal_info}`,
        data.token
      )
    );
    await updateExpertService();
    onClose();
  };

  return (
    <Modal
      show={showModal}
      onClose={onClose}
      title="Editar Perfil"
      labelButton="Guardar"
      handleAction={() => void handleEdit()}
    >
      <h4 className="label font-bold text-sm text-text-100 mb-4">Perfil</h4>
      <Input
        data={{
          label: "Título",
          name: "title",
          value: values.title,
          placeholder: "Médico especialista capilar",
          onChange: handleChangeInput,
        }}
      />
      <TextArea
        data={{
          label: "Descripción",
          name: "description",
          value: values.description,
          placeholder: "Habla sobre ti",
          onChange: handleChangeTextArea,
        }}
      />
      <h4 className="label font-bold text-sm text-text-100 mb-4">
        Experiencia ({experience} años{`${experience === 15 ? " o más" : ""}`})
      </h4>

      {/* <Select
        data={{
          label: "Selecciona tu tiempo de experiencia",
          name: "experience",
          placeholder: "Experiencia",
          options: listExperience,
          value: experience,
          onSelect: handleChangeExperience,
        }}
      /> */}

      <ExperienceRangeInput
        data={{
          min: 0,
          max: 15,
          value: `${experience}`,
          symbol: "años",
          name: "experience",
          symbolPosition: "right",
        }}
        className="px-6 mb-6"
        handleChange={handleChangeExperience}
        onMouseUp={handleMouseUpExperience}
      />
      <h4 className="label font-bold text-sm text-text-100 mb-4">
        Habilidades
      </h4>

      <CustomMultiSelect
        data={{
          label: "Selecciona tus habilidades",
          name: "skills",
          placeholder: "Habilidades",
          options: listSkills,
          value: skills,
          onSelect: handleChangeSkills,
        }}
      />

      <h4 className="label font-bold text-sm text-text-100 mb-4">
        Modo de trabajo
      </h4>

      <Select
        data={{
          label: "Selecciona tu modo de trabajo",
          name: "experience",
          placeholder: "Experiencia",
          options: listWorkMode,
          value: workmode,
          onSelect: handleChangeWorkMode,
        }}
      />

      <h4 className="label font-bold text-sm text-text-100 mb-4">Estado</h4>

      <Select
        data={{
          label: "Cambiar estado",
          name: "status",
          placeholder: "Estado",
          options: listStatus,
          value: status,
          onSelect: handleChangeStatus,
        }}
      />
    </Modal>
  );
}
