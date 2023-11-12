import { ExpertLocation, ExpertLocationResponse } from "@/interface/services";
import { useEffect, useState } from "react";

const extractAddress = (place: any) => {
    const address = {
      city: "",
      // state: "",
      country: "",
      plain() {
        const city = this.city ? this.city + ", " : "";
        // const state = this.state ? this.state + ", " : "";
        return city  + this.country;
      },
    };
  
    const location = {
      name: "",
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    }
  
    if (!Array.isArray(place?.address_components)) {
      return {
        ...location,
        name: address.plain(),
      };
    }
  
    place.address_components.forEach((component: any) => {
      if (component.types.includes("locality")) {
        address.city = component.long_name;
      }
  
      // if (types.includes("administrative_area_level_2")) {
      //   address.state = value;
      // }
  
      if (component.types.includes("country")) {
        address.country = component.long_name;
      }
    });
  
    return {
      ...location,
      name: address.plain(),
    };
  };

export function useGooglePlacesAutocomplete(locationData: ExpertLocationResponse | undefined, inputRef: React.MutableRefObject<HTMLInputElement | null>) {
    const [location, setLocation] = useState<ExpertLocation | {}>(locationData || {});

    const onChangeAddress = (autocomplete: any) => {
        const place = autocomplete.getPlace();
        setLocation(extractAddress(place));
      };
    
    
      const initAutocomplete = () => {
        if (!inputRef.current) return;
    
        const autocomplete = new (window as any).google.maps.places.Autocomplete(
            inputRef.current
        );
        autocomplete.setFields(["address_component", "geometry"]);
        autocomplete.addListener("place_changed", () =>
          onChangeAddress(autocomplete)
        );
      };
    
      useEffect(() => {
       if (inputRef.current) initAutocomplete();
      }, [inputRef.current]);

      return { location, setLocation };
}