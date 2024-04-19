import { Link } from "react-router-dom";
import { list } from "@/interface/services/experts/IExperts.interface";

import "./cardExpert.scss";
import { MultiValue } from "react-select";
import { TypeListsSelect } from "@/interface/generics";

interface IProps {
  data: {
    name: string;
    title: string;
    picture?: string;
    description: string;
    price: number;
    skills: list[];
    status: { status: list } | undefined;
    id: string;
    location?: string;
    subcategories: any[];
  };
}

export default function CardExpert({ data }: IProps) {
  const { name, title, picture, description, price, location, skills, status, id, subcategories } =
    data;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <article className="rounded-lg bg-white w-full max-w-[300px] lg:max-w-[280px]  border-text-30 border-2 hover:shadow-cards transition">
      <Link to={`/expert/${id}`} className="cursor-default lg:cursor-pointer">
        <div className="top w-full  h-64">
          <div className="image w-full  h-full bg-white rounded-lg relative">
            <img
              src={picture || ""}
              width={300}
              height={300}
              alt="Photo"
              className="object-contain object-center h-full w-full rounded-t-lg"
            />

            <div className="overlay-gradient absolute inset-0 w-full h-full"></div>

            {/* favorites */}
            <button className="absolute right-4 top-4">
              <img
                src="/assets/icons/heart-white-icon.png"
                width={24}
                height={24}
                alt="Favorite"
              />
            </button>
            {/* status */}
            {status ? (
              <div className="status rounded-xl bg-text-40 shadow-strong w-fit absolute left-4 top-4">
                <span className="block text-center text-primary text-xs px-5 py-1">
                  {status.status.name}
                </span>
              </div>
            ) : null}

            <div className="z-10 absolute bottom-4 left-4 ">
              <h4 className="font-bold  text-white text-2xl mb-2 capitalize">{name}</h4>
              <span className="text-text-30 text-sm flex gap-2">
                <img
                  src="/assets/icons/pin-white-icon.png"
                  width={14}
                  height={14}
                  alt="Pin"
                />
                Ubicado en {location}
              </span>
            </div>
          </div>
        </div>
        <div className="info  p-4 pb-6 relative">
          <div className="price-day rounded-xl bg-white shadow-strong w-fit absolute right-4 -top-4">
            <span className="block text-center text-text-100 text-xs px-5 py-1">
              225€/día
            </span>
          </div>
          <div className="data relative">
            <h4 className="text-xl font-bold text-text-100">{title}</h4>

            <div className="rate w-fit">
              <input type="radio" id="star5" name="rate" value="5" />
              <label htmlFor="star5" title="text">
                ☆
              </label>
              <input type="radio" id="star4" name="rate" value="4" />
              <label htmlFor="star4" title="text">
                ☆
              </label>
              <input type="radio" id="star3" name="rate" value="3" />
              <label htmlFor="star3" title="text">
                ☆
              </label>
              <input type="radio" id="star2" name="rate" value="2" />
              <label htmlFor="star2" title="text">
                ☆
              </label>
              <input type="radio" id="star1" name="rate" value="1" />
              <label htmlFor="star1" title="text">
                ☆
              </label>
            </div>
          </div>
          <div className="my-2">
            <p className="text-sm text-text-90 text-justify">{description}</p>
          </div>

          <div className="categories mt-6 flex gap-2">
            {subcategories?.map((subcategory) => (
              <span
                key={subcategory._id}
                className="rounded-sm bg-text-40 text-text-80 text-xs block px-4 py-1 w-fit "
              >
                {subcategory.name.charAt(0).toUpperCase()}{subcategory.name.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
