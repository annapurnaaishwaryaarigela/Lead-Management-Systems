const defaultLeads = [
    {
        id: 1,
        name: "Rahul Sharma",
        company: "TechNova Solutions",
        email: "rahul@technova.com",
        phone: "+91 9876543210",
        source: "Website",
        status: "Qualified",
        priority: "High",
        value: 85000,
        followup: "2026-09-22",
        notes: "Interested in the enterprise package."
    },
    {
        id: 2,
        name: "Priya Reddy",
        company: "BrightWorks",
        email: "priya@brightworks.com",
        phone: "+91 9123456789",
        source: "LinkedIn",
        status: "Contacted",
        priority: "Medium",
        value: 45000,
        followup: "2026-09-21",
        notes: "Requested a product demonstration."
    },
    {
        id: 3,
        name: "Arjun Mehta",
        company: "Nexora Labs",
        email: "arjun@nexora.com",
        phone: "+91 9988776655",
        source: "Referral",
        status: "New",
        priority: "High",
        value: 120000,
        followup: "2026-09-23",
        notes: "New referral lead."
    },
    {
        id: 4,
        name: "Sneha Kapoor",
        company: "PixelCraft",
        email: "sneha@pixelcraft.com",
        phone: "+91 9090909090",
        source: "Instagram",
        status: "Proposal",
        priority: "Medium",
        value: 65000,
        followup: "2026-09-25",
        notes: "Proposal sent. Waiting for feedback."
    },
    {
        id: 5,
        name: "Vikram Rao",
        company: "CloudBridge",
        email: "vikram@cloudbridge.com",
        phone: "+91 9012345678",
        source: "Email",
        status: "Won",
        priority: "High",
        value: 150000,
        followup: "",
        notes: "Deal successfully converted."
    }
];

let leads = JSON.parse(localStorage.getItem("leadFlowLeads")) || defaultLeads;

const sections = document.querySelectorAll(".section");
const navItems = document.querySelectorAll(".nav-item[data-section]");
const modal = document.getElementById("leadModal");
const detailsModal = document.getElementById("detailsModal");
const leadForm = document.getElementById("leadForm");

function saveData() {
    localStorage.setItem("leadFlowLeads", JSON.stringify(leads));
}

function showSection(sectionName) {

    sections.forEach(section => {
        section.classList.remove("active");
    });

    const target = document.getElementById(sectionName);

    if (target) {
        target.classList.add("active");
    }

    navItems.forEach(item => {
        item.classList.toggle(
            "active",
            item.dataset.section === sectionName
        );
    });

    document.querySelector(".sidebar")?.classList.remove("open");

    if (sectionName === "dashboard") {
        renderDashboard();
    }

    if (sectionName === "leads") {
        renderLeads();
    }

    if (sectionName === "pipeline") {
        renderPipeline();
    }

    if (sectionName === "followups") {
        renderFollowups();
    }

    if (sectionName === "analytics") {
        renderAnalytics();
    }
}


/* NAVIGATION */

navItems.forEach(item => {

    item.addEventListener("click", () => {
        showSection(item.dataset.section);
    });

});

document.querySelectorAll("[data-section-target]").forEach(button => {

    button.addEventListener("click", () => {
        showSection(button.dataset.sectionTarget);
    });

});


/* SIDEBAR */

document.getElementById("menuBtn").addEventListener("click", () => {

    document.querySelector(".sidebar").classList.toggle("open");

});


/* MODAL */

function openAddModal() {

    leadForm.reset();

    document.getElementById("leadId").value = "";
    document.getElementById("modalTitle").textContent = "Add New Lead";

    modal.classList.add("show");
}

function closeModal() {

    modal.classList.remove("show");

}

document.getElementById("addLeadBtn").addEventListener("click", openAddModal);
document.getElementById("heroAddLead").addEventListener("click", openAddModal);
document.getElementById("pipelineAdd").addEventListener("click", openAddModal);

document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("cancelModal").addEventListener("click", closeModal);

modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeModal();
    }

});


/* SAVE LEAD */

leadForm.addEventListener("submit", event => {

    event.preventDefault();

    const id = document.getElementById("leadId").value;

    const leadData = {
        id: id ? Number(id) : Date.now(),
        name: document.getElementById("name").value.trim(),
        company: document.getElementById("company").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        source: document.getElementById("source").value,
        status: document.getElementById("status").value,
        priority: document.getElementById("priority").value,
        value: Number(document.getElementById("value").value) || 0,
        followup: document.getElementById("followup").value,
        notes: document.getElementById("notes").value.trim()
    };

    if (id) {

        const index = leads.findIndex(lead => lead.id === Number(id));

        if (index !== -1) {
            leads[index] = leadData;
        }

        showToast("Lead updated successfully.");

    } else {

        leads.unshift(leadData);

        showToast("New lead added successfully.");

    }

    saveData();
    closeModal();

    renderDashboard();
    renderLeads();
    renderPipeline();
    renderFollowups();
    renderAnalytics();

});


