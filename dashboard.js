import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { getDatabase, ref, onValue,push, get, update, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"

const appSettings = {
    databaseURL: "https://nail-it-8f766-default-rtdb.asia-southeast1.firebasedatabase.app/"

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
  
  function addMaterialRow(materialId, materialData) {
    const tableBody = document.getElementById("materialTableBody");
    const newRow = document.createElement("tr");
  
    // Create table cells for material data
    const nameCell = document.createElement("td");
    nameCell.textContent = materialData.name;
    const quantityCell = document.createElement("td");
    quantityCell.textContent = materialData.quantity;
    const unitsCell = document.createElement("td");
    unitsCell.textContent = materialData.units;
    const lastUpdatedCell = document.createElement("td");
    lastUpdatedCell.textContent = materialData.lastUpdated;
  
    // Create update and delete buttons with event listeners
    const updateCell = document.createElement("td");
    updateCell.innerHTML = "<button><i class='fa-regular fa-pen-to-square'></i></button>";
    const deleteCell = document.createElement("td");
    deleteCell.innerHTML = "<button><i class='fas fa-trash-alt'></i></button>";
  
    const updateButton = updateCell.querySelector("button");
    updateButton.addEventListener("click", function() {
      // Handle update functionality (pass materialId)
      const materialToUpdate = ref(db, 'materials/' + materialId);
      const updateForm = document.getElementById('updateFormContainer')
      const materialName = document.getElementById('uMaterialName');
      const quantity = document.getElementById('uQuantity');
      const units = document.getElementById('uUnits');
      const lastUpdated = document.getElementById('uLastUpdated');
      get(materialToUpdate)
      .then((dataSnapshot) => {
          if (dataSnapshot.exists()) {
                updateForm.style.display = 'block'; 
                const materialData = dataSnapshot.val();
                console.log("Fetched material data:", materialData);
            
                materialName.value = materialData.name
                quantity.value = materialData.quantity
                units.value = materialData.units
                lastUpdated.value = materialData.lastUpdated

        } else {
            console.log("Material not found!");
            // Handle case where material with the ID doesn't exist
        }
    })
    .catch((error) => {
        console.error("Error fetching material data:", error);
    });
    

        

        const updateCancelButton = document.getElementById('updateCancelButton')
        const updateBtn = document.getElementById('update-material-btn')
        updateCancelButton.addEventListener('click', () =>{
            updateForm.style.display = 'none'
        })
        updateBtn.addEventListener('click', () =>
            {
                update(materialToUpdate, {materialName:materialName.value, quantity:quantity.value, units:units.value, lastUpdated:lastUpdated.value})
                .then(() => {
                    alert("Material Updated successfully!")
            })
                .catch((error) => {
                    alert(error.message)
            })
                updateForm.style.display = 'none'
            }
        )



        
    });
  
    const deleteButton = deleteCell.querySelector("button");
    deleteButton.addEventListener("click", function() {
        // Handle delete functionality (pass materialId)
        const materialToDelete = ref(db, 'materials/' + materialId);
      
        remove(materialToDelete)
          .then(() => {
            alert("Material deleted successfully!");
            // You can optionally update the table or UI to reflect the deletion
          })
          .catch((error) => {
            console.error("Error deleting material:", error);
            // Handle errors appropriately (optional)
          });
      });
      
  
    // Append cells to the new row and the row to the table body
    newRow.appendChild(nameCell);
    newRow.appendChild(quantityCell);
    newRow.appendChild(unitsCell);
    newRow.appendChild(lastUpdatedCell);
    newRow.appendChild(updateCell);
    newRow.appendChild(deleteCell);
    tableBody.appendChild(newRow);
  }
  
  onValue(materialsRef, (snapshot) => {
    const materialData = snapshot.val();
  
    if (materialData) {
      document.getElementById("materialTableBody").innerHTML = ""; // Clear existing rows before adding new ones
      for (const materialId in materialData) {
        const material = materialData[materialId];
        addMaterialRow(materialId, material);
      }
    } else {
      console.log("No materials found!");
    }
  });
  
// Update FUNCTIONALITY

const updateButtons = [];

for (const row of tableBody.rows) {
  const updateButton = row.querySelector("button i.fa-regular.fa-pen-to-square");
  if (updateButton) {
    updateButtons.push(updateButton);
  }
}



onValue(materialsRef, (snapshot) => {
    const materialData = snapshot.val();
  
    if (materialData) {
      // Loop through each child node (material)
      for (const materialId in materialData) {
        const material = materialData[materialId];
  
        // Access the data and ID for each material
        // console.log("Material ID:", materialId);
        // console.log("Material Data:", material);
  
        // You can use the material data and ID for further processing (e.g., adding rows to a table)
        // Implement your logic to add rows to the table here
        // For example, call your addMaterialRow function with material and materialId
      }
    } else {
      console.log("No materials found!");
    }
  });