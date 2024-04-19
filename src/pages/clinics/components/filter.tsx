// hooks
import React, { useEffect, useState } from "react";

// components
import RangeInput from "@/components/form/range/range.component";
import Checkbox from "@/components/form/checkbox/checkbox.component";
import Radio from "@/components/form/radio/radio.component";

// types
import { IFormFilter } from "@/interface/forms/";
import { TypeListDataFilter } from "@/interface/generics/";
import { LoaderFilter } from "@/components/loaders/loaderFilter";
import ButtonEdit from "@/components/common/buttons/buttonEdit/buttonEdit.common";
import ExperienceRangeInput from "@/components/form/range/experienceRange/experienceRange.component";
import { useFetch } from "@/hooks/services/useFetch";
import { CategoryLists } from "@/interface/generics/ISubcategories.interface";
import { IResponse } from "@/interface/services";
import { getListService } from "@/services/generic/getLists.service";
import { genericsRoutes } from "@/core/routesServices";

interface IProps {
  values: IFormFilter;
  data: TypeListDataFilter;
  handleChangeInput: (e: React.FormEvent<HTMLInputElement>) => void;
  handleChangeCheckbox: (name: string, id: string) => void;
  handleChangeRadio: (name: string, id: string) => void;
  showMap?: () => void;
}

function Filter({
  values,
  handleChangeInput,
  handleChangeCheckbox,
  handleChangeRadio,
  showMap,
  data,
}: IProps) {
  const { callEndpoint, error } = useFetch();
  const [experience, setExperience] = useState<number | null>(values?.experience || 0);
  const [distance, setDistance] = useState<number | null>(Number(values?.range_distance || 0));
  const [listSubcategories, setListSubcategories] = useState<CategoryLists[]>(
    []
  );
  const handleChangeExperience = (e: React.FormEvent<HTMLInputElement>) => {
    setExperience(parseInt(e.currentTarget.value));
  }

  const handleChangeDistance = (e: React.FormEvent<HTMLInputElement>) => {
    setDistance(parseInt(e.currentTarget.value));
  }

  useEffect(() => {
    if (!listSubcategories.length) {
      callEndpoint<IResponse<CategoryLists[]>>(
        getListService(genericsRoutes.list_subcategories)
      )
        .then(({ response }) => {
          if (response?.data) setListSubcategories(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [])

  return (
    <>
      <div>
        <div className="flex items-start">
          <h5 className="font-bold text-sm md:text-base text-text-100 mb-4">
            Distancia ({distance}km)
          </h5>
          {showMap && (
            <button
              className={`flex cursor-default ml-auto mr-[1px] w-fit relative lg:cursor-pointer hover:opacity-70`}
              onClick={showMap}
            >
              <img
                src="/assets/icons/gps-icon.svg"
                width={17}
                height={17}
                alt="Icono de GPS"
                className="inline-block"
              />
            </button>
          )}
        </div>

        <RangeInput
          data={{
            min: 100,
            max: 700,
            value: `${distance}`,
            symbol: "km",
            name: "range_distance",
            symbolPosition: "right",
          }}
          handleChange={handleChangeDistance}
          onMouseUp={handleChangeInput}
        />

        {/* <hr className="separator my-9" /> */}
      </div>
      {/* <div>
        <h5 className="font-bold text-sm md:text-base text-text-100 mb-4">
          Experiencia ({experience} años{`${experience === 15 ? " o más" : ""}`})
        </h5>
        <ExperienceRangeInput
          data={{
            min: 0,
            max: 15,
            value: `${experience}`,
            symbol: "años",
            name: "experience",
            symbolPosition: "right",
          }}
          handleChange={handleChangeExperience}
          onMouseUp={handleChangeInput}
        /> */}
        {/* {!!data?.list_experience?.length ? (
          data?.list_experience?.map((exp, i: number) => (
            <Radio
              key={exp._id}
              data={{
                checked: values.experience === exp._id ? true : false,
                name: "experience",
                label: exp.name,
                id: `${exp.name}-${i + 1}`,
              }}
              handleChange={() => handleChangeRadio("experience", exp._id)}
            />
          ))
        ) : (
          <LoaderFilter />
        )} */}

        {/* <hr className="separator my-9   " />
      </div> */}

      {/* <div>
                <h5 className="font-bold text-sm md:text-base text-text-100 mb-4">Precio</h5>

                <RangeInput
                    data={{
                        min: 250,
                        max: 3000,
                        value: values?.range_price,
                        symbol: '€',
                        name: 'range_price',
                    }}
                    handleChange={handleChangeInput}
                />

                <hr className="separator my-9" />
            </div> */}

      {/* <div>
        <h5 className="font-bold text-sm md:text-base  text-text-100 mb-4">
          Habilidades
        </h5>
        {!!data?.list_categories?.length ? (
          data?.list_categories?.map((skill, i: number) => (
            <Checkbox
              key={skill._id}
              data={{
                checked: values.skill.includes(skill._id),
                name: "skill",
                label: skill.label,
                id: `${skill.label}-${i + 1}`,
              }}
              handleChange={() => handleChangeCheckbox("skill", skill._id)}
            />
          ))
        ) : (
          <LoaderFilter />
        )}

        <hr className="separator my-9   " />
      </div> */}

      {/* {listSubcategories?.map((category) => {
        if (!category?.name || !category?.subcategories?.length) return null;
        return (
        <div>
        <h5 className="font-bold text-sm md:text-base  text-text-100 mb-4">
          {category?.name?.charAt(0).toUpperCase()}{category?.name?.slice(1)}
        </h5>
        {category?.subcategories?.map((subcategory, i: number) => (
            <Checkbox
              key={subcategory._id}
              data={{
                checked: values.subcategories?.includes(subcategory._id),
                name: subcategory.name,
                label: subcategory.name,
                id: subcategory._id,
              }}
              handleChange={() => handleChangeCheckbox("subcategories", subcategory._id)}
            />
          ))}
        

        <hr className="separator my-9   " />
      </div>
      )})} */}

      {/* <div>
        <h5 className="font-bold text-sm md:text-base  text-text-100 mb-4">
          Idioma
        </h5>
        {!!data?.list_language?.length ? (
          data.list_language.map((lang, i: number) => (
            <Checkbox
              key={lang._id}
              data={{
                checked: values.language.includes(lang._id),
                name: "language",
                label: lang.name,
                id: `${lang.name}-${i + 1}`,
              }}
              handleChange={() => handleChangeCheckbox("language", lang._id)}
            />
          ))
        ) : (
          <LoaderFilter />
        )}

        <hr className="separator my-9   " />
      </div> */}

      {/* <div>
        <h5 className="font-bold text-sm md:text-base  text-text-100 mb-4">
          Modo de trabajo
        </h5>
        {!!data?.list_workmode?.length ? (
          data?.list_workmode?.map((work, i: number) => (
            <Checkbox
              key={work._id}
              data={{
                checked: values.work_mode.includes(work._id),
                name: "working",
                label: work.name,
                id: `${work.name}-${i + 1}`,
              }}
              handleChange={() => handleChangeCheckbox("work_mode", work._id)}
            />
          ))
        ) : (
          <LoaderFilter />
        )}

        <hr className="separator my-9   " />
      </div> */}
    </>
  );
}

export default Filter;
