// This file contains utility functions and constants used across the application
const TypeOptions = [
  { name: "Operational", value: "Operational" },
  { name: "Technical", value: "Technical" },
  { name: "Strategic", value: "Strategic" },
  { name: "Financial", value: "Financial" },
];

const StatusOptions = [
  { name: "New task", value: "New task" },
  { name: "In progress", value: "In progress" },
  { name: "Completed", value: "Completed" },
  { name: "On hold", value: "On hold" },
];

const PriorityOptions = [
  { name: "Lowest", value: "Lowest" },
  { name: "Low", value: "Low" },
  { name: "Medium", value: "Medium" },
  { name: "High", value: "High" },
  { name: "Urgent", value: "Urgent" },
];

const EstimateOptions = [
  { name: "15min", value: "15m" },
  { name: "30min", value: "30m" },
  { name: "45min", value: "45m" },
  { name: "1hour", value: "1h" },
  { name: "1.5hour", value: "1.5h" },
  { name: "2hour", value: "2h" },
  { name: "3hour", value: "3h" },
  { name: "4hour", value: "4h" },
  { name: "5hour", value: "5h" },
  { name: "6hour", value: "6h" },
  { name: "7hour", value: "7h" },
  { name: "8hour", value: "8h" },
  { name: "9hour", value: "9h" },
  { name: "10hour", value: "10h" },
];


export {
  TypeOptions,
  StatusOptions,
  PriorityOptions,
  EstimateOptions,
};