import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

const adminRoutes = [
  {
    segment: "staff/appointments",
    title: "Appointments",
    icon: <CalendarTodayOutlinedIcon />,
  },
  {
    segment: "staff/services",
    title: "Services",
    icon: <SpaOutlinedIcon />,
  },
  {
    segment: "staff/accounts",
    title: "Customers",
    icon: <PeopleAltOutlinedIcon />,
    children: [
      {
        segment: "employees",
        title: "Employees",
        icon: <BadgeOutlinedIcon />,
      },
      {
        segment: "customers",
        title: "Services",
        icon: <PersonOutlineOutlinedIcon />,
      },
    ],
  },
  {
    segment: "staff/blogs",
    title: "Blogs",
    icon: <ArticleOutlinedIcon />,
  },
  {
    segment: "staff/feedbacks",
    title: "Feedbacks",
    icon: <FeedbackOutlinedIcon />,
  },
  {
    segment: "staff/roadmap",
    title: "Roadmap",
    icon: <TimelineOutlinedIcon />,
  },
  {
    segment: "staff/questions",
    title: "Questions",
    icon: <QuestionAnswerOutlinedIcon />,
  },
  {
    segment: "staff/scoreband",
    title: "Scoreband",
    icon: <LeaderboardOutlinedIcon />,
  },
  {
    segment: "staff/slots",
    title: "Slots",
    icon: <ScheduleOutlinedIcon />,
  },
  {
    segment: "staff/transactions",
    title: "Transactions",
    icon: <ReceiptOutlinedIcon />,
  },
];

export default adminRoutes;
