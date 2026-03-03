import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { CellDirective, CellsDirective, ColumnDirective, ColumnsDirective, getColumnHeaderText, getSheet, RangeDirective, RangesDirective, RowDirective, RowsDirective, SheetDirective, SheetsDirective, SpreadsheetComponent,
} from '@syncfusion/ej2-react-spreadsheet';
import { liveDemand, liveMaterial, liveSchedule, liveDemand2,liveSchedule2,liveMaterial2 } from './dataSource';

export default function App() {
let spreadsheet;
const onCellSave = (args) => {
  try {
    const addr = args && args.address;
    if (!addr) return;
    if (addr.indexOf('Demand!') === 0) {
      const m = addr.match(/!([A-Z]+)\d+/);
      const col = m ? m[1] : null;
      if (col === 'D' || col ==='C') {
       //If Quantity changed, Schedule Sheet Refreshed
       appendShortagesToSchedule();
      }
    }
  } catch (e) {}
};
const onCreated = () => {
  const demandSheet = getSheet(spreadsheet, 1);
  const materialSheet = getSheet(spreadsheet, 2);
  const scheduleSheet = getSheet(spreadsheet, 3);
  const demandUsedRange = demandSheet.usedRange;
  const materialUsedRange = materialSheet.usedRange;
  const scheduleUsedRange = scheduleSheet.usedRange;
  const demandLastRow = demandUsedRange.rowIndex + 1;
  const materialLastRow = materialUsedRange.rowIndex + 1;
  const scheduleLastRow = scheduleUsedRange.rowIndex + 1;
  const demandRows = demandLastRow - 1;
  //Applying Header Styles to each Individual Sheet
  spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#1E88E5', color: '#F5F5F5',textAlign:'center' }, `Demand!A1:${getColumnHeaderText(demandUsedRange.colIndex + 1)}1`);
  spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#1E88E5', color: '#F5F5F5',textAlign:'center' }, `Material!A1:${getColumnHeaderText(materialUsedRange.colIndex + 1)}1`);
  spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#1E88E5', color: '#F5F5F5',textAlign:'center' }, `Schedule!A1:${getColumnHeaderText(scheduleUsedRange.colIndex + 1)}1`);
  //Applying Column Styles to Demand Sheet
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Demand!A2:A${demandUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7',textAlign:'center' }, `Demand!C2:C${demandUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7',textAlign:'center' }, `Demand!E2:E${demandUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff',textAlign:'center' }, `Demand!B2:B${demandUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff' }, `Demand!D2:D${demandUsedRange.rowIndex + 1}`);
  //Applying Column Styles to Material Sheet
  spreadsheet.cellFormat({ textAlign: 'center' }, `Material!A2:A${materialUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ textAlign: 'center' }, `Material!F2:G${materialUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Material!A2:A${materialUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Material!F2:F${materialUsedRange.rowIndex + 1}`);
  //Applying Column Styles to Schedule Sheet
  //Applying Number Formatting to cells
  spreadsheet.numberFormat('0', `Demand!D2:D${demandLastRow}`);
  spreadsheet.numberFormat('m/d/yyyy', `Material!F2:F${materialLastRow}`);
  spreadsheet.numberFormat('#,##0', `Dashboard!B3:B${10 + demandRows}`);
  spreadsheet.numberFormat('0%', 'Dashboard!B3:B3');
  //Updating Formula to Demand Sheet
  for (let r = 1; r <= demandRows; r++) {
    const rowNum = r + 1;
    spreadsheet.updateCell({ value: `ORD-${rowNum - 1}` }, `Demand!A${rowNum}`);
    spreadsheet.updateCell({ formula: `=IF(D${rowNum}=0,"Completed",IF(TODAY()>E${rowNum},"Delayed","In Queue"))` }, `Demand!G${rowNum}`);
  }
  //Updating Formula to Material Sheet
  for (let r = 1; r <= materialLastRow - 1; r++) {
    const rowNum = r + 1;
    spreadsheet.updateCell({ formula: `=SUMIF(Demand!C2:C${demandLastRow},A${rowNum},Demand!D2:D${demandLastRow})` }, `Material!C${rowNum}`);
    spreadsheet.updateCell({ formula: `=MAX(0,C${rowNum}-MAX(B${rowNum}-IFERROR(E${rowNum},0),0))` }, `Material!D${rowNum}`);
    spreadsheet.updateCell({ formula: `=IF(D${rowNum}>0,IF(F${rowNum}>Demand!E${rowNum},"High Risk","Low Risk"),"On Track")` }, `Material!G${rowNum}`);
  }
  //Updating Formula to Schedule Sheet
  for (let r = 1; r < scheduleLastRow; r++) {
    const rowNum = r + 1;
    spreadsheet.updateCell({ formula: `=Demand!A${rowNum}` }, `Schedule!B${rowNum}`);
    spreadsheet.updateCell({ formula: `=Demand!C${rowNum}` }, `Schedule!C${rowNum}`);
    spreadsheet.updateCell({ formula: `=Demand!D${rowNum}` }, `Schedule!D${rowNum}`);
    spreadsheet.updateCell({ formula: `=Demand!E${rowNum}` }, `Schedule!E${rowNum}`);
    spreadsheet.updateCell({ formula: `=VLOOKUP(C${rowNum},Material!A2:G${materialLastRow},6,FALSE)` }, `Schedule!F${rowNum}`);
    spreadsheet.updateCell({ formula: `=MAX(TODAY(),F${rowNum})` }, `Schedule!G${rowNum}`);
    spreadsheet.updateCell({ formula: `=G${rowNum}+(D${rowNum}/10)/24` }, `Schedule!H${rowNum}`);
    spreadsheet.updateCell({ formula: `=IF(H${rowNum}>E${rowNum},"On Delay","On Track")` }, `Schedule!I${rowNum}`);
  }
  //demand sheet - data validations and formatting
  spreadsheet.addDataValidation({ type: 'List', value1: 'High,Medium,Low' }, `Demand!F2:F${demandLastRow}`);
  spreadsheet.conditionalFormat({ type: 'EqualTo', value: 'Delayed', range: `Demand!G2:G${demandLastRow}`, format: { backgroundColor: 'red', color: '#721C24' } });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'In Queue', range: `Demand!G2:G${demandLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'RedF', value: 'High', range: `Demand!F2:F${demandLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'YellowFT', value: 'Medium', range: `Demand!F2:F${demandLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'Low', range: `Demand!F2:F${demandLastRow}` });
  //material sheet - data validations and formatting
  spreadsheet.conditionalFormat({ type: 'BlueDataBar', range: `Material!B2:B${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'OrangeDataBar', range: `Material!C2:C${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'RedDataBar', range: `Material!D2:D${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'LightBlueDataBar', range: `Material!E2:E${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'RedF', value: 'High Risk', range: `Material!G2:G${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'On Track', range: `Material!G2:G${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor:'YellowFT',value: 'Low Risk', range: `Material!G2:G${materialLastRow}`});
  //schedule sheet - data validations and formatting
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'RedF', value: 'AT-RISK', range: `Schedule!H2:H${scheduleLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'ON-TRACK', range: `Schedule!H2:H${scheduleLastRow}` });
  //merge cells for Dashboard Sheet
  spreadsheet.merge('Dashboard!A1:B1', 'Horizontally');
  spreadsheet.merge('Dashboard!A10:B10', 'Horizontally');
  spreadsheet.merge('Dashboard!A14:B14', 'Horizontally');
  //sheet protection with allowing row, column and cell formattings
  const protectSetting = { selectCells: true, selectUnLockedCells: true, formatCells: true, formatRows: true, formatColumns: true, insertLink: false };
  spreadsheet.protectSheet(1, protectSetting);
  spreadsheet.protectSheet(3, protectSetting);
  spreadsheet.lockCells('Demand!C2:D22', false);
  //calling Schedule Sheet Creation
  appendShortagesToSchedule();
  spreadsheet.resize();
};
const appendShortagesToSchedule = () => { //final
  const demandSheet = getSheet(spreadsheet, 1);
  const materialSheet = getSheet(spreadsheet, 2);
  const scheduleSheet = getSheet(spreadsheet, 3);
  const materialRows = (materialSheet.rows || []);
  const scheduleRows = (scheduleSheet.rows || []);
  const scheduleUsedRange = (scheduleSheet.usedRange || { rowIndex: 0, colIndex: 7 });
  const demandLastRow = demandSheet.usedRange.rowIndex + 1;
  //Adding Shortage quantities in a array
  const rowsToAdd = [];
  for (let i = 1; i < materialRows.length; i++) {
    const mCells = materialRows[i].cells || [];
    const shortage = Number((mCells[3] && mCells[3].value) || 0);
    if (shortage > 0) {
      const materialRowIndex = i + 1;
      const itemId = mCells[0] && mCells[0].value;
      rowsToAdd.push({ materialRowIndex, itemId });
    }
  }
  //IF no shortage present, render empty schedule sheet
  if (rowsToAdd.length === 0) {
    return;
  }
  let maxJobId = 0;
  const existingJobIds = {};
  // Iterate schedule rows to find existing jobs
  for (let k = 1; k < scheduleRows.length; k++) {
    const sCells = scheduleRows[k].cells || [];
    const sJobId = sCells[0] && sCells[0].value;
    const sItemId = sCells[2] && sCells[2].value;
    if (sJobId) {
       const idNum = parseInt(sJobId.replace('JOB-', ''));
       if (!isNaN(idNum) && idNum > maxJobId) {
         maxJobId = idNum;
       }
       if (sItemId) {
         existingJobIds[sItemId] = sJobId;
       }
    }
  }
  //Iterate and update schedule sheet if shortage found
  let insertAt = 2;
  for (let j = 0; j < rowsToAdd.length; j++) {
    const r = rowsToAdd[j];
    let jobId = existingJobIds[r.itemId];
    if (!jobId) {
       maxJobId++;
       jobId = `JOB-${maxJobId}`;
       existingJobIds[r.itemId] = jobId;
    }
    spreadsheet.updateCell({ value: jobId }, `Schedule!A${insertAt}`);
    spreadsheet.updateCell({ formula: `=Demand!A${r.materialRowIndex}` }, `Schedule!B${insertAt}`);
    spreadsheet.updateCell({ formula: `=Material!A${r.materialRowIndex}` }, `Schedule!C${insertAt}`);
    spreadsheet.updateCell({ formula: `=Material!D${r.materialRowIndex}` }, `Schedule!D${insertAt}`);
    spreadsheet.updateCell({ formula:`=Demand!E${r.materialRowIndex}` }, `Schedule!E${insertAt}`);
    spreadsheet.updateCell( { formula: `=MAX(TODAY()+1)` }, `Schedule!F${insertAt}`);
    spreadsheet.updateCell({ formula: `=F${insertAt}+(D${insertAt}/10)/24` }, `Schedule!G${insertAt}`);
    spreadsheet.updateCell({ formula: `=IF(G${insertAt}>E${insertAt},"On Delay","On Track")` }, `Schedule!H${insertAt}`);
    insertAt++;
  }
  //Updating Material Availability date in Material Sheet
  const finalScheduleLastRow = Math.max(1, insertAt - 1);
  const scheduleLookupRange = finalScheduleLastRow >= 2 ? `Schedule!C2:G${materialRows.length + 1}` : `Schedule!C2:G2`;
  for (let m = 1; m < materialRows.length; m++) {
    const materialRowNum = m + 1;
    const vlookupFormula = `=IFERROR(VLOOKUP(A${materialRowNum},${scheduleLookupRange},5,FALSE),"-")`;
    spreadsheet.updateCell({ formula: vlookupFormula }, `Material!F${materialRowNum}`);
  }
  //Adding cell and number formats and conditional formats to added rows.
  spreadsheet.numberFormat('m/d/yyyy', `Schedule!E2:H${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ textAlign: 'center' }, `Schedule!A2:${getColumnHeaderText(scheduleUsedRange.colIndex + 1)}${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Schedule!A2:A${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Schedule!C2:C${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Schedule!E2:E${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7',textAlign:'center' }, `Schedule!G2:G${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff' }, `Schedule!B2:B${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff' }, `Schedule!D2:D${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff' }, `Schedule!F2:F${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'RedF', value: 'On Delay', range: `Schedule!H2:H${rowsToAdd.length + 1}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'On Track', range: `Schedule!H2:H${rowsToAdd.length + 1}` });
  spreadsheet.addDataValidation({ type: 'List', value1: '=Material!A:A', showDropDown: true }, `Demand!C2:C${demandLastRow + 1}`);
  spreadsheet.conditionalFormat({ type: 'Duplicate', cFColor: 'RedF', range: `Demand!C2:C${demandLastRow + 1}` });
  for (let i = insertAt; i <= scheduleRows.length; i++) {
    let stylevalue = { backgroundColor: '#ffffff' };
    spreadsheet.updateCell({ value: '', stylevalue }, `Schedule!A${i}`);
    spreadsheet.updateCell({ value: '' }, `Schedule!B${i}`);
    spreadsheet.updateCell({ value: '' }, `Schedule!C${i}`);
    spreadsheet.updateCell({ value: '' }, `Schedule!D${i}`);
    spreadsheet.updateCell({ value: '' }, `Schedule!E${i}`);
    spreadsheet.updateCell({ value: '' }, `Schedule!F${i}`);
    spreadsheet.updateCell({ value: '' }, `Schedule!G${i}`);
    spreadsheet.updateCell({ value: '' }, `Schedule!H${i}`);
    spreadsheet.cellFormat(stylevalue, `Schedule!A${i}:H${i}`);
  }
};
  //charts used in Dashboard Sheet
  const rowChart = [{ type: 'Column', range: `DashBoard!A15:B16`, title: 'CUSTOMER ORDERED ITEMS', theme: 'Bootstrap5', datalabelSettings: { visible: true, position:'Top'}, height: 265, width: 440, top:295, left:400, id: 'Chart1', isSeriesInRows: true }];
  const pieChart = [{ type: 'Doughnut', range: 'DashBoard!A11:B13', title: 'ORDER PRIORITIES', theme: 'Bootstrap5', height: 265, width: 440, top:10, left:400,id: 'Chart2', isSeriesInRows: false }];
  const columnChart = [{ type: 'Column', range: 'Material!A1:C21', title: 'AVAILABLE AND CUSTOMER ORDERED QUANTITIES', theme: 'Bootstrap5', height: 550, width: 740, top:10,left: 850, id: 'Chart3', isSeriesInRows: false }];
  return (
    <SpreadsheetComponent ref={(ssObj) => { spreadsheet = ssObj; }} created={onCreated.bind(this)} height={750}  cellSave={onCellSave} showFormulaBar={true} isProtected={true}  showRibbon={true} >
      <SheetsDirective>
        {/* Created Dashboard Sheet */}
        <SheetDirective name='DashBoard' showGridLines={false}>
          <RowsDirective>
            <RowDirective height={40}>
              <CellsDirective>
                <CellDirective 
                  value='PRODUCTION DASHBOARD' 
                  style={{ fontSize: '18pt', fontWeight: 'bold',backgroundColor: '#1E3A8A', color: '#FFFFFF',textAlign: 'center',verticalAlign: 'middle'}}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={1}></RowDirective>
            <RowDirective height={1}>
              <CellsDirective>
              </CellsDirective>
              <CellsDirective>
                   <CellDirective chart={pieChart} index={2}></CellDirective>
                    <CellDirective chart={columnChart} index={4}></CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={1}>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='SCHEDULE ON DELAY' 
                  style={{fontWeight: 'bold', fontSize: '11pt', color: '#991B1B',textAlign: 'left',verticalAlign: 'middle'}}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Schedule!H2:H21,"On Delay")'
                  style={{ fontSize: '11pt', fontWeight: '600',color: '#991B1B',textAlign: 'right',verticalAlign: 'middle'}}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='SCHEDULE ON TRACK' 
                  style={{ fontWeight: 'bold', fontSize: '11pt',color: '#065F46',textAlign: 'left',verticalAlign: 'middle'}}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Schedule!H2:H21,"On Track")'
                  style={{ fontSize: '11pt', fontWeight: '600',color: '#065F46',textAlign: 'right',verticalAlign: 'middle'}}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='Materials with Shortage' 
                  style={{ fontWeight: 'bold', fontSize: '11pt', color: '#92400E', textAlign: 'left', verticalAlign: 'middle' }}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Material!D2:D21,">0")'
                  style={{ fontSize: '11pt', fontWeight: '600', color: '#92400E', textAlign: 'right', verticalAlign: 'middle' }}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='Total Demand Quantity' 
                  style={{ fontWeight: 'bold', fontSize: '11pt', color: '#3730A3', textAlign: 'left', verticalAlign: 'middle' }}>
                </CellDirective>
                <CellDirective 
                  formula='=SUM(Demand!D2:D21)'
                  style={{ fontSize: '11pt', fontWeight: '600',color: '#3730A3',textAlign: 'right',verticalAlign: 'middle'}}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='Total Scheduled Quantity' 
                  style={{ fontWeight: 'bold', fontSize: '11pt', color: '#3730A3', textAlign: 'left', verticalAlign: 'middle' }}>
                </CellDirective>
                <CellDirective 
                  formula='=SUM(Schedule!D2:D21)'
                  style={{ fontSize: '11pt', fontWeight: '600',color: '#3730A3',textAlign: 'right',verticalAlign: 'middle'}}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={35}>
              <CellsDirective>
                <CellDirective 
                  value='PRIORITY DISTRIBUTION' 
                  style={{ fontSize: '14pt', fontWeight: 'bold', backgroundColor: '#1E3A8A', color: '#FFFFFF',textAlign: 'center',verticalAlign: 'middle'}}>
                </CellDirective>
                <CellDirective 
                  style={{ color: '#FFFFFF'}}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='High Priority' 
                  style={{ fontWeight: 'bold', fontSize: '11pt', color: '#7F1D1D',textAlign: 'left',verticalAlign: 'middle'}}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Demand!F2:F21,"High")'
                  style={{ fontSize: '11pt', fontWeight: '600',color: '#7F1D1D',textAlign: 'right',verticalAlign: 'middle'}}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='Medium Priority' 
                  style={{ fontWeight: 'bold', fontSize: '11pt', color: '#78350F',textAlign: 'left',verticalAlign: 'middle'}}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Demand!F2:F21,"Medium")'
                  style={{ fontSize: '11pt',fontWeight: '600',color: '#78350F',textAlign: 'right',verticalAlign: 'middle'}}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='Low Priority' 
                  style={{ fontWeight: 'bold', fontSize: '11pt', color: '#1F2937',textAlign: 'left',verticalAlign: 'middle'}}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Demand!F2:F21,"Low")'
                  style={{ fontSize: '11pt', fontWeight: '600',color: '#1F2937',textAlign: 'right',verticalAlign: 'middle'}}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={35}>
              <CellsDirective>
                <CellDirective
                  value='ORDER STATUS'
                  style={{fontSize: '14pt',fontWeight: 'bold',backgroundColor: '#1E3A8A',color: '#FFFFFF',textAlign: 'center',verticalAlign: 'middle'}}>
                </CellDirective>
                <CellDirective
                  style={{color: '#FFFFFF'}}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective>
              <CellsDirective>
                <CellDirective 
                  value='IN QUEUE ORDERS' 
                  style={{ fontWeight: 'bold', fontSize: '11pt', color: '#065F46', textAlign: 'left', verticalAlign: 'middle' }}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Demand!G2:G21,"IN Queue")'
                  style={{ fontSize: '11pt', fontWeight: '600', color: '#065F46', textAlign: 'right', verticalAlign: 'middle' }}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective>
              <CellsDirective>
                <CellDirective 
                  value='DELAYED ORDERS' 
                  style={{ fontWeight: 'bold', fontSize: '11pt', color: '#78350F', textAlign: 'left', verticalAlign: 'middle' }}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Demand!G2:G21,"Delayed")'
                  style={{ fontSize: '11pt', fontWeight: '600', color: '#78350F', textAlign: 'right', verticalAlign: 'middle' }}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective>
              <CellsDirective>
                <CellDirective index={3}  chart={rowChart}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={10}></RowDirective>
          </RowsDirective>
          <ColumnsDirective>
            <ColumnDirective width={220}></ColumnDirective>
            <ColumnDirective width={150}></ColumnDirective>
            <ColumnDirective width={50}></ColumnDirective>
            <ColumnDirective width={400}></ColumnDirective>
          </ColumnsDirective>
        </SheetDirective>
        {/* Created Demand Sheet */}
        <SheetDirective name='Demand' showGridLines={false}>
          <RangesDirective>
            <RangeDirective dataSource={liveDemand2}> </RangeDirective>
          </RangesDirective>
          <ColumnsDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={250}></ColumnDirective>
            <ColumnDirective width={250} ></ColumnDirective>
            <ColumnDirective width={150} ></ColumnDirective>
            <ColumnDirective width={150}></ColumnDirective>
            <ColumnDirective width={150}></ColumnDirective>
            <ColumnDirective width={150}></ColumnDirective>
          </ColumnsDirective>
        </SheetDirective>
        {/* Created Material Sheet */}
        <SheetDirective name='Material' showGridLines={false}  isProtected={true}>
          <RangesDirective>
            <RangeDirective dataSource={liveMaterial2}> </RangeDirective>
          </RangesDirective>
          <ColumnsDirective>
            <ColumnDirective width={250}></ColumnDirective>
            <ColumnDirective width={150}></ColumnDirective>
            <ColumnDirective width={150}></ColumnDirective>
            <ColumnDirective width={150}></ColumnDirective>
            <ColumnDirective width={150}></ColumnDirective>
            <ColumnDirective width={220}></ColumnDirective>
            <ColumnDirective width={150}></ColumnDirective>
          </ColumnsDirective>
        </SheetDirective>
        {/* Created Schedule Sheet */}
        <SheetDirective name='Schedule' showGridLines={false}>
           <RowsDirective>
            <RowDirective>
              <CellsDirective>
                <CellDirective value='JOBID'></CellDirective>
                <CellDirective value='ORDERID'></CellDirective>
                <CellDirective value='ITEMID'></CellDirective>
                <CellDirective value='SHORTAGE QUANTITY'></CellDirective>
                <CellDirective value='DELIVERY DEADLINE'></CellDirective>
                <CellDirective value='SCHEDULED START'></CellDirective>
                <CellDirective value='SCHEDULED END'></CellDirective>
                <CellDirective value='SCHEDULE STATUS'></CellDirective>
              </CellsDirective>
            </RowDirective>
           </RowsDirective>
          <ColumnsDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={250}></ColumnDirective>
            <ColumnDirective width={220}></ColumnDirective>
            <ColumnDirective width={220}></ColumnDirective>
            <ColumnDirective width={220}></ColumnDirective>
            <ColumnDirective width={220}></ColumnDirective>
            <ColumnDirective width={220}></ColumnDirective>
            <ColumnDirective width={220}></ColumnDirective>
          </ColumnsDirective>
        </SheetDirective>
      </SheetsDirective>
    </SpreadsheetComponent>
  );
}