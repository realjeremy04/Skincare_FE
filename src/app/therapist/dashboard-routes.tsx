import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

const therapistRoutes = [
  {
    segment: "therapist/appointments",
    title: "Appointments",
    icon: <CalendarTodayOutlinedIcon />,
  },
  {
    segment: "therapist/schedules",
    title: "Schedules",
    icon: <TodayOutlinedIcon />,
  },
];

export default therapistRoutes;
