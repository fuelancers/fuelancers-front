/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
// hooks
import { useState, useEffect, useRef, FormEvent } from "react";
import { useFormValues } from "@/hooks/form/useFormValues";
import { useFetch } from "@/hooks/services/useFetch";
import { useLoaderData } from "react-router-dom";
// components
import { CardExpert } from "@/components/common/cardExpert";
import { LoaderCardExperts } from "@/components/loaders/loaderCardExperts";
import { Sidebar } from "@/layouts/sidebar";
import Select from "@/components/form/select/select.component";
import Button from "@/components/common/buttons//button/button.component";
import Filter from "./components/filter";
// utils
import { experts } from "@/core/routesServices";
// interface
import { IFormFilter, EnumFilter } from "@/interface/forms";
import { IFilter } from "@/interface/generics";
import { IResponse } from "@/interface/services/IResponse.interface";
import { Expert, ExpertLocation, User } from "@/interface/services/experts/";
// services
import { getListService } from "@/services/generic/getLists.service";
import { IResponseServicesExpertsPage } from "@/services/pages/getExperts.service";
import { useSelector } from "react-redux";
import { AppStore } from "@/storage/store";
import { useGooglePlacesAutocomplete } from "@/hooks/services/useGooglePlacesAutocomplete";
import { useFindMyLocation } from "@/hooks/services/useFindMyLocation";
import MapContainer from "./components/map";

