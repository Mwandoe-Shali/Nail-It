import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { getDatabase, ref, onValue,push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"

const appSettings = {
    databaseURL: "https://nail-it-d575b-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const db = getDatabase(app)

const sitesRef = ref(db, 'sites')
const materialsRef = ref(db, 'materials')


const addSiteBtn = document.getElementById('addSiteButton')
const addSiteForm = document.getElementById('siteFormContainer')
const siteCancelBtn = document.getElementById('cancelButton')
const addSiteFormBtn = document.getElementById('add-site-btn')
addSiteBtn.addEventListener('click', () =>{
    addSiteForm.style.display = 'block'
    
})
siteCancelBtn.addEventListener('click', () =>
    {
        addSiteForm.style.display = 'none'
    }
)

function getNewSiteData(){
    const siteName = document.getElementById('siteName').value
    const siteLocation = document.getElementById('siteLocation').value
    const buildingType = document.getElementById('buildingType').value
    const date = document.getElementById('metadataDate').value
    if (siteName && siteLocation && buildingType && date){
        push(sitesRef, { name: siteName, location: siteLocation, buildingType: buildingType, date: date})
    }
    alert(`Added successfully!`)
}
addSiteFormBtn.addEventListener('click',getNewSiteData)


// DELETE FUNCTIONALITY

const deleteButtons = [];
const tableBody = document.getElementById("materialTableBody");

for (const row of tableBody.rows) {
  const deleteButton = row.querySelector("button i.fas.fa-trash-alt");
  if (deleteButton) {
    deleteButtons.push(deleteButton);
  }
}

const delForm = document.getElementById('deleteFormContainer')
for (const button of deleteButtons) {
    button.addEventListener("click", function() {
        delForm.style.display = 'block';
      
    })
  }
  
const delCancelButton = document.getElementById('delCancelButton')
const delYesBtn = document.getElementById('del-yes-btn')
delCancelButton.addEventListener('click', () =>{
    delForm.style.display = 'none'
})
delYesBtn.addEventListener('click', () =>
    {
        delForm.style.display = 'none'
    }
)
// Update FUNCTIONALITY

const updateButtons = [];

for (const row of tableBody.rows) {
  const updateButton = row.querySelector("button i.fa-regular.fa-pen-to-square");
  if (updateButton) {
    updateButtons.push(updateButton);
  }
}

const updateForm = document.getElementById('updateFormContainer')
for (const button of updateButtons) {
    button.addEventListener("click", function() {
        updateForm.style.display = 'block';
      
    })
  }
  
const updateCancelButton = document.getElementById('updateCancelButton')
const updateBtn = document.getElementById('update-material-btn')
updateCancelButton.addEventListener('click', () =>{
    updateForm.style.display = 'none'
})
updateBtn.addEventListener('click', () =>
    {
        updateForm.style.display = 'none'
    }
)
// NEW MATERIAL
const materialForm = document.getElementById('materialFormContainer')
const addMaterialButton = document.getElementById('addMaterialButton')
addMaterialButton.addEventListener('click', () => {
    materialForm.style.display = 'block'
    
})
const materialCancelButton = document.getElementById('materialCancelButton')
const materialBtn = document.getElementById('material-btn')
materialCancelButton.addEventListener('click', () =>{
    materialForm.style.display = 'none'
})
materialBtn.addEventListener('click', () => {
  
    const materialName = document.getElementById('materialsName').value;
    const quantity = document.getElementById('mQuantity').value;
    const units = document.getElementById('mUnits').value;
    const lastUpdated = document.getElementById('mLastUpdated').value;
  
    // Now access and process the form values
    if (materialName && quantity && units && lastUpdated) {
      push(materialsRef, { name: materialName, quantity, units, lastUpdated });
      alert("Success");
      materialForm.style.display = 'none';
    } else {
      alert("Please fill in all required fields");
    }
  });
  

// Fetching materials from firebase
function addMaterialRow(material) {
    const tableBody = document.getElementById("materialTableBody");
    const newRow = document.createElement("tr");
  
    // Create table cells (TD elements) for each property
    const nameCell = document.createElement("td");
    nameCell.textContent = material.name;
    const quantityCell = document.createElement("td");
    quantityCell.textContent = material.quantity;
    const unitsCell = document.createElement("td");
    unitsCell.textContent = material.units;
    const lastUpdatedCell = document.createElement("td");
    lastUpdatedCell.textContent = material.lastUpdated;
  
    // Add update and delete buttons (optional)
    const updateCell = document.createElement("td");
    updateCell.innerHTML = "<button><i class='fa-regular fa-pen-to-square'></i></button>";
    const deleteCell = document.createElement("td");
    deleteCell.innerHTML = "<button><i class='fas fa-trash-alt'></i></button>";
  
    // Append cells to the new row
    newRow.appendChild(nameCell);
    newRow.appendChild(quantityCell);
    newRow.appendChild(unitsCell);
    newRow.appendChild(lastUpdatedCell);
    newRow.appendChild(updateCell);
    newRow.appendChild(deleteCell);
  
    // Append the new row to the table body
    tableBody.appendChild(newRow);
  }

  
onValue(materialsRef, (snapshot) => {
    let materialData = Object.values(snapshot.val());
    for (const material of materialData) {
        addMaterialRow(material);
      }
    
})
console.log(app)



