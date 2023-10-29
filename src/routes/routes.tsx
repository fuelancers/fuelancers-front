import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "@/storage/store";
import Loader from "@/components/loaders/loader/loader.component";
import { getExpertsServices } from "@/services/pages/getExperts.service";
import { getExpertData } from "@/services/pages/getExpertData.service";
import { routesWeb } from "@/core/routesWeb";

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

function Routes() {
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
