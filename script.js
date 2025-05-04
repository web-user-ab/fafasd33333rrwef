
let sections = [];

function renderSections() {
  const container = document.getElementById("sectionsContainer");
  container.innerHTML = "";
  sections.forEach((section, index) => {
    const sectionEl = document.createElement("section");
    sectionEl.classList.add("collapsed");
    const header = document.createElement("header");

    const title = document.createElement("h2");
    title.textContent = section.name;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.className = "delete-section";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      sections.splice(index, 1);
      renderSections();
    };

    header.appendChild(title);
    header.appendChild(deleteBtn);
    header.onclick = () => sectionEl.classList.toggle("collapsed");

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "items";

    section.items.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.className = "item";
      itemEl.textContent = item.name;
      itemEl.onclick = (e) => {
        e.stopPropagation();
        showPopup(item.description || "No description");
      };
      itemsContainer.appendChild(itemEl);
    });

    sectionEl.appendChild(header);
    sectionEl.appendChild(itemsContainer);
    container.appendChild(sectionEl);
  });
}

function showPopup(text) {
  document.getElementById("popupContent").textContent = text;
  document.getElementById("popupOverlay").classList.remove("hidden");
}
function closePopup() {
  document.getElementById("popupOverlay").classList.add("hidden");
}

function createSection() {
  const name = document.getElementById("sectionName").value;
  if (!name.trim()) return;
  sections.push({
    name,
    items: [
      { name: "iPhone", description: "Main phone" },
      { name: "Charger", description: "Used for iPhone" },
    ]
  });
  document.getElementById("sectionName").value = "";
  closeSectionModal();
  renderSections();
}

function closeSectionModal() {
  document.getElementById("sectionModal").classList.add("hidden");
}

document.getElementById("addSectionBtn").onclick = () => {
  document.getElementById("sectionModal").classList.remove("hidden");
};

renderSections();
