import Button from "@/components/common/buttons/button/button.component";
import Input from "@/components/form/input/input.component";
import TextArea from "@/components/form/textArea/textArea";
import { useFormValues } from "@/hooks/form/useFormValues";
import { TiLocation } from "react-icons/ti";
import { IoMdCall } from "react-icons/io";
import Select from "@/components/form/select/select.component";

const contactForm = {
  role: {
    _id: "1",
    label: "Clínica",
    value: "CLINIC",
  },
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  message: "",
};

const ContactPage = () => {
  const {
    values,
    setValues,
    errors,
    handleChangeInput,
    handleChangeTextArea,
    handleChangeSelect,
  } = useFormValues<typeof contactForm>(contactForm);

  return (
    <main className="bg-white-bg min-h-screen pb-8 lg:pt-6">
      <section className="content-sections pt-12 px-8 md:px-8 lg:gap-8">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
      </section>
      <section className="flex flex-wrap content-sections gap-4 mt-12 px-4 md:px-8 lg:gap-8">
        <div className="content-box px-4 py-14 flex-1 lg:px-8">
          <form action="" className="max-w-full">
           
            <div className="flex px-2 sm:px-3 md:px-4">
              <Input
                data={{
                  label: "Nombre",
                  name: "name",
                  value: values.firstName,
                  placeholder: "Jones",
                  onChange: handleChangeInput,
                }}
              />
              <Input
                data={{
                  label: "Apellido",
                  name: "name",
                  value: values.lastName,
                  placeholder: "Miller",
                  onChange: handleChangeInput,
                }}
              />
            </div>
            <div className="flex px-2 sm:px-3 md:px-4">
              <Input
                data={{
                  label: "Email",
                  name: "email",
                  value: values.email,
                  placeholder: "jonesmiller@email.com",
                  onChange: handleChangeInput,
                }}
              />
              <Input
                data={{
                  label: "Teléfono",
                  name: "phoneNumber",
                  value: values.phoneNumber,
                  placeholder: "+12 345 6789",
                  onChange: handleChangeInput,
                }}
              />
            </div>
            <div className="w-[50%] flex pl-2 sm:pl-3 md:pl-4">
              <Select
                data={{
                  label: "Rol",
                  name: "role",
                  placeholder: "Idioma",
                  value: values.role,
                  options: [
                    {
                      _id: "1",
                      label: "Clínica",
                      value: "CLINIC",
                    },
                    {
                      _id: "2",
                      label: "Experto",
                      value: "EXPERT",
                    },
                  ],
                  onSelect: (option) => handleChangeSelect(option, "role"),
                }}
              />
            </div>
            <TextArea
              data={{
                label: "Mensaje",
                name: "message",
                value: values.message,
                placeholder: "Escribe tu mensaje...",
                onChange: handleChangeTextArea,
              }}
            />

            <Button data={{ label: "Enviar mensaje" }} />
          </form>
        </div>
        <div className="flex flex-col content-box px-8 py-14 min-w-[288px] gap-14 my-8 lg:max-w-xs lg:my-0">
          <div className="">
            <div className="flex bg-[#F3F4F6] rounded-md mx-auto w-fit h-fit p-3 justify-center items-center mb-6">
              <TiLocation size="28" color="rgb(75, 85, 99)" />
            </div>
            <h4 className="mb-4 text-xl tracking-tight font-extrabold text-center text-gray-900">
              Dirección:
            </h4>
            <p className="text-center text-[#6B7280]">
              SILVER LAKE, United States 1941 Late Avenue Zip Code/Postal
              code:03875
            </p>
          </div>
          <div className="">
            <div className="flex bg-[#F3F4F6] rounded-md mx-auto w-fit h-fit p-3 justify-center items-center mb-6">
              <IoMdCall size="28" color="rgb(75, 85, 99)" />
            </div>
            <h4 className="mb-4 text-xl tracking-tight font-extrabold text-center text-gray-900">
              Llamanos:
            </h4>
            <p className="text-center text-[#6B7280]">
              Llámanos para hablar con un miembro de nuestro equipo. Siempre
              estamos felices de ayudar.
            </p>
            <p className="text-center text-[#18C29C] font-bold mt-2 text-lg">
              +1 (646) 786-5060
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
