"use-client";
// components
import { Link, useLoaderData } from "react-router-dom";
import Button from "@/components/common/buttons//button/button.component";
import ContentSections from "@/layouts/contentSections/contentSections.component";
// styles
import "@/styles/page.scss";
import { routesWeb } from "@/core/routesWeb";

export default function Home() {
  return (
    <main className="">
      <section className="h-[80vh] relative w-full">
        <div className="content-sections h-full w-full">
          <div className="absolute inset-0 w-full h-[80vh] cover-bg ">
            <img
              src="/assets/images/home-bg.jpg"
              width={1000}
              height={900}
              alt="home gb"
              className="w-full h-screen"
            />
            <div className="overlay  w-full absolute z-10 inset-0 h-full bg-text-90 opacity-50"></div>
          </div>
          <div className="relative z-20  px-4 md:px-8 mx-auto flex flex-col h-full justify-center ">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center pb-24">
              Find your perfect expert in FUE.
            </h2>

            <p className="text-white text-center mb-16 w-10/12 mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              aspernatur sint veritatis repellat corrupti maxime natus maiores
              tempore magnam
            </p>
            <Link to={routesWeb.find_experts}>
              <Button
                data={{
                  label: "Find experts",
                }}
              />
            </Link>
          </div>
        </div>
      </section>
      <ContentSections
        label="We connect expert in FUE and clinics"
        styles="bg-white"
      >
        <div className=" md:flex md:justify-center md:items-center gap-8 ">
          <p className="paragraph text-justify">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus,
            debitis. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Possimus, debitis.
          </p>
          <div className="relative md:min-w-[250px]">
            <img
              src="/assets/images/blob.png"
              width={300}
              height={300}
              alt="blob"
              className="absolute blob-image -z-0 -top-20 md:top-0"
            />
            <img
              src="/assets/images/grow.svg"
              width={250}
              height={250}
              alt="home gb"
              className="relative block mx-auto my-10 z-10"
            />
          </div>
        </div>
      </ContentSections>

      {/* STEPS */}
      <ContentSections label="How do we do it?" styles="bg-text-30" rounded>
        <div className="step-one">
          <h5 className="text-text-90 md:text-xl font-bold text-center mb-6">
            Step one
          </h5>
          <div className="flex gap-4 md:gap-8 items-center mb-10">
            <p className="paragraph text-justify flex-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
              ex tempore culpa amet recusandae labore.
            </p>

            <img
              src="/assets/images/step_one.svg"
              width={150}
              height={150}
              alt="home gb"
              className="relative block mx-auto z-10 flex-1 md:flex-2 md:w-48 md:h-48"
            />
          </div>
        </div>
        <div className="step-two">
          <h5 className="text-text-90 md:text-xl font-bold text-center mb-6">
            Step two
          </h5>
          <div className="flex gap-4 md:gap-8 items-center mb-10">
            <img
              src="/assets/images/step_one.svg"
              width={150}
              height={150}
              alt="home gb"
              className="relative block mx-auto z-10 flex-1 md:flex-2 md:w-48 md:h-48"
            />

            <p className="paragraph text-justify flex-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
              ex tempore culpa amet recusandae labore.
            </p>
          </div>
        </div>
        <img
          src="/assets/images/blob-curve.png"
          width={300}
          height={300}
          alt="blob"
          className="absolute -z-0 -bottom-20 -left-10 select-none"
        />
      </ContentSections>

      <ContentSections
        label="Services to help you get healthier."
        styles="bg-white"
      >
        <Button
          data={{
            label: "Find experts",
            customStyles: "btn-primary mt-20",
          }}
        />
      </ContentSections>

      {/* join our */}
      <ContentSections label="Are you a expert?." styles="bg-text-30" rounded>
        <ul className="list-none flex gap-6 flex-col ">
          <li className="flex gap-2 items-center text-sm text-text-90 md:justify-center">
            <img
              src="/assets/images/check.svg"
              alt="check icon"
              width={30}
              height={30}
            />
            Lorem ipsum dolor sit amet.
          </li>

          <li className="flex gap-2 items-center text-sm text-text-90 md:justify-center">
            <img
              src="/assets/images/check.svg"
              alt="check icon"
              width={30}
              height={30}
            />
            Lorem ipsum dolor sit amet.
          </li>

          <li className="flex gap-2 items-center text-sm text-text-90 md:justify-center">
            <img
              src="/assets/images/check.svg"
              alt="check icon"
              width={30}
              height={30}
            />
            Lorem ipsum dolor sit amet.
          </li>

          <li className="flex gap-2 items-center text-sm text-text-90 md:justify-center">
            <img
              src="/assets/images/check.svg"
              alt="check icon"
              width={30}
              height={30}
            />
            Lorem ipsum dolor sit amet.
          </li>
        </ul>

        <Button
          data={{
            label: "Join us",
            customStyles: "btn-extra mt-20",
          }}
        />
      </ContentSections>
    </main>
  );
}
