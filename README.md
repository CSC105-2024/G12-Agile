# AGILE Project Management Platform

AGILE is a full-featured project management system designed for agile teams. It allows both **Project Managers** and **Developers** to manage projects, sprints, and tasks effectively. With a clean UI and intuitive dashboard, team members can collaborate, track progress, and update task statuses seamlessly.

# Features

# Authentication & Roles
- User registration and login
- Two roles: **Project Manager (PM)** and **Developer (Dev)**
- Profile management (name, email, password)

# Project Management
- Create, edit, delete projects
- Assign members to projects
- Track project status (Not Started, In Progress, Completed)

# Sprint & Task Management
- Create and manage sprints with duration and expected points
- Add, update, delete tasks within each sprint
- Assign developers, set task points and statuses
- Real-time progress bar by task completion

# Dashboard
- View recent projects
- See the 10 most recent task updates
- Quick access to individual project details

#  Activity Log
- Track user actions (e.g., task created, deleted, updated)
- Searchable by action or user email

# Error Handling
- Custom 404 Not Found page


# Tech Stack

# Frontend
- React.js with React Router
- Tailwind CSS for UI styling
- Axios for API requests
- SweetAlert2 for alerts and confirmations

# Backend
- Node.js + TypeScript
- Prisma ORM
- PostgreSQL (assumed)
- RESTful APIs
- Hono or Express-based API (depending on `index.ts` logic)

# Database Models (Prisma)
- `User` – firstname, lastname, email, password, role
- `Project` – name, description, dates, owner (PM), members
- `Sprint` – projectId, startDate, endDate, expectedPoints
- `Task` – name, point, description, status, sprintId, assignee
- `ActivityLog` – action, userId, timestamp
- `Member` – projectId, userId


