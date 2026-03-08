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

function formattedDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB").replace(/\//g, "-");
}

const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayIssues(data.data));
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
    const labelsHTML = issue.labels.map(label => getLabelHTML(label)).join('');

    const issueCard = document.createElement("div");
    issueCard.innerHTML = `
      <div class="shadow-sm rounded-lg p-3 flex flex-col h-full border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
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
}

loadIssues();