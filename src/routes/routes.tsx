import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "@/storage/store";
import Loader from "@/components/loaders/loader/loader.component";
import { getExpertsServices } from "@/services/pages/getExperts.service";
import { getExpertData } from "@/services/pages/getExpertData.service";
import { routesWeb } from "@/core/routesWeb";
import { useEffect } from "react";
import { getClinicsService } from "@/services/pages/getClinics.service";

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
        path: routesWeb.find_clinics,
        loader: async ({ request, params }) => {
          const response = await getClinicsService();
          return response;
        },
        lazy: async () => {
          const module = await import("../pages/clinics/page");
          return { Component: module.default };
        },
      },
      {
        path: routesWeb.contact,
        lazy: async () => {
          const module = await import("../pages/contact/page");
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
