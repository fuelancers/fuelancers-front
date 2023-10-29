import { useNavigate } from 'react-router-dom';

import Input from '@/components/form/input/input.component';
import TextArea from '@/components/form/textArea/textArea';
import Button from '@/components/common/buttons//button/button.component';
import { useFormValues } from '@/hooks/form/useFormValues';

import { ValidationForm } from '@/interface/enums/';
import { DataProfileUser } from '@/interface/forms/';
import { AppStore } from '@/storage/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function AboutMe() {
    const navigate = useNavigate();

    const user = useSelector((storage: AppStore) => storage.user)

    const { values, setValues, errors, handleChangeInput, handleChangeTextArea } =
        useFormValues<DataProfileUser>(new DataProfileUser());

    useEffect(() => {
        setValues((prev) => ({
            ...prev,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            phone: user.phone ? user.phone.toString() : ""
        }))
    }, [])

    return (
        <main className="bg-white-bg min-h-screen">
            <div className="top-breadcrumbs px-4 pt-6 lg:pt-0 flex gap-x-6 items-center flex-wrap">
                <button type="button" onClick={() => navigate('/profile')}>
                    <img
                        src="/assets/icons/chevron-left-icon.svg"
                        width={8}
                        height={15}
                        alt="Chevron left"
                    />
                </button>

                <h5 className="font-bold text-text-100">My personal Data</h5>

                <hr className="separator w-full" />
            </div>

            <div className="content w-11/12 lg:w-full mx-auto flex flex-col gap-7 pb-8">
                <div className="content-box">
                    <h4 className="text-text-100 text-sm font-bold">About you</h4>
                    <hr className="separator w-full" />
                    <form action="">
                        <Input
                            data={{
                                label: 'Name',
                                name: 'name',
                                value: values.first_name,
                                placeholder: 'Hannah',
                                onChange: handleChangeInput,
                            }}
                        />
                        <Input
                            data={{
                                label: 'LastName',
                                name: 'name',
                                value: values.last_name,
                                placeholder: 'Jones Miller',
                                onChange: handleChangeInput,
                            }}
                        />
                        <Input
                            data={{
                                label: 'Profession',
                                name: 'profession',
                                value: values.profession,
                                placeholder: 'Medical hair',
                                onChange: handleChangeInput,
                            }}
                        />

                        <TextArea
                            data={{
                                label: 'Description',
                                name: 'description',
                                value: values.description,
                                placeholder: 'Talk about you',
                                onChange: handleChangeTextArea,
                            }}
                        />

                        <Button data={{ label: 'Save', disabled: true }} />
                    </form>
                </div>

                <div className="content-box">
                    <h4 className="text-text-100 text-sm font-bold">Contact</h4>
                    <hr className="separator w-full" />
                    <form action="">
                        <Input
                            data={{
                                label: 'Location',
                                name: 'location',
                                value: values.location,
                                placeholder: 'Madrid...',
                                onChange: handleChangeInput,
                            }}
                        />
                        <Input
                            data={{
                                label: 'Email',
                                name: 'email',
                                value: values.email,
                                placeholder: 'contact_me@example.com',
                                onChange: handleChangeInput,
                            }}
                        />

                        <Input
                            data={{
                                label: 'Phone number',
                                name: 'phone',
                                value: values.phone,
                                placeholder: '+98 765 4321',
                                onChange: (e: React.FormEvent<HTMLInputElement>) =>
                                    handleChangeInput(e, ValidationForm.number),
                            }}
                        />

                        <Input
                            data={{
                                name: 'fb_link',
                                value: values.fb_link,
                                placeholder: 'link...',
                                onChange: handleChangeInput,
                                inline: true,
                                icon: 'fb',
                            }}
                        />
                        <Input
                            data={{
                                name: 'ig_link',
                                value: values.ig_link,
                                placeholder: 'link...',
                                onChange: handleChangeInput,
                                inline: true,
                                icon: 'ig',
                            }}
                        />
                        <Input
                            data={{
                                name: 'twitter_link',
                                value: values.twitter_link,
                                placeholder: 'link...',
                                onChange: handleChangeInput,
                                inline: true,
                                icon: 'twitter',
                            }}
                        />
                        <Input
                            data={{
                                name: 'in_link',
                                value: values.in_link,
                                placeholder: 'link...',
                                onChange: handleChangeInput,
                                inline: true,
                                icon: 'linkedin',
                            }}
                        />

                        <Button data={{ label: 'Save', disabled: true }} />
                    </form>
                </div>

                <div className="content-box">
                    <h4 className="text-text-100 text-sm font-bold">Change password</h4>
                    <hr className="separator w-full" />
                    <form action="">
                        <Input
                            data={{
                                label: 'Password',
                                name: 'change_password',
                                value: values.change_password,
                                placeholder: '******',
                                onChange: handleChangeInput,
                                type: 'password',
                            }}
                        >
                            <span className="text-xs text-alert-warnig">
                                Enter your current password to change it
                            </span>
                        </Input>

                        <Button data={{ label: 'Continue' }} />
                    </form>
                </div>

                <div className="content-delete-account mt-12">
                    <h5 className="text-sm font-bold text-text-100">Delete account</h5>

                    <span className="text-xs text-alert-danger">
                        do you really want to delete the account?
                    </span>

                    <Button data={{ label: 'Delete', customStyles: 'bg-alert-danger mx-0 w-48' }} />
                </div>
            </div>
        </main>
    );
}
