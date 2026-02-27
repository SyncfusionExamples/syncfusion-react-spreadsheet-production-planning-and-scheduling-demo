import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { CellDirective, CellsDirective, ColumnDirective, ColumnsDirective, getColumnHeaderText, getSheet, RangeDirective, RangesDirective, RowDirective, RowsDirective, SheetDirective, SheetsDirective, SpreadsheetComponent,
} from '@syncfusion/ej2-react-spreadsheet';
import { liveDemand, liveMaterial, liveSchedule, liveDemand2,liveSchedule2,liveMaterial2 } from '../samples/dataSource';

export default function App() {
let spreadsheet;
const onCreated = () => {
  const demandSheet = getSheet(spreadsheet, 1);
  const materialSheet = getSheet(spreadsheet, 2);
  const scheduleSheet = getSheet(spreadsheet, 3);
  // Get dynamic ranges based on used range in dataSource
  const demandUsedRange = demandSheet.usedRange;
  const materialUsedRange = materialSheet.usedRange;
  const scheduleUsedRange = scheduleSheet.usedRange;
  const demandLastRow = demandUsedRange.rowIndex + 1;
  const materialLastRow = materialUsedRange.rowIndex + 1;
  const scheduleLastRow = scheduleUsedRange.rowIndex + 1;
  const DATA_ROWS = demandLastRow - 1;
  //Applying Header Styles to each Individual Sheet
  spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#1E88E5', color: '#F5F5F5',textAlign:'center' }, `Demand!A1:${getColumnHeaderText(demandUsedRange.colIndex + 1)}1`);
  spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#1E88E5', color: '#F5F5F5',textAlign:'center' }, `Material!A1:${getColumnHeaderText(materialUsedRange.colIndex + 1)}1`);
  spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#1E88E5', color: '#F5F5F5',textAlign:'center' }, `Schedule!A1:${getColumnHeaderText(scheduleUsedRange.colIndex + 1)}1`);
  //Applying Column Styles to Demand Sheet
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Demand!A2:A${demandUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7',textAlign:'center' }, `Demand!C2:C${demandUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff',textAlign:'center' }, `Demand!B2:B${demandUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff' }, `Demand!D2:D${demandUsedRange.rowIndex + 1}`);
  //Applying Column Styles to Material Sheet
  spreadsheet.cellFormat({ textAlign: 'center' }, `Material!A2:A${materialUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ textAlign: 'center' }, `Material!F2:G${materialUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Material!A2:A${materialUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Material!F2:F${materialUsedRange.rowIndex + 1}`);
  //Applying Column Styles to Schedule Sheet
  spreadsheet.cellFormat({ textAlign: 'center' }, `Schedule!A2:${getColumnHeaderText(scheduleUsedRange.colIndex + 1)}${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Schedule!A2:A${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Schedule!C2:C${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, `Schedule!E2:E${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#F9FBE7',textAlign:'center' }, `Schedule!G2:G${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff' }, `Schedule!B2:B${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff' }, `Schedule!D2:D${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff' }, `Schedule!F2:F${scheduleUsedRange.rowIndex + 1}`);
  spreadsheet.cellFormat({ backgroundColor: '#279377', color: '#ffffff',textAlign:'center' }, `Schedule!H2:H${scheduleUsedRange.rowIndex + 1}`);
  //Applying Number Formatting to cells
  spreadsheet.numberFormat('0', `Demand!D2:D${demandLastRow}`);
  spreadsheet.numberFormat('m/d/yyyy', `Material!F2:F${materialLastRow}`);
  spreadsheet.numberFormat('m/d/yyyy', `Schedule!E2:H${scheduleLastRow}`);
  spreadsheet.numberFormat('#,##0', `Dashboard!B3:B${10 + DATA_ROWS}`);
  spreadsheet.numberFormat('0%', 'Dashboard!B3:B3');
  //Updating Formula to Demand Sheet
  for (let r = 1; r <= DATA_ROWS; r++) {
    const rowNum = r + 1;
    spreadsheet.updateCell({ value: `ORD-${rowNum - 1}` }, `Demand!A${rowNum}`);
    spreadsheet.updateCell({ formula: `=IF(D${rowNum}=0,"Completed",IF(TODAY()>E${rowNum},"Delayed","In Queue"))` }, `Demand!G${rowNum}`);
    
  }
  //Updating Formula to Material Sheet
  for (let r = 1; r <= materialLastRow-1; r++) {
    const rowNum = r + 1;
    spreadsheet.updateCell({ formula: `=SUMIF(Demand!C2:C${demandLastRow},A${rowNum},Demand!D2:D${demandLastRow})` }, `Material!C${rowNum}`);
    spreadsheet.updateCell({ formula: `=MAX(0,C${rowNum}-MAX(B${rowNum}-IFERROR(E${rowNum},0),0))` }, `Material!D${rowNum}`);
    spreadsheet.updateCell({ formula: `=IF(D${rowNum}>0,TODAY()+CEILING(D${rowNum}/30,1),"-")` }, `Material!F${rowNum}`);
    spreadsheet.updateCell({ formula: `=IF(D${rowNum}=0,"On Track",IF(D${rowNum}>0,"Risk","On Track"))` }, `Material!G${rowNum}`);
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
  //adding data validations to the neccessary columns
  //demand sheet - data validations
  spreadsheet.addDataValidation({ type: 'List', value1: 'High,Medium,Low' }, `Demand!F2:F${demandLastRow}`);
  spreadsheet.conditionalFormat({ type: 'EqualTo', value: 'Delayed', range: `Demand!G2:G${demandLastRow}`, format: { backgroundColor: 'red', color: '#721C24' } });
   spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'In Queue', range: `Demand!G2:G${demandLastRow}` });
  spreadsheet.conditionalFormat({ type: "BWRColorScale", range: `Demand!E2:E${demandLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'RedF', value: 'High', range: `Demand!F2:F${demandLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'YellowFT', value: 'Medium', range: `Demand!F2:F${demandLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'Low', range: `Demand!F2:F${demandLastRow}` });
  //material sheet - data validations
  spreadsheet.conditionalFormat({ type: 'BlueDataBar', range: `Material!B2:B${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'OrangeDataBar', range: `Material!C2:C${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'RedDataBar', range: `Material!D2:D${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'LightBlueDataBar', range: `Material!E2:E${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'RedF', value: 'Risk', range: `Material!G2:G${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'On Track', range: `Material!G2:G${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'RedF', value: 'On Delay', range: `Schedule!I2:I${materialLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'On Track', range: `Schedule!I2:I${materialLastRow}` });
  //schedule sheet - data validations
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'RedF', value: 'AT-RISK', range: `Schedule!I2:I${scheduleLastRow}` });
  spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'ON-TRACK', range: `Schedule!I2:I${scheduleLastRow}` });
  //merge cells for Dashboard Sheet
  spreadsheet.merge('Dashboard!A1:B1', 'Horizontally');
  spreadsheet.merge('Dashboard!A10:B10', 'Horizontally');
  spreadsheet.merge('Dashboard!A14:B14', 'Horizontally');
  spreadsheet.resize();
};
  //charts used in Dashboard Sheet
  const rowChart = [{ type: 'Column', range: `DashBoard!A15:B16`, title: 'CUSTOMER ORDERED ITEMS', theme: 'Bootstrap5', datalabelSettings: { visible: true, position:'Top'}, height: 265, width: 440, top:295, left:400, id: 'Chart1', isSeriesInRows: true }];
  const pieChart = [{ type: 'Doughnut', range: 'DashBoard!A11:B13', title: 'ORDER PRIORITIES', theme: 'Bootstrap5', height: 265, width: 440, top:10, left:400,id: 'Chart2', isSeriesInRows: false }];
  const columnChart = [{ type: 'Column', range: 'Material!A1:C21', title: 'AVAILABLE AND CUSTOMER ORDERED QUANTITIES', theme: 'Bootstrap5', height: 550, width: 740, top:10,left: 850, id: 'Chart3', isSeriesInRows: false }];
  return ( 
    <SpreadsheetComponent ref={(ssObj) => { spreadsheet = ssObj; }} created={onCreated.bind(this)} height={750}  showFormulaBar={true} isProtected={true}  showRibbon={true} >
      <SheetsDirective>
        {/* Created Dashboard Sheet */}
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
                  style={{ 
                    fontWeight: 'bold', 
                    fontSize: '11pt', 
                    color: '#991B1B',
                    textAlign: 'left',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Schedule!I2:I21,"On Delay")'
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
                  value='SCHEDULE ON TRACK' 
                  style={{ 
                    fontWeight: 'bold', 
                    fontSize: '11pt', 
                    color: '#065F46',
                    textAlign: 'left',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Schedule!I2:I21,"On Track")'
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
            <RowDirective height={35}>
              <CellsDirective>
                <CellDirective
                  value='ORDER STATUS'
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
            <RowDirective>
              <CellsDirective>
                <CellDirective 
                  value='IN QUEUE ORDERS' 
                  style={{ 
                    fontWeight: 'bold', 
                    fontSize: '11pt', 
                    color: '#065F46',
                    textAlign: 'left',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Demand!G2:G21,"IN Queue")'
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
            <RowDirective>
              <CellsDirective>
                <CellDirective 
                  value='DELAYED ORDERS' 
                  style={{ 
                    fontWeight: 'bold', 
                    fontSize: '11pt', 
                    color: '#78350F',
                    textAlign: 'left',
                    verticalAlign: 'middle'
                  }}>
                </CellDirective>
                <CellDirective 
                  formula='=COUNTIF(Demand!G2:G21,"Delayed")'
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
            <ColumnDirective width={250}></ColumnDirective>
            <ColumnDirective width={150}></ColumnDirective>
            <ColumnDirective width={150}></ColumnDirective>
            <ColumnDirective width={150}></ColumnDirective>
            <ColumnDirective width={150}></ColumnDirective>
          </ColumnsDirective>
        </SheetDirective>
        {/* Created Material Sheet */}
        <SheetDirective name='Material' showGridLines={false}>
          <RangesDirective>
            <RangeDirective dataSource={liveMaterial2}> </RangeDirective>
          </RangesDirective>
          <ColumnsDirective>
            <ColumnDirective width={250}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={180}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
          </ColumnsDirective>
        </SheetDirective>
        {/* Created Schedule Sheet */}
        <SheetDirective name='Schedule' showGridLines={false}>
          <RangesDirective>
            <RangeDirective dataSource={liveSchedule2} > </RangeDirective>
          </RangesDirective>
          <ColumnsDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
            <ColumnDirective width={250}></ColumnDirective>
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