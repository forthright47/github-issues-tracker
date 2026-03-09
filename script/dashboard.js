const modalCardTitle = document.getElementById("modal-card-title");
const modalCardStatus = document.getElementById("modal-card-status");
const modalCardAuthor = document.getElementById("modal-card-author");
const modalCardDate = document.getElementById("modal-card-date");
const modalCardLabel1 = document.getElementById("modal-card-label-1");
const modalCardLabel2 = document.getElementById("modal-card-label-2");
const modalCardDescription = document.getElementById("modal-card-description");
const modalCardAssignee = document.getElementById("modal-card-assignee");
const modalCardPriority = document.getElementById("modal-card-priority");

const priorityStyles = {
  'high':   'bg-red-100 text-red-500',
  'medium': 'bg-yellow-100 text-yellow-600',
  'low':    'bg-gray-200 text-gray-600',
};

const labelStyles = {
  'bug': { class: 'bg-red-100 text-red-600 border border-red-400', icon: 'fa-solid fa-bug' },
  'enhancement': { class: 'bg-blue-100 text-blue-600 border border-blue-400', icon: 'fa-solid fa-bolt' },
  'help wanted': { class: 'bg-yellow-100 text-yellow-600 border border-yellow-400', icon: 'fa-solid fa-hand' },
  'good first issue': { class: 'bg-green-100 text-green-600 border border-green-400', icon: 'fa-solid fa-star' },
  'documentation': { class: 'bg-purple-100 text-purple-600 border border-purple-400', icon: 'fa-solid fa-book' },
};

function getLabelHTML(label) {
  const style = labelStyles[label] ?? { class: 'bg-gray-100 text-gray-600 border border-gray-400', icon: 'fa-solid fa-tag' };
  return `
    <span class="text-xs px-3 py-1 font-medium rounded-full flex items-center gap-1 ${style['class']}">
      <i class="${style.icon}"></i>
      ${label.toUpperCase()}
    </span>
  `;
}

const cardDetailsModal = document.getElementById("card-details-modal");

