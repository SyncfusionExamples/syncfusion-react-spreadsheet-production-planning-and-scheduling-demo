import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
  CellDirective, CellsDirective, ColumnDirective, ColumnsDirective, getSheet, RangeDirective, RangesDirective,
  RowDirective, RowsDirective, setCell, SheetDirective, SheetsDirective, SpreadsheetComponent, Workbook
} from '@syncfusion/ej2-react-spreadsheet';
import { actualData, dashBoardData, demandSheetData, liveDemand, liveMaterial, liveSchedule, materialSheetData, newSchedule } from '../samples/dataSource';

export default function App() {
  let spreadsheet;

  const onCreated = () => {
    const dashboardSheet = getSheet(spreadsheet, 0);
    const demandSheet = getSheet(spreadsheet, 1);
    const materialSheet = getSheet(spreadsheet, 2);
    const scheduleSheet = getSheet(spreadsheet, 3);
    const DATA_ROWS = 20;
    const DEMAND_COLS = 7;
    const MATERIAL_COLS = 7;
    const SCHEDULE_COLS = 9;
    const DASHBOARD_COLS = 2;

    // Demand Sheet: Apply header style + data styles + formulas in single setCell calls
    const demandHeaderStyle = { backgroundColor: '#4472C4', color: '#FFFFFF', fontWeight: 'bold' };
    for (let c = 0; c < DEMAND_COLS; c++) {
      setCell(0, c, demandSheet, { style: demandHeaderStyle });
    }
    
    const demandColStyles = [
      { backgroundColor: '#E7E6E6' }, // A
      { backgroundColor: '#24bf87' }, // B
      { backgroundColor: '#E8EEF6' }, // C
      { backgroundColor: '#CBD5E1' }, // D
      { backgroundColor: 'yellow' },  // E
      {},                             // F preserve existing (priority)
      { backgroundColor: '#3B82F6', color: '#FFFFFF' } // G status
    ];
    
    for (let r = 1; r <= DATA_ROWS; r++) {
      const rowNum = r + 1;
      for (let c = 0; c < DEMAND_COLS; c++) {
        // Build complete cell properties object
        const cellProps = { style: demandColStyles[c] };
        
        // Add formula for status column (G)
        if (c === 6) {
          cellProps.formula = `=IF(TODAY()>E${rowNum},"Delayed",IF(D${rowNum}>0,"In Progress","Completed"))`;
        }
        
        // Single setCell call with all properties
        setCell(r, c, demandSheet, cellProps);
      }
    }
    spreadsheet.numberFormat('0', 'Demand!D2:D1000');

    // Material Sheet: Apply header style + data styles + formulas in single setCell calls
    const materialHeaderStyle = { backgroundColor: '#2F4F7C', color: '#FFFFFF', fontWeight: 'bold' };
    for (let c = 0; c < MATERIAL_COLS; c++) {
      setCell(0, c, materialSheet, { style: materialHeaderStyle });
    }
    
    const materialColStyles = [
      { backgroundColor: '#EEF6FF', color: '#1F2937' }, // A
      { backgroundColor: '#FFF7EC', color: '#1F2937' }, // B
      { backgroundColor: '#FFEFEF', color: '#1F2937' }, // C (ReqQty)
      { backgroundColor: '#FFF3BF', color: '#1F2937' }, // D (Shortage)
      { backgroundColor: '#3B82F6', color: '#FFFFFF' }, // E Planned
      { backgroundColor: '#E8EEF6', color: '#1F2937' }, // F ExpectedDate
      { backgroundColor: '#F6F8FA', color: '#1F2937' }  // G Risk
    ];
    
    for (let r = 1; r <= DATA_ROWS; r++) {
      const rowNum = r + 1;
      for (let c = 0; c < MATERIAL_COLS; c++) {
        // Build complete cell properties with style and formula together
        const cellProps = { style: materialColStyles[c] };
        
        // Add formulas for calculated columns
        if (c === 2) {
          cellProps.formula = `=SUMIF(Demand!C2:C50,Material!A${rowNum},Demand!D2:D50)`;
        } else if (c === 3) {
          cellProps.formula = `=MAX(0,C${rowNum}-B${rowNum})`;
        } else if (c === 4) {
          cellProps.formula = `=IF(D${rowNum}>0,D${rowNum},0)`;
        } else if (c === 5) {
          cellProps.formula = `=IF(D${rowNum}>0,TODAY()+CEILING(D${rowNum}/100,1),"N/A")`;
        } else if (c === 6) {
          cellProps.formula = `=IF(Demand!F${rowNum}="High",IF(E${rowNum}-TODAY()<=2,"High Risk","On Track"),IF(Demand!F${rowNum}="Medium",IF(E${rowNum}-TODAY()<=3,"Medium Risk","On Track"),IF(Demand!F${rowNum}="Low",IF(E${rowNum}-TODAY()<=5,"Low Risk","On Track"),"On Track")))`;
        }
        
        // Single setCell call with all properties
        setCell(r, c, materialSheet, cellProps);
      }
    }
    spreadsheet.numberFormat('m/d/yyyy', 'Material!F2:F1000');

    // Schedule Sheet: Apply header style + data styles + formulas in single setCell calls
    const scheduleHeaderStyle = { backgroundColor: '#0B3D91', color: '#FFFFFF', fontWeight: 'bold' };
    for (let c = 0; c < SCHEDULE_COLS; c++) {
      setCell(0, c, scheduleSheet, { style: scheduleHeaderStyle });
    }
    
    const scheduleColStyles = [
      { backgroundColor: '#FFFFFF', color: '#071024' }, // A
      { backgroundColor: '#DFF6FF', color: '#023047' }, // B
      { backgroundColor: '#E6FFFA', color: '#034D3A' }, // C
      { backgroundColor: '#FFF8E6', color: '#4A2F00' }, // D
      { backgroundColor: '#0066FF', color: '#FFFFFF' }, // E
      { backgroundColor: '#FFE6F0', color: '#3A0026' }, // F
      { backgroundColor: '#EAF0FF', color: '#07204A' }, // G
      { backgroundColor: '#FFF2E6', color: '#4A2F00' }, // H
      { backgroundColor: '#F7FFF0', color: '#0B3D91' }  // I
    ];
    
    for (let r = 1; r <= DATA_ROWS; r++) {
      const rowNum = r + 1;
      for (let c = 0; c < SCHEDULE_COLS; c++) {
        // Build complete cell properties with style and formula together
        const cellProps = { style: scheduleColStyles[c] };
        
        // Add formulas for linked columns
        if (c === 1) {
          cellProps.formula = `=Demand!A${rowNum}`;
        } else if (c === 2) {
          cellProps.formula = `=Demand!C${rowNum}`;
        } else if (c === 3) {
          cellProps.formula = `=Demand!D${rowNum}`;
        } else if (c === 4) {
          cellProps.formula = `=Demand!E${rowNum}`;
        } else if (c === 5) {
          cellProps.formula = `=VLOOKUP(C${rowNum},Material!A2:G21,6,TRUE)`;
        } else if (c === 6) {
          cellProps.formula = `=MAX(TODAY(),F${rowNum})`;
        } else if (c === 7) {
          cellProps.formula = `=G${rowNum}+(D${rowNum}/10)/24`;
        } else if (c === 8) {
          cellProps.formula = `=IF(H${rowNum}>E${rowNum},"AT-RISK","ON-TRACK")`;
        }
        
        // Single setCell call with all properties
        setCell(r, c, scheduleSheet, cellProps);
      }
    }
    spreadsheet.numberFormat('m/d/yyyy', 'Schedule!F2:H1000');

    // Dashboard Sheet: Apply formulas only (clean view without styling)
    for (let r = 1; r <= 9; r++) {
      const formulas = {
        1: `=IFERROR(AVERAGE(--(Schedule!H2:H${DATA_ROWS+1} <= Schedule!E2:E${DATA_ROWS+1})),0)`,
        2: `=COUNTIF(Schedule!I2:I${DATA_ROWS+1},"AT-RISK")`,
        3: `=COUNTIF(Schedule!I2:I${DATA_ROWS+1},"ON-TRACK")`,
        4: `=COUNTIF(Material!D2:D${DATA_ROWS+1},">0")`,
        5: `=SUM(Demand!D2:D${DATA_ROWS+1})`,
        6: `=SUM(Schedule!D2:D${DATA_ROWS+1})`,
        7: `=COUNTIF(Demand!F2:F${DATA_ROWS+1},"High")`,
        8: `=COUNTIF(Demand!F2:F${DATA_ROWS+1},"Medium")`,
        9: `=COUNTIF(Demand!F2:F${DATA_ROWS+1},"Low")`
      };
      
      // Single setCell call with formula only
      setCell(r, 1, dashboardSheet, { formula: formulas[r] });
    }
    
    spreadsheet.numberFormat('#,##0', 'Dashboard!B2:B10');

    // shared configuration remains the same
    spreadsheet.addDataValidation({ type: 'List', value1: 'High,Medium,Low' }, 'Demand!F2:F1000');
    spreadsheet.conditionalFormat({ type: 'EqualTo', value: 'Delayed', range: 'Demand!G2:G100', format: { backgroundColor: 'red', color: '#721C24' } });
    spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'RedF', value: 'High', range: 'Demand!F2:F100' });
    spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'YellowFT', value: 'Medium', range: 'Demand!F2:F100' });
    spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'Low', range: 'Demand!F2:F100' });
    spreadsheet.conditionalFormat({ type: 'BlueDataBar', range: 'Material!B2:B100' });
    spreadsheet.conditionalFormat({ type: 'OrangeDataBar', range: 'Material!C2:C100' });
    spreadsheet.conditionalFormat({ type: 'RedDataBar', range: 'Material!D2:D100' });
    spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'RedF', value: 'High Risk', range: 'Material!G2:G100' });
    spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'On Track', range: 'Material!G2:G100' });
    spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'RedF', value: 'AT-RISK', range: 'Schedule!I2:I100' });
    spreadsheet.conditionalFormat({ type: 'EqualTo', cFColor: 'GreenFT', value: 'ON-TRACK', range: 'Schedule!I2:I100' });
    //spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, 'Material!A2:D21');
    spreadsheet.refresh();
    // optional refresh/calc
    // spreadsheet.calculateNow('Workbook');
    // spreadsheet.refresh();
  };
  return (
    <SpreadsheetComponent ref={(ssObj) => { spreadsheet = ssObj; }} created={onCreated.bind(this)} height={600}>
      {/* calculationMode={'Manual'} */}
      <SheetsDirective>
        <SheetDirective name='DashBoard'>
          <RowsDirective>
            <RowDirective>
            </RowDirective>
            <RowDirective>
              <CellsDirective>
                <CellDirective index={0} value='DashBoard Metrics'></CellDirective>
              </CellsDirective>
            </RowDirective>
            <RowDirective></RowDirective>
            <RowDirective></RowDirective>
            <RowDirective></RowDirective>
            <RowDirective></RowDirective>
            <RowDirective></RowDirective>
            <RowDirective index={12}>
              <CellsDirective>
                <CellDirective index={8} ></CellDirective>
              </CellsDirective>
            </RowDirective>
          </RowsDirective>
          <ColumnsDirective>
            <ColumnDirective width={120}>
            </ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
          </ColumnsDirective>
        </SheetDirective>
        <SheetDirective name='Demand'>
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
        <SheetDirective name='Material'>
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
        <SheetDirective name='Schedule'>
          <RangesDirective>
            <RangeDirective dataSource={liveSchedule}> </RangeDirective>
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