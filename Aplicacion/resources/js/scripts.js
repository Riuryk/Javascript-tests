const form = document.getElementById("formid");
form.addEventListener("submit", function (event) {
    ;
    event.preventDefault();
    let formidData = new FormData(form);
    let transobj = convertTrOBJ(formidData)
    if (estaVacia(formidData)) {
        alert("Inserte los datos completos")
    }
    else {
        insertRow(transobj);
        sasveTrObj(transobj);
    }
  form.reset();
})
document.addEventListener("DOMContentLoaded",function (event) {
    let tranOBJarr = JSON.parse(localStorage.getItem("transData"))
    tranOBJarr.forEach(element => {
        insertRow(element); 
    });
})
function newTransId() {
    let  lastTransd = localStorage.getItem("lastTransID") || "-1"
    let newTransId = JSON.parse(lastTransd) + 1 ;
    localStorage.setItem("lastTransID",JSON.stringify(newTransId))
    return newTransId;
}
function convertTrOBJ(formidData) {
let trasType = formidData.get("typeselecor")
let typeDes =  formidData.get("typeDes")
let typeMonto =formidData.get("typeMonto")
let typecat = formidData.get("typecat"); 
let typeId = newTransId();
return {
    "typeselecor" :trasType,
    "typeDes" : typeDes,
    "typeMonto":typeMonto,
    "typecat":typecat,
    "typeId":typeId
}
}
function deleteObj(typeId) {
tranOBJarr = JSON.parse(localStorage.getItem("transData"))
let transIndexArr = tranOBJarr.filter(element => element.typeId === typeId)
tranOBJarr.splice(transIndexArr,1)
let tranOBJarrJSON =JSON.stringify(tranOBJarr);
localStorage.setItem("transData",tranOBJarrJSON)
}
function insertRow(transobj) {
    let transTableRef = document.getElementById("transTable");
    let newtranstableRow = transTableRef.insertRow(-1);
    newtranstableRow.setAttribute("data-typeId",transobj["typeId"])
    let newtranstableCell = newtranstableRow.insertCell(0)
    newtranstableCell.textContent = transobj["typeselecor"]

    newtranstableCell = newtranstableRow.insertCell(1)
    newtranstableCell.textContent = transobj["typeDes"]

    newtranstableCell = newtranstableRow.insertCell(2)
    newtranstableCell.textContent = transobj["typeMonto"]

    newtranstableCell = newtranstableRow.insertCell(3)
    newtranstableCell.textContent = transobj["typecat"]

    let newDeleteCell = newtranstableRow.insertCell(4)
    let deleteButton = document.createElement("button")
    deleteButton.textContent = "Eliminar";
    newDeleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", (event) => {
       let transRow = event.target.parentNode.parentNode
       let transId = transRow.getAttribute("data-typeId")
       transRow.remove();
        deleteObj(transId);
    })
}
function sasveTrObj(transobj) {
    let myTransArr = JSON.parse (localStorage.getItem("transData"))|| [];
    myTransArr.push(transobj);
    let myTransArrJSON = JSON.stringify(myTransArr);           
    localStorage.setItem("transData",myTransArrJSON)
}
function estaVacia(formidData) {
    if (formidData.get("typeselecor") == null || formidData.get("typeDes") == "" || formidData.get("typeMonto") == "" || formidData.get("typecat") == "") {
        return true;
    } else {
        return false;
    }
}