/* EDIT */

function editLead(id) {

    const lead = leads.find(item => item.id === id);

    if (!lead) return;

    document.getElementById("leadId").value = lead.id;
    document.getElementById("name").value = lead.name;
    document.getElementById("company").value = lead.company;
    document.getElementById("email").value = lead.email;
    document.getElementById("phone").value = lead.phone;
    document.getElementById("source").value = lead.source;
    document.getElementById("status").value = lead.status;
    document.getElementById("priority").value = lead.priority;
    document.getElementById("value").value = lead.value;
    document.getElementById("followup").value = lead.followup;
    document.getElementById("notes").value = lead.notes;

    document.getElementById("modalTitle").textContent = "Edit Lead";

    modal.classList.add("show");
}


/* DELETE */

function deleteLead(id) {

    const lead = leads.find(item => item.id === id);

    if (!lead) return;

    const confirmed = confirm(`Delete lead "${lead.name}"?`);

    if (!confirmed) return;

    leads = leads.filter(item => item.id !== id);

    saveData();

    renderDashboard();
    renderLeads();
    renderPipeline();
    renderFollowups();
    renderAnalytics();

    showToast("Lead deleted.");
}


/* DETAILS */

function viewLead(id) {

    const lead = leads.find(item => item.id === id);

    if (!lead) return;

    const initials = getInitials(lead.name);

    document.getElementById("leadDetails").innerHTML = `

        <div class="details-content">

            <div class="details-profile">

                <div class="details-avatar">${initials}</div>

                <div>
                    <h2>${escapeHTML(lead.name)}</h2>
                    <p>${escapeHTML(lead.company || "Independent Lead")}</p>
                </div>

            </div>

            <div class="details-grid">

                <div class="detail-box">
                    <span>Email</span>
                    <strong>${escapeHTML(lead.email)}</strong>
                </div>

                <div class="detail-box">
                    <span>Phone</span>
                    <strong>${escapeHTML(lead.phone || "Not provided")}</strong>
                </div>

                <div class="detail-box">
                    <span>Source</span>
                    <strong>${escapeHTML(lead.source)}</strong>
                </div>

                <div class="detail-box">
                    <span>Status</span>
                    <strong>${escapeHTML(lead.status)}</strong>
                </div>

                <div class="detail-box">
                    <span>Priority</span>
                    <strong>${escapeHTML(lead.priority)}</strong>
                </div>

                <div class="detail-box">
                    <span>Expected Value</span>
                    <strong>${formatCurrency(lead.value)}</strong>
                </div>

                <div class="detail-box">
                    <span>Follow-up</span>
                    <strong>${formatDate(lead.followup)}</strong>
                </div>

            </div>

            <div class="notes-box">

                <span>NOTES</span>

                <p>
                    ${escapeHTML(lead.notes || "No notes available for this lead.")}
                </p>

            </div>

        </div>
    `;

    detailsModal.classList.add("show");
}

document.querySelector(".details-close").addEventListener("click", () => {
    detailsModal.classList.remove("show");
});

detailsModal.addEventListener("click", event => {

    if (event.target === detailsModal) {
        detailsModal.classList.remove("show");
    }

});


/* RENDER DASHBOARD */

function renderDashboard() {

    const total = leads.length;
    const newCount = leads.filter(l => l.status === "New").length;
    const won = leads.filter(l => l.status === "Won").length;
    const followups = leads.filter(l => l.followup).length;

    const conversion = total
        ? Math.round((won / total) * 100)
        : 0;

    document.getElementById("totalLeads").textContent = total;
    document.getElementById("newLeads").textContent = newCount;
    document.getElementById("convertedLeads").textContent = won;
    document.getElementById("followupCount").textContent = followups;

    document.getElementById("heroTotal").textContent = total;
    document.getElementById("heroWon").textContent = won;
    document.getElementById("heroRate").textContent = `${conversion}%`;

    const stages = ["New", "Contacted", "Qualified"];

    stages.forEach(stage => {

        const count = leads.filter(l => l.status === stage).length;

        const percent = total
            ? Math.max(8, (count / total) * 100)
            : 8;

        const bar = document.getElementById(
            stage.toLowerCase() + "Bar"
        );

        if (bar) {
            bar.style.width = `${percent}%`;
        }

    });

    const recent = leads.slice(0, 5);

    document.getElementById("recentLeads").innerHTML =
        recent.map(lead => `

            <tr>

                <td>
                    <div class="lead-cell">
                        <div class="lead-avatar">
                            ${getInitials(lead.name)}
                        </div>

                        <div>
                            <strong>${escapeHTML(lead.name)}</strong>
                            <small>${escapeHTML(lead.email)}</small>
                        </div>
                    </div>
                </td>

                <td>${escapeHTML(lead.company || "-")}</td>

                <td>
                    <span class="badge ${statusClass(lead.status)}">
                        ${escapeHTML(lead.status)}
                    </span>
                </td>

                <td>${formatCurrency(lead.value)}</td>

            </tr>

        `).join("");

    renderSourceChart("sourceChart");
}


