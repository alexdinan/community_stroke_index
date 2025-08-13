import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "../../index.css";
import { useCourseContext } from "../../contexts/CourseContext";
import { useEffect, useRef } from "react";

function MapContent({ courses, currentCourse }) {
  const markerRefs = useRef({});

  // Automatically open popup for currentCourse
  useEffect(() => {
    if (currentCourse && markerRefs.current[currentCourse.id]) {
      const marker = markerRefs.current[currentCourse.id];
      if (marker) marker.openPopup();
    }
  }, [currentCourse]);

  const customIcon = new Icon({
    iconUrl: "../../public/images/golf-clubs.png",
    iconSize: [38, 38],
  });

  return (
    <MarkerClusterGroup>
      {courses.map(course => {
        if (!course.location.latitude || !course.location.longitude) {
            return;
        }
        return (
        <Marker
          key={course.id}
          position={[parseFloat(course.location.latitude), parseFloat(course.location.longitude)]}
          icon={customIcon}
          ref={el => {
            if (el) markerRefs.current[course.id] = el;
          }}
        >
          <Popup>
            <h2>{course.course_name}</h2>
            <p>{course.id}, {course.location.address}</p>
          </Popup>
        </Marker>
      )})}
    </MarkerClusterGroup>
  );
}

export default function Map({ courses = [] }) {
  const { currentCourse } = useCourseContext();

  return (
    <MapContainer center={[0.505, -0.09]} zoom={3} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapContent courses={courses} currentCourse={currentCourse} />
    </MapContainer>
  );
}
