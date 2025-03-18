import PaymentIconOutlined from "@mui/icons-material/PaymentOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

const userRoutes = [
  {
    segment: "user/appointments",
    title: "Appointments",
    icon: <CalendarTodayOutlinedIcon />,
  },
  {
    segment: "user/transactions",
    title: "Transactions",
    icon: <PaymentIconOutlined />,
  },
];

export default userRoutes;
