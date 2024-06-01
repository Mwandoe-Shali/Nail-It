import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"

const appSettings = {
    databaseURL: "https://nail-it-8f766-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const db = getDatabase(app)

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

    alert(`${siteName}\n${siteLocation}\n${buildingType}\n${date}\nAdded successfully!`)
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
materialBtn.addEventListener('click', () =>
    {
        materialForm.style.display = 'none'
    }
)

console.log(app)



