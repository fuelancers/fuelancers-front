import { useFormValues } from "@/hooks/form/useFormValues";
import Modal from "@/layouts/modal/modal.component";
import Input from "@/components/form/input/input.component";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { QuerysURL } from "@/interface/enums";

import Date from "@/components/form/date/date.component";
import { EDateFormat } from "@/interface/enums/EDateFormat.enum";
import { IExpertDegree } from "@/interface/forms/IExpertDegree.interface";
import Checkbox from "@/components/form/checkbox/checkbox.component";
import { useFetch } from "@/hooks/services/useFetch";
import {
  DeleteExpertService,
  ExpertsServiceCreate,
  ExpertsServiceUpdate,
} from "@/services/experts/experts.service";
import { experts } from "@/core/routesServices";
import { useUpdateExpert } from "@/hooks/services/useUpdateExpert";
import { Expert } from "@/interface/services";

// interface
interface IProps {
  showModal: boolean;
  label: string;
  labelButton?: string;
  expert: Expert;
  onClose: () => void;
}

export default function UpsertDegree({
  showModal,
  onClose,
  label,
  labelButton = "Add",
  expert,
}: IProps) {
  const {
    values,
    handleChangeInput,
    handleChangeDate,
    handleChangeSingleCheckbox,
    setValues,
  } = useFormValues<IExpertDegree>(new IExpertDegree());
  const [searchParams, setSearchParams] = useSearchParams();

  const { callEndpoint } = useFetch();
  const { updateExpertService } = useUpdateExpert();

  const idDegree = useMemo(() => {
    return searchParams.get(QuerysURL.id_degree);
  }, [searchParams]);

  useEffect(() => {
    if (!idDegree) return;

    // TODO: this is a edit modal;
    const getDegree = expert.degrees.filter(
      (degree) => degree._id === idDegree
    );

    if (!getDegree.length) return;

    setValues((prev) => ({
      ...prev,
      field_study: getDegree[0].field,
      academic: getDegree[0].academicDegree,
      school: getDegree[0].school,
      start_date: getDegree[0].start,
      end_date: getDegree[0].end === "current" ? "" : getDegree[0].end,
      current_studying: getDegree[0].end === "current" ? true : false,
    }));
  }, [idDegree]);

  const handleSave = async () => {
    // TODO: save the degree
    const parseData = {
      field: values.field_study,
      academicDegree: values.academic,
      start: values.start_date,
      end: values.current_studying ? "curr" : values.end_date,
      school: values.school,
    };

    if (!idDegree) {
      await saveData(parseData);
    } else {
      await updateData(parseData);
    }
    await updateExpertService();

    setValues(new IExpertDegree());
    onClose();
  };

  const saveData = async (parseData: any) => {
    await callEndpoint(
      ExpertsServiceCreate(
        parseData,
        `${experts.experts_degrees}`
      )
    );
  };

  const updateData = async (parseData: any) => {
    await callEndpoint(
      ExpertsServiceUpdate(
        parseData,
        `${experts.experts_degrees}?id_degree=${idDegree}`
      )
    );
  };

  const handleDeleteDegree = async () => {
    await callEndpoint(
      DeleteExpertService(
        `${experts.experts_degrees}?id_degree=${idDegree}`
      )
    );
    await updateExpertService();
    onClose();
  };

  return (
    <Modal
      show={showModal}
      onClose={onClose}
      title={label}
      labelButton={labelButton}
      handleAction={handleSave}
    >
      <Input
        data={{
          label: "Field of study",
          name: "field_study",
          value: values.field_study,
          placeholder: "Pharmacy...",
          onChange: handleChangeInput,
        }}
      />
      <Input
        data={{
          label: "Bachelor's degree",
          name: "academic",
          value: values.academic,
          placeholder: "doctoral degree",
          onChange: handleChangeInput,
        }}
      />
      <Input
        data={{
          label: "School",
          name: "school",
          value: values.school,
          placeholder: "School",
          onChange: handleChangeInput,
        }}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 lg:col-span-1">
          <Date
            data={{
              format: EDateFormat.YYYY_MM,
              name: "start_date",
              label: "Start date",
              value: values.start_date,
              placeholder: "yyyy-mm",
              onChange: handleChangeDate,
            }}
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Date
            data={{
              format: EDateFormat.YYYY_MM,
              name: "end_date",
              label: "End date",
              value: values.end_date,
              placeholder: "yyyy-mm",
              onChange: handleChangeDate,
              disabled: values.current_studying,
            }}
          >
            <div className="mt-2">
              <Checkbox
                data={{
                  label: "Current studying",
                  name: "current_studying",
                  checked: values.current_studying,
                  id: "current_studying",
                }}
                handleChange={(e: React.FormEvent<HTMLInputElement>) =>
                  handleChangeSingleCheckbox(e)
                }
              />
            </div>
          </Date>
        </div>
      </div>
      {!!idDegree ? (
        <div>
          <button
            className="btn text-alert-danger text-sm mx-0 my-5 w-fit cursor-pointer"
            onClick={handleDeleteDegree}
          >
            Delete degree
          </button>
        </div>
      ) : null}
    </Modal>
  );
}
