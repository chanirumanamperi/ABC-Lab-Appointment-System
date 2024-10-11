import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Card, CardContent, Typography } from "@mui/material";

const mapContainerStyle = {
  height: "500px",
  width: "100%",
};

const center = {
  lat: 6.903176,
  lng: 79.918623,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const PropertyLocationsMap = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          ABC Laboratories Location
        </Typography>
        <LoadScript googleMapsApiKey="AIzaSyCDrYhoi1ChllFuQDG0-NxLs-pEQYEQBQ4&callback=initMap">
          <GoogleMap
            id="marker-example"
            mapContainerStyle={mapContainerStyle}
            center={{ lat: 7.8731, lng: 80.7718 }}
            zoom={6}
            options={options}
          >
            <Marker position={{ lat: 6.903176, lng: 79.918623 }} />
          </GoogleMap>
        </LoadScript>
      </CardContent>
    </Card>
  );
};

export default PropertyLocationsMap;
