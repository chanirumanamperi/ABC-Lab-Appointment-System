// component
import SvgColor from "../../../components/svg-color";

import ChartImage from "../../../images/assets/icons/navbar/chart.gif";
import AdImage from "../../../images/assets/icons/navbar/ad.gif";
import DocImage from "../../../images/assets/icons/navbar/doc.gif";
import UserImage from "../../../images/assets/icons/navbar/use.gif";
import FeedImage from "../../../images/assets/icons/navbar/feed.gif";

const icon1 = (name) => <img src={ChartImage} sx={{ width: 1, height: 1 }} />;
const icon2 = (name) => <img src={AdImage} sx={{ width: 1, height: 1 }} />;
const icon3 = (name) => <img src={DocImage} sx={{ width: 1, height: 1 }} />;
const icon4 = (name) => <img src={UserImage} sx={{ width: 1, height: 1 }} />;
const icon5 = (name) => <img src={FeedImage} sx={{ width: 1, height: 1 }} />;

const icon = (name) => (
  <img src={`/assets/icons/navbar/${name}.gif`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/admin/dashboard",
    icon: icon1("chart"),
  },
  {
    title: "Patient",
    path: "/admin/patient",
    icon: icon4("use"),
  },
  {
    title: "Doctor",
    path: "/admin/doctor",
    icon: icon2("ad"),
  },
  {
    title: "Technician",
    path: "/admin/technician",
    icon: icon3("doc"),
  },
  {
    title: "Test",
    path: "/admin/test",
    icon: icon5("doc"),
  },
];

export default navConfig;
