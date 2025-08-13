import { MapContainer, TileLayer, Marker, Popup,  } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "../../index.css";
import { useCourseContext } from "../../contexts/CourseContext";

export default function Map({ courses }) {
    const { currentCourse, setCurrentCourse } = useCourseContext();

    const customIcon = new Icon({
        iconUrl: "../../public/images/golf-clubs.png",
        iconSize: [38, 38],
    });


    return (
            <MapContainer center={[0.505, -0.09]} zoom={3} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup>
                    {courses.map(course => (
                        <Marker position={course.geocode} icon={customIcon}>
                            <Popup><h2>{course.name}</h2><p>{course.id}, {course.address}</p></Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
    );
};