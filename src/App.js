import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';

import MenuItem from '@material-ui/core/MenuItem';

import React, { useState, useEffect, useRef } from "react";
import './App.css';
import Item from "./components/Item";

// import InputLabel from '@material-ui/core/InputLabel';
import firebase from './Firebase';
import NewModal from "./components/Modal";


import EditCreateModalChild from "./components/ModalChildren";



function App() {

  const [inventories, setInventories] = useState([]);
  const [allInventories,setAllInventories] = useState([]);
  const firebaseref = useRef(firebase.firestore().collection('inventories'));
  const [key, setKey] = useState("")
  const [currentChoice,setCurrentChoice] = useState("all");
  const [selected, setSelected] = useState([])
  const [value, setValue] = useState({
    itemName: "",
    itemCode: "",
    category: "",
    stockQuantity: "",
    stockUnit: "PIECES(PCS)",
    addedDate: "",
    stockValue: "",
    price: "",
    itemDescription: "",
    itemImage: "",
    lowStockValue: "",
    EnableLowStockWarning: false,
    GSTRate: "",
    taxInclusive: false
  })

  const FetchInventories = (querySnapshot) => {
    let Inventories = [];
    console.log("calling fetch")
    querySnapshot.forEach((doc) => {

      Inventories.push({
        key: doc.id,
        data: doc.data(), // DocumentSnapshot        
      });
    });
    ////console.log(Inventories)
    Inventories = Inventories.filter((value,index,self)=>{
      return index===(self.map(x=>x.key)).indexOf(value.key)
    })
    setInventories(Inventories);
    setAllInventories(Inventories);
  }

  const addItem = (data) => {
    
    firebaseref.current.add(data).then((docRef) => {
      //close addItem modal
    })
      .catch((error) => {
        //console.error("Error adding document: ", error);
      });
  }

  const EditItem = (data, id) => { 
    //console.log(id);
    
    firebaseref.current.doc(id).set(data).then((docRef) => {
      //close EditItem modal
      //console.log("Editing", docRef)
    })
      .catch((error) => {
        //console.error("Error adding document: ", error);
      });
  }

  const DeleteItem = (id) => {

    firebaseref.current.doc(id).delete().then(() => {
      //console.log("Document successfully deleted!");
      //close deleteModal
    }).catch((error) => {
      //console.error("Error removing document: ", error);
    });

  }
  useEffect(() => {
    //call this function when component has mounted

    firebaseref.current.onSnapshot(FetchInventories);

  }, [])

  const handleChange = (e) => {
    setCategory(e.target.value);
    FilterInventories(e.target.value)
  }
  const [catg, setCategory] = useState("none")

  const InputEvent = async (e) => {

    const {name} = e.target;
    let datatofit = e.target.value;
    if(name==="EnableLowStockWarning"||name==="taxInclusive"){
      datatofit = e.target.checked;
    }
    await setValue({ ...value, [e.target.name]: datatofit });
    //console.log(value)
  }

  const FilterInventories = (type)=>{
      setCurrentChoice(type);
      switch(type){
        case "Panel":          
        case "MC4 connector":          
        case "Inverter":          
        case "Wire":         
        case "Other":
          setInventories(allInventories.filter(x=>x.data.category===type))
          break;
        case "Low stock":
          setInventories(allInventories.filter(x=>x.data.EnableLowStockWarning&&(x.data.lowStockValue>x.data.stockQuantity)))
          break;          
        default:
          setInventories(allInventories)
          break;
          
      }
  }

  const openModal = ({ type, key }) => {
    setModal(true);
    setKey(null);
    setValue({
      itemName: "",
      itemCode: "",
      category: "",
      stockQuantity: "",
      stockUnit: "PIECES(PCS)",
      addedDate: "",
      stockValue: "",
      price: "",
      itemDescription: "",
      itemImage: "",
      lowStockValue: "",
      EnableLowStockWarning: false,
      GSTRate: "",
      taxInclusive: false
    });
    if (type === "edit") {
      setKey(key);
      const data = inventories.filter(x => x.key === key)
      setValue(data[0].data);
    }
  }

  const adjustStock = (key) => {
    
    const data = window.prompt("Enter the value(+ or -) by which you want the stock to get updated?");
    //console.log(Number(data), key)
    if(!data){
      return;
    }
    const inventory = inventories.filter(x=>x.key===key);
    const dataObject = inventory[0].data;
    const newQuantity = Number(dataObject.stockQuantity) + Number(data);
    if(newQuantity<0){
      return window.alert("Your total stock cannot be negative")
    }
    else{
      dataObject.stockQuantity = newQuantity;
      EditItem(dataObject,key);
    }
  }
  const [isModal, setModal] = useState(false);
  
  const closeModal = () => {
    setModal(false);
  }

  const saveCallback = ()=>{
      //console.log("executing callback ...");
      closeModal();
      if(key){
        EditItem(value,key)
      }
      else{
        addItem(value)
      }
  }

  const toggleDeletionList = (id)=>{
    const index = selected.indexOf(id);
    //console.log(selected,index);
    if(index>-1){
      setSelected(selected.filter(x=>x!==id))
    }
    else{
      setSelected([...selected,id]);
    }
  }

  const DeleteSelected = ()=>{
    if(selected.length===0){
      return window.alert("You have not selected any inventory");
    }
    const t = window.confirm(`You are about to delete ${selected.length} inventories`);
    if(t){
      selected.forEach(x=>{
        DeleteItem(x);
      })
    }
  }

  
  return (
    <div className="App">
      {isModal && <NewModal closeModal={closeModal} title={!key?"Create Inventory":"Edit Inventory"}>
        <EditCreateModalChild value={value} InputEvent={InputEvent} key={key} callback={saveCallback}/>
      </NewModal>}
      <div className="app_controller">
        <Button style={{ color: "blue" }} onClick={()=>{currentChoice==="Low stock"?FilterInventories("all"):FilterInventories("Low stock")}}>SHOW LOW STOCK</Button>
        {/* <InputLabel>Category</InputLabel> */}
        <Select
          value={catg}
          onChange={handleChange}
        >
          <MenuItem value={"none"}>All</MenuItem>
          <MenuItem value={"Panel"}>Panel</MenuItem>
          <MenuItem value={"MC4 connector"}>MC4 connector</MenuItem>
          <MenuItem value={"Inverter"}>Inverter</MenuItem>          
          <MenuItem value={"Wire"}>Wire</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
        <Button variant="contained" className="mui_button" onClick={DeleteSelected}><DeleteIcon className="deletesvg" />Delete selected</Button>

        <Button variant="contained" color="primary" className="mui_button" onClick={openModal}><AddIcon />Add to Inventory</Button>
      </div>
      <div className="container">
        <div className="item_header">
          <input type="checkbox" checked={false}/>
          <div>Item Name</div>
          <div>Item Code</div>
          <div>Category</div>
          <div>Stock Quantity</div>
          <div>Stock On Hold</div>
          <div>Stock Value</div>
          <div>Purchase Price</div>
        </div>
        {
          inventories.map(inventory => <Item data={inventory.data} key={inventory.key} id={inventory.key} openModal={openModal} adjustStock={adjustStock} toggleDeletionList={toggleDeletionList}/>)
        }
      </div>
    </div>
  );
}

export default App;
