# LeadFlow - Lead Management System

LeadFlow is a responsive Lead Management System developed using HTML, CSS and JavaScript.

The application helps users capture, organize, track and manage sales leads from a single dashboard.

## Features

- Dashboard with live lead statistics
- Add new leads
- Edit existing leads
- Delete leads
- View complete lead details
- Search leads
- Filter leads by status
- Filter leads by source
- Filter leads by priority
- Sales pipeline / Kanban board
- Drag and drop leads between pipeline stages
- Follow-up management
- Lead source analytics
- Conversion analytics
- Expected lead value tracking
- Responsive design
- Toast notifications
- LocalStorage data persistence

## Pipeline Stages

New → Contacted → Qualified → Proposal → Won / Lost

## Lead Information

Each lead can contain:

- Full Name
- Company
- Email
- Phone
- Lead Source
- Status
- Priority
- Expected Value
- Follow-up Date
- Notes

## Technologies Used

HTML5
CSS3
JavaScript
Browser LocalStorage

## How to Run

1. Download or clone the project.
2. Open the folder in VS Code.
3. Open `index.html`.
4. Use Live Server in VS Code.

No backend or external database is required.

## Data Storage

Lead information is stored in the browser using LocalStorage.

This allows the application to retain leads even after refreshing the page.

## Main Modules

### Dashboard

Displays total leads, new leads, follow-ups, converted leads, recent leads and source statistics.

### Leads

Provides complete lead management functionality including adding, editing, viewing, deleting, searching and filtering.

### Pipeline

Displays leads in a Kanban-style sales pipeline.

Leads can be moved between stages using drag and drop.

### Follow-ups

Displays scheduled follow-ups and identifies overdue and upcoming follow-ups.

### Analytics

Displays pipeline distribution, lead sources and performance statistics.

## Project Structure

lead-management/
│
├── index.html
├── style.css
├── script.js
└── README.md

## Future Enhancements

- User authentication
- Backend database
- REST API integration
- Email notifications
- WhatsApp integration
- Team member assignment
- Advanced reporting
- Export to Excel/PDF
- Cloud synchronization

## Author

Developed as a Lead Management System web application using HTML, CSS and JavaScript.
