
import { Units } from 'dayspan';

export default {
  types: [
    {id: 'D', label: "Day", shortcut: 'D', type: Units.DAY,   size: 1,  focus: 0.4999, repeat: true,  listTimes: true,  updateRows: true,  schedule: false },
    {id: 'W', label: "Week", shortcut: 'W', type: Units.WEEK,  size: 1,  focus: 0.4999, repeat: true,  listTimes: true,  updateRows: true,  schedule: false },
    {id: 'M', label: "Month", shortcut: 'M', type: Units.MONTH, size: 1,  focus: 0.4999, repeat: true,  listTimes: false, updateRows: true,  schedule: false },
    {id: 'Y', label: "Year", shortcut: 'Y', type: Units.YEAR,  size: 1,  focus: 0.4999, repeat: true,  listTimes: false, updateRows: true,  schedule: false },
    {id: 'S', label: "Schedule", shortcut: 'S', type: Units.DAY,   size: 92, focus: 0.0000, repeat: false, listTimes: false, updateRows: false, schedule: true },
    {id: 'X', label: "4 days", shortcut: 'X', type: Units.DAY,   size: 4,  focus: 0.4999, repeat: true,  listTimes: true,  updateRows: true,  schedule: false }
  ],
  weekdays: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  formats: {
    "month": "MMM"
  },
  // Gestures
  minDistance: 50,
  maxDistance: 200,
  maxWander: 0.1
};
