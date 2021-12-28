import dayjs from "dayjs";
import "dayjs/locale/ja";

const weekday = require("dayjs/plugin/weekday");
const isToday = require("dayjs/plugin/isToday");
const isYesterday = require("dayjs/plugin/isYesterday");
const isoWeek = require("dayjs/plugin/isoWeek");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.locale("ja");
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(weekday);

export default dayjs;
