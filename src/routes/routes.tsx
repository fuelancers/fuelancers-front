import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "@/storage/store";
import Loader from "@/components/loaders/loader/loader.component";
import { getExpertsServices } from "@/services/pages/getExperts.service";
import { getExpertData } from "@/services/pages/getExpertData.service";
import { routesWeb } from "@/core/routesWeb";
import { useEffect } from "react";

export const router = createBrowserRouter([
  {
    lazy: async () => {
      const module = await import("../layouts/application/application.layout");
      return { Component: module.default };
    },
    path: routesWeb.home,
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import("../pages/home/page");
          return { Component: module.default };
        },
      },
      {
        path: routesWeb.find_experts,
        loader: async ({ request, params }) => {
          const response = await getExpertsServices();
          return response;
        },
        lazy: async () => {
          const module = await import("../pages/experts/page");
          return { Component: module.default };
        },
      },
      {
        path: `${routesWeb.expert}/:id`,
        loader: async ({ request, params }) => {
          const id = params?.id || "";
          const response = await getExpertData(id);
          return response;
        },
        lazy: async () => {
          const module = await import("../pages/profileExpert/page");
          return { Component: module.default };
        },
      },
      {
        path: routesWeb.signin,
        lazy: async () => {
          const module = await import("../pages/signin/page");
          return { Component: module.default };
        },
      },
      {
        path: routesWeb.signup,
        lazy: async () => {
          const module = await import("../pages/signup/page");
          return { Component: module.default };
        },
      },
      {
        path: routesWeb.profile,
        lazy: async () => {
          const module = await import("../pages/profile/layout");
          return { Component: module.default };
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const module = await import("../pages/profile/page");
              return { Component: module.default };
            },
          },
          {
            path: "about-me",
            lazy: async () => {
              const module = await import("../pages/profile/aboutMe/page");
              return { Component: module.default };
            },
          },
        ],
      },
    ],
  },
]);

const apiKey = import.meta.env.VITE_APP_GMAP_API_KEY;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

function loadAsyncScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

const initMapScript = () => {
  if ((window as any).google) {
    return Promise.resolve();
  }
  const src = `${mapApiJs}?key=${apiKey}&libraries=places&language=en&v=weekly`;
  return loadAsyncScript(src);
};

const extractLocation = (place: any) => {
  const address = place.address_components.reduce(
    (acc: any, component: any) => {
      const types = component.types;
      if (types.includes("locality")) {
        acc.city = component.long_name;
      } else if (types.includes("administrative_area_level_1")) {
        acc.state = component.long_name;
      } else if (types.includes("country")) {
        acc.country = component.long_name;
      }
      return acc;
    },
    {}
  );
  return {
    name: `${address.city ? `${address.city}, ` : ''}${address.state ? `${address.state}, ` : ''}${address.country}`,
    lat: place?.geometry?.location?.lat || 0,
    lng: place?.geometry?.location?.lng || 0,
  };
}

const reverseGeocode = ({ latitude, longitude } : GeolocationCoordinates) => {
  const url = `${geocodeJson}?key=${apiKey}&latlng=${latitude},${longitude}`;
  fetch(url)
    .then((response) => response.json())
    .then((locationRes) => {
      const place = locationRes.results[0];
      const location = extractLocation(place);
      localStorage.setItem('location', JSON.stringify(location));
    });
};

const findMyLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      reverseGeocode(position.coords);
    });
  }
};

function Routes() {
  useEffect(() => {
    if (typeof window !== 'undefined')
      initMapScript();
      // if (!localStorage.getItem('location')) findMyLocation();
  }, [])

  return (
    <Provider store={store}>
      <RouterProvider
        router={router}
        fallbackElement={<Loader loading={true} />}
      />
    </Provider>
  );
}

export default Routes;
