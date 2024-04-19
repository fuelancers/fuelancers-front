import React, { Fragment, useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  OverlayView,
} from "@react-google-maps/api";
import { Expert, ExpertLocation } from "@/interface/services";
import { Tooltip } from "antd";

const apiKey = import.meta.env.VITE_APP_GMAP_API_KEY;

const getCenter = (experts: Expert[]) => {
  const lat =
    experts.reduce(
      (acc, curr) => acc + curr.location.geoLocation.coordinates[1],
      0
    ) / experts.length;
  const lng =
    experts.reduce(
      (acc, curr) => acc + curr.location.geoLocation.coordinates[0],
      0
    ) / experts.length;
  return { lat, lng };
};

const getExpertName = (expert: Expert, experts: Expert[]) => {
  const expertsWithSameLocation = experts.filter(
    (e) =>
      e.location.geoLocation.coordinates[0] ===
        expert.location.geoLocation.coordinates[0] &&
      e.location.geoLocation.coordinates[1] ===
        expert.location.geoLocation.coordinates[1]
  );
  if (expertsWithSameLocation.length === 1)
    return `${expert.firstName} ${expert.lastName}`;
  return `(${expertsWithSameLocation.length}) ${
    expertsWithSameLocation
      .map((e) => `${e.firstName} ${e.lastName}`)
      .join(", ")
      .substring(0, 30) + "..."
  }`;
};

const MapGoogle = ({
  experts,
  location,
}: {
  experts: Expert[];
  location?: ExpertLocation | {};
}) => (
  <GoogleMap
    mapContainerStyle={{
      minHeight: "400px",
      height: "100%",
      width: "100%",
    }}
    center={getCenter(experts)}
    zoom={5}
  >
    {experts.map((expert, index) => (
      <Fragment key={index}>
        <Marker
          key={index}
          position={{
            lat: expert.location.geoLocation.coordinates[1],
            lng: expert.location.geoLocation.coordinates[0],
          }}
        />
        <OverlayView
          position={{
            lat: expert.location.geoLocation.coordinates[1],
            lng: expert.location.geoLocation.coordinates[0],
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div
            className={`absolute z-10 inline-block px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap bg-white border border-0 rounded-lg shadow-sm tooltip capitalize`}
          >
            <h4 className="font-bold mb-[1px]">
              {getExpertName(expert, experts)}
            </h4>
            <span className="text-xs">{expert.location.name}</span>
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </OverlayView>
      </Fragment>
    ))}
  </GoogleMap>
);

const MapContainer = ({
  experts,
  location,
}: {
  experts: Expert[];
  location?: ExpertLocation | {};
}) => {
  if (window.google) return <MapGoogle experts={experts} location={location} />;
  else
    return (
      <LoadScript googleMapsApiKey={apiKey}>
        <MapGoogle experts={experts} location={location} />{" "}
      </LoadScript>
    );
};

export default MapContainer;
