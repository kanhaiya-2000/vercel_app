import React from "react";
import CreateIcon from '@material-ui/icons/Create';
import Button from "@material-ui/core/Button";
import WarningIcon from '@material-ui/icons/Warning';
import IconButton from '@material-ui/core/IconButton';

const Item = ({ data, openModal,adjustStock,id,toggleDeletionList }) => {
    let price = Number(data.price);
    let stockPrice = data.price*data.stockQuantity;
    if(!data.taxInclusive){
        price = price + price*(Number(data.GSTRate)/100);    
    }
    const showWarning = data.EnableLowStockWarning&&(Number(data.stockQuantity)<Number(data.lowStockValue));
    return (
        <div className="item" id={id}>
            <input type="checkbox" onClick={()=>toggleDeletionList(id)}/>
            <div>{data.itemName}</div>
            <div>{data.itemCode}</div>
            <div>{data.category}</div>
            <div>{data.stockQuantity}</div>
            <div>{data.stockUnit}</div>
            <div>₹ {stockPrice}</div>
            <div>₹ {price.toFixed(2)}</div>
            <div style={{ display: "flex", justifyContent: "space-between", textTransform: "uppercase", color: "blue", alignItems: "center", fontSize: "14px", width: "200px", cursor: "pointer" }}>{showWarning&&<span style={{ color: "#f00" }}><WarningIcon /></span>}<span style={{ color: "gray" }}><IconButton onClick={() => openModal({ type: "edit" ,key:id})}><CreateIcon /></IconButton></span><Button variant="outlined" className="MuiButton-root-my" onClick={()=>adjustStock(id)}>Adjust stock</Button></div>
        </div>
    )
}
export default Item;