async function openCardModal(cardId) {

  cardDetailsModal.showModal();
  document.getElementById("modal-spinner").classList.remove("hidden");
  document.getElementById("modal-content").classList.add("hidden");

  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`);
  const data = await res.json();
  const card = data.data;

  document.getElementById("modal-spinner").classList.add("hidden");
  document.getElementById("modal-content").classList.remove("hidden");

  if (card.assignee === "") card.assignee = "Unassigned";

  modalCardTitle.textContent = card.title;

  const status = document.getElementById("modal-card-status");
  status.textContent = card.status === 'open' ? 'Opened' : 'Closed';
  status.className = `px-4 py-1 rounded-full text-xs font-semibold uppercase text-white ${card.status === 'open' ? 'bg-green-500' : 'bg-purple-600'}`;

  document.getElementById("modal-card-author").textContent = `Opened by ${card.author}`;
  document.getElementById("modal-card-date").textContent = formattedDate(card.createdAt);

  document.getElementById("modal-card-labels").innerHTML = card.labels.map(label => getLabelHTML(label)).join('');

  document.getElementById("modal-card-description").textContent = card.description;

  document.getElementById("modal-card-assignee").textContent = card.assignee;

  const priority = document.getElementById("modal-card-priority");
  priority.textContent = card.priority;
  priority.className = `px-4 py-1 rounded-full text-xs font-semibold uppercase text-white ${
    card.priority === 'high'   ? 'bg-red-500' :
    card.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
  }`;
}

function formattedDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB").replace(/\//g, "-");
}

let allIssues = [];

function filterIssues(type) {

  document.getElementById('btn-all').className = 'bg-white border border-gray-200 px-5 py-2 md:px-10 rounded-xl text-sm text-gray-500';
  document.getElementById('btn-open').className = 'bg-white border border-gray-200 px-5 md:px-8 py-2 rounded-xl text-sm text-gray-500';
  document.getElementById('btn-closed').className = 'bg-white border border-gray-200 px-5 md:px-7 py-2 rounded-xl text-sm text-gray-500';

  document.getElementById('btn-' + type).className = 'bg-indigo-700 px-5 py-2 md:px-10 rounded-xl text-white text-sm';

  manageSpinner(true);

  setTimeout(function() {

    if (type === 'all') {
      displayIssues(allIssues);

    } else if (type === 'open') {
      const openIssues = allIssues.filter(function(issue) {
        return issue.status === 'open';
      });
      displayIssues(openIssues);

    } else if (type === 'closed') {
      const closedIssues = allIssues.filter(function(issue) {
        return issue.status === 'closed';
      });
      displayIssues(closedIssues);
    }

  }, 300);

}

const manageSpinner = (stats) => {
  if(stats == true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("issues-container").classList.add("hidden");
  }
  else{
    document.getElementById("issues-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
}

const loadIssues = () => {

  manageSpinner(true);

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      allIssues = data.data;
      displayIssues(allIssues);
    });
}

const displayIssues = (issues) => {
  const issuesContainer = document.getElementById("issues-container");
  const totalIssues = document.getElementById('total-issues');
  
  issuesContainer.innerHTML = "";
  totalIssues.innerText = issues.length;

  issues.forEach((issue) => {
    if(issue.assignee == ""){
        issue.assignee = "Unassigned";
    }
    
    const priorityLabels = priorityStyles[issue.priority] ?? 'bg-gray-100 text-gray-500';
    const statusImg = issue.status === 'open' ? 'assets/Open-Status.png' : 'assets/Closed-Status.png';
    const topBorder = issue.status === 'open' ? 'border-t-4 border-t-green-500' : 'border-t-4 border-t-purple-500';
    const labelsHTML = issue.labels.map(label => getLabelHTML(label)).join('');

    const issueCard = document.createElement("div");
    issueCard.innerHTML = `
      <div onclick="openCardModal(${issue.id})" class="shadow-sm rounded-lg p-3 flex flex-col h-full border border-gray-100 cursor-pointer hover:shadow-md transition-shadow ${topBorder}">
        <div class="flex justify-between items-center mb-2">
          <img src="${statusImg}" alt="${issue.status}">
          <span class="text-xs px-4 py-1 font-semibold rounded-full uppercase ${priorityLabels}">${issue.priority}</span>
        </div>
        <div class="flex flex-col flex-1 border-b border-gray-200 pb-3 gap-2">
          <h4 class="text-primary font-semibold text-xl leading-snug min-h-[56px]">${issue.title}</h4>
          <p class="text-secondary text-sm line-clamp-2">${issue.description}</p>
          <div class="mt-auto flex flex-wrap gap-2 pt-1 uppercase">
            ${labelsHTML}
          </div>
        </div>
        <div class="space-y-2 pt-2">
          <div class="flex justify-between">
            <p class="text-secondary text-sm">#${issue.id} by ${issue.author}</p>
            <p class="text-secondary text-sm">${formattedDate(issue.createdAt)}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-secondary text-sm">Assignee: ${issue.assignee}</p>
            <p class="text-secondary text-sm">Updated: ${formattedDate(issue.updatedAt)}</p>
          </div>
        </div>
      </div>
    `;

    issuesContainer.appendChild(issueCard);
  });
  manageSpinner(false);
}

loadIssues();


// Search functionality
document.getElementById("btn-search").addEventListener("click", function() {

  const searchValue = document.getElementById("input-search").value.trim();

  if (searchValue === "") {
    displayIssues(allIssues);
    return;
  }

  manageSpinner(true);

  const searchURL = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;
  fetch(searchURL)
  .then((response) => response.json())
  .then((data) => {
    const searchedIssues = data.data;
    displayIssues(searchedIssues);
  });
});