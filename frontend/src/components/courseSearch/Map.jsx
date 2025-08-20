import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import { useCourseContext } from "../../contexts/CourseContext";

function MapContent({ courses, setCurrentCourse }) {
  const customIcon = new Icon({
    iconUrl: "/images/golf-clubs.png",
    iconSize: [38, 38],
  });

  return (
    <MarkerClusterGroup>
      {courses
        .filter(c => c.location?.latitude && c.location?.longitude)
        .map(course => (
          <Marker
            key={course.id}
            position={[
              parseFloat(course.location.latitude),
              parseFloat(course.location.longitude),
            ]}
            icon={customIcon}
          >
            <Popup>
              <h2 className="font-bold">{course.course_name}</h2>
              <p>{course.id}, {course.location.address}</p>
            </Popup>
          </Marker>
        ))}
    </MarkerClusterGroup>
  );
}

export default function Map({ courses = [] }) {
  const { setCurrentCourse } = useCourseContext();

  return (
    <MapContainer
      center={[40.105, -0.09]}
      zoom={2}
      minZoom={2}
      style={{ height: "100%", width: "100%" }}
      maxBounds={[[-100.505, -160.09], [103.505, 190.09]]}         // <-- restrict panning
      maxBoundsViscosity={1.0}       // <-- optional, prevents overscroll
    >
      <TileLayer url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.jpg" />
      <MapContent courses={courses} setCurrentCourse={setCurrentCourse} />
    </MapContainer>
  );
}
