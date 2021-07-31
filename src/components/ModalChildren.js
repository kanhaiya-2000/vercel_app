import React from "react";
import Button from "@material-ui/core/Button";

import Select from '@material-ui/core/Select';

import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';

// import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";

const EditCreateModalChild = ({value,InputEvent,callback}) => {
    
    return (
      <div className="editcreatemodal">
        <div className="general_detail">
          <div style={{ width: '100%', borderBottom: '1px solid #b5b5b5', fontWeight: "bold", textAlign: "left", padding: "15px", fontSize: "12px",marginBottom:"10px"}}>General details</div>
          <div>
            <TextField
              label="Item Name"
              className="detail_input"
              value={value.itemName}
              name="itemName"
              onChange={InputEvent}
            />
          </div>
          <div>
            <Select              
              value={value.category||"Other"}
              name="category"
              onChange={InputEvent}
              style={{ marginTop: "10px" }}
              className="detail_input"
            >
                <MenuItem value={"Other"}>Other</MenuItem>
                <MenuItem value={"Panel"}>Panel</MenuItem>
                <MenuItem value={"MC4 connector"}>MC4 connector</MenuItem>
                <MenuItem value={"Inverter"}>Inverter</MenuItem>          
                <MenuItem value={"Wire"}>Wire</MenuItem>
          
            </Select>
          </div>
          <div>
            <TextField
              label="Item Code"
              className="detail_input"
              value={value.itemCode}
              name="itemCode"
              onChange={InputEvent}
            />
          </div>
          <div>
            <TextField
              label="Item description"
              className="detail_input"
              value={value.itemDescription}
              name="itemDescription"
              onChange={InputEvent}
            />
          </div>
        </div>
        <div className="stock_details">
          <div style={{ width: '100%', borderBottom: '1px solid #b5b5b5', fontWeight: "bold", textAlign: "left", padding: "15px", fontSize: "12px",marginBottom:"10px" }}>Stock details</div>
          <div className="stock_div">
            <Select
              label="Unit"
              value="none"
              value={value.stockUnit}
              name="stockUnit"
              onChange={InputEvent}
              style={{ marginTop: "10px" }}
              className="detail_input_2"
            >
              <MenuItem value={"none"}>None</MenuItem>
              <MenuItem value={"FEET(FT)"}>FEET(FT)</MenuItem>
              <MenuItem value={"INCHES(IN)"}>INCHES(IN)</MenuItem>
              <MenuItem value={"UNITS(UNT)"}>UNITS(UNT)</MenuItem>
              <MenuItem value={"PIECES(PCS)"}>PIECES(PCS)</MenuItem>
              <MenuItem value={"NUMBERS(NOS)"}>NUMBERS(NOS)</MenuItem>
              <MenuItem value={"METER(M)"}>METER(M)</MenuItem>
            </Select>
            <TextField
              label="Opening stock"
              className="detail_input_2"
              value={value.stockQuantity}
              name="stockQuantity"
              onChange={InputEvent}
            />
          </div>
          <div className="stock_div" style={{ justifyContent: "flex-start" }}>
            <TextField
              type="date"
              className="detail_input_2"
              default={value.addedDate}
              name="addedDate"
              onChange={InputEvent}
              
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", color: "gray", marginLeft: "15px" }}>
            <div className="low_stock_switch">
              <span>Low stock warning</span>
              <Switch
                label="Item Code"
                className="detail_input_2"
                checked={value.EnableLowStockWarning}
                name="EnableLowStockWarning"
                onChange={InputEvent}
              />
            </div>
            <TextField
              label="Low stock value"
              className="detail_input_2"
              value={value.lowStockValue}
              name="lowStockValue"
              onChange={InputEvent}
            />
          </div>

          <div style={{ width: '100%', borderBottom: '1px solid #b5b5b5', fontWeight: "bold", textAlign: "left", padding: "15px", fontSize: "12px", marginBottom: "20px" }}>Price details</div>
          <div className="price_detail_div">
            <TextField
              label="Purchase price"
              className="detail_input_2"
              value={value.price}
              name="price"
              onChange={InputEvent}
            />
            <span>Tax Inclusive</span>
            <Switch
              label="Item Code"
              className="detail_input_2"
              checked={value.taxInclusive}
              name="taxInclusive"
              onChange={InputEvent}
            />
          </div>


          <div>
            <Select
              label="GST Tax Rate"              
              value={value.GSTRate||"none"}
              name="GSTRate"
              onChange={InputEvent}
              style={{ marginTop: "10px" }}
              className="detail_input"
            >
              <MenuItem value={"none"}>None</MenuItem>
              <MenuItem value={0}>GST @0%</MenuItem>
              <MenuItem value={0.1}>GST @0.1%</MenuItem>
              <MenuItem value={1}>GST @1%</MenuItem>
              <MenuItem value={5}>GST @5%</MenuItem>
            </Select>
          </div>
          <div className="savebtn"><Button variant="contained" color="primary" onClick={callback}>SAVE</Button></div>
        </div>
      </div>

    )
  }

  export default EditCreateModalChild;