/* LEADS TABLE */

function renderLeads() {

    const search =
        document.getElementById("leadSearch").value.toLowerCase();

    const status =
        document.getElementById("statusFilter").value;

    const source =
        document.getElementById("sourceFilter").value;

    const priority =
        document.getElementById("priorityFilter").value;

    const filtered = leads.filter(lead => {

        const matchesSearch =
            lead.name.toLowerCase().includes(search) ||
            lead.email.toLowerCase().includes(search) ||
            lead.company.toLowerCase().includes(search);

        const matchesStatus =
            status === "all" || lead.status === status;

        const matchesSource =
            source === "all" || lead.source === source;

        const matchesPriority =
            priority === "all" || lead.priority === priority;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesSource &&
            matchesPriority
        );

    });

    const table = document.getElementById("leadsTable");
    const empty = document.getElementById("emptyState");

    if (!filtered.length) {

        table.innerHTML = "";
        empty.style.display = "block";
        return;

    }

    empty.style.display = "none";

    table.innerHTML = filtered.map(lead => `

        <tr>

            <td>
                <div class="lead-cell">

                    <div class="lead-avatar">
                        ${getInitials(lead.name)}
                    </div>

                    <div>
                        <strong>${escapeHTML(lead.name)}</strong>
                        <small>${escapeHTML(lead.email)}</small>
                    </div>

                </div>
            </td>

            <td>${escapeHTML(lead.company || "-")}</td>

            <td>${escapeHTML(lead.source)}</td>

            <td>
                <span class="badge ${statusClass(lead.status)}">
                    ${escapeHTML(lead.status)}
                </span>
            </td>

            <td class="${priorityClass(lead.priority)}">
                ${escapeHTML(lead.priority)}
            </td>

            <td>${formatCurrency(lead.value)}</td>

            <td>${formatDate(lead.followup)}</td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn"
                        title="View"
                        onclick="viewLead(${lead.id})">
                        👁
                    </button>

                    <button
                        class="action-btn"
                        title="Edit"
                        onclick="editLead(${lead.id})">
                        ✎
                    </button>

                    <button
                        class="action-btn"
                        title="Delete"
                        onclick="deleteLead(${lead.id})">
                        ×
                    </button>

                </div>

            </td>

        </tr>

    `).join("");
}


/* FILTER EVENTS */

document.getElementById("leadSearch").addEventListener("input", renderLeads);
document.getElementById("statusFilter").addEventListener("change", renderLeads);
document.getElementById("sourceFilter").addEventListener("change", renderLeads);
document.getElementById("priorityFilter").addEventListener("change", renderLeads);


/* GLOBAL SEARCH */

document.getElementById("globalSearch").addEventListener("input", event => {

    const value = event.target.value;

    document.getElementById("leadSearch").value = value;

    showSection("leads");

    renderLeads();

});


/* PIPELINE */

const pipelineStages = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal",
    "Won",
    "Lost"
];

function renderPipeline() {

    const kanban = document.getElementById("kanban");

    kanban.innerHTML = pipelineStages.map(stage => {

        const stageLeads =
            leads.filter(lead => lead.status === stage);

        return `

            <div
                class="kanban-column"
                data-stage="${stage}"
                ondragover="allowDrop(event)"
                ondrop="dropLead(event, '${stage}')"
            >

                <div class="kanban-title">

                    <h3>${stage}</h3>

                    <span class="count">
                        ${stageLeads.length}
                    </span>

                </div>

                ${stageLeads.map(lead => `

                    <div
                        class="kanban-card"
                        draggable="true"
                        ondragstart="dragLead(event, ${lead.id})"
                        onclick="viewLead(${lead.id})"
                    >

                        <strong>${escapeHTML(lead.name)}</strong>

                        <small>
                            ${escapeHTML(lead.company || "No company")}
                        </small>

                        <div class="kanban-card-footer">

                            <span>
                                ${formatCurrency(lead.value)}
                            </span>

                            <span class="${priorityClass(lead.priority)}">
                                ${escapeHTML(lead.priority)}
                            </span>

                        </div>

                    </div>

                `).join("")}

            </div>

        `;

    }).join("");
}


/* DRAG AND DROP */

let draggedLeadId = null;

function dragLead(event, id) {

    draggedLeadId = id;

    event.dataTransfer.effectAllowed = "move";

}

function allowDrop(event) {

    event.preventDefault();

}

