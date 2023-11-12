import axios from "axios";
import { useEffect } from "react";

const apiKey = import.meta.env.VITE_APP_GMAP_API_KEY;
const ipInfoKey = import.meta.env.VITE_APP_IPINFO_KEY;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";
// const ipapiEndpoint = "https://api.ipapi.com/api/check?access_key=" + ipapiKey;

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
    name: `${address.city ? `${address.city}, ` : ""}${
      address.state ? `${address.state}, ` : ""
    }${address.country}`,
    lat: place?.geometry?.location?.lat || 0,
    lng: place?.geometry?.location?.lng || 0,
  };
};

const reverseGeocode = ({
  latitude,
  longitude,
}: Partial<GeolocationCoordinates>) => {
  const url = `${geocodeJson}?key=${apiKey}&latlng=${latitude},${longitude}`;
  fetch(url)
    .then((response) => response.json())
    .then((locationRes) => {
      const place = locationRes.results[0];
      const location = extractLocation(place);
      localStorage.setItem("location", JSON.stringify(location));
    });
};

const extractIpInfoLocation = (ipLocation: any) => {
  const loc = ipLocation.loc.split(",");

  reverseGeocode({ latitude: Number(loc[0]), longitude: Number(loc[1]) });
};

const getIPBasedLocation = async () => {
  try {
    const { data: ipLocation } = await axios.get(
      `https://ipinfo.io?token=${ipInfoKey}`
    );

    const location = extractIpInfoLocation(ipLocation);
    localStorage.setItem("location", JSON.stringify(location));
  } catch (error) {
    console.error("Error getting location based on IP:", error);
  }
};

const findMyLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        reverseGeocode(position.coords);
      },
      (error) => {
        getIPBasedLocation();
      }
    );
  } else {
    getIPBasedLocation();
  }
};

export function useFindMyLocation() {
  useEffect(() => {
    if (typeof window !== "undefined")
      if (!localStorage.getItem("location")) findMyLocation();
  }, []);
}
