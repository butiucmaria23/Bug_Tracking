# Project_Bug_Tracking - Web Application for Bug Management

**Project Name:** BugTracker
**Students:**
* Butiuc Maria Antonia
* Grecu Madalina Ana
* Firtat Andreea

**Group:** 1105
**Repository:** https://github.com/butiucmaria23/Bug_Tracking.git

---

## 1. Project Overview
**Objective:**
Developing a web application that facilitates bug-fixing related communication between team members of a software project. The application allows Project Members (PM) to manage projects and bugs, while Testers (TST) can report issues found in specific commits.

The application follows a Single Page Application (SPA) architecture, accessible from desktop and mobile devices, served by a RESTful Node.js backend.

---

## 2. Technical Specifications

### 2.1 Tech Stack
* **Frontend:** React.js (Component-based framework)
* **Backend:** Node.js with Express.js
* **Database:** PostgreSQL / SQLite (Relational Database)
* **ORM:** Sequelize (for database access)
* **External Service:** GitHub API (Used to validate commit hashes or fetch repository details)
* **Deployment:** Render / Azure / AWS (Free Tier)

### 2.2 Data Model (Relational Schema Draft)
The database will consist of the following main entities:
1.  **Users** (ID, Email, PasswordHash, Role: 'PM' or 'TST')
2.  **Projects** (ID, Name, Description, RepositoryLink)
3.  **Bugs** (ID, Severity, Description, CommitLink, Status, AssignedTo_ID, Project_ID)
4.  **TeamMemberships** (Linking table between Users and Projects to define the team)

---

## 3. Functional Requirements (User Stories)

The application implements a permission system with two main roles: **Project Member (PM)** and **Tester (TST)**.

### General User
* **Login/Register:** As a student, I can connect to the application using an account based on an email address.

### Project Member (PM)
* **Create Project:** I can register a new software project specifying a description, the repository URL, and the initial team.
* **View Bugs:** I can view a list of registered bugs for the projects I participate in.
* **Allocate Bug:** I can assign a bug to myself (Self-allocation). Only one PM can work on a bug at a time.
* **Resolve Bug:** After fixing a bug, I can update its status to "Resolved" and provide a link to the specific commit containing the fix.
* **Management:** I have permissions to modify project details and change bug statuses.

### Tester (TST)
* **Join Project:** As a student (non-team member), I can register as a tester for a specific project.
* **Report Bug:** I can register a new bug with the following details:
    * Severity (High, Medium, Low)
    * Description
    * Link to the commit being tested

---

## 4. Project Plan (Timeline)

This plan outlines the development phases aligned with the course deliverables.

| Phase | Description | Deadline |
| :--- | :--- | :--- |
| **Stage 1** | **Specifications & Setup** <br> - Git Repo initialization <br> - Detailed Specs & Project Plan <br> - Project structure setup | **16.11.2025** (Done) |
| **Stage 2** | **Backend Implementation (RESTful Service)** <br> - Database setup (Sequelize models) <br> - Functional REST API endpoints <br> - Instructions to run the service | **06.12.2025** |
| **Stage 3** | **Complete Application (Frontend + Integration)** <br> - React UI Implementation <br> - Integration with GitHub API (External Service) <br> - Final Demo | **Last Tutorial (Jan 2026)** |
---

## 5. How to Run (For Development)

*(This section will be updated as development progresses)*

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Setup `.env` file with database credentials.
4.  Run server: `node server.js`
5.  Run client: `npm start`