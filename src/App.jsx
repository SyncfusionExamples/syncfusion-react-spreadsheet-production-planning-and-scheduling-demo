import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
  CellDirective, CellsDirective, ChartDirective, ChartsDirective, ColumnDirective, ColumnsDirective, getColumnHeaderText, getSheet, RangeDirective, RangesDirective, RowDirective, RowsDirective, setCell, SheetDirective, SheetsDirective, SpreadsheetComponent,
} from '@syncfusion/ej2-react-spreadsheet';
import { liveDemand, liveMaterial, liveSchedule } from '../samples/dataSource';

export default function App() {
  let spreadsheet;
const onCreated = () => {
  const demandSheet = getSheet(spreadsheet, 1);
  const materialSheet = getSheet(spreadsheet, 2);
  const scheduleSheet = getSheet(spreadsheet, 3);
  // Get dynamic ranges based on used range
  const demandUsedRange = demandSheet.usedRange;
  const materialUsedRange = materialSheet.usedRange;
  const scheduleUsedRange = scheduleSheet.usedRange;
  const demandLastRow = demandUsedRange.rowIndex + 1;
  const materialLastRow = materialUsedRange.rowIndex + 1;
  const scheduleLastRow = scheduleUsedRange.rowIndex + 1;
  const DATA_ROWS = demandLastRow - 1;
  //Applying Header Styles to each Individual Sheet
  spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#1E88E5', color: '#F5F5F5' }, `Demand!A1:${getColumnHeaderText(demandUsedRange.colIndex + 1)}1`);
  spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#1E88E5', color: '#F5F5F5' }, `Material!A1:${getColumnHeaderText(materialUsedRange.colIndex + 1)}1`);
  spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#1E88E5', color: '#F5F5F5' }, `Schedule!A1:${getColumnHeaderText(scheduleUsedRange.colIndex + 1)}1`);
  //Applying Column Styles to Each Sheet 
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Demand!A2:A${demandUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Demand!C2:C${demandUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff' }, `Demand!B2:B${demandUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff' }, `Demand!D2:D${demandUsedRange.rowIndex + 1}`);
  //Material Sheet Styles
  spreadsheet.cellFormat({ textAlign: 'center' }, `Material!A2:A${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ textAlign: 'center' }, `Material!F2:G${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Material!A2:A${materialUsedRange.rowIndex + 1}`);
  //Schedule Sheet Styles
  spreadsheet.cellFormat({ textAlign: 'center' }, `Schedule!A2:${getColumnHeaderText(scheduleUsedRange.colIndex + 1)}${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Schedule!A2:A${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Schedule!C2:C${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Schedule!E2:E${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7',textAlign:'center' }, `Schedule!G2:G${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff' }, `Schedule!B2:B${demandUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff' }, `Schedule!D2:D${demandUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff' }, `Schedule!F2:F${demandUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff',textAlign:'center' }, `Schedule!H2:H${demandUsedRange.rowIndex + 1}`);
  spreadsheet.numberFormat('0', `Demand!D2:D${demandLastRow}`);
  spreadsheet.numberFormat('m/d/yyyy', `Material!F2:F${materialLastRow}`);
  // Add formula for column G
  for (let r = 1; r <= DATA_ROWS; r++) {
    const rowNum = r + 1;
    spreadsheet.updateCell({ formula: `=IF(TODAY()>E${rowNum},"Delayed",IF(D${rowNum}>0,"In Progress","Completed"))` }, `Demand!G${rowNum}`);
  }
  for (let r = 1; r <= DATA_ROWS; r++) {
    const rowNum = r + 1;
    spreadsheet.updateCell({ formula: `=SUMIF(Demand!C2:C${demandLastRow},Material!A${rowNum},Demand!D2:D${demandLastRow})` }, `Material!C${rowNum}`);
    spreadsheet.updateCell({ formula: `=MAX(0,C${rowNum}-B${rowNum})` }, `Material!D${rowNum}`);
    spreadsheet.updateCell({ formula: `=IF(D${rowNum}>0,D${rowNum},0)` }, `Material!E${rowNum}`);
    spreadsheet.updateCell({ formula: `=IF(D${rowNum}>0,TODAY()+CEILING(D${rowNum}/100,1),TODAY())` }, `Material!F${rowNum}`);
    spreadsheet.updateCell({ formula: `=IF(Demand!F${rowNum}="High",IF(E${rowNum}-TODAY()<=2,"High Risk","On Track"),IF(Demand!F${rowNum}="Medium",IF(E${rowNum}-TODAY()<=3,"Medium Risk","On Track"),IF(Demand!F${rowNum}="Low",IF(E${rowNum}-TODAY()<=5,"Low Risk","On Track"),"On Track")))` }, `Material!G${rowNum}`);
  }
  // Add formulas for linked columns
  for (let r = 1; r <= DATA_ROWS; r++) {
    const rowNum = r + 1;
    spreadsheet.updateCell({ formula: `=Demand!A${rowNum}` }, `Schedule!B${rowNum}`);
    spreadsheet.updateCell({ formula: `=Demand!C${rowNum}` }, `Schedule!C${rowNum}`);
    spreadsheet.updateCell({ formula: `=Demand!D${rowNum}` }, `Schedule!D${rowNum}`);
    spreadsheet.updateCell({ formula: `=Demand!E${rowNum}` }, `Schedule!E${rowNum}`);
    spreadsheet.updateCell({ formula: `=VLOOKUP(C${rowNum},Material!A2:G${materialLastRow},6,FALSE)` }, `Schedule!F${rowNum}`);
    spreadsheet.updateCell({ formula: `=MAX(TODAY(),F${rowNum})` }, `Schedule!G${rowNum}`);
    spreadsheet.updateCell({ formula: `=G${rowNum}+(D${rowNum}/10)/24` }, `Schedule!H${rowNum}`);
    spreadsheet.updateCell({ formula: `=IF(H${rowNum}>E${rowNum},"AT-RISK","ON-TRACK")` }, `Schedule!I${rowNum}`);
  }
  spreadsheet.numberFormat('m/d/yyyy', `Schedule!F2:H${scheduleLastRow}`);
  spreadsheet.numberFormat('#,##0', `Dashboard!B3:B${10 + DATA_ROWS}`);
  spreadsheet.numberFormat('0%', 'Dashboard!B3:B3');
  //adding data validations
  spreadsheet.addDataValidation({ type: 'List', value1: 'High,Medium,Low' }, `Demand!F2:F${demandLastRow}`);
  spreadsheet.conditionalFormat({ type: 'EqualTo', value: 'Delayed', range: `Demand!G2:G${demandLastRow}`, format: { backgroundColor: 'red', color: '#721C24' } });
  spreadsheet.conditionalFormat({ type: "BWRColorScale", range: `Demand!E2:E${demandLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'RedF', value: 'High', range: `Demand!F2:F${demandLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'YellowFT', value: 'Medium', range: `Demand!F2:F${demandLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'Low', range: `Demand!F2:F${demandLastRow}` });
  spreadsheet.conditionalFormat({ type: 'BlueDataBar', range: `Material!B2:B${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'OrangeDataBar', range: `Material!C2:C${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'RedDataBar', range: `Material!D2:D${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'RedF', value: 'High Risk', range: `Material!G2:G${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'On Track', range: `Material!G2:G${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'RedF', value: 'AT-RISK', range: `Schedule!I2:I${scheduleLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'ON-TRACK', range: `Schedule!I2:I${scheduleLastRow}` });
  spreadsheet.merge('Dashboard!A1:B1', 'Horizontally');
  spreadsheet.merge('Dashboard!A10:B10', 'Horizontally');
  spreadsheet.refresh();
};
  const ColumnChart = [{ type: 'Column', range: `Demand!C1:D21`, title: 'CUSTOMER ORDERED ITEMS', theme: 'Tailwind3', height: 290, width: 450, top: 0, id: 'Chart2', isSeriesInRows: false }];
  const PieChart = [{ type: 'Pie', range: 'DashBoard!A11:B13', title: 'ORDER PRIORITIES', theme: 'Tailwind3', height: 290, width: 440, top: 0, id: 'Chart1', isSeriesInRows: false }];
  const BarChart = [{ type: 'Bar', range: 'Material!A1:C21', title: 'AVAILABLE AND CUSTOMER ORDERED QUANTITIES', theme: 'Tailwind3', height: 300, width: 900, top: 300, left: 370, id: 'Chart3', isSeriesInRows: false }];
  return ( 
    <SpreadsheetComponent ref={(ssObj) => { spreadsheet = ssObj; }} created={onCreated.bind(this)} height={650}  showFormulaBar={false} isProtected={true}  showRibbon={false}>
      <SheetsDirective>
        <SheetDirective name='DashBoard' showGridLines={false}>
          <RowsDirective>
            <RowDirective height={40}>
              <CellsDirective>
                <CellDirective 
                  value='PRODUCTION DASHBOARD' 
                  style={{ 
                    fontSize: '18pt', 
                    fontWeight: 'bold',
                    backgroundColor: '#1E3A8A', 
                    color: '#FFFFFF',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  }}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={1}></RowDirective>
            <RowDirective height={1}>
              <CellsDirective>
              </CellsDirective>
              <CellsDirective>
                   <CellDirective chart={PieChart} index={2}></CellDirective>
                    <CellDirective chart={ColumnChart} index={4}></CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={1}>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='Projects AT-RISK' 
                  style={{ 
                    fontWeight: 'bold', 
                    fontSize: '11pt', 
                    color: '#991B1B',
                    textAlign: 'left',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Schedule!I2:I21,"AT-RISK")'
                  style={{ 
                    fontSize: '11pt', 
                    fontWeight: '600',
                    color: '#991B1B',
                    textAlign: 'right',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='Projects ON-TRACK' 
                  style={{ 
                    fontWeight: 'bold', 
                    fontSize: '11pt', 
                    color: '#065F46',
                    textAlign: 'left',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Schedule!I2:I21,"ON-TRACK")'
                  style={{ 
                    fontSize: '11pt', 
                    fontWeight: '600',
                    color: '#065F46',
                    textAlign: 'right',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='Materials with Shortage' 
                  style={{ 
                    fontWeight: 'bold', 
                    fontSize: '11pt', 
                    color: '#92400E',
                    textAlign: 'left',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Material!D2:D21,">0")'
                  style={{ 
                    fontSize: '11pt', 
                    fontWeight: '600',
                    color: '#92400E',
                    textAlign: 'right',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='Total Demand Quantity' 
                  style={{ 
                    fontWeight: 'bold', 
                    fontSize: '11pt', 
                    color: '#3730A3',
                    textAlign: 'left',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
                <CellDirective 
                  formula='=SUM(Demand!D2:D21)'
                  style={{ 
                    fontSize: '11pt', 
                    fontWeight: '600',
                    color: '#3730A3',
                    textAlign: 'right',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='Total Scheduled Quantity' 
                  style={{ 
                    fontWeight: 'bold', 
                    fontSize: '11pt', 
                    color: '#3730A3',
                    textAlign: 'left',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
                <CellDirective 
                  formula='=SUM(Schedule!D2:D21)'
                  style={{ 
                    fontSize: '11pt', 
                    fontWeight: '600',
                    color: '#3730A3',
                    textAlign: 'right',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={35}>
              <CellsDirective>
                <CellDirective 
                  value='PRIORITY DISTRIBUTION' 
                  style={{ 
                    fontSize: '14pt', 
                    fontWeight: 'bold', 
                    backgroundColor: '#1E3A8A', 
                    color: '#FFFFFF',
                    textAlign: 'center',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
                <CellDirective 
                  style={{ 
                    color: '#FFFFFF'
                  }}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='High Priority' 
                  style={{ 
                    fontWeight: 'bold', 
                    fontSize: '11pt', 
                    color: '#7F1D1D',
                    textAlign: 'left',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Demand!F2:F21,"High")'
                  style={{ 
                    fontSize: '11pt', 
                    fontWeight: '600',
                    color: '#7F1D1D',
                    textAlign: 'right',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='Medium Priority' 
                  style={{ 
                    fontWeight: 'bold', 
                    fontSize: '11pt', 
                    color: '#78350F',
                    textAlign: 'left',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Demand!F2:F21,"Medium")'
                  style={{ 
                    fontSize: '11pt', 
                    fontWeight: '600',
                    color: '#78350F',
                    textAlign: 'right',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective height={30}>
              <CellsDirective>
                <CellDirective 
                  value='Low Priority' 
                  style={{ 
                    fontWeight: 'bold', 
                    fontSize: '11pt', 
                    color: '#1F2937',
                    textAlign: 'left',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Demand!F2:F21,"Low")'
                  style={{ 
                    fontSize: '11pt', 
                    fontWeight: '600',
                    color: '#1F2937',
                    textAlign: 'right',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective>
              <CellsDirective>
                <CellDirective index={3} chart={BarChart} >
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
        <SheetDirective name='Demand' showGridLines={false}>
          <RangesDirective>
            <RangeDirective dataSource={liveDemand}> </RangeDirective>
          </RangesDirective>
          <ColumnsDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
          </ColumnsDirective>
        </SheetDirective>
        <SheetDirective name='Material' showGridLines={false}>
          <RangesDirective>
            <RangeDirective dataSource={liveMaterial}> </RangeDirective>
          </RangesDirective>
          <ColumnsDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
          </ColumnsDirective>
        </SheetDirective>
        <SheetDirective name='Schedule' showGridLines={false}>
          <RangesDirective>
            <RangeDirective dataSource={liveSchedule} > </RangeDirective>
          </RangesDirective>
          <ColumnsDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
          </ColumnsDirective>
        </SheetDirective>
      </SheetsDirective>
    </SpreadsheetComponent>
  );
}