function dropLead(event, stage) {

    event.preventDefault();

    if (!draggedLeadId) return;

    const lead = leads.find(item => item.id === draggedLeadId);

    if (lead) {

        lead.status = stage;

        saveData();

        renderDashboard();
        renderLeads();
        renderPipeline();
        renderAnalytics();

        showToast(`Lead moved to ${stage}.`);

    }

    draggedLeadId = null;
}


/* FOLLOWUPS */

function renderFollowups() {

    const container = document.getElementById("followupGrid");

    const withFollowups = leads
        .filter(lead => lead.followup)
        .sort((a, b) =>
            new Date(a.followup) - new Date(b.followup)
        );

    if (!withFollowups.length) {

        container.innerHTML = `
            <div class="panel" style="padding:40px;text-align:center;">
                <h3>No follow-ups scheduled</h3>
                <p style="font-size:11px;color:#74817c;margin-top:6px;">
                    Add a follow-up date when creating a lead.
                </p>
            </div>
        `;

        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    container.innerHTML = withFollowups.map(lead => {

        const date = new Date(lead.followup);
        const diff = Math.ceil(
            (date - today) / (1000 * 60 * 60 * 24)
        );

        let type = "upcoming";
        let label = "Upcoming";

        if (diff < 0) {
            type = "overdue";
            label = "Overdue";
        } else if (diff === 0) {
            type = "today";
            label = "Today";
        }

        return `

            <div class="followup-card ${type}">

                <div class="followup-top">

                    <div>
                        <h3>${escapeHTML(lead.name)}</h3>
                        <p>${escapeHTML(lead.company || "No company")}</p>
                    </div>

                    <span class="badge ${statusClass(lead.status)}">
                        ${escapeHTML(lead.status)}
                    </span>

                </div>

                <div class="followup-date">
                    ${label} · ${formatDate(lead.followup)}
                </div>

                <p>
                    ${escapeHTML(
                        lead.notes || "No notes available."
                    )}
                </p>

            </div>

        `;

    }).join("");
}


/* ANALYTICS */

function renderAnalytics() {

    const counts = pipelineStages.map(stage => ({
        stage,
        count: leads.filter(lead => lead.status === stage).length
    }));

    const max = Math.max(
        1,
        ...counts.map(item => item.count)
    );

    document.getElementById("conversionChart").innerHTML =
        counts.map(item => {

            const height =
                item.count === 0
                    ? 5
                    : (item.count / max) * 180;

            return `

                <div class="chart-column">

                    <strong>${item.count}</strong>

                    <div
                        class="chart-bar"
                        style="height:${height}px">
                    </div>

                    <span>${item.stage}</span>

                </div>

            `;

        }).join("");

    renderSourceChart("analyticsSources");

    document.getElementById("performanceBars").innerHTML =
        counts.map(item => {

            const percent =
                (item.count / max) * 100;

            return `

                <div class="performance-row">

                    <span>${item.stage}</span>

                    <div class="performance-track">

                        <div
                            class="performance-fill"
                            style="width:${percent}%">
                        </div>

                    </div>

                    <strong>${item.count}</strong>

                </div>

            `;

        }).join("");
}


/* SOURCES */

function renderSourceChart(containerId) {

    const container = document.getElementById(containerId);

    if (!container) return;

    const sources = {};

    leads.forEach(lead => {

        sources[lead.source] =
            (sources[lead.source] || 0) + 1;

    });

    const sorted = Object.entries(sources)
        .sort((a, b) => b[1] - a[1]);

    const max = Math.max(
        1,
        ...sorted.map(item => item[1])
    );

    container.innerHTML = sorted.map(([source, count]) => {

        const percentage =
            Math.round((count / max) * 100);

        return `

            <div class="source-row">

                <div class="source-top">
                    <span>${escapeHTML(source)}</span>
                    <span>${count} leads</span>
                </div>

                <div class="source-track">
                    <div
                        class="source-fill"
                        style="width:${percentage}%">
                    </div>
                </div>

            </div>

        `;

    }).join("");
}


/* UTILITIES */

function getInitials(name) {

    return name
        .split(" ")
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();

}

function formatCurrency(value) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(value || 0);

}

function formatDate(dateString) {

    if (!dateString) {
        return "—";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

}

function statusClass(status) {

    return {
        New: "badge-new",
        Contacted: "badge-contacted",
        Qualified: "badge-qualified",
        Proposal: "badge-proposal",
        Won: "badge-won",
        Lost: "badge-lost"
    }[status] || "badge-new";

}

function priorityClass(priority) {

    return {
        High: "priority-high",
        Medium: "priority-medium",
        Low: "priority-low"
    }[priority] || "";

}

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}


/* INITIAL LOAD */

renderDashboard();
renderLeads();
renderPipeline();
renderFollowups();
renderAnalytics();