export default function Experts() {
  const data = useLoaderData();
  const searchInput = useRef(null);

  const [filter, setFilter] = useState<IFilter>(new IFilter());
  const { location: locationSearch, setLocation: setLocationSearch } =
    useGooglePlacesAutocomplete(undefined, searchInput);
  const [location, setLocation] = useState<ExpertLocation | {}>();
  const { location: myLocation } = useFindMyLocation();
  const [locationQuery, setLocationQuery] = useState("");
  const [isShowingMap, setIsShowingMap] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {
    values,
    setValues,
    handleChangeInput,
    handleChangeCheckbox,
    handleChangeRadio,
  } = useFormValues<IFormFilter>(new IFormFilter("1500", "500"));

  const [listExpert, setListExperts] = useState<Expert[]>([]);
  const { general: generalStorage } = useSelector(
    (storage: AppStore) => storage
  );

  useEffect(() => {
    if (localStorage.getItem("location")) {
      const locationStorage: ExpertLocation = JSON.parse(
        localStorage.getItem("location") || "{}"
      );
      if (locationStorage?.name !== (location as ExpertLocation)?.name)
        setLocation(locationStorage);
    } else if (myLocation) {
      setLocation(myLocation);
    }
  }, [myLocation]);

  const { callEndpoint, error } = useFetch();

  const checkFiltersActive = () => {
    const check = (type: EnumFilter, state: string | string[]) => {
      const isInclude = values.filters_active.includes(type);

      if (
        (Array.isArray(state) && isInclude) ||
        (!Array.isArray(state) && !!state && isInclude)
      ) {
        return;
      } else if (
        (Array.isArray(state) && !!state?.length) ||
        (!Array.isArray(state) && !!state)
      ) {
        setValues((prev) => ({
          ...prev,
                    filters_active: prev.filters_active.concat(type),
                  }));
                  return;
                }
              };
              check(EnumFilter.experience, values.experience);
              check(EnumFilter.language, values.language);
              check(EnumFilter.work_mode, values.work_mode);
              check(EnumFilter.distance, values.range_distance);
              check(EnumFilter.skill, values.skill);
            };

            const filterList = () => {
              const getListExperts = async () => {
                let url = experts.list_experts;
                let existFilter = false;
                if (!!values.experience) {
                  url = `${url}${existFilter ? "&" : "?"}experience_id=${
                    values.experience
                  }`;
                  existFilter = true;
                }

                if (!!values.language?.length) {
                  const val = values.language.join("-");
                  url = `${url}${existFilter ? "&" : "?"}language_id=${val}`;
                  existFilter = true;
                }

                if (!!values.work_mode?.length) {
                  const val = values.work_mode.join("-");
                  url = `${url}${existFilter ? "&" : "?"}work_mode_id=${val}`;
                  existFilter = true;
                }

                if (!!values.skill) {
                  const val = values.skill.join("-");
                  url = `${url}${existFilter ? "&" : "?"}skill_id=${val}`;
                  existFilter = true;
                }

                url = `${url}${existFilter ? "&" : "?"}dist=${Number(
                  values.range_distance || 500
                )}`;
                existFilter = true;

                if ((location as ExpertLocation)?.name) {
                  url = `${url}${existFilter ? "&" : "?"}lat=${
                    (location as ExpertLocation)?.lat
                  }&lng=${(location as ExpertLocation)?.lng}`;
                  existFilter = true;
                }

                const { response } = await callEndpoint<IResponse<Expert[]>>(
                  getListService(url)
                );
                if ((location as ExpertLocation)?.name)
                  setLocationQuery((location as ExpertLocation)?.name);
                return response;
              };

              getListExperts()
                .then((result) => {
                  if (result && result.success) {
                    setListExperts(result.data);
                  }
                })
                .catch((err) => console.log(err));
            };

            // NOTA: sección para establecer los datos del filtro
            useEffect(() => {
              const response = data as IResponseServicesExpertsPage;

              setFilter((prev) => ({
                ...prev,
                data: {
                  ...response.filters,
                },
              }));

              // setListExperts(response.listExperts);
            }, []);

            useEffect(() => {
              // checkFiltersActive();
              if (!location) return;
              const timer = setTimeout(() => filterList(), 500);

              return () => {
                clearTimeout(timer);
              };
            }, [
              values.experience,
              values.language,
              values.work_mode,
              values.skill,
              values.range_distance,
              location,
            ]);

            const handleChangeFilter = () =>
              setFilter((prev) => ({ ...prev, status: !filter.status }));
            const handleCloseFilter = () =>
              setFilter((prev) => ({ ...prev, status: false }));
            const handleDeleteFilter = (value: string) => {
              const changeValue = (key: string, newValue: number | number[]) => {
                setValues((prev) => ({
                  ...prev,
                  [key]: newValue,
                  filters_active: prev.filters_active.filter((item) => item !== value),
                }));
              };

              if (value === EnumFilter.experience) {
                changeValue("experience", 0);
              }
              if (value === EnumFilter.language) {
                changeValue("language", []);
              }
              if (value === EnumFilter.work_mode) {
                changeValue("work_mode", []);
              }
              if (value === EnumFilter.distance) {
                changeValue("range_distance", 500);
              }
              if (value === EnumFilter.skill) {
                changeValue("skill", []);
              }
            };

            const handleSearch = (e: FormEvent) => {
              e.preventDefault();
              if ((locationSearch as ExpertLocation)?.name?.length) {
                setLocation(locationSearch);
                localStorage.setItem("location", JSON.stringify(locationSearch));
              }
            };

            return (
              <main className="bg-white-bg min-h-screen pb-8 lg:pt-6">
                <div className="lg:rounded-xl  search w-full relative h-56 bg-text-70 md:h-64 grid place-items-center overflow-hidden lg:w-11/12 lg:mx-auto">
                  <img
                    src="/assets/images/bg-find-experts.jpg"
                    width={1000}
                    height={400}
                    alt="bg icon"
                    className="object-cover object-center h-full w-full max-h-[400px]"
                  />
                  <form
                    className="search-bar h-fit w-11/12 absolute z-20 flex flex-wrap gap-2 justify-center"
                    onSubmit={handleSearch}
                  >
                    {/* <div className="fields grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 md:mb-0 w-full md:w-fit"> */}
                    {/* <Select
                        data={{
                          name: "status",
                          placeholder: "Select category",
                          options: filter.data.list_categories,
                          customStyles: "mb-0 md:w-64 lg:w-80",
                          fullWidth: true,
                          value: values.category,
                          onSelect: (option) =>
                            setValues((prev) => ({
                              ...prev,
                              skill: option,
                            })),
                        }}
                      /> */}
                    {/* <Select
                        data={{
                          name: "status",
                          placeholder: "Location",
                          options: [],
                          value: values.location,
                          customStyles: "mb-0 md:w-64 lg:w-80",
                          fullWidth: true,
                          onSelect: () => console.log("hola"),
                        }}
                      /> */}

                    <input
                      className={`rounded-[30px] w-full md:w-64 lg:w-96 py-2 px-5 border-[1px] text-md border-text-50 outline-none focus:border-primary focus:shadow-input transition-all ease-linear duration-300`}
                      ref={searchInput}
                      name="search"
                      type="text"
                      placeholder={
                        (location as ExpertLocation)?.name || "Buscar por ubicación..."
                      }
                    />

                    {/* </div> */}
                    <div className="search-icon w-full  md:w-[150px] lg:w-[256px]">
                      <button
                        className="w-full bg-secondary text-white block rounded-[30px] px-4 py-2 hover:bg-secondary-hover"
                        type="submit"
                      >
                        Buscar
                      </button>
                    </div>
                  </form>

                  <div className="overlay  w-full absolute z-10 inset-0 h-full bg-text-90 opacity-50"></div>
                </div>

                {/* TODO: filtro */}
                <div className="filters relative my-6 px-4 md:px-8 lg:px-8">
                  <div className="lg:w-11/12 lg:mx-auto">
                    <div className="filter-active flex gap-4 items-center flex-wrap">
                      <span>Filtros: </span>
                      {!!values.filters_active?.length ? (
                        <div className="content-active-filter flex w-auto gap-4 flex-wrap">
                          {values.filters_active.map((value) => (
                            <div
                              className="status rounded-sm bg-text-30 shadow-strong w-fit flex items-center gap-3 px-5 py-1"
                              key={value}
                            >
                              <span className="block text-center text-text-80 text-sm  font-bold">
                                {value}
                              </span>
                              <button onClick={() => handleDeleteFilter(value)}>
                                <img
                                  src="/assets/icons/close-icon.svg"
                                  width={15}
                                  height={15}
                                  alt="delete icon"
                                  className="object-cover object-center h-full w-full o"
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-text-90">Todos</span>
                      )}
                    </div>

                    <button
                      className="fixed right-0  w-9 h-8 rounded-l-md bg-white shadow-square p-1 top-48 flex justify-center items-center cursor-default z-20 lg:hidden"
                      onClick={handleChangeFilter}
                    >
                      <img
                        src="/assets/icons/filter-icon.svg"
                        width={20}
                        height={20}
                        alt="Filter icon"
                      />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap lg:gap-8  lg:px-0 lg:w-11/12 mx-auto w-fit">
                  <div className="content-box lg:min-w-[288px] hidden lg:block h-fit sticky top-10 ">
                    <h5 className="font-bold mb-6 lg:text-lg">Filtro</h5>

                    <Filter
                      values={values}
                      data={filter.data}
                      handleChangeInput={handleChangeInput}
                      handleChangeCheckbox={handleChangeCheckbox}
                      handleChangeRadio={handleChangeRadio}
                      showMap={() => setIsShowingMap((prev) => !prev)}
                    />
                  </div>
                  <div className="w-full">
                    {Boolean(locationQuery.length) && !generalStorage.loading_page && (
                      <span className="mb-4 px-4 md:px-0 inline-block">
                        Mostrando {listExpert.length} resultados ordenados por proximidad a{" "}
                        <b>{locationQuery}</b>.
                      </span>
                    )}
                    <div className="w-full flex h-full">
                      <div className="w-[70%] list-technician flex flex-wrap gap-7 mt-4 justify-center lg:justify-start lg:items-stretch lg:gap-4 px-4 md:px-8 lg:px-0 w-fit lg:w-full h-fit">
                        {!generalStorage.loading_page ? (
                          listExpert?.map((expert: Expert) => (
                            <CardExpert
                              key={expert._id}
                              data={{
                                name: expert.firstName + " " + expert.lastName,
                                title: expert?.profileInfo?.title || "",
                                description: expert?.profileInfo?.description || "",
                                picture: expert.picture,
                                price: 50,
                                location: expert?.location?.name || "",
                                skills: expert.skills,
                                status: expert.status,
                                id: expert._id.toString(),
                              }}
                            />
                          ))
                        ) : (
                          <>
                            <LoaderCardExperts />
                            <LoaderCardExperts />
                            <LoaderCardExperts />
                            <LoaderCardExperts />
                            <LoaderCardExperts />
                          </>
                        )}
                      </div>
                      {!generalStorage.loading_page && isShowingMap && (
                        <div className="w-[40%] pb-8">
                          <MapContainer experts={listExpert} location={location} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* barra lateral del filtro */}
                {filter.status ? (
                  <Sidebar onClose={handleCloseFilter} label="Filtro">
                    <Filter
                      values={values}
                      data={filter.data}
                      handleChangeInput={handleChangeInput}
                      handleChangeCheckbox={handleChangeCheckbox}
                      handleChangeRadio={handleChangeRadio}
                    />

                    <Button data={{ label: "Aplicar", onClick: handleCloseFilter }} />
                  </Sidebar>
                ) : null}
              </main>
            );
          }
