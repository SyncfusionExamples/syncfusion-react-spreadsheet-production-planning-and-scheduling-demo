export const demandSheetData = [
  { "OrderID": "SO-1001", "Customer": "Acme Manufacturing",      "Item": "ITEM-001", "Qty": 120, "DueDate": "2026-02-10", "Priority": "High",   "Status": "" },
  { "OrderID": "SO-1002", "Customer": "Globex Corp",              "Item": "ITEM-002", "Qty": 80,  "DueDate": "2026-02-11", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1003", "Customer": "Innotech",                 "Item": "ITEM-003", "Qty": 200, "DueDate": "2026-02-12", "Priority": "High",   "Status": "" },
  { "OrderID": "SO-1004", "Customer": "Umbrella Ltd",             "Item": "ITEM-004", "Qty": 50,  "DueDate": "2026-02-13", "Priority": "Low",    "Status": "" },
  { "OrderID": "SO-1005", "Customer": "Hooli Industries",         "Item": "ITEM-005", "Qty": 160, "DueDate": "2026-02-14", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1006", "Customer": "Vandelay Imports",         "Item": "ITEM-006", "Qty": 95,  "DueDate": "2026-02-15", "Priority": "High",   "Status": "" },
  { "OrderID": "SO-1007", "Customer": "Stark Enterprises",        "Item": "ITEM-007", "Qty": 220, "DueDate": "2026-02-16", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1008", "Customer": "Wayne Tech",               "Item": "ITEM-008", "Qty": 70,  "DueDate": "2026-02-17", "Priority": "Low",    "Status": "" },
  { "OrderID": "SO-1009", "Customer": "Wonka Foods",              "Item": "ITEM-009", "Qty": 140, "DueDate": "2026-02-18", "Priority": "High",   "Status": "" },
  { "OrderID": "SO-1010", "Customer": "Soylent Corp",             "Item": "ITEM-010", "Qty": 110, "DueDate": "2026-02-19", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1011", "Customer": "Acme Manufacturing",      "Item": "ITEM-002", "Qty": 60,  "DueDate": "2026-02-20", "Priority": "Low",    "Status": "" },
  { "OrderID": "SO-1012", "Customer": "Globex Corp",              "Item": "ITEM-003", "Qty": 180, "DueDate": "2026-02-21", "Priority": "High",   "Status": "" },
  { "OrderID": "SO-1013", "Customer": "Innotech",                 "Item": "ITEM-004", "Qty": 75,  "DueDate": "2026-02-22", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1014", "Customer": "Umbrella Ltd",             "Item": "ITEM-005", "Qty": 130, "DueDate": "2026-02-23", "Priority": "High",   "Status": "" },
  { "OrderID": "SO-1015", "Customer": "Hooli Industries",         "Item": "ITEM-006", "Qty": 90,  "DueDate": "2026-02-24", "Priority": "Low",    "Status": "" },
  { "OrderID": "SO-1016", "Customer": "Vandelay Imports",         "Item": "ITEM-007", "Qty": 210, "DueDate": "2026-02-25", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1017", "Customer": "Stark Enterprises",        "Item": "ITEM-008", "Qty": 85,  "DueDate": "2026-02-26", "Priority": "High",   "Status": "" },
  { "OrderID": "SO-1018", "Customer": "Wayne Tech",               "Item": "ITEM-009", "Qty": 155, "DueDate": "2026-02-27", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1019", "Customer": "Wonka Foods",              "Item": "ITEM-010", "Qty": 100, "DueDate": "2026-02-28", "Priority": "Low",    "Status": "" },
  { "OrderID": "SO-1020", "Customer": "Soylent Corp",             "Item": "ITEM-001", "Qty": 240, "DueDate": "2026-03-01", "Priority": "High",   "Status": "" },
  { "OrderID": "SO-1021", "Customer": "Acme Manufacturing",      "Item": "ITEM-003", "Qty": 170, "DueDate": "2026-03-02", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1022", "Customer": "Globex Corp",              "Item": "ITEM-004", "Qty": 65,  "DueDate": "2026-03-03", "Priority": "Low",    "Status": "" },
  { "OrderID": "SO-1023", "Customer": "Innotech",                 "Item": "ITEM-005", "Qty": 145, "DueDate": "2026-03-04", "Priority": "High",   "Status": "" },
  { "OrderID": "SO-1024", "Customer": "Umbrella Ltd",             "Item": "ITEM-006", "Qty": 100, "DueDate": "2026-03-05", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1025", "Customer": "Hooli Industries",         "Item": "ITEM-007", "Qty": 230, "DueDate": "2026-03-06", "Priority": "High",   "Status": "" },
  { "OrderID": "SO-1026", "Customer": "Vandelay Imports",         "Item": "ITEM-008", "Qty": 60,  "DueDate": "2026-03-07", "Priority": "Low",    "Status": "" },
  { "OrderID": "SO-1027", "Customer": "Stark Enterprises",        "Item": "ITEM-009", "Qty": 165, "DueDate": "2026-03-08", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1028", "Customer": "Wayne Tech",               "Item": "ITEM-010", "Qty": 115, "DueDate": "2026-03-09", "Priority": "High",   "Status": "" },
  { "OrderID": "SO-1029", "Customer": "Wonka Foods",              "Item": "ITEM-001", "Qty": 200, "DueDate": "2026-03-10", "Priority": "Medium", "Status": "" },
];

export const materialSheetData = [
  { "Item": "ITEM-001", "OnHand": 300, "ReqQty": "=SUMIF(Demand!C2:C50,Material!A2,Demand!D2:D50)", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "ITEM-002", "OnHand": 180, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "ITEM-003", "OnHand": 500, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "ITEM-004", "OnHand": 150, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "ITEM-005", "OnHand": 260, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "ITEM-006", "OnHand": 90,  "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "ITEM-007", "OnHand": 350, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "ITEM-008", "OnHand": 200, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "ITEM-009", "OnHand": 400, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "ITEM-010", "OnHand": 140, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" }
]

export const capacitySheetData = [
  { "WorkCenter": "WC-01", "AvailHrs": 16, "ReqHrs": "", "Utilization": "", "Overload": "" },
  { "WorkCenter": "WC-02", "AvailHrs": 14, "ReqHrs": "", "Utilization": "", "Overload": "" },
  { "WorkCenter": "WC-03", "AvailHrs": 20, "ReqHrs": "", "Utilization": "", "Overload": "" },
  { "WorkCenter": "WC-04", "AvailHrs": 18, "ReqHrs": "", "Utilization": "", "Overload": "" },
  { "WorkCenter": "WC-05", "AvailHrs": 10, "ReqHrs": "", "Utilization": "", "Overload": "" },
  { "WorkCenter": "WC-06", "AvailHrs": 24, "ReqHrs": "", "Utilization": "", "Overload": "" },
  { "WorkCenter": "WC-07", "AvailHrs": 12, "ReqHrs": "", "Utilization": "", "Overload": "" },
  { "WorkCenter": "WC-08", "AvailHrs": 16, "ReqHrs": "", "Utilization": "", "Overload": "" },
  { "WorkCenter": "WC-09", "AvailHrs": 15, "ReqHrs": "", "Utilization": "", "Overload": "" },
  { "WorkCenter": "WC-10", "AvailHrs": 8,  "ReqHrs": "", "Utilization": "", "Overload": "" }
]

export const schedulingData = [
  { "JobID": "JOB-001", "WorkCenter": "WC-01", "Item": "ITEM-001", "SetupMins": 20, "RunMins": 180, "JobHrs": "", "Start": "2026-02-10", "End": "2026-02-10", "Status": "" },
  { "JobID": "JOB-002", "WorkCenter": "WC-02", "Item": "ITEM-002", "SetupMins": 15, "RunMins": 240, "JobHrs": "", "Start": "2026-02-10", "End": "2026-02-11", "Status": "" },
  { "JobID": "JOB-003", "WorkCenter": "WC-03", "Item": "ITEM-003", "SetupMins": 10, "RunMins": 300, "JobHrs": "", "Start": "2026-02-11", "End": "2026-02-12", "Status": "" },
  { "JobID": "JOB-004", "WorkCenter": "WC-04", "Item": "ITEM-004", "SetupMins": 12, "RunMins": 150, "JobHrs": "", "Start": "2026-02-12", "End": "2026-02-12", "Status": "" },
  { "JobID": "JOB-005", "WorkCenter": "WC-05", "Item": "ITEM-005", "SetupMins": 25, "RunMins": 360, "JobHrs": "", "Start": "2026-02-13", "End": "2026-02-14", "Status": "" },
  { "JobID": "JOB-006", "WorkCenter": "WC-06", "Item": "ITEM-006", "SetupMins": 15, "RunMins": 200, "JobHrs": "", "Start": "2026-02-14", "End": "2026-02-14", "Status": "" },
  { "JobID": "JOB-007", "WorkCenter": "WC-07", "Item": "ITEM-007", "SetupMins": 18, "RunMins": 180, "JobHrs": "", "Start": "2026-02-15", "End": "2026-02-15", "Status": "" },
  { "JobID": "JOB-008", "WorkCenter": "WC-08", "Item": "ITEM-008", "SetupMins": 12, "RunMins": 260, "JobHrs": "", "Start": "2026-02-15", "End": "2026-02-16", "Status": "" },
  { "JobID": "JOB-009", "WorkCenter": "WC-09", "Item": "ITEM-009", "SetupMins": 15, "RunMins": 300, "JobHrs": "", "Start": "2026-02-16", "End": "2026-02-17", "Status": "" },
  { "JobID": "JOB-010", "WorkCenter": "WC-10", "Item": "ITEM-010", "SetupMins": 10, "RunMins": 120, "JobHrs": "", "Start": "2026-02-17", "End": "2026-02-17", "Status": "" }
]

export const actualData = [
  { "JobID": "JOB-001", "StartActual": "2026-02-10", "EndActual": "2026-02-10", "OutputActual": 100, "OutputPlan": 120, "Variance": "", "DowntimeMins": 30, "Reason": "Breakdown" },
  { "JobID": "JOB-002", "StartActual": "2026-02-10", "EndActual": "2026-02-11", "OutputActual": 80,  "OutputPlan": 90,  "Variance": "", "DowntimeMins": 10, "Reason": "Shortage" },
  { "JobID": "JOB-003", "StartActual": "2026-02-11", "EndActual": "2026-02-12", "OutputActual": 200, "OutputPlan": 210, "Variance": "", "DowntimeMins": 15, "Reason": "SetupOverrun" },
  { "JobID": "JOB-004", "StartActual": "2026-02-12", "EndActual": "2026-02-12", "OutputActual": 50,  "OutputPlan": 60,  "Variance": "", "DowntimeMins": 0,  "Reason": "None" },
  { "JobID": "JOB-005", "StartActual": "2026-02-13", "EndActual": "2026-02-14", "OutputActual": 140, "OutputPlan": 150, "Variance": "", "DowntimeMins": 20, "Reason": "Breakdown" }
]

export const newSchedule = [
  {
    "jobID": "JOB-001",
    "OrderID": "",
    "Item": "",
    "Quantity": "",
    "DueDate": "",
    "MaterialAvailable": "",
    "Planned Start": "",
    "Planned End": "",
    "Schedule Status": ""
  },
  {
    "jobID": "JOB-002",
    "OrderID": "",
    "Item": "",
    "Quantity": "",
    "DueDate": "",
    "MaterialAvailable": "",
    "Planned Start": "",
    "Planned End": "",
    "Schedule Status": ""
  },
  {
    "jobID": "JOB-003",
    "OrderID": "",
    "Item": "",
    "Quantity": "",
    "DueDate": "",
    "MaterialAvailable": "",
    "Planned Start": "",
    "Planned End": "",
    "Schedule Status": ""
  },
  {
    "jobID": "JOB-004",
    "OrderID": "",
    "Item": "",
    "Quantity": "",
    "DueDate": "",
    "MaterialAvailable": "",
    "Planned Start": "",
    "Planned End": "",
    "Schedule Status": ""
  },
  {
    "jobID": "JOB-005",
    "OrderID": "",
    "Item": "",
    "Quantity": "",
    "DueDate": "",
    "MaterialAvailable": "",
    "Planned Start": "",
    "Planned End": "",
    "Schedule Status": ""
  },
  {
    "jobID": "JOB-006",
    "OrderID": "",
    "Item": "",
    "Quantity": "",
    "DueDate": "",
    "MaterialAvailable": "",
    "Planned Start": "",
    "Planned End": "",
    "Schedule Status": ""
  },
  {
    "jobID": "JOB-007",
    "OrderID": "",
    "Item": "",
    "Quantity": "",
    "DueDate": "",
    "MaterialAvailable": "",
    "Planned Start": "",
    "Planned End": "",
    "Schedule Status": ""
  },
  {
    "jobID": "JOB-008",
    "OrderID": "",
    "Item": "",
    "Quantity": "",
    "DueDate": "",
    "MaterialAvailable": "",
    "Planned Start": "",
    "Planned End": "",
    "Schedule Status": ""
  },
  {
    "jobID": "JOB-009",
    "OrderID": "",
    "Item": "",
    "Quantity": "",
    "DueDate": "",
    "MaterialAvailable": "",
    "Planned Start": "",
    "Planned End": "",
    "Schedule Status": ""
  },
  {
    "jobID": "JOB-010",
    "OrderID": "",
    "Item": "",
    "Quantity": "",
    "DueDate": "",
    "MaterialAvailable": "",
    "Planned Start": "",
    "Planned End": "",
    "Schedule Status": ""
  }
]

export const dashBoardData = [
  {
    "Metrics": "OnTimeDeliveryPercentage",
    "value": ""
  },
  {
    "Metrics": "OrdersAtRisk",
    "value": ""
  },
  {
    "Metrics": "OrdersOnTrack",
    "value": ""
  },
  {
    "Metrics": "MaterialShortageCount",
    "value": ""
  },
  {
    "Metrics": "TotalDemandQty",
    "value": ""
  },
  {
    "Metrics": "TotalScheduledQty",
    "value": ""
  },
  {
    "Metrics": "High Priority",
    "value": ""
  },
  {
    "Metrics": "Medium Priority",
    "value": ""
  },
  {
    "Metrics": "Low Priority",
    "value": ""
  }
]

export const liveDemand =
  [
  { "OrderID": "SO-1001", "Customer": "Acme Manufacturing", "Item": "Stainless Steel Bolt M6 x 20mm", "Qty": 120, "DueDate": "2026-02-10", "Priority": "High", "Status": "" },
  { "OrderID": "SO-1002", "Customer": "Globex Corp", "Item": "Aluminum Sheet 2mm 4x8", "Qty": 80, "DueDate": "2026-02-11", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1003", "Customer": "Innotech", "Item": "Copper Wire 1.5mm Spool", "Qty": 200, "DueDate": "2026-02-12", "Priority": "High", "Status": "" },
  { "OrderID": "SO-1004", "Customer": "Umbrella Ltd", "Item": "ABS Plastic Granules (Natural)", "Qty": 50, "DueDate": "2026-02-13", "Priority": "Low", "Status": "" },
  { "OrderID": "SO-1005", "Customer": "Hooli Industries", "Item": "Nitrile O-Ring 20x2mm", "Qty": 160, "DueDate": "2026-02-14", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1006", "Customer": "Vandelay Imports", "Item": "Brass Hex Nut M8", "Qty": 95, "DueDate": "2026-02-15", "Priority": "High", "Status": "" },
  { "OrderID": "SO-1007", "Customer": "Stark Enterprises", "Item": "Galvanized Steel Pipe 1/2\"", "Qty": 220, "DueDate": "2026-02-16", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1008", "Customer": "Wayne Tech", "Item": "Acrylic Sheet Clear 3mm 4x8", "Qty": 70, "DueDate": "2026-02-17", "Priority": "Low", "Status": "" },
  { "OrderID": "SO-1009", "Customer": "Wonka Foods", "Item": "Food-Grade Stainless Sheet 1.2mm", "Qty": 140, "DueDate": "2026-02-18", "Priority": "High", "Status": "" },
  { "OrderID": "SO-1010", "Customer": "Soylent Corp", "Item": "Polycarbonate Granules (Transparent)", "Qty": 110, "DueDate": "2026-02-19", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1011", "Customer": "Acme Manufacturing", "Item": "Aluminum Angle 25x25x3mm", "Qty": 60, "DueDate": "2026-02-20", "Priority": "Low", "Status": "" },
  { "OrderID": "SO-1012", "Customer": "Globex Corp", "Item": "Stainless Steel Washer M6", "Qty": 180, "DueDate": "2026-02-21", "Priority": "High", "Status": "" },
  { "OrderID": "SO-1013", "Customer": "Innotech", "Item": "Rubber Gasket Sheet 2mm", "Qty": 75, "DueDate": "2026-02-22", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1014", "Customer": "Umbrella Ltd", "Item": "Cold Rolled Steel Coil 0.8mm", "Qty": 130, "DueDate": "2026-02-23", "Priority": "High", "Status": "" },
  { "OrderID": "SO-1015", "Customer": "Hooli Industries", "Item": "PTFE Rod 10mm", "Qty": 90, "DueDate": "2026-02-24", "Priority": "Low", "Status": "" },
  { "OrderID": "SO-1016", "Customer": "Vandelay Imports", "Item": "Brass Flat Bar 10x3mm", "Qty": 210, "DueDate": "2026-02-25", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1017", "Customer": "Stark Enterprises", "Item": "Mild Steel Round Bar 12mm", "Qty": 85, "DueDate": "2026-02-26", "Priority": "High", "Status": "" },
  { "OrderID": "SO-1018", "Customer": "Wayne Tech", "Item": "Stainless Steel Tube 25x1.5mm", "Qty": 155, "DueDate": "2026-02-27", "Priority": "Medium", "Status": "" },
  { "OrderID": "SO-1019", "Customer": "Wonka Foods", "Item": "Food-Grade Silicone Tube 8mm", "Qty": 100, "DueDate": "2026-02-28", "Priority": "Low", "Status": "" },
  { "OrderID": "SO-1020", "Customer": "Soylent Corp", "Item": "HDPE Granules (Natural)", "Qty": 240, "DueDate": "2026-03-01", "Priority": "High", "Status": "" }
]

export const liveMaterial =
[
  { "Item": "Stainless Steel Bolt M6 x 20mm",        "OnHand": 300, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Aluminum Sheet 2mm 4x8",                "OnHand": 180, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Copper Wire 1.5mm Spool",               "OnHand": 500, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "ABS Plastic Granules (Natural)",        "OnHand": 150, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Nitrile O-Ring 20x2mm",                 "OnHand": 260, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Brass Hex Nut M8",                      "OnHand": 90,  "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Galvanized Steel Pipe 1/2\"",           "OnHand": 350, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Acrylic Sheet Clear 3mm 4x8",           "OnHand": 200, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Food-Grade Stainless Sheet 1.2mm",      "OnHand": 400, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Polycarbonate Granules (Transparent)",  "OnHand": 140, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Aluminum Angle 25x25x3mm",              "OnHand": 220, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Stainless Steel Washer M6",             "OnHand": 180, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Rubber Gasket Sheet 2mm",               "OnHand": 120, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Cold Rolled Steel Coil 0.8mm",          "OnHand": 280, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "PTFE Rod 10mm",                         "OnHand": 95,  "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Brass Flat Bar 10x3mm",                 "OnHand": 210, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Mild Steel Round Bar 12mm",             "OnHand": 175, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Stainless Steel Tube 25x1.5mm",         "OnHand": 150, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "Food-Grade Silicone Tube 8mm",          "OnHand": 90,  "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" },
  { "Item": "HDPE Granules (Natural)",               "OnHand": 260, "ReqQty": "", "Shortage": "", "PlannedPO": "", "ExpectedDate": "", "Risk": "" }
]

export const liveSchedule =
[
  { "jobID": "JOB-001", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-002", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-003", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-004", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-005", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-006", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-007", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-008", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-009", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-010", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-011", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-012", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-013", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-014", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-015", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-016", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-017", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-018", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-019", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" },
  { "jobID": "JOB-020", "OrderID": "", "Item": "", "Quantity": "", "DueDate": "", "MaterialAvailable": "", "Planned Start": "", "Planned End": "", "Schedule Status": "" }
]