// hooks
import React from 'react';

// components
import RangeInput from '@/components/form/range/range.component';
import Checkbox from '@/components/form/checkbox/checkbox.component';
import Radio from '@/components/form/radio/radio.component';

// types
import { IFormFilter } from '@/interface/forms/';
import { TypeListDataFilter } from '@/interface/generics/';
import { LoaderFilter } from '@/components/loaders/loaderFilter';

interface IProps {
    values: IFormFilter;
    data: TypeListDataFilter;
    handleChangeInput: (e: React.FormEvent<HTMLInputElement>) => void;
    handleChangeCheckbox: (name: string, id: string) => void;
    handleChangeRadio: (name: string, id: string) => void;
}

function Filter({
    values,
    handleChangeInput,
    handleChangeCheckbox,
    handleChangeRadio,
    data,
}: IProps) {
    return (
        <>
            <div>
                <h5 className="font-bold text-sm md:text-base text-text-100 mb-4">Experience</h5>
                {!!data?.list_experience?.length
                    ? data?.list_experience?.map((exp, i: number) => (
                        <Radio
                            key={exp._id}
                            data={{
                                checked: values.experience === exp._id ? true : false,
                                name: 'experience',
                                label: exp.name,
                                id: `${exp.name}-${i + 1}`,
                            }}
                            handleChange={() => handleChangeRadio('experience', exp._id)}
                        />
                    ))
                    : <LoaderFilter />

                }

                <hr className="separator my-9   " />
            </div>

            <div>
                <h5 className="font-bold text-sm md:text-base text-text-100 mb-4">Price</h5>

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
            </div>

            <div>
                <h5 className="font-bold text-sm md:text-base  text-text-100 mb-4">Language</h5>
                {!!data?.list_language?.length
                    ? data.list_language.map((lang, i: number) => (
                        <Checkbox
                            key={lang._id}
                            data={{
                                checked: values.language.includes(lang._id),
                                name: 'language',
                                label: lang.name,
                                id: `${lang.name}-${i + 1}`,
                            }}
                            handleChange={() => handleChangeCheckbox('language', lang._id)}
                        />
                    ))
                    : <LoaderFilter />}

                <hr className="separator my-9   " />
            </div>

            <div>
                <h5 className="font-bold text-sm md:text-base  text-text-100 mb-4">Working mode</h5>
                {!!data?.list_workmode?.length
                    ? data?.list_workmode?.map((work, i: number) => (
                        <Checkbox
                            key={work._id}
                            data={{
                                checked: values.work_mode.includes(work._id),
                                name: 'working',
                                label: work.name,
                                id: `${work.name}-${i + 1}`,
                            }}
                            handleChange={() => handleChangeCheckbox('work_mode', work._id)}
                        />
                    ))
                    : <LoaderFilter />}

                <hr className="separator my-9   " />
            </div>
        </>
    );
}

export default Filter;
