// hooks
import React, { useState } from "react";
import { useFetch } from "@/hooks/services/useFetch";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useFormValues } from "@/hooks/form/useFormValues";
import { validateFields } from "./validateFileds";
// components
import Input from "../../components/form/input/input.component";
// services
import { AuthService, UserMeService } from "@/services/auth/auth.service";
import { auth, users } from "@/core/routesServices";
// interface
import { DataSignUp, IResponseSignUp, IUser } from "@/interface/services/auth/";
import { ValidationForm } from "@/interface/enums";
import { IResponse } from "@/interface/services";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "@/storage/slice/user.slice";
import { AppStore } from "@/storage/store";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((storage: AppStore) => storage.user);

  const { values, handleChangeInput, errors, setErrors } =
    useFormValues<DataSignUp>(new DataSignUp());
  const [isFreelancer, setIsFreelancer] = useState<boolean>(true);

  const { callEndpoint, error } = useFetch();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const existErrors = validateFields<DataSignUp>(
      values,
      setErrors,
      isFreelancer
    );

    //  data validate
    if (existErrors) return;

    // call endpoint
    const urlService = isFreelancer ? auth.signup_as_expert : auth.signup;

    const { response } = await callEndpoint<IResponseSignUp>(
      AuthService<DataSignUp>(values, urlService)
    );

    if (!response?.access_token) return;

    const { response: userMe } = await callEndpoint<IResponse<IUser>>(
      UserMeService(users.me, response?.access_token as string)
    );

    if (userMe) {
      userMe.data.token = response?.access_token as string;
      dispatch(createUser(userMe?.data));
    }

    navigate("/");

    return;
  };

  const handleTypeUser = (value: boolean) => setIsFreelancer(value);

  if (!!user._id) {
    return <Navigate to="/" />;
  }
  return (
    <main className="min-h-screen bg-white-bg overflow-hidden relative grid grid-cols-1 lg:grid-cols-2">
      <div className="lg:flex-1 w-full min-h-screen h-full hidden lg:block relative ">
        <img
          src="/assets/images/bg-login.jpg"
          width={300}
          height={300}
          alt="blob"
          className="w-full h-full object-cover absolute inset-0 bg-fixed"
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

          <h4 className="text-text-100 text-center font-bold mt-14">
            Regístrate como:
          </h4>

          <div className="flex justify-center w-fit gap-4 mx-auto">
            <button
              className={`${isFreelancer ? 'bg-primary text-primary text-white' : 'text-primary border-2'} font-bold text-center text-md block  rounded-xl py-1 px-6  hover:opacity-75 mt-4`}
              onClick={() => handleTypeUser(true)}
            >
              Fuelancer
            </button>
            <button
              className={`${!isFreelancer ? 'bg-primary text-primary text-white border-[rgb(24, 194, 156)]' : 'text-primary border-2'} font-bold text-center text-md block mx-auto rounded-xl py-1 px-6  hover:opacity-75 mt-4`}
              onClick={() => handleTypeUser(false)}
            >
              Clínica
            </button>
          </div>
        </div>

        <form className="content-form max-w-sm mx-auto" onSubmit={handleSignUp}>
          {!isFreelancer && (
            <Input
              data={{
                label: "Nombre de la clínica",
                name: "clinic_name",
                value: values.clinic_name,
                placeholder: "Hair recovery",
                onChange: handleChangeInput,
                error: errors.clinic_name,
              }}
            />
          )}
          <Input
            data={{
              label: "Nombre",
              name: "first_name",
              value: values.first_name,
              placeholder: "Lucia",
              onChange: handleChangeInput,
              error: errors.first_name,
            }}
          />
          <Input
            data={{
              label: "Apellido",
              name: "last_name",
              value: values.last_name,
              placeholder: "Lapor Rivas",
              onChange: handleChangeInput,
              error: errors.last_name,
            }}
          />
          <Input
            data={{
              label: "Correo electrónico",
              name: "email",
              value: values.email,
              placeholder: "lucia@example.com",
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
          />

          <Input
            data={{
              label: "Repetir contraseña",
              name: "repeat_password",
              value: values.repeat_password,
              placeholder: "********",
              type: "password",
              onChange: handleChangeInput,
              error: errors.repeat_password,
            }}
          />

          <Input
            data={{
              label: "Número de teléfono",
              name: "phone_number",
              value: values.phone_number,
              placeholder: "+12 3456 789",
              onChange: (e: React.FormEvent<HTMLInputElement>) =>
                handleChangeInput(e, ValidationForm.number),
              error: errors.phone_number,
            }}
          />

          <button
            type="submit"
            className="btn btn-primary w-72 block mx-auto mt-6"
          >
            Registrarse
          </button>

          {error !== null ? (
            <span className="text-sm text-alert-danger block text-center mt-4">
              {error.error}
            </span>
          ) : null}
        </form>

        <div className="flex mt-10 mx-auto w-4/5 items-center gap-2">
          <hr className="flex-1 border-text-50 block"></hr>
          <span className="flex-2 text-sm text-text-90">
            O inicia sesión con
          </span>
          <hr className="flex-1 border-text-50 block"></hr>
        </div>

        <div className="my-10 w-72 mx-auto">
          <span className="text-xs text-center text-text-90 block">
            ¿Ya tienes una cuenta?,{" "}
            <strong className="text-primary">
              <Link to="/signin">Iniciar sesión</Link>
            </strong>
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
