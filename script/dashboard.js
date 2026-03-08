const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayIssues(data.data));
}

const displayIssues = (issues) => {
    const issuesContainer = document.getElementById("issues-container");
    issuesContainer.innerHTML = "";

    issues.forEach((issue) =>{
        const issueCard = document.createElement("div");
        issueCard.innerHTML = `
        <div class="shadow-sm rounded-lg p-3 space-y-2">
            <div class="flex justify-between items-center">
                <img src="assets/Open-Status.png" alt="">
                <button class="bg-red-100 text-red-400 text-sm px-5 py-1 font-medium rounded-full">HIGH</button>
            </div>
            <div class="border-b-1 border-gray-200">
                <h4 class="text-primary font-semibold text-xl">Fix navigation menu on mobile devices</h4>
                <p class="text-secondary text-sm">The navigation menu doesn't collapse properly on mobile devices...</p>
                <div class="mt-3 flex gap-2 mb-3">
                    <button class="bg-red-100 text-red-600 text-sm px-4 py-1 border-1 border-red-500 font-medium rounded-full"><i class="fa-solid fa-bug"></i> BUG</button>
                    <button class="bg-yellow-100 text-yellow-600 text-sm px-3 py-1 border-1 border-yellow-500 font-medium rounded-full"><i class="fa-solid fa-life-ring"></i> HELP WANTED</button>
                </div>
            </div>
            <div class="space-y-2">
                <p class="text-secondary text-sm">#1 by john_doe</p>
                <p class="text-secondary text-sm">1/15/2024</p>
            </div>
        </div>
        `;

        issuesContainer.appendChild(issueCard);
    })
}

loadIssues();