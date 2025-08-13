import { MapContainer, TileLayer, Marker, Popup,  } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "../../index.css";

export default function Map() {

    // in reality get course list from prop then get coords/details from each object in list etc...
    // can popup be replaced with the popup html?? / another component?!! 
    const markers = [
        {
            geocode: [48.86, 2.3522],
            popup: "popup 1",
        },
        {
            geocode: [48.85, 2.3522],
            popup: "popup 2",
        },
        {
            geocode: [48.855, 2.34],
            popup: "poppup 3",
        },
    ];

    const customIcon = new Icon({
        iconUrl: "../../public/images/golf-clubs.png",
        iconSize: [38, 38],
    });


    return (
        <div>
            <MapContainer center={[0.505, -0.09]} zoom={3}>
                <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup>
                    {markers.map(marker => (
                        <Marker position={marker.geocode} icon={customIcon}>
                            <Popup><h2>Hello, I am {marker.popup}</h2></Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
};