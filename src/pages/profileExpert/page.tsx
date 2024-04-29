/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
// hooks
import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useParams } from "react-router-dom";
// components
import { ProfileHeader } from "@/components/common/profileHeader/";
import Button from "@/components/common/buttons/button/button.component";
import ButtonEdit from "@/components/common/buttons/buttonEdit/buttonEdit.common";
import Box from "../../layouts/contentBox/contentBox.component";
import NavBar from "./components/navbar/navbar";
import Loader from "@/components/loaders/loader/loader.component";
// sections
import Degree from "./components/sections/degree/degree.section";
// modals
import EditProfile from "./components/modals/editProfile/editProfile";
import Services from "./components/sections/services/services.section";
import Languages from "./components/sections/language/languages.section";
import Portfolio from "./components/sections/portfolio/portfolio.section";
import Location from "./components/sections/location/location.section";
import ContactTech from "./components/modals/contactTech/contactTech.modal";
// interface
import { ActionModal } from "@/interface/enums/";
import { AppStore } from "@/storage/store";

// utils
import { IResponseServicesExpertData } from "@/services/pages/getExpertData.service";
import UpsertLanguage from "./components/sections/language/language.modal";
import UpsertDegree from "./components/sections/degree/degree.modal";
import useModal from "@/hooks/states/useModal";
import UpsertLocation from "./components/sections/location/location.modal";
import UpsertResults from "./components/sections/portfolio/portfolio.modal";
import UpsertService from "./components/sections/services/services.modal";
import { updateExpert } from "@/storage/slice/expert.slice";
import EmptyBox from "@/components/common/emptyBox/emptyBox";
import { SubcategoryLists } from "@/interface/generics/ISubcategories.interface";

export interface CategoriesMapped {
  _id: string;
  name: string;
  subcategories: SubcategoryLists[];
}

