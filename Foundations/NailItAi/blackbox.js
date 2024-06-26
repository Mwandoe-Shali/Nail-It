// Example of adding a new site to the sidebar list
const siteList = document.getElementById('siteList');
const addSiteButton = document.getElementById('addSite');

addSiteButton.addEventListener('click', () => {
  let newSiteName = prompt("Enter the name of the new site:");
  if (newSiteName) {
    const newSiteItem = document.createElement('li');
    newSiteItem.innerHTML = `${newSiteName} <span class="delete">Delete</span>`;
    siteList.appendChild(newSiteItem);

    // Add event listener for delete icon in the new site item
    const deleteIcon = newSiteItem.querySelector('.delete');
    deleteIcon.addEventListener('click', () => {
      siteList.removeChild(newSiteItem);
    });
  }
});

// Similar logic for adding materials, updating, deleting, etc.