/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
// hooks
import { useFetch } from "@/hooks/services/useFetch";
import { Navigate, useNavigate } from "react-router-dom";
import { useFormValues } from "@/hooks/form/useFormValues";
import { validateFields } from "./validateFields";
// components
import Input from "../../components/form/input/input.component";
import { Link } from "react-router-dom";
// services
import { AuthService, UserMeService } from "@/services/auth/auth.service";
import { auth, users } from "@/core/routesServices";
// interface
import { IResponseSignIn, DataSignIn, IUser } from "@/interface/services/auth/";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "@/storage/slice/user.slice";
import { IResponse } from "@/interface/services";
import { AppStore } from "@/storage/store";

export default function SignIn() {
    const nagivate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector((storage: AppStore) => storage.user);

    const { values, handleChangeCheckbox, handleChangeInput, errors, setErrors } =
        useFormValues<DataSignIn>(new DataSignIn());

    const { callEndpoint, error } = useFetch();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const existErrors = validateFields<DataSignIn>(values, setErrors);

        //  data validate
        if (existErrors) return;

            const data: any = Object.assign({}, values);
            data.keep_session = !!values.keep_session.length ? true : false;
            // call endpoint
            const result = await callEndpoint<any>(
                AuthService<DataSignIn>(data, auth.signin)
            );
            if (!result?.response?.access_token) return;

            const { response: userMe } = await callEndpoint<IResponse<IUser>>(
                UserMeService(users.me, result?.response?.access_token as string)
            )

            if (userMe) {
                userMe.data.token = result?.response?.access_token as string
                dispatch(createUser(userMe?.data))
            }

            nagivate("/");

            return;
    };

    if (!!user._id) {
        return (
            <Navigate to="/" />
        )
    }

    return (
        <main className="min-h-screen bg-white-bg overflow-hidden relative grid grid-cols-1 lg:grid-cols-2 ">
            <div className="lg:flex-1 w-full h-screen relative hidden lg:block">
                <img
                    src="/assets/images/bg-login.jpg"
                    width={300}
                    height={300}
                    alt="blob"
                    className="w-full h-full object-cover absolute"
                />
                <div className="overlay  w-full absolute z-30 insert-0 h-full bg-text-90 opacity-25"></div>
            </div>

            <div className="relative w-full lg:flex-1 lg:px-16 overflow-hidden">
                <img
                    src="/assets/images/blob-sign-2.svg"
                    width={300}
                    height={300}
                    alt="blob"
                    className="absolute -top-28 -right-16"
                />
                <div className="head py-20">
                    <h2 className=" text-text-100 text-xl text-center mb-6 font-bold">
                        ¡Qué bueno verte aquí!
                    </h2>

                    <h4 className="text-text-100 text-center font-bold">Iniciar sesión</h4>
                </div>

                <form className="content-form max-w-sm mx-auto" onSubmit={handleSignIn}>
                    <Input
                        data={{
                            label: "Correo electrónico",
                            name: "email",
                            value: values.email,
                            placeholder: "lucia@example.com",
                            type: "text",
                            onChange: handleChangeInput,
                            error: errors.email,
                        }}
                    />
                    <Input
                        data={{
                            label: "Contraseña",
                            name: "password",
                            value: values.password,
                            placeholder: "********",
                            type: "password",
                            onChange: handleChangeInput,
                            error: errors.password,
                        }}
                    >
                        <span className="text-xs text-text-70 hover:text-text-90 text-right px-4">
                            ¿Olvidaste tu contraseña?
                        </span>
                    </Input>

                    <div className="content-check w-11/12 mx-auto flex items-center">
                        <input
                            type="checkbox"
                            name="keep_session"
                            id="keep_session"
                            checked={!!values.keep_session.length}
                            onChange={() => handleChangeCheckbox("keep_session", "1")}
                        />
                        <label
                            htmlFor="keep_session"
                            className="text-sm font-bold text-text-90 inline-block ml-2"
                        >
                            ¿Mantener sesión abierta?
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="uppercase rounded-md border-none bg-primary text-white text-center w-72 block mx-auto py-2.5 px-4 font-bold mt-6 hover:bg-primary-hover outline-none"
                    >
                        Iniciar sesión
                    </button>

                    {error !== null ? (
                        <span className="text-sm text-alert-danger block text-center mt-4">
                            {error?.error?.response?.error}
                        </span>
                    ) : null}
                </form>

                <div className="flex mt-10 mx-auto w-4/5 items-center gap-2">
                    <hr className="flex-1 border-text-50 block"></hr>
                    <span className="flex-2 text-sm text-text-90">O inicia sesión con</span>
                    <hr className="flex-1 border-text-50 block"></hr>
                </div>

                <div className="my-10 w-72 mx-auto">
                    <span className="text-xs text-center text-text-90 block">
                        ¿No tienes una cuenta?,{" "}
                        <strong className="text-primary">
                            <Link to="/signup">Regístrate ahora</Link>
                        </strong>{" "}
                    </span>
                </div>

                <img
                    src="/assets/images/blob-sign.svg"
                    width={300}
                    height={300}
                    alt="blob"
                    className="absolute -bottom-28 -left-16"
                />
            </div>
        </main>
    );
}