export default function ProfileExpert() {
  const data = useLoaderData();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { handleToggleModal, handleToggleModalWithLabel } = useModal();

  const { user, general, statusModals, expert } = useSelector(
    (storage: AppStore) => storage
  );
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    const responsaService = data as IResponseServicesExpertData;

    if (responsaService?.expert) {
      dispatch(updateExpert(responsaService.expert));

      setIsOwner(id === user._id);
    }
  }, []);

  const categoriesMapped = useMemo(() => {
    if (!expert?.subcategories?.length) return [];
    return expert.subcategories.reduce((categoriesToReturn, subcategory) => {
      const categoryIndex = categoriesToReturn.findIndex(
        (c) => c._id === subcategory.category._id
      );
      if (categoryIndex !== -1) {
        categoriesToReturn[categoryIndex].subcategories.push(subcategory);
      } else {
        categoriesToReturn.push({
          _id: subcategory.category._id,
          name: subcategory.category.name,
          subcategories: [subcategory],
        });
      }
      return categoriesToReturn;
    }, [] as CategoriesMapped[]);
  }, [expert]);


  if (!expert) {
    return <Loader loading={true} />;
  } else {
    return (
      <main className="bg-white-bg min-h-screen">
        <ProfileHeader
          data={{
            name: `${expert.firstName} ${expert.lastName}`,
            title: expert.profileInfo?.title || "",
            isOwner: isOwner,
          }}
        >
          <div className="relative">
            {isOwner ? (
              <div className="edit ml-auto w-fit right-4 md:right-8 -top-24 md:top-2 absolute">
                <ButtonEdit
                  onClick={() =>
                    handleToggleModal("modal_profile", ActionModal.open)
                  }
                />
              </div>
            ) : null}

            {!isOwner ? (
              <Button
                data={{
                  label: "Contáctame ahora",
                  customStyles: "btn-secondary text-sm md:mt-6 lg:mr-8 ",
                  onClick: () =>
                    handleToggleModal("modal_contanct", ActionModal.open),
                }}
              />
            ) : null}
          </div>
        </ProfileHeader>

        {/* navbar */}
        <NavBar />

        <div className="flex flex-wrap lg:flex-nowrap lg:gap-8 content-sections lg:px-8 xl:px-0">
          <div className="content-box lg:min-w-[288px] lg:w-72 hidden lg:block h-fit sticky top-10">
            {/* TODO: location */}
            <div className="label mb-10">
              <h5 className="font-bold text-text-100 md:text-lg mb-4">
                Ubicación
              </h5>
              <div className="lg:pl-4 flex">
                {isOwner && (
                  <ButtonEdit
                    onClick={() =>
                      handleToggleModalWithLabel(
                        "modal_location",
                        "Editar ubicación",
                        ActionModal.open,
                        "Guardar"
                      )
                    }
                    label=""
                  />
                )}
                <span className="text-text-90">
                  {" "}
                  {expert?.location?.name || ""}
                </span>
              </div>
              <hr className="border-text-50 mt-3 mb-6" />
            </div>
            
            {/* TODO: preferred working */}

            {/* <div className="label mb-10">
              <h5 className="font-bold text-text-100 md:text-lg mb-4">
                Modo de trabajo
              </h5>
              <div className="lg:pl-4">
                {isOwner && !expert.workmode?.workmode ? (
                  <ButtonEdit
                    onClick={() =>
                      handleToggleModal("modal_profile", ActionModal.open)
                    }
                    label="Agregar modo de trabajo"
                    icon="add"
                  />
                ) : (
                  <span className="text-text-90 mb-2 block">
                    {expert.workmode?.workmode?.name}
                  </span>
                )}
              </div>
              <hr className="border-text-50 mt-3 mb-6" />
            </div> */}

            {/* TODO: languajes */}
            {/* <div className="label mb-10">
              <h5 className="font-bold text-text-100 md:text-lg mb-4">
                Idiomas
              </h5>
              <div className="lg:pl-4">
                {isOwner && !expert.languages?.length ? (
                  <ButtonEdit
                    onClick={() =>
                      handleToggleModalWithLabel(
                        "modal_language",
                        "Agregar idioma",
                        ActionModal.open,
                        "Guardar"
                      )
                    }
                    label="Agregar idioma"
                    icon="add"
                  />
                ) : (
                  expert.languages.map((item, i: number) => (
                    <span className="text-text-90 font-bold block mb-2" key={i}>
                      {item.language?.name} <br />{" "}
                      <span className="font-normal text-sm text-text-70 pl-2">
                        {item.proficiency?.name}
                      </span>
                    </span>
                  ))
                )}
              </div>
              <hr className="border-text-50 mt-3 mb-6" />
            </div> */}
            {/* TODO: social media */}
            <div className="label mb-10">
              <h5 className="font-bold text-text-100 md:text-lg mb-4">
                Redes sociales
              </h5>
              <div className="lg:px-4 flex justify-center items-center gap-6">
                <img
                  src="/assets/icons/fb-icon.svg"
                  width={24}
                  height={24}
                  alt="icon "
                />
                <img
                  src="/assets/icons/ig-icon.svg"
                  width={24}
                  height={24}
                  alt="icon "
                />
                <img
                  src="/assets/icons/twitter-icon.svg"
                  width={24}
                  height={24}
                  alt="icon "
                />
                <img
                  src="/assets/icons/linkedin-icon.svg"
                  width={24}
                  height={24}
                  alt="icon "
                />
              </div>
            </div>
          </div>

          <div className="body flex flex-col gap-7 w-11/12 mx-auto mt-8 lg:mt-0 pb-8">
            <Box
              data={{
                label: "Sobre mí",
                id: "about",
              }}
              edit={false}
            >
              {!!expert.profileInfo?.description || !isOwner ? (
                <>
                <p className="text-sm text-text-90 text-justify mb-8">
                  {expert.profileInfo?.description || ''}
                </p>
                <div className="my-5">
                <h4 className="label font-bold text-sm text-text-100 mb-2">
                  Precio por día
                </h4>
                <div className="categories mt-3 flex gap-2">
                  <span
                  className="rounded-sm bg-text-40 text-text-80 text-xs block px-4 py-1 w-fit "
                >
                  {expert.priceByDay || 125} €
                </span>
                </div>
                </div>
                </>

              ) : (
                <EmptyBox
                  labelButton="Editar descripción"
                  onClick={() =>
                    handleToggleModal("modal_profile", ActionModal.open)
                  }
                />
              )}
              
            </Box>

            <Box
              data={{
                label: "Habilidades",
                id: "habilities",
              }}
              edit={false}
            >
               {categoriesMapped.map((category) => (
              <div key={category._id} className="my-5">
                <h4 className="label font-bold text-sm text-text-100 mb-2">
                  {category?.name.charAt(0).toUpperCase()}
                  {category?.name.slice(1)}
                </h4>
                <div className="categories mt-3 flex gap-2">
                {category?.subcategories.map((subcategory) => (
                  <span
                  key={subcategory._id}
                  className="rounded-sm bg-text-40 text-text-80 text-xs block px-4 py-1 w-fit "
                >
                  {subcategory.name.charAt(0).toUpperCase()}{subcategory.name.slice(1)}
                </span>
                ))}
                </div>
              </div>
            ))}
            </Box>
           
{/* 
            {!isOwner && !expert.degrees.length ? null : (
              <Degree isOwner={isOwner} data={expert.degrees} />
            )}

            {!isOwner && !expert.services.length ? null : (
              <Services isOwner={isOwner} data={expert.services} />
            )} */}

            {/* {general.device <= 1024 ? <Languages isOwner={isOwner} /> : null} */}

            {!isOwner && !expert.services.length ? null : (
              <Portfolio isOwner={isOwner} data={expert.portfolios} />
            )}

            {/* <Location isOwner={isOwner} /> */}
          </div>
        </div>

        {/* NOTE: modals list */}
        <EditProfile
          showModal={statusModals.modal_profile}
          onClose={() => handleToggleModal("modal_profile", ActionModal.close)}
          data={{
            expert: expert.profileInfo,
            status: expert.status,
            experience: expert.experience,
            workmode: expert.workmode,
            skills: expert.skills,
            subcategories: expert.subcategories,
            token: user.token,
            priceByDay: expert.priceByDay,
          }}
          idExpert={expert._id}
        />

        <ContactTech
          showModal={statusModals.modal_contanct}
          onClose={() => handleToggleModal("modal_contanct", ActionModal.close)}
        />

        <UpsertDegree
          showModal={statusModals.modal_degree.show}
          label={statusModals.modal_degree.label}
          labelButton={statusModals.modal_degree.labelButton}
          onClose={() =>
            handleToggleModalWithLabel(
              "modal_degree",
              "",
              ActionModal.close,
              ""
            )
          }
          expert={expert}
        />

        <UpsertService
          showModal={statusModals.modal_services.show}
          label={statusModals.modal_services.label}
          labelButton={statusModals.modal_services.labelButton}
          onClose={() =>
            handleToggleModalWithLabel(
              "modal_services",
              "",
              ActionModal.close,
              ""
            )
          }
          expert={expert}
        />

        <UpsertLanguage
          showModal={statusModals.modal_language.show}
          label={statusModals.modal_language.label}
          labelButton={statusModals.modal_language.labelButton}
          onClose={() =>
            handleToggleModalWithLabel(
              "modal_language",
              "",
              ActionModal.close,
              ""
            )
          }
        />
        {statusModals.modal_location.show && (
          <UpsertLocation
            showModal={statusModals.modal_location.show}
            label={statusModals.modal_location.label}
            labelButton={statusModals.modal_location.labelButton}
            onClose={() =>
              handleToggleModalWithLabel(
                "modal_location",
                "",
                ActionModal.close,
                ""
              )
            }
            data={{
              location: expert.location,
            }}
          />
        )}

        <UpsertResults
          showModal={statusModals.modal_portfolio.show}
          label={statusModals.modal_portfolio.label}
          labelButton={statusModals.modal_portfolio.labelButton}
          onClose={() =>
            handleToggleModalWithLabel(
              "modal_portfolio",
              "",
              ActionModal.close,
              ""
            )
          }
        />
      </main>
    );
  }
}
