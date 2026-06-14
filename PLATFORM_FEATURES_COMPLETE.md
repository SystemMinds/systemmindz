# KareerGrowth / Systemmindz — Complete Platform Features

> **Purpose of this document:** A complete inventory of everything the platform provides today — organized for business readers. No technical stack, programming languages, or implementation details are included. Focus is on **what we offer**, **who it is for**, **features**, and **benefits**.

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [Who We Serve](#2-who-we-serve)
3. [B2B Offering — For Employers, Recruiters & Colleges](#3-b2b-offering--for-employers-recruiters--colleges)
4. [B2C Offering — For Job Seekers & Candidates](#4-b2c-offering--for-job-seekers--candidates)
5. [Platform Operations — Super Admin](#5-platform-operations--super-admin)
6. [AI-Powered Capabilities](#6-ai-powered-capabilities)
7. [Browser Extension — Career Copilot on the Web](#7-browser-extension--career-copilot-on-the-web)
8. [Employer Assessment Portal (Candidate Test Experience)](#8-employer-assessment-portal-candidate-test-experience)
9. [Cross-Cutting Business Rules & Entitlements](#9-cross-cutting-business-rules--entitlements)
10. [Feature Maturity & Placeholders](#10-feature-maturity--placeholders)
11. [Complete Feature Index by User Type](#11-complete-feature-index-by-user-type)

---

## 1. Platform Overview

KareerGrowth (Systemmindz) is a **dual-sided hiring and career growth platform**:

| Side | Primary Users | Core Value |
|------|---------------|------------|
| **B2B** | Recruitment agencies, direct employers, college placement teams | Hire faster with AI assessments, resume scoring, pipeline management, and team governance |
| **B2C** | Job seekers, students, professionals | Land jobs faster with multi-board search, resume tools, mock interviews, and career AI |
| **Platform Ops** | Internal super administrators | Operate tenants, billing, plans, AI configuration, and cross-tenant visibility |

The same platform powers:
- **Admin Portal** — recruiter and college admin workspace
- **Candidate Portal** — self-service career hub for individuals
- **Assessment Portal** — secure, proctored tests for employer-invited candidates
- **Super Admin Portal** — platform-wide control and monetization
- **Browser Extension** — in-browser career copilot tied to the candidate account
- **AI Services** — shared intelligence for scoring, interviews, reports, and career tools

---

## 2. Who We Serve

### 2.1 B2B Customer Types

#### Recruitment Agencies (ATS Mode)
Staffing and recruitment firms that fill roles for multiple client companies.

**What they get:**
- Client and vendor management
- Job requisitions with vendor sharing controls
- Applicant tracking with custom hiring pipelines
- AI resume matching and automated invite/reject
- Multi-round AI assessments
- Google Meet interview scheduling
- Bulk email outreach
- Team, role, and permission management

#### Direct Employers (Position Mode)
Companies hiring directly for their own openings.

**What they get:**
- Position/opening management
- Candidate registry and assessment linking
- AI scoring and multi-round evaluations
- Public and private assessment links
- Interview scheduling and reporting

#### Colleges & Educational Institutions (College Mode)
Campus placement and academic administration teams.

**What they get:**
- Campus placement positions (like jobs)
- Student registry with academic filters
- Attendance tracking by department, branch, and subject
- Task assignment to students
- Bulk email to filtered student groups
- College-specific roles and settings

### 2.2 B2C Customer Types

#### Self-Registered Job Seekers
Individuals who subscribe to KareerGrowth plans for career tools.

**What they get:**
- Multi-board job search (LinkedIn, Indeed, Naukri, Monster)
- Application tracker and networking tools
- Resume studio, ATS scoring, and tailoring
- Mock interviews and coding practice
- AI career assistant (Shree)
- Cover letters, salary negotiation, personal branding tools

#### Employer-Invited Candidates
Candidates who receive assessment links from B2B clients (no subscription required for the test).

**What they get:**
- Secure email + verification entry
- Proctored multi-round assessments
- Conversational, coding, and aptitude rounds
- Completion confirmation and feedback submission

---

## 3. B2B Offering — For Employers, Recruiters & Colleges

This section covers everything delivered through **AdminBackend** and **AdminFrontend** — the recruiter and college admin experience.

---

### 3.1 Authentication & Secure Access

#### Login & Session Management
**Feature:** Secure sign-in for organization admins, recruiters, and coordinators.

**Benefits:**
- Controlled access to the recruitment workspace
- Session persists across visits for productivity
- Automatic redirect to dashboard when already signed in

**Sub-features:**
- Email and password login
- Remember-me credential storage
- Logout from sidebar profile menu or profile security tab
- Permission and role resolution at login (determines visible menu items)
- Forgot password and reset password flows

---

### 3.2 Executive Dashboard & Home

#### ATS Dashboard (Recruitment Home)
**Feature:** Command center for recruitment KPIs, pipeline health, and recent activity.

**Benefits:**
- At-a-glance visibility into hiring progress
- Credit usage awareness before posting jobs or inviting candidates
- Team output and pipeline bottlenecks visible without digging into lists

**Sub-features:**

**Credit Tracking**
- Interview credits (total, utilized, remaining)
- Job posting / position credits
- Screening credits (recruitment agency tier)
- Account validity expiry display

**Company Overview Banner**
- Company name, city, website
- Active recruiter count

**Summary Cards (clickable to filtered lists)**
- Total candidates
- Active jobs
- Active assessments

**Pipeline Status Counts**
- Invited
- Shortlisted
- Recommended
- Cautiously recommended
- Not recommended
- Rejected
- Hired

**Google Meet Statistics**
- Total meetings
- Completed meetings
- Upcoming meetings
- Today's meetings
- Expired meetings
- Opens meeting detail drawer on click

**Charts & Trends**
- Hiring pipeline chart (monthly/weekly candidate and assessment trends)
- Team performance overview

**Activity Feed**
- Recent jobs posted
- Candidates added
- Interviews scheduled
- Emails sent
- Status changes

**Quick Navigation**
- Jump to candidates, jobs, and filtered pipeline stages

**Onboarding Prompt**
- Org profile completion prompt if company details are missing

#### Dashboard Backend Capabilities (Supporting Data)
**Feature:** Rich analytics APIs powering the dashboard widgets.

**Benefits:** Accurate, real-time numbers for decision-making.

**Sub-features:**
- Summary stats by entity type
- Trend charts (monthly/period-based)
- Team performance metrics
- Recent items grid (latest jobs, candidates, positions)
- Candidate status breakdown
- Google Meet / interview link stats
- Activity feed with type filters and pagination
- Activity count badges (roles, users, teams)

---

### 3.3 Jobs & Requisitions (Recruitment Agency Mode)

#### Jobs List
**Feature:** Manage all open and closed job requisitions in one place.

**Benefits:**
- Central job inventory with powerful filtering
- Status control and bulk operations
- Vendor sharing without exposing sensitive fields

**Sub-features:**
- Status tabs: All, Active, Inactive, Hold, Draft, Closed (with counts)
- Search by title, code, client, and more
- Advanced filters: status, client, priority, domain, created-by user, job type, sort order
- View job details in side panel
- Change job status inline
- Toggle vendor visibility (public/private to staffing vendors)
- Create and edit jobs
- Add candidate to a job (modal)
- View applications (kanban pipeline per job)
- Generate public application link (7-day, 30-day, or custom expiry; copy link)
- Create or update question set for AI assessments
- Upload resume against an active job
- Download job description as PDF
- Export jobs to spreadsheet
- Bulk upload jobs via spreadsheet import
- Audit log per job (change history)
- Pagination and refresh

#### Job Create / Edit
**Feature:** Full job requisition authoring workflow.

**Benefits:**
- Rich, client-ready job postings
- AI assistance reduces manual writing time
- Vendor sharing controls protect confidential details

**Sub-features:**
- Core fields: title, role, client, headcount, CTC, location, salary range, job type, experience, skills (mandatory + optional), priority, application deadline
- AI-generated skills from title, role, and experience
- AI-generated job description
- Job description upload (PDF/Word) with text extraction
- Inline client creation without leaving the form
- Vendor assignment with per-field visibility toggles (what vendors can see)
- SPOC / manager contact details
- Job status and visibility settings
- Generate public link after save
- Edit existing jobs

**Backend job fields supported:**
- Status: Active, Inactive, Hold
- Priority: Low through Urgent
- Headcount, CTC/salary range, experience range, location, job type
- Manager and SPOC contact details
- Mandatory and optional skills
- Application deadline, expected start date
- Job description document upload/download
- Vendor assignment (many-to-many)
- Job board posting tracking (LinkedIn, Naukri, Indeed, Shine, Monster, Other)
- Show/hide to vendors
- Custom hiring pipeline stages per job
- Job audit trail

#### Job Applications — Kanban Pipeline
**Feature:** Per-job visual hiring pipeline with drag-and-drop stage management.

**Benefits:**
- Track every applicant through custom hiring stages in one board
- Move candidates quickly without losing context
- Schedule interviews directly from stage transitions

**Sub-features:**
- Kanban columns by pipeline stage (invitations, AI test, resume rejected, scheduled interview, HR round, offer, hired, rejected, etc.)
- Drag-and-drop candidates between stages
- Add custom pipeline stages
- Delete custom stages
- Candidate cards show match score, rating, invite/add dates
- View and edit candidate details
- Resend invite or resend assessment
- Delete or move back candidates from stages
- Schedule interview when moving to interview stages (date/time, panel, Google Meet)
- Add new candidates to the job
- Candidate detail modal with full profile
- Audit log per candidate
- Search and filter within the board

#### Assigned Job Descriptions *(Placeholder UI)*
**Feature:** Intended to show job descriptions assigned to the logged-in recruiter.

**Benefits:** Recruiters focus on jobs they own.

**Current status:** Route exists; UI is a placeholder with no interactive functionality yet.

---

### 3.4 Positions (Direct Employer & College Mode)

#### Positions List & Management
**Feature:** Manage hiring openings tied to assessments (direct employers and college placement).

**Benefits:**
- Open roles, attach assessments, track candidate pipeline per opening
- Campus placement teams mirror real hiring workflows

**Sub-features:**
- Create and update positions with title, domain type, experience range, headcount
- Status: Active, Closed, On Hold, Draft, Expired, Inactive
- Company name, deadlines, internal notes
- Mandatory and optional skills
- Job description upload/download
- Position counts and filter metadata
- Candidates linked to a position
- Public link generation for open applications
- Question set linking for assessments

---

### 3.5 Candidate Management

#### ATS Candidates (Recruitment Agency)
**Feature:** Organization-wide candidate database with pipeline stage tracking.

**Benefits:**
- Single view of all talent across jobs
- Powerful filtering and stage control
- Evidence-based decisions with AI reports and recordings

**Sub-features:**
- Stage tabs: All, invitations, AI test, recommended, cautiously recommended, rejected, resume rejected, HR round, offer sent, shortlisted, not recommended, hired
- Filter by job, created-by user, date range, stages, search
- Add candidate (manual or resume upload with auto-extraction)
- Edit candidate profile
- Move candidates between pipeline stages
- Trigger AI assessment setup when moving to AI test (requires question set)
- Regenerate resume match score
- View candidate in side panel (contact, experience, CTC, skills, job linkage)
- View and download resume
- Open assessment report (full AI evaluation)
- Open interview recording (screen + camera)
- Export candidates to spreadsheet
- Audit log per candidate
- Pagination, refresh, job-context banner when filtered by job

**Backend ATS candidate capabilities:**
- Add candidate with resume upload
- Bulk resume upload with auto-extraction
- Lookup by email or phone (deduplication)
- List/filter/search candidates with status counts
- Update candidate profile and resume
- Custom job pipeline stages (create, reorder)
- Move candidate between stages
- Application detail view (per candidate per job)
- Application audit logs
- Delete candidate
- Download resume
- Score resume against job (AI)
- Setup assessment for candidate
- Resend assessment invitation
- View assessment summary and interview evaluation per application
- View and cancel scheduled meetings for an application

#### Add / Edit ATS Candidate
**Feature:** Capture or update candidate records tied to a job.

**Benefits:** Fast intake with resume parsing reduces data entry.

**Sub-features:**
- Choose entry mode: manual form or resume upload
- Resume upload (PDF/Word) — auto-extract name, email, experience, skills
- Assign to job/requisition
- Fields: name, email, WhatsApp, experience, current org/location, current and expected CTC, skills, internal notes
- Edit existing candidate records

#### General Candidate Pool (College & Shared)
**Feature:** Organization-wide candidate records for assessments, bulk email, and placement.

**Benefits:**
- Reuse candidate profiles across multiple openings
- Avoid duplicate data entry
- Global lookup prevents duplicate registrations

**Sub-features:**
- Create/update/delete candidates with resume
- Global candidate lookup (email exists elsewhere → verify via mobile or one-time code)
- Auto-fetch existing candidate by email
- WhatsApp number availability check
- Status management (Applied, Invited, Recommended, Test Completed, Round 1–4, etc.)
- Bulk status updates
- Internal notes
- Map candidate to position with question set
- Remove candidate from position
- List candidates by position
- Linked candidate view (candidate + position + assessment data combined)
- Advanced search with date/status filters
- Candidate credit usage per candidate
- Positions a candidate is linked to

#### Students (College Mode)
**Feature:** Manage enrolled students for campus placement and academic workflows.

**Benefits:**
- Filter students by department, branch, semester, batch
- Track placement readiness at scale

**Sub-features:**
- Student list with advanced filters (department, branch, semester, batch, status)
- Student counts: All, Pending, Active, Inactive
- Unique batch/year listing
- Academic metadata (departments, branches, subjects)
- Resend invitation (college flow)
- Bulk import and approve/reject workflows

#### Candidate Assessment Report
**Feature:** Detailed AI evaluation report for a completed assessment.

**Benefits:** Evidence-based hiring decisions with round-by-round breakdown.

**Sub-features:**
- Overall recommendation: Recommended / Cautiously Recommended / Not Recommended
- Resume scoring breakdown
- General screening Q&A with AI comments
- Position-specific screening Q&A
- Coding challenge results (submissions, test cases, AI review)
- Aptitude assessment results
- AI authenticity indicators on written answers
- Printable / review-friendly layout

#### Candidate Interview Recording
**Feature:** Playback of proctored assessment recordings.

**Benefits:** Review candidate behavior and integrity during tests.

**Sub-features:**
- Screen recording playback
- Camera recording playback (auto-discovered when available)
- Download recordings
- Proctoring screenshot assets for report review (calibration, no-face, multiple faces, direction checks)

---

### 3.6 Clients & Vendors (Partner CRM — Recruitment Agency)

#### Clients
**Feature:** Manage hiring client companies (for staffing/recruitment agencies).

**Benefits:**
- Track which client each job belongs to
- Keep account manager and contact details organized

**Sub-features:**
- List clients with All / Active / Inactive tabs
- Search by company name, code, manager
- Add new client: company name, contact, client email/phone, account manager details, status
- View client records in table
- Edit client details
- Link jobs to clients
- Pagination and refresh

#### Vendors
**Feature:** Manage staffing vendor and partner relationships.

**Benefits:**
- Share selected job details with external vendors securely
- Control which jobs each vendor sees and which fields are visible

**Sub-features:**
- List vendors with All / Active / Inactive tabs
- Search by vendor name, code, contact
- Add new vendor: vendor/company name, contact details, address, notes, code, status
- Jobs can be marked visible to vendors with field-level control
- Vendor selection dropdown for job assignment
- Pagination and refresh

---

### 3.7 AI Resume Screening & Matching

#### AI Resume Scoring
**Feature:** Automatically score how well a candidate's resume matches a job or position description.

**Benefits:**
- Shortlist faster with objective scoring
- Auto-reject weak matches based on your threshold
- Auto-invite strong matches to save recruiter time
- Manual override when human judgment differs from AI

**Sub-features:**
- Score resume against job description (overall score + category breakdown: skills, experience, education, certifications, projects)
- Configurable score weightages per organization
- Auto-invite if score meets threshold; auto-reject if below
- Manual invite override for rejected candidates
- Resume and job description keyword extraction from uploaded documents
- Resolve scoring inputs before scoring
- Regenerate score on demand from candidate list

#### AI Scoring Settings (Configuration)
**Feature:** Configure how AI scores resumes and assessments.

**Benefits:** Align automated recommendations with your hiring bar.

**Sub-features:**
- Resume scoring weightage: skills, experience, education, certifications, projects
- Resume auto-rejection threshold
- Screening round score thresholds (recommended / cautiously recommended / not recommended)
- Assessment round score thresholds
- Enable/disable AI scoring per organization

---

### 3.8 Assessment Configuration

#### Question Sets, Sections & Instructions
**Feature:** Build multi-round assessments tied to jobs or positions.

**Benefits:**
- Standardize interviews across recruiters
- Mix general, role-specific, coding, and aptitude rounds
- Control duration and difficulty per role

**Sub-features:**
- **Question sets:** total questions, duration, complexity (Entry through Expert), platform (Browser or Desktop), mode (Conversational or Non-conversational), status (Draft/Published/Archived)
- Round counts: general, position-specific, coding, aptitude
- **Question sections:** question banks per round type
- **Assessment instructions:** pre-test guidance text per question set
- Cross-question settings (follow-up question count for conversational mode)
- Add, edit, delete questions per section
- Set prepare time and answer time per question
- AI question generation per section
- Interview type and platform selection
- Create new or update existing question sets
- Link question set to job or position

#### Interview / Question Set Setup (Admin UI)
**Feature:** Configure AI-driven assessment content for a job or college position.

**Benefits:** Standardized, customizable evaluations per role.

**Sub-features:**
- Four assessment sections: General Questions, Position-Specific, Coding, Aptitude
- Assessment instructions editor (technical setup rules, prohibited behavior)
- Full workflow from job/position to published question set

---

### 3.9 Candidate Invitations & Assessment Links

#### Private Assessment Links
**Feature:** Send candidates secure links to take online assessments.

**Benefits:**
- One-click invite flow
- Candidates enter via email + verification code
- Tied to specific candidate, position, and question set

**Sub-features:**
- Unique verification code
- 7-day validity (configurable)
- Resend invitation email
- Verify email + one-time code to start test
- Returns instructions, rounds, and question config on verification
- Mark test as started
- Update interview-taken flag

#### Public Assessment Links
**Feature:** Shareable registration URL for open applications.

**Benefits:**
- Capture applicants without manual data entry
- Candidates self-register with profile and resume

**Sub-features:**
- Public self-registration (candidate submits profile + resume via link)
- Public position details and job description download (no login required)
- Check if public link already exists for a position
- Expiry control (7-day, 30-day, custom)
- Copy link from job or position screen

#### Link Candidate to Position
**Feature:** Associate a candidate with an opening and assessment.

**Benefits:**
- Consumes interview credit and unlocks full assessment workflow
- Deduplication prevents double-charging for same candidate

**Sub-features:**
- Add candidate with private link in one step
- Manual invite for resume-rejected candidates
- WhatsApp notification on manual invite (optional)

---

### 3.10 Assessment Progress & Multi-Round Tracking

#### Assessment Summaries (Rounds 1–4)
**Feature:** Track each candidate's progress through up to four assessment rounds.

**Benefits:**
- See which round a candidate is in
- Know when assessment is complete
- Trigger report generation automatically

**Sub-features:**
- Round assignment flags: general, position-specific, coding, aptitude
- Per-round start/end times and time taken
- Total rounds assigned vs completed
- Assessment start/end timestamps
- Assessment completion flag
- Report generated flag
- Round timing updates during live test
- Auto-scoring on final round completion (section scores + recommendation)
- Auto status update to Test Completed
- Dynamic round skipping when employer didn't assign a round

---

### 3.11 Interview Evaluation & Reports

#### Interview Scoring & Recommendation
**Feature:** Store structured evaluation results after assessments complete.

**Benefits:**
- Get Recommended / Cautiously Recommended / Not Recommended outcomes
- Review section scores and soft skills
- Final remarks for hiring committee

**Sub-features:**
- Total score and per-section scores (general, position-specific, coding, aptitude)
- Soft skills scores: fluency, grammar, confidence, clarity
- Recommendation status propagation to candidate pipeline
- Final remarks
- Report generation tracking (pending → generated)
- Report data aggregation for AI report builder
- Full multi-round interview report with AI analysis (queued generation, duplicate protection)

---

### 3.12 Interview Scheduling (Google Meet)

#### Google Meet Integration
**Feature:** Schedule and manage video interviews with panel members.

**Benefits:**
- Book interviews from the admin panel
- Track scheduled vs completed meetings
- Automated video links and calendar visibility

**Sub-features:**
- Schedule interview (creates calendar event with Meet link)
- Google Meet settings: enabled, default owner emails, panel members, notify panel
- Google Meet dashboard stats and meeting list
- View meeting details by ID
- Application-level meeting list and cancel meeting
- Panel member registry: name, email, role, skills, experience, primary flag
- Connect Google account (credentials, refresh token, calendar ID)
- Toggle: include logged-in user in meetings, notify panel on selection
- Meeting calendar view with month navigation
- Day timeline showing scheduled meetings
- Meeting list with status: Confirmed, Pending, Completed, Cancelled, No Show
- View meeting details: candidate, job, panel, time window, Meet link
- Copy Meet links
- Meeting statistics sparklines

#### Panel Settings
**Feature:** Manage interview panelist roster.

**Benefits:** Assign qualified interviewers with skills and availability context.

**Sub-features:**
- Add, edit, delete panel members
- Fields: name, email, mobile, skills, experience, designation, notes, color tag
- Search panelists
- Copy panelist email
- Active/inactive status

---

### 3.13 Bulk Email & Communication

#### Bulk Email (ATS & College)
**Feature:** Send targeted email campaigns to candidates or students.

**Benefits:**
- Reach talent at scale with personalized, templated outreach
- Track delivery failures for follow-up

**Sub-features:**
- Filter recipients by experience range and search (ATS)
- Filter recipients by department, branch, subject, semester (College)
- Paginated candidate/student selection with select-all
- Choose from saved email templates
- Attach active job with public link for applications
- Compose subject, body, CC
- AI assist to generate or refine email copy
- Merge variables: candidate name, company, position, public link, job description link, date, etc.
- Send bulk email with per-recipient personalization
- Delivery tracking via inbox activity feed
- View bulk email failure details

#### Inbox / Activity Center
**Feature:** Unified feed of recruitment and organization activity.

**Benefits:** Stay informed on team actions without checking each module.

**Sub-features:**
- Tabs: All Activities, Interviews, Candidates, Status Changes, Jobs, Emails
- Roles tab: Audit history of role changes (permission-gated)
- Users tab: Organization member list with role assignments
- My Team tab: Team structure, managers, member counts; expand to see member activities
- Bulk email failure details (expand to see failed recipients)
- Auto-refresh every 30 seconds
- Pagination and manual refresh
- Scoped to own activity for restricted users

#### Email Templates
**Feature:** Reusable email templates for outreach and notifications.

**Benefits:** Consistent, professional communication with merge fields.

**Sub-features:**
- Create, edit, delete templates
- Subject, body, CC, To field
- Insert merge variables (candidate, position, company, interview, manager fields)
- AI assist to generate or refine templates
- Template list with search

---

### 3.14 Team & User Management

#### Users
**Feature:** Manage recruiters and sub-admin accounts in the organization.

**Benefits:** Onboard hiring team members with appropriate access.

**Sub-features:**
- List users with All / Active / Deactivated tabs
- Search users
- Add user: name, email, password, phone, role assignment
- Edit user: update profile, reset password
- Activate / deactivate users
- Assign users to teams (main admin)
- Auto-assign to team manager's team when created by a manager
- Team Manager role auto-creates a dedicated team
- User activity history per user

#### My Teams
**Feature:** Create and manage recruiter teams.

**Benefits:** Organize hiring effort by team with managers and member oversight.

**Sub-features:**
- List all teams with member counts
- Create / edit team: name, description, manager, initial members
- Expand team to view members
- Add / remove team members
- View member profile and recent activity
- Edit member details (name, phone, password)
- Team-level actions menu (edit, delete)
- Search teams
- Team stats summary

---

### 3.15 Roles & Permissions

#### ATS Roles (Recruitment Agency)
**Feature:** Granular role builder for recruiter access control.

**Benefits:**
- Least-privilege security
- Module-level and data-scope control
- Audit trail for compliance

**Sub-features:**
- List roles with status tabs: All, Active, Draft, Hold, Inactive
- Create, edit, clone, delete roles
- Role metadata: name, description, category (e.g., Team Manager), status, risk level, data scope (Global, Department, Team, Own)
- Permission matrix across modules:
  - Core ATS: Candidates, Jobs, Job Applications, Assigned Job Descriptions, Interview Setup
  - Communication: Mass Email, Inbox, Calendar
  - Clients & Vendors
  - Analytics & Reports
  - Team & Users, ATS Roles, Inbox audit tabs
  - Settings: Company, Email Templates, AI Scoring, Panel, Google Meet
- Per-module actions: view, create, edit, delete, export, import, approve, reject, assign, transfer, archive, bulk actions, full access
- Permission risk scoring
- Role usage count (users assigned)
- View role detail sidebar
- Role and permission scope audit logs

#### College Roles (College Organizations)
**Feature:** Role templates for college administrators.

**Benefits:** Quick setup for academic admin teams.

**Sub-features:**
- Pre-built templates: Recruiter, HR Manager, Coordinator, Viewer
- Module permission matrix: dashboard, jobs/positions, candidates, clients, bulk email, inbox, roles, users, settings
- Create, edit, clone roles

#### Permission & Scope Model (User-Facing Rules)
**Feature:** How access works across the admin portal.

**Benefits:** Safe delegation without exposing all organization data.

**Rules:**
- Menu items appear only if the user's role grants access
- Create, edit, delete, export buttons respect per-module permissions
- Users may see only their own records, their team's records, or all organization records depending on role
- Individual dashboard widgets can be toggled per role
- Each settings section has independent read/write permissions

**Permission scopes:**
- **Global** — all organization records
- **Team** — records owned by team members
- **Own** — only records created by the user

**Feature catalogue modules (permission-governed):**

| Module | Available To |
|--------|-------------|
| Dashboard | All |
| Inbox | All |
| Bulk Email | All |
| Team / Users | All |
| Roles | All |
| Settings | All |
| Jobs | Recruitment Agency |
| Candidates | Recruitment Agency |
| Clients | Recruitment Agency |
| Vendors | Recruitment Agency |
| Students | College |
| Attendance | College |
| Departments | College |
| Branches | College |
| Subjects | College |
| Tasks | College |

---

### 3.16 Organization & Account Settings

#### Settings Hub
**Feature:** Organization-wide configuration with tabbed sub-sections.

**Benefits:** One place to brand, score, and integrate the hiring platform.

**Sub-features:**
- Read-only banner for view-only users
- Tab visibility based on module permissions

#### Company Details (Recruitment Agency)
**Feature:** Organization profile and branding.

**Benefits:** Professional presence in emails, reports, and candidate-facing links.

**Sub-features:**
- Company name, email, address (country, state, city, pincode)
- Industry type, founded year
- Website, LinkedIn, Instagram, Facebook URLs
- About Us description

#### College Details (College Organizations)
**Feature:** College profile and branding.

**Benefits:** Candidates see correct institution name on invites and reports.

**Sub-features:**
- College name, email, address, university, website, about us

#### Cross Question Settings
**Feature:** Control follow-up question depth in AI interviews.

**Benefits:** Tune interview rigor per assessment round.

**Sub-features:**
- Cross-question count for General (Round 1): 1–4
- Cross-question count for Position-Specific (Round 2): 1–4

---

### 3.17 Profile & Account (Admin User)

#### Profile
**Feature:** Personal account management for the logged-in admin user.

**Benefits:** Self-service identity and security management.

**Sub-features:**
- Profile tab: Personal info (name, email, phone, employee ID, department, designation, organization details)
- Credits display: interview, job, screening credits and validity
- Recent Activity tab: Last 7 days of personal actions
- Security Settings tab: change password, view last login and password change date, log out current device/session

---

### 3.18 College-Specific Features

#### Departments, Branches & Subjects
**Feature:** Hierarchical academic organization for colleges.

**Benefits:**
- Mirror real college structure
- Assign mentors and teachers
- Scope data by department

**Sub-features:**
- Departments with mentor assignment and student counts
- Branches with batch years, branch head, subject counts
- Subjects with teacher, semester, enrolled student counts
- Auto-generated codes (DEPT001, BRAN001, SUB001)
- Available incharges list for assignment

#### Student Attendance
**Feature:** Mark and report daily/subject-wise attendance for enrolled students.

**Benefits:**
- Track presence by subject and date
- Bulk update from attendance sheets
- Import students into a subject roster

**Sub-features:**
- List students for attendance (filter by branch, semester, batch, status)
- Mark attendance (single session, bulk)
- Monthly attendance sheet view (per subject)
- Batch update attendance matrix
- Attendance reports (by subject, student, date range)
- Unmapped students (not yet assigned to a subject)
- Import students to subject (preview validation + commit)
- Sheet context resolver for import UI

#### Academic Tasks
**Feature:** Assign homework/assignments to students with attachments and deadlines.

**Benefits:**
- Distribute tasks to a class or selected students
- Track completion

**Sub-features:**
- Create/update tasks with title, description, notes, links, priority, due date
- Attach up to 5 files per task
- Assign to specific students or all students in a subject/branch/department
- Task list with tab counts
- Task detail with student progress

---

### 3.19 Activity Log & Audit

#### Activity Feed & Audit Trails
**Feature:** Chronological log of recruiter and admin actions across the platform.

**Benefits:**
- Accountability for team actions
- Quick visibility into recent invites, status changes, emails sent
- Compliance and dispute resolution

**Sub-features:**
- Activity types: interview scheduled, status changed, single email sent, etc.
- Filter by activity type and time window
- Per-user activity history
- Job change audit (recruitment agency)
- Candidate change audit (recruitment agency)
- Role/permission scope audit
- Organization audit log

---

### 3.20 Credits & Usage Limits (B2B)

#### Interview, Position & Screening Credits
**Feature:** Metered usage for creating job openings and scheduling candidate assessments.

**Benefits:**
- Know remaining capacity before posting jobs or inviting candidates
- Avoid surprise overages
- Align spend with hiring volume

**Sub-features:**
- **Interview credits** — consumed when a candidate is linked to a position/job for assessment
- **Position credits** — consumed when creating new openings
- **Screening credits** (recruitment agency tier only)
- Credit validity/expiry dates
- Credit usage history
- Per-candidate credit usage tracking

---

### 3.21 Automated Pipeline Maintenance

#### Stale Candidate & Status Cleanup
**Feature:** Automated rules that expire inactive links and update stuck candidate statuses.

**Benefits:**
- Pipeline stays accurate without manual cleanup
- Expired invites are flagged automatically
- Abandoned tests can be closed automatically

**Sub-features:**
- Mark link-expired candidates who never started
- Mark resume-rejected candidates without private links
- Detect stale in-progress assessments (no activity for configured hours)
- Bulk mark all as Test Completed (admin utility)
- Auto-complete stale in-progress tests (scheduled)

---

### 3.22 Analytics & Scheduling *(Partial)*

#### Reports *(Placeholder)*
**Feature:** Intended for recruitment funnels, team performance, and data exports.

**Benefits:** Strategic hiring insights.

**Current status:** Placeholder page only — described but not built out in UI.

#### Calendar *(Placeholder)*
**Feature:** Intended for upcoming interviews and recruitment events.

**Benefits:** Unified scheduling view.

**Current status:** Placeholder page only. *(Note: Google Meet settings includes a functional meeting calendar.)*

---

### 3.23 B2B Value Chain Summary

For **recruitment agency users**, the core workflow is:

1. **Set up** organization, team, roles, company profile, AI thresholds, panel members
2. **Manage clients and vendors** and post **jobs** with skills and job description
3. **Add and track candidates**, score resumes, move through **custom stages**
4. **Configure assessments** (question sets, rounds, instructions)
5. **Invite candidates** (auto or manual), consume **interview credits**
6. **Monitor progress** through multi-round assessments
7. **Review evaluations**, recordings, proctoring screenshots, and **recommendations**
8. **Schedule Google Meet interviews** and send **bulk emails**
9. **Dashboard and activity log** for team oversight

For **college placement teams**, the parallel workflow is:

1. **Set up** college profile, roles, and academic structure (departments, branches, subjects)
2. **Manage students** and **positions** for campus hiring
3. **Track attendance** and assign **tasks**
4. **Invite candidates** to assessments and monitor progress
5. **Bulk email** filtered student groups
6. **Review assessments** and placement outcomes

---

## 4. B2C Offering — For Job Seekers & Candidates

This section covers everything delivered through **CandidateBackend**, **CandidateFrontend**, and related candidate-facing services.

---

### 4.1 Account & Access

#### Sign In & Registration
**Feature:** Create an account and access the platform securely.

**Benefits:**
- Quick entry with familiar login options
- Password recovery when locked out
- Apply to employer jobs via public link without full account setup

**Sub-features:**
- Email/password login with one-time verification code
- Social login: Google, LinkedIn, Microsoft, GitHub
- Forgot password flow
- Remember-me session persistence
- Public job registration via shareable link — no login required
- Logout with full session cleanup

#### Subscription Gate
**Feature:** Choose and activate a paid plan before full platform access.

**Benefits:**
- Unlock career tools, learning, and interview prep at the right tier
- Clear path from signup to value

**Sub-features:**
- View plan tiers (Starter, Professional, Ultimate, etc.) with feature lists and pricing
- Pay via payment gateway or activate free-tier plans
- Redirect to dashboard once subscription is active

---

### 4.2 Subscription, Credits & Billing

#### Plans & Credits Management
**Feature:** View subscription status, remaining quotas, and upgrade options.

**Benefits:**
- Know what you can use today
- Plan renewals and upgrades proactively

**Sub-features:**
- Current plan status and expiry
- Credit overview (interview credits, daily tool quotas)
- Browse and purchase/upgrade plans from Services page
- Per-tool daily limits:
  - LinkedIn jobs
  - LinkedIn connections
  - Cover letters
  - CAR tool
  - Salary negotiator
  - LinkedIn influencer posts
  - Mock interviews
  - Resume uploads
  - ATS scores
  - AI resume enhancements

#### Billing History
**Feature:** Review past payments and invoices.

**Benefits:**
- Proof of purchase for reimbursements or tax records
- Transaction transparency

**Sub-features:**
- Payment history list with status (completed, pending)
- Invoice modal with transaction IDs, amounts, dates
- Download/view receipt details

---

### 4.3 Dashboard (Home)

#### Personal Dashboard
**Feature:** Central hub showing progress, activity, and quick actions.

**Benefits:**
- One glance at job search, learning, and interview readiness
- Quick launch into most-used tools

**Sub-features:**
- Stat cards: applications, mock interviews, tasks, attendance percentage, coding progress
- Performance charts and coding analytics
- Recent activity feed (mock sessions, tasks, applications, etc.)
- Quick links to Resume Studio, Fake Offer Detection, KareerGrowth Hunt
- Resume score summary with upload/create shortcuts
- Daily Quiz widget with auto-rotating questions
- College stats when assigned to an organization

#### Notifications
**Feature:** In-app alerts for platform and assignment updates.

**Benefits:** Stay informed without checking email.

**Sub-features:**
- Paginated notification dropdown in header
- Auto-refresh every 60 seconds
- Dismiss individual notifications

#### Shree AI Assistant (Global Chat)
**Feature:** Floating career copilot available across the dashboard.

**Benefits:**
- Instant guidance on resume, jobs, interviews, and credits
- Natural language access to platform capabilities

**Sub-features:**
- Chat with context-aware career assistant
- Quick prompts: resume help, find jobs, interview prep, upload resume, credits, capabilities
- Chat history (sessions saved for several days)
- Resume context pulled into conversations
- Emoji picker and message actions

---

### 4.4 Fresh Jobs (Internal Job Board)

**Feature:** Browse curated internal job listings from partner employers.

**Benefits:**
- Discover roles without leaving the platform
- Filter to find relevant opportunities quickly

**Sub-features:**
- Search and filter: location, job mode, date posted, salary, IT/non-IT, sort order
- Job detail panel: description, requirements, company info
- Deep-link to specific job
- Bookmark jobs
- Share job links

---

### 4.5 KareerGrowth Hunt (Career Hub)

**Feature:** Launchpad for all job-search and career-branding tools.

**Benefits:**
- One place to start networking, searching, tracking, and polishing materials
- Clear overview of available career tools

**Sub-features:**
- Feature cards linking to every hunt tool
- LinkedIn sync status chips
- Career profile initialization
- Google Alerts integration for job news
- Extension presence detection and auto-sync across platforms

---

### 4.6 Multi-Platform Job Search

#### LinkedIn Jobs
**Feature:** Search, save, and manage LinkedIn job listings using resume-based keywords.

**Benefits:**
- Centralized LinkedIn job library
- Daily search limits keep usage fair and plan-aligned

**Sub-features:**
- Search jobs via browser extension sync
- Import/sync saved jobs to platform library
- View job details, company logos, status
- Update job status (saved, applied, etc.)
- Job search preferences: work mode, job type, post date window
- Add jobs directly to Application Tracker
- Daily search quota with credit chips

#### Indeed Jobs
**Feature:** Search and save Indeed listings via extension and backend sync.

**Benefits:** Indeed coverage alongside LinkedIn in one workflow.

**Sub-features:**
- Search, import, sync Indeed jobs
- Status updates and tracker integration
- Resume-skill-based search

#### Naukri Jobs
**Feature:** Search Naukri with synced session and rich filters.

**Benefits:** India-focused job board integrated into hunt pipeline.

**Sub-features:**
- City, salary, experience, and preference filters
- Session sync status
- Import/sync and tracker handoff

#### Monster Jobs
**Feature:** Search Monster.com using resume skills.

**Benefits:** Additional job board coverage in one platform.

**Sub-features:**
- Search, import, sync
- Status management and tracker integration

#### Job Search Preferences
**Feature:** Set default filters applied across all job platforms.

**Benefits:** Consistent, personalized search results everywhere.

**Sub-features:**
- Work mode: remote, hybrid, on-site, any
- Job type: full-time, part-time, contract, internship, any
- Post date window: 1–7 days
- Sync preferences to backend for extension auto-apply

---

### 4.7 LinkedIn Connections

**Feature:** Find and connect with relevant professionals on LinkedIn.

**Benefits:**
- Grow network within daily invite limits
- AI-assisted connection notes improve acceptance rates

**Sub-features:**
- Initialize career profile and LinkedIn connection
- Search/scrape connection leads
- Import leads from LinkedIn
- Enrich lead profiles
- Send personalized connection invites (manual and automated)
- Mark leads as invited
- Connection stats: all time, this month, today
- Daily connection quota tracking
- AI-generated connection notes

---

### 4.8 Application Tracker

**Feature:** Kanban pipeline to manage applications from discovery to outcome.

**Benefits:**
- Never lose track of where each application stands
- Visual pipeline reduces missed follow-ups

**Sub-features:**
- Drag-and-drop job cards across pipeline stages
- Board view and list view
- Filter by source (LinkedIn, Indeed, Naukri, Monster), location, workplace type, employment type, stage, next-action dates
- Add jobs manually or from any platform library
- Sync search results into tracker
- Job details modal with company logo
- Stats: totals, recent outcomes
- Stage progression and next-action scheduling
- Delete jobs from pipeline

---

### 4.9 Cover Letter Generator

**Feature:** AI-generated cover letters tailored to role and company.

**Benefits:**
- Professional, role-specific letters without starting from scratch
- Save time on every application

**Sub-features:**
- Input: company, job title, hiring manager, tone, job description, experience range
- Tone options: Professional, Friendly, Confident, Enthusiastic, Formal
- Generate and save letters
- Browse/delete past letters (paginated)
- Daily generation quota

---

### 4.10 CAR Tool (Challenge–Action–Result)

**Feature:** Build and refine achievement stories for interviews and resumes.

**Benefits:**
- Structured achievement narratives that impress recruiters
- Reusable stories across applications and interviews

**Sub-features:**
- Create stories: company, role, duration, skills, challenge, action, result
- AI refinement of CAR statements
- Edit, save, delete saved stories
- Daily generation quota

---

### 4.11 Salary Negotiator

**Feature:** Company-specific salary negotiation playbooks.

**Benefits:**
- Walk into offer discussions with data-backed talking points
- Reduce anxiety in compensation conversations

**Sub-features:**
- Input: company, expected/current/min CTC, negotiation style, competing offers, job description
- Styles: Balanced, Aggressive, Conservative, Collaborative
- AI-generated playbook: opener, target range, walk-away point, counter-offers, scripts
- Save and review past negotiations
- Daily generation quota

---

### 4.12 LinkedIn Influencer

**Feature:** Craft on-brand LinkedIn posts to grow visibility.

**Benefits:**
- Build personal brand and authority while job hunting
- Stay visible to recruiters and hiring managers

**Sub-features:**
- Post templates: Career Milestone, Industry Insight, Lesson Learned, Project Launch
- AI-generated captions and hashtags
- Optional image generation
- Save, browse, delete posts
- Google Alerts news feed for post inspiration
- Daily post quota

---

### 4.13 Resume Studio & ATS

**Feature:** Full resume builder with templates, AI optimization, and ATS scoring.

**Benefits:**
- Job-ready resumes tuned to specific roles
- Higher callback rates with ATS-optimized content

**Sub-features:**
- Upload resume (PDF/DOCX) with AI parsing
- Multiple saved resumes; set primary resume
- Template library with live preview
- Full-screen template editor
- Template styles: Classic, Modern, Minimal, Executive, Academic, ATS, ATS Compact, Minimal Image
- AI section enhancement (streaming improvements)
- AI full-resume enhancement for a job description
- ATS score check against job description (paste text, upload JD, scrape job link)
- ATS score report modal with detailed breakdown
- Batch ATS scoring from hunt workflow
- Resume reports with detailed analysis
- Delete resumes, get signed file URLs
- Monthly upload quota

---

### 4.14 Mock Interview (AI)

**Feature:** Full AI-powered mock interview simulating real hiring rounds.

**Benefits:**
- Practice under pressure before real interviews
- Get scored feedback on weak areas
- Build confidence with realistic multi-round flow

**Sub-features:**

**Interview Hub**
- Browse saved LinkedIn jobs as interview targets
- Start preparation modal: manual job description, pick LinkedIn job, or upload JD file
- Configure job title, company, experience range, skills, duration
- Launch into immersive interview flow

**Preparation & Setup**
- Loading/preparing screen routes to correct next round
- Instructions, AI greeting, camera/mic permission, speaker test
- Conversational voice interaction with speech recognition

**Interview Rounds**
- **Conversation round** — behavioral/HR-style Q&A
- **Aptitude round** — timed aptitude questions
- **Coding round** — live coding with run/submit

**Reports & History**
- Post-interview report with scores across dimensions
- My Reports page: search, filter by score, view all past sessions
- Per-session detailed report page
- Interview credits consumed per session
- Adaptive questioning based on prior answers
- Post-mock conversation and coding performance analysis

---

### 4.15 Coding Practice

**Feature:** LeetCode-style coding problems with editor and test execution.

**Benefits:**
- Build algorithm skills with progress tracking
- Prepare for technical interview rounds

**Sub-features:**
- Browse topics by category with question counts
- Solve problems in multiple languages
- Code editor with starter code and boilerplate
- Run code against example test cases
- Star rating (0–5) per question per language
- Save/resume code across sessions
- Progress stats by topic and question
- Coding analytics on dashboard

---

### 4.16 Programming Courses

**Feature:** Structured language courses with modules, lessons, and progress.

**Benefits:**
- Learn programming fundamentals step-by-step
- Tracked completion motivates consistent learning

**Sub-features:**
- Course catalog covering: Java, Python, HTML/CSS, JavaScript, React, Node, Angular, DevOps, AI/ML, SQL, MySQL, MongoDB, PostgreSQL, and more
- Start/restart courses
- Module accordion with lesson lists
- Individual lesson pages with content
- Lesson progress tracking
- Mark lessons and modules complete
- Points/skills earned per course
- Progress summary page per lesson

---

### 4.17 Knowledge Base

**Feature:** Searchable reference library across tech topics.

**Benefits:**
- Quick answers while practicing or interviewing
- Self-serve learning without leaving the platform

**Sub-features:**
- Topic grid: Java, Python, SQL, JavaScript, React, Node, Angular, DevOps, AI/ML, databases, HTML/CSS, etc.
- Browse content items within each topic
- Full-text search across topics, articles, and sections
- Deep-link to specific articles/sections
- "Booming" topic highlights

---

### 4.18 Daily Quiz

**Feature:** Fresh aptitude/knowledge questions every day.

**Benefits:**
- Stay sharp with bite-sized daily practice
- Build habit of continuous learning

**Sub-features:**
- Today's quiz questions with auto-rotation timer
- Submit answers (locked after answering)
- Immediate correct/incorrect feedback with explanation
- New quiz generated daily (5 questions)

---

### 4.19 Fake Offer Letter Detection

**Feature:** Upload and verify authenticity of job offer letters.

**Benefits:**
- Protect against recruitment scams before accepting offers
- Peace of mind when evaluating opportunities

**Sub-features:**
- Upload offer letter file
- Enter company name, website, address, CTC
- AI-powered authenticity analysis
- Verification result with risk indicators
- History of past verifications
- Fraud risk score, company authenticity, structural validity analysis
- Red flags vs genuine indicators with final verdict

---

### 4.20 Profile & Account Settings

#### Profile
**Feature:** View and edit personal and career information.

**Benefits:** Keep recruiter-facing details current.

**Sub-features:**
- Tabs: User Details, Recent Activity, Login & Security
- Edit: name, mobile, location, current role, academic year, skills
- View: email, candidate code, organization, plan, subscription expiry
- Recent activity timeline
- Login audit / security history
- Resume file links

#### Settings
**Feature:** Configure job search preferences (see Section 4.6).

#### Theme
**Feature:** Toggle light/dark mode from dashboard header.

#### Change Password
**Feature:** Update password from profile dropdown modal.

---

### 4.21 College / Organization Features (When Assigned)

#### Attendance
**Feature:** View attendance calendar and apply for leave.

**Benefits:** Track college attendance requirements in one place.

**Sub-features:**
- Monthly calendar with present/absent/leave markers
- Semester attendance statistics
- Apply for leave (type, date range, reason)
- Leave history list

#### My Tasks
**Feature:** Manage college-assigned tasks and personal to-dos.

**Benefits:** Stay on top of academic and placement assignments.

**Sub-features:**
- View tasks assigned by college/admin
- Create personal self-tasks (title, description, deadline, link, priority)
- Update status: Pending, In Progress, Completed
- Filter by status, priority, date, source
- Search tasks
- Delete self-tasks

#### Assigned Tests *(Stub Page)*
**Feature:** Placeholder for viewing employer-assigned tests from main app.

**Current status:** Route exists with minimal UI.

---

### 4.22 Quota-Gated vs Unlimited Features

**Quota-gated (daily/plan limits):**
- LinkedIn Jobs
- LinkedIn Connections
- Cover Letters
- CAR Tool
- Salary Negotiator
- LinkedIn Influencer
- ATS Resume Score
- Mock Interviews
- Resume Uploads
- AI Resume Enhancements

**Generally unlimited access:**
- Fresh Jobs
- Application Tracker
- Resume Studio (editor)
- Coding Practice
- Programming Courses
- Knowledge Base
- Fake Offer Detection
- Daily Quiz
- Dashboard
- Shree Chat

---

### 4.23 B2C Value Chain Summary

For **self-registered job seekers**, the core workflow is:

1. **Sign up** and choose a **subscription plan**
2. **Upload or build resume** in Resume Studio
3. **Search jobs** across LinkedIn, Indeed, Naukri, Monster
4. **Track applications** in the Application Tracker
5. **Network** with LinkedIn Connections and AI notes
6. **Apply smarter** with cover letters, CAR stories, and tailored resumes
7. **Prepare** with mock interviews, coding practice, courses, and daily quiz
8. **Protect yourself** with fake offer detection
9. **Stay productive** with Shree AI assistant and career tasks

For **employer-invited candidates**, see Section 8 (Assessment Portal).

---

## 5. Platform Operations — Super Admin

This section covers **SuperadminBackend** and **SuperadminFrontend** — internal platform control for operating the entire KareerGrowth ecosystem.

---

### 5.1 Super Admin Dashboard & Operations

#### Executive Dashboard
**Feature:** Central view of platform health, revenue, admin counts, and activity.

**Benefits:**
- Operators see business performance at a glance
- Early warning on service health and revenue trends

**Sub-features:**
- Total/active/inactive admin accounts
- Total revenue and revenue growth chart
- Admin registration trends
- Credit utilization distribution across tenants
- Client composition (college vs recruiter)
- Revenue stream breakdown
- Recent system activity feed
- Service health monitoring with manual wake/ping

#### Super Admin Authentication
**Feature:** Secure login for platform operators.

**Benefits:** Controlled access to sensitive platform controls.

**Sub-features:**
- Email/password login
- Trusted-device credential storage
- Forgot-password via one-time code
- Google sign-in option
- Session-based protected routes
- Logout

---

### 5.2 B2B Tenant (Admin Client) Management

#### Admin Client Management
**Feature:** Lifecycle management of B2B tenant admins (colleges and recruitment agencies).

**Benefits:**
- Onboard and govern hiring organizations
- Activate, hold, or deactivate tenants as needed

**Sub-features:**
- Create admin account
- Edit admin profile
- View admin details
- Activate/deactivate/hold status
- Filter by status, type, recruitment flag, date range
- Search and pagination
- Role assignment (College Admin vs Recruitment Agency Admin)

#### Admin Detail Hub
**Feature:** Single-admin operational profile.

**Benefits:** Full context before support or billing actions.

**Sub-features:**
- Profile overview
- Usage statistics
- Interview, position, and screening credit balances
- Payment history
- Credit allocation history
- Subscription records

#### Aggregated Jobs Registry
**Feature:** Cross-tenant view of job postings synced from client databases.

**Benefits:** Platform-wide visibility into hiring activity.

**Sub-features:**
- List/search/filter jobs across all tenants
- Create/edit jobs
- Status: open/closed/draft/archived
- Applications count
- Location and experience metadata

---

### 5.3 B2B Credits & Billing

#### Credit Sync & Aggregation
**Feature:** Sync and aggregate credits from all tenant databases.

**Benefits:**
- Single pane for utilization and billing reconciliation
- Identify over-utilization and renewal opportunities

**Sub-features:**
- Per-client interview, position, and screening credits (recruitment agency)
- College credits without screening
- Sync status tracking
- Manual credit sync trigger

#### Admin Credits Overview
**Feature:** List all clients' credit pools with utilization.

**Benefits:** Identify clients needing renewal or top-up.

**Sub-features:**
- Search clients
- Filter by sync date
- Sort by utilization
- View remaining vs utilized credits
- Link to add credits

#### Add Admin Credits
**Feature:** Allocate credits to a tenant admin with payment capture.

**Benefits:** Monetize and provision hiring capacity.

**Sub-features:**
- Interview credits allocation
- Position credits allocation
- Screening credits allocation (recruitment agency)
- Validity extension
- Manual payment details capture
- Discount coupon application
- Billing cycle selection

#### Payments & Subscriptions (Backend)
**Feature:** Record and manage B2B payments and subscriptions.

**Benefits:** Revenue tracking and entitlement management.

**Sub-features:**
- Payment types: interview credits, position credits, screening credits, subscription, add-on
- Statuses: pending, completed, failed, refunded
- Invoice/reference/proof capture
- Subscription billing cycles
- Tax and discount handling
- Confirm payment and activate credits
- Pricing calculator
- Purchase add-on credits

**Note:** Payments page in Super Admin UI is currently a placeholder; backend capabilities exist.

#### Admin Subscription Plan Templates
**Feature:** B2B plan templates for interview/position credit pricing.

**Benefits:** Standardize enterprise packaging and sales.

**Sub-features:**
- Create/edit/delete admin plan templates
- Per-credit costs and minimum purchase amounts
- Screening credit pricing rules

---

### 5.4 B2C Candidate Subscription Management

#### KareerGrowth Subscription Plans
**Feature:** Tiered candidate plans with duration, pricing, and entitlements.

**Benefits:** Package career tools into sellable plans (Starter, Professional, Ultimate).

**Sub-features:**
- 4/6/8 month duration options
- List and original pricing display
- "Best for" positioning per tier
- Interview credit bundles
- Feature list per plan
- Daily/monthly usage caps per tool

#### Plan Configuration (Settings)
**Feature:** Super admin create/read/update/delete for candidate plans.

**Benefits:** Change pricing and limits without redeploying the platform.

**Sub-features:**
- Create/edit/delete plans
- Toggle active/inactive
- Sort order control
- Attach platform feature checklist
- Configure daily limits per tool

#### Candidate Credits Console
**Feature:** Per-candidate usage vs limits for self-registered portal users.

**Benefits:** Support, overrides, and fairness management.

**Sub-features:**
- View all candidates with plan
- Edit limits: LinkedIn jobs, connections, cover letters, CAR, negotiator, LinkedIn posts, mock interviews, resume uploads/month, AI resume/day, ATS/day
- View used vs limit per feature
- Sync limits from purchased plan

#### Automatic Usage Resets
**Feature:** Daily/monthly counters reset on schedule.

**Benefits:** Predictable quota refresh for candidates.

**Sub-features:**
- Per-feature reset timestamps
- Plan-driven limit sync on active subscription

#### Canonical Candidate Feature Catalog
**Feature:** Defined list of modules included across tiers.

**Benefits:** Marketing and plan parity clarity.

**Modules in catalog:**
- Fresh Jobs
- LinkedIn / Indeed / Naukri / Monster Jobs
- LinkedIn Connections
- Application Tracker
- Cover Letter Generator
- CAR Tool
- Salary Negotiator
- LinkedIn Influencer
- Resume Studio
- ATS Resume Score
- Mock Interview
- Coding Practice
- Programming Practice
- Knowledge Base
- Fake Offer Letter Detection

---

### 5.5 Platform Configuration & Integrations

#### AI Provider Configuration
**Feature:** Global AI settings for all platform AI services.

**Benefits:** Switch models/providers centrally for cost and quality control.

**Sub-features:**
- Provider selection (OpenAI, Groq, Claude, Gemini, custom)
- API key and base URL
- Model selection
- Temperature, token limits, streaming
- Timeout and retry settings

#### Email Delivery Settings
**Feature:** Outbound email for platform notifications.

**Benefits:** Branded transactional email across the platform.

**Sub-features:**
- Enable/disable email delivery
- Provider API URL and key
- From name and email

#### Notification Provider Matrix
**Feature:** Multiple notification email configurations.

**Benefits:** Route different notification types to appropriate providers.

**Sub-features:**
- Add/edit/delete provider profiles
- Multiple provider options (ZeptoMail, SMTP, etc.)

#### Discount & Coupon Management
**Feature:** Discount groups and coupon codes.

**Benefits:** Promotions for candidates and admin clients.

**Sub-features:**
- Create discount groups
- Expiry dates
- Target audience (candidates/admins)
- Percentage-based coupons

#### Administrative Credit Pricing Defaults
**Feature:** Default pricing rules for B2B credits.

**Benefits:** Consistent sales/pricing baseline.

**Sub-features:**
- Minimum interview/position/screening credits
- Price per credit
- Screening cost rules

#### Coding Execution Service Configuration
**Feature:** Settings for candidate coding practice and assessment execution.

**Benefits:** Powers coding practice and live assessment coding rounds.

**Sub-features:**
- Enable/disable service
- Base URL and API key configuration

#### Google Meet Integration (Platform Level)
**Feature:** Calendar/meeting setup for live interviews.

**Benefits:** Schedule remote interviews from admin flows platform-wide.

**Sub-features:**
- OAuth connect
- Client credentials
- Refresh token
- Calendar ID
- Panel notification options

#### Report Analysis Levels
**Feature:** Configurable depth for AI resume reports.

**Benefits:** Tiered report quality by plan.

**Sub-features:**
- Levels: none, minimal, standard, complete
- Depth score configuration
- Enable/disable per level

#### Resume Template Library (Admin)
**Feature:** Manage resume templates available to candidates.

**Benefits:** Control branding and plan-gated designs.

**Sub-features:**
- List templates
- Add template with live preview
- Assign templates to plans
- Template styles: Classic, Modern, Minimal, Executive, Academic, ATS, ATS Compact, Minimal Image

#### Cron / Scheduled Tasks
**Feature:** Operator-triggered and scheduled maintenance jobs.

**Benefits:** Keep content fresh without manual operations.

**Sub-features:**
- Daily quiz generation (5 AI questions)
- Auto-complete stale tests
- Manual trigger from super admin settings

#### Authentication & Identity Service
**Feature:** Shared identity layer for super admin and platform users.

**Benefits:** Single identity layer with audit and security.

**Sub-features:**
- Users, roles, permissions
- Organization feature flags
- Google/GitHub/Microsoft/LinkedIn sign-in routes
- Session management
- Audit logging
- Login attempt tracking
- User expiry jobs

---

### 5.6 Planned Super Admin Areas *(Placeholders)*

#### Organizations *(Planned UI)*
**Feature:** Track organizations and onboarding.

**Current status:** Placeholder page with described intent only.

#### Support / Help Center *(Planned UI)*
**Feature:** Support tickets and help links.

**Current status:** Placeholder page with described intent only.

#### Payments Page *(UI Stub)*
**Feature:** Payment management interface.

**Current status:** Backend-ready; UI is placeholder.

---

## 6. AI-Powered Capabilities

This section covers **StreamingAi** — the shared AI intelligence layer powering career tools, hiring assessments, and platform automation.

---

### 6.1 Career Copilot AI ("Shree")

#### Career Assistant Chat
**Feature:** Conversational AI for candidates in web app and browser extension.

**Benefits:**
- Guided help across the entire career journey
- Natural language access without learning every tool

**Sub-features:**
- Resume help and improvement guidance
- Interview preparation tips
- Cover letter assistance
- Job search guidance
- Credits and plan explanation
- App navigation hints
- Multilingual understanding with English replies
- Greeting and task handling
- Persistent chat history
- Quick action prompts

#### LinkedIn Connection Note Generator
**Feature:** Personalized 250–280 character connection request notes.

**Benefits:** Higher acceptance rates on professional outreach.

**Sub-features:**
- Uses target name, title, company + resume context
- Returns note and messaging angle

#### Cover Letter Generator (AI Service)
**Feature:** Job-specific cover letter from resume + job description.

**Benefits:** Faster, tailored applications.

**Sub-features:**
- Tone selection
- Hiring manager field
- Experience range
- Structured professional letter output

#### ATS Match Scoring (Job Page)
**Feature:** Score primary resume against live job posting.

**Benefits:** Instant fit feedback before applying.

**Sub-features:**
- 0–100 score
- Matched and missing keywords
- Strengths and gaps lists
- Summary recommendation

#### Resume ATS Scoring (Text-based)
**Feature:** Score any resume keyword set against a job description.

**Benefits:** Flexible scoring outside browser context.

**Sub-features:**
- Same scoring dimensions as page-based ATS
- Batch scoring for multiple resume/JD pairs

#### AI Resume Tailoring
**Feature:** Job-specific resume rewrite and downloadable document.

**Benefits:** Higher interview callback rates with role-optimized resumes.

**Sub-features:**
- Job description keyword extraction
- Section-by-section tailoring: summary, experience, education, projects, skills, certifications
- Candidate skill confirmation Q&A before tailoring
- PDF/HTML download
- Enhancement summary

#### Tailor Tips
**Feature:** Actionable resume improvement tips for a specific job.

**Benefits:** Lightweight guidance without full rewrite.

**Sub-features:**
- Up to 10 concrete tips
- No-match detection when resume and job are unrelated

#### Job Description Extraction
**Feature:** Parse messy scraped page text into structured job description.

**Benefits:** Clean input for scoring, tailoring, and mock interviews.

**Sub-features:**
- Title, company, location, skills, experience range
- Full cleaned description

#### AI Image Generation
**Feature:** Generate images via configured provider.

**Benefits:** Visual assets for profiles and LinkedIn content.

**Sub-features:**
- Prompt-based image generation

---

### 6.2 Resume Intelligence

#### Resume Parsing
**Feature:** Extract structured data from uploaded resume files.

**Benefits:** Powers all downstream AI tools with accurate profile data.

**Sub-features:**
- Structured candidate profile from document
- OCR support for scanned documents

#### Resume Content Enhancement
**Feature:** Improve individual resume sections with streaming AI.

**Benefits:** Professional polish section-by-section.

**Sub-features:**
- Summary, experience, skills, and other sections
- Paragraph, bullets, and tags modes
- Role-aware rewriting

#### Resume Analysis Report
**Feature:** Deep AI audit of a resume by plan depth.

**Benefits:** Actionable improvement roadmap.

**Sub-features:**
- Plan levels: complete / standard / minimal
- Per-section mistakes and fixes
- Scoring and fix counts

#### Enterprise Resume–Job Description Matching
**Feature:** ATS scoring for recruiter workflows.

**Benefits:** Hiring-side fit assessment at scale.

**Sub-features:**
- Score by position/candidate identifiers
- Direct text scoring
- Configurable category weights
- Keyword fallback when AI unavailable

---

### 6.3 Recruiting & Admin AI

#### Skill Set Generator
**Feature:** AI-generated mandatory and optional skills for a role.

**Benefits:** Faster, consistent job definitions.

**Sub-features:**
- 8 mandatory + 4 optional skills from title, domain, experience band

#### Job Description Generator
**Feature:** AI-written job descriptions from role inputs.

**Benefits:** Speed up posting creation.

**Sub-features:**
- Structured job description from title, skills, experience

#### Interview Question Generator
**Feature:** Verbal/conversational interview questions only.

**Benefits:** Role-aligned question banks without manual authoring.

**Sub-features:**
- General (HR/behavioral) and position-specific sections
- Avoid repetition across questions
- Configurable question count

#### Email Template AI
**Feature:** Generate or refine notification/email templates.

**Benefits:** Faster communications setup for recruiters.

**Sub-features:**
- Generate from prompt
- Refine existing body
- Variable-aware output

#### Admin Assessment Report Payload
**Feature:** One-call fetch of all data needed to generate candidate assessment reports.

**Benefits:** Simplifies admin backend integration for report generation.

**Sub-features:**
- Position, candidate, rounds, answers in single payload
- Optional trigger report generation

#### AI Assessment Report Generator
**Feature:** Full multi-round interview report with AI analysis.

**Benefits:** Hiring decisions with structured insight.

**Sub-features:**
- Queued generation with duplicate protection
- Analyzes conversational, coding, aptitude rounds
- Communication, technical, soft skills breakdown
- Persists report and updates evaluation scores

---

### 6.4 Mock Interview & Practice AI

#### Candidate Mock Interview Engine
**Feature:** AI-driven mock interview from job context.

**Benefits:** Realistic practice before real interviews.

**Sub-features:**
- First question generation
- Adaptive next questions
- Aptitude question set
- Coding question generation
- Code execution against test cases
- Post-session conversation analysis
- Coding performance analysis

#### Conversational Mock Interview
**Feature:** Topic and question generation with cross-questions.

**Benefits:** Dynamic, adaptive mock sessions.

**Sub-features:**
- Generate 4 focus topics
- Generate question sets
- Cross-questions based on answers
- Save session
- Generate session report

#### Daily Quiz Generation
**Feature:** 5 multiple-choice practice questions per day.

**Benefits:** Habit-building technical practice.

**Sub-features:**
- Category and difficulty assignment
- Explanations for each answer
- Scheduled midnight generation
- Manual trigger from super admin

---

### 6.5 Live Assessment & Proctoring AI

#### Live Test Session
**Feature:** Single connection drives full assessment experience.

**Benefits:** Seamless candidate test flow without fragmented steps.

**Sub-features:**
- Initialize session
- Fetch questions
- Submit answers
- Cross-questions in conversational mode
- Round progression
- Assessment completion signaling

#### Proctoring
**Feature:** Face detection and proctoring events during tests.

**Benefits:** Integrity for remote assessments.

**Sub-features:**
- Calibration screenshot
- Live proctoring frames
- Proctoring event logging
- No-face detection
- Multiple faces detection
- Looking away detection (left/right/up/down)
- Head turned detection

#### Video & Camera Streaming
**Feature:** Record candidate video during assessment.

**Benefits:** Review and evidence for hiring decisions.

**Sub-features:**
- Video/camera streams during test
- Chunk upload and merge into recording
- Screen recording alongside camera

#### Speech-to-Text Streaming
**Feature:** Real-time transcription during conversational rounds.

**Benefits:** Enables voice answers and analysis.

**Sub-features:**
- Transcription token issuance
- Streaming speech recognition

#### Text-to-Speech
**Feature:** Spoken questions and prompts.

**Benefits:** Accessible, natural interview experience.

**Sub-features:**
- Question playback for conversational rounds

#### Coding Round Execution
**Feature:** Run candidate code in assessment.

**Benefits:** Validates technical ability under timed conditions.

**Sub-features:**
- Run code against test cases during live test
- Multiple coding problems per round

#### Cross-Question Generation (Live)
**Feature:** Follow-up questions based on prior answers.

**Benefits:** Depth in conversational interviews.

**Sub-features:**
- Dynamic cross-question during live session

#### Aptitude Question Generation
**Feature:** Multiple-choice aptitude for assessment rounds.

**Benefits:** Standardized aptitude testing.

**Sub-features:**
- Generated aptitude blocks for rounds

#### Interview Scheduling (AI Service)
**Feature:** Schedule interviews with optional Google Meet link.

**Benefits:** Coordinates live human interviews from admin panel.

**Sub-features:**
- Calendar event creation
- Meet link extraction
- Attendee management

#### Stale Test Auto-Completion
**Feature:** Scheduled job to close abandoned tests.

**Benefits:** Clean data and quota recovery.

**Sub-features:**
- Auto-complete stale in-progress tests

---

### 6.6 Trust & Safety AI

#### Fake Offer Letter Detection (AI Service)
**Feature:** AI analysis of offer letter text for fraud signals.

**Benefits:** Protect candidates from recruitment scams.

**Sub-features:**
- Offer letter classification
- Fraud risk score
- Company authenticity check
- Structural validity analysis
- Language professionalism assessment
- Legal compliance indicators
- Red flags vs genuine indicators
- Final verdict and confidence score

---

## 7. Browser Extension — Career Copilot on the Web

This section covers **LinkedInExtension** (KareerGrowth Browser Extension) — the in-browser career copilot tied to the candidate account, AI services, and quotas.

---

### 7.1 Extension Shell & Account

#### Popup & Side Panel UI
**Feature:** Compact and expanded assistant UI on any website.

**Benefits:** Always-available career copilot while browsing job boards and company sites.

**Sub-features:**
- Popup mode for quick actions
- Side panel mode for extended chat
- Branded header
- Settings and profile access

#### Platform Sign-In Sync
**Feature:** Connect extension to KareerGrowth candidate account.

**Benefits:** Personalized tools and quota tracking in the browser.

**Sub-features:**
- Auth token sync
- Connection status indicator
- Token refresh handling

#### Credits Dashboard (In-Extension)
**Feature:** Live view of daily/monthly usage.

**Benefits:** Users know remaining capacity before using tools.

**Sub-features:**
- ATS score remaining
- LinkedIn/Indeed/Naukri/Monster job searches remaining
- Connections remaining
- Cover letter, CAR, negotiator quotas
- Resume uploads remaining
- Influencer posts remaining
- Mock interviews remaining

#### Primary Resume Card
**Feature:** Shows active resume context in extension.

**Benefits:** Confirms AI is using the right profile for all tools.

**Sub-features:**
- Skill counts display
- Resume metadata summary

#### Chat with Shree (In-Extension)
**Feature:** Full conversational assistant in extension.

**Benefits:** Natural language access to all career tools without opening the web app.

**Sub-features:**
- Persistent chat history
- Quick actions
- Rich UI cards for results

#### New Chat / Reset
**Feature:** Start fresh conversation.

**Benefits:** Clear context when switching tasks or jobs.

---

### 7.2 On-Page Quick Tools (Job Pages)

#### ATS Score (One-Click)
**Feature:** One-click ATS scoring on current browser tab.

**Benefits:** Immediate fit check before applying.

**Sub-features:**
- Rich score card with keywords, strengths, gaps
- Score bar visualization

#### AI Resume & Download
**Feature:** Tailor resume for open job posting and download.

**Benefits:** Apply with optimized resume per role.

**Sub-features:**
- Skills confirmation Q&A before tailoring
- Download tailored PDF
- Saved as new resume in dashboard

#### Add to Tracker
**Feature:** Save current job page to Application Tracker.

**Benefits:** Zero-friction pipeline capture.

**Sub-features:**
- Duplicate handling
- One-click from toolbar

#### Fill Form
**Feature:** Autofill application forms from profile.

**Benefits:** Speed on career sites and company application pages.

**Sub-features:**
- Universal field matching
- Name, email, phone, city, LinkedIn URL

#### LinkedIn Jobs (Toolbar)
**Feature:** Trigger LinkedIn search from toolbar.

**Benefits:** Quick discovery without leaving current page.

**Sub-features:**
- Saves to library/tracker
- Quota tracking

---

### 7.3 Chat Quick Actions

#### Quick Action Bar
**Feature:** One-tap prompts for common workflows.

**Benefits:** Faster than typing full requests.

**Sub-features:**
- Add to tracker
- ATS score
- My resumes
- Tailor and download
- Cover letter
- Fill form
- LinkedIn/Indeed/Naukri/Monster jobs
- Find people
- Jobs on page
- Mock interview

#### My Resumes (In Chat)
**Feature:** List uploaded resumes with skill counts.

**Benefits:** Pick right resume for tailoring and scoring.

#### Credits / Usage Query (In Chat)
**Feature:** Ask remaining limits in chat.

**Benefits:** Self-service quota check in natural language.

#### Task Management in Chat
**Feature:** Create and list career tasks from chat.

**Benefits:** Productivity without leaving browser.

**Sub-features:**
- Create task
- Filter tasks
- Add current page as task

#### Tracker Search in Chat
**Feature:** Query Application Tracker by company/role.

**Benefits:** Quick pipeline lookup conversationally.

#### Mock Interview Launch (In Chat)
**Feature:** Start mock interview from job page via chat.

**Benefits:** Interview prep in context of target role.

**Sub-features:**
- Job description passed to mock session

---

### 7.4 Board-Specific Integrations

#### LinkedIn Integration
**Feature:** Jobs, people, connections, session sync.

**Benefits:** Native LinkedIn workflows from extension.

**Sub-features:**
- In-tab people search
- Connection send with AI note
- Session cookie management for authenticated actions

#### Indeed Integration
**Feature:** Job search with session handling.

**Benefits:** Indeed coverage in same extension workflow.

**Sub-features:**
- Session status display
- Search from background service

#### Naukri Integration
**Feature:** Page hooks and bridge for Naukri search.

**Benefits:** Reliable Naukri job discovery for India market.

**Sub-features:**
- Page-level hooks
- Bridge communication for search results

#### Monster Integration
**Feature:** Client and page hooks for Monster search.

**Benefits:** Monster coverage with login session awareness.

**Sub-features:**
- Login session probe
- Security challenge awareness

#### Universal Job Assistant
**Feature:** Runs on all web pages for job detection and autofill.

**Benefits:** Board-agnostic job tools beyond major job boards.

**Sub-features:**
- Job context extraction on any page
- Careers page scanner
- Application form autofill
- JSON-LD job posting detection
- Heuristic description extraction

#### Careers Page Scanner
**Feature:** Find job links on any company careers listing.

**Benefits:** Works beyond major job boards.

**Sub-features:**
- Keyword matching against resume skills
- Match score per role
- Open-role links without consuming LinkedIn search credit

#### Job Deduplication
**Feature:** Prevent duplicate saves across searches.

**Benefits:** Cleaner tracker and library.

**Sub-features:**
- Platform job ID + fingerprint keys

---

### 7.5 Rich Result UI (Chat Cards)

#### ATS Result Card
**Feature:** Visual score breakdown in chat.

**Benefits:** Easy to act on gaps immediately.

**Sub-features:**
- Score bar
- Matched/missing keywords
- Strengths/gaps lists

#### Job Search Result Cards
**Feature:** LinkedIn/Indeed/Naukri/Monster result lists in chat.

**Benefits:** Apply directly from extension.

**Sub-features:**
- Apply buttons
- Save counts
- Remaining searches display

#### People Search Cards
**Feature:** Connection targets with actions.

**Benefits:** Complete outreach workflow in chat.

**Sub-features:**
- AI note generation
- Connect button

#### Cover Letter Card
**Feature:** Generated letter with copy/save.

**Benefits:** Ready to paste/submit on application.

#### Mock Interview Card
**Feature:** Job-context mock launcher.

**Benefits:** Clear next step for interview prep.

#### Tasks Card
**Feature:** Task list from chat query.

**Benefits:** Visual task management in conversation.

#### Tailor / Skills Q&A Card
**Feature:** Pre-tailor skill confirmation.

**Benefits:** Honest, accurate tailoring based on confirmed skills.

**Sub-features:**
- Confirm/not-applicable skills
- Free-text notes
- Q&A answers before rewrite

#### Resume List Card
**Feature:** Resume picker/display in chat.

**Benefits:** Transparency on AI inputs.

**Sub-features:**
- Primary flag
- Skill counts per resume

---

### 7.6 Extension ↔ Platform Parity

The browser extension uses the **same** career AI, Application Tracker, cover letter generator, connection notes, and quota system as the candidate web app. Actions in the extension sync to the candidate dashboard and vice versa.

---

## 8. Employer Assessment Portal (Candidate Test Experience)

This section covers **CandidateTest** — the separate secure assessment experience for candidates invited by B2B employers (no subscription required).

---

### 8.1 Test Entry & Verification

#### Email Link Entry
**Feature:** Enter assessment via email invitation link.

**Benefits:**
- Secure, one-time access to assigned assessment
- No account creation required

**Sub-features:**
- Email verification step
- One-time code verification
- Load position name, question set, and instructions
- Pre-fetch round questions (general, position, coding, aptitude)
- Initialize assessment summary record
- Connect to real-time test session

---

### 8.2 Assessment Instructions

#### Pre-Test Instructions
**Feature:** Read employer-provided rules before starting.

**Benefits:**
- Understand expectations and avoid disqualification
- Clear rules reduce candidate anxiety

**Sub-features:**
- Position and question set display
- Formatted instruction blocks
- Acknowledgment checkbox required to proceed

---

### 8.3 Permissions & Proctoring Setup

#### Guided Device Setup
**Feature:** Step-by-step setup of required device permissions before rounds.

**Benefits:**
- Ensures fair, monitored assessment environment
- Reduces technical failures mid-test

**Sub-features:**
- Step-by-step voice-guided flow:
  1. Instructions review
  2. AI greeting
  3. Camera and microphone permission
  4. Face calibration
  5. Screen share (mandatory)
  6. Location permission
  7. Speaker test
- Camera preview
- Screen sharing with audio (mandatory)
- Camera recording throughout test

#### Proctoring Monitoring
**Feature:** Real-time integrity monitoring during assessment.

**Benefits:** Fair remote assessment with evidence for review.

**Sub-features:**
- No face detected alerts
- Multiple faces detected alerts
- Looking away detection (left/right/up/down)
- Head turned detection
- Proctoring violation alerts
- Tab visibility monitoring
- Fullscreen monitoring
- Real-time streaming for proctoring review

---

### 8.4 Assessment Rounds

#### Round 1 — General Assessment
**Feature:** Opening round assessing general and problem-solving abilities.

**Benefits:** Demonstrate foundational aptitude early in pipeline.

**Sub-features:**
- Conversational mode (voice Q&A with AI avatar) OR non-conversational (text/voice answers)
- Timed round with question count display
- Save and resume answers
- Screen recording required before start
- Auto-skip if round not assigned by employer
- Cross-questions in conversational mode
- Status update to Round 1

#### Round 2 — Position-Specific Assessment
**Feature:** Technical/role-specific questions for the applied position.

**Benefits:** Prove fit for the specific job.

**Sub-features:**
- Conversational or non-conversational modes
- Position-tailored question set
- Timed with progress tracking
- Cross-questions based on answers
- Status update to Round 2

#### Round 3 — Coding Assessment
**Feature:** Live coding problems with editor, run, and submit.

**Benefits:** Showcase programming ability under time pressure.

**Sub-features:**
- Code editor with language support
- Run code against test cases
- Submit final solutions
- Multiple coding problems per round
- Timed round (approximately 90 minutes default)
- Proctoring active during test
- Status update to Round 3

#### Round 4 — Aptitude Assessment
**Feature:** Multiple-choice aptitude questions.

**Benefits:** Quantitative and logical reasoning evaluation.

**Sub-features:**
- Timed MCQ round
- Save answers and track completion
- Auto-advance through questions
- Status update to Round 4

---

### 8.5 Dynamic Round Management

#### Smart Round Skipping
**Feature:** Automatically skip rounds not assigned by employer.

**Benefits:** Candidates only take relevant assessments; no wasted time.

**Sub-features:**
- Dynamic routing based on employer question set configuration
- Per-round assignment flags respected

#### Timer & Progress Tracking
**Feature:** Per-round timers and time-taken tracking.

**Benefits:** Fair timed assessment with accurate duration records.

**Sub-features:**
- Round start/end timestamps
- Time taken per round
- Total rounds assigned vs completed

#### Answer Persistence
**Feature:** Answers saved across page reloads.

**Benefits:** Candidates don't lose progress on accidental refresh.

**Sub-features:**
- Round instructions cached for refresh resilience
- Assessment summary persisted throughout test

---

### 8.6 Assessment Completion

#### Completion & Feedback
**Feature:** Finish assessment and submit feedback.

**Benefits:**
- Confirms submission to candidate
- Triggers employer report generation

**Sub-features:**
- Summary of assigned vs completed rounds
- Star rating submission
- Written feedback submission
- Status set to Test Completed
- Triggers background interview report generation for employer
- Real-time test completion notification

---

### 8.7 Assessment Infrastructure (Candidate-Visible Behaviors)

| Behavior | Benefit |
|----------|---------|
| Real-time transcription during conversational rounds | Voice answers captured and analyzed |
| Live streaming during test | Proctoring and recording for employer review |
| Assessment summary persisted | Progress never lost mid-test |
| Round timing updates sent during test | Accurate employer reporting |
| Auto-scoring on final round | Immediate recommendation for employer |
| Stale test auto-completion | Abandoned tests closed automatically |

---

### 8.8 Employer Assessment Value Chain

For **employer-invited candidates**, the flow is:

1. **Receive email** with assessment link
2. **Verify identity** with email and one-time code
3. **Read instructions** and acknowledge rules
4. **Complete device setup** (camera, mic, screen share, calibration)
5. **Take assigned rounds** (1–4 depending on employer configuration)
6. **Submit completion feedback**
7. **Employer receives** AI-generated report, scores, recordings, and proctoring evidence

---

## 9. Cross-Cutting Business Rules & Entitlements

### 9.1 Dual Customer Model

| Customer Type | What They Buy | What They Get |
|---------------|---------------|---------------|
| **B2B Admin (Recruitment Agency)** | Interview, position, screening credits | Full ATS, AI assessments, client/vendor management |
| **B2B Admin (College)** | Interview, position credits | Campus placement, students, attendance, tasks |
| **B2B Admin (Direct Employer)** | Interview, position credits | Positions, assessments, candidate registry |
| **B2C Candidate** | KareerGrowth subscription plan | Career tools, job search, mock interviews, resume studio |

### 9.2 Quota Governance

| Area | Rule |
|------|------|
| B2B interview credits | Consumed when candidate linked to position/job for assessment |
| B2B position credits | Consumed when creating new job/position opening |
| B2B screening credits | Recruitment agency tier only |
| B2C daily limits | Per-tool limits driven by subscription plan |
| B2C overrides | Super admin can adjust per-candidate limits |
| Plan sync | Active subscription syncs limits from plan; expired users lose elevated caps |
| Auto-reset | Daily/monthly counters reset on schedule |

### 9.3 AI Configuration

All AI features across B2B, B2C, extension, and assessment portal pull provider and model settings from **Super Admin AI Configuration**. Changes apply platform-wide without per-tenant setup.

### 9.4 Data Scope (B2B Permissions)

| Scope | What User Sees |
|-------|----------------|
| **Global** | All organization records |
| **Team** | Records owned by team members |
| **Own** | Only records created by the user |

### 9.5 Organization Type Feature Split

| Capability | Recruitment Agency | College | Direct Employer |
|------------|-------------------|---------|-----------------|
| Jobs with clients/vendors | Yes | No | No |
| Positions | Yes (alternate) | Yes | Yes |
| ATS candidate pipeline | Yes | No | No |
| Student registry | No | Yes | No |
| Attendance | No | Yes | No |
| Academic tasks | No | Yes | No |
| Google Meet scheduling | Yes | Limited | Yes |
| Bulk email | Yes | Yes (students) | Yes |
| AI assessments | Yes | Yes | Yes |
| Resume scoring | Yes | Yes | Yes |

### 9.6 Extension ↔ Web App Sync

| Data | Syncs Between Extension and Web App |
|------|-------------------------------------|
| Application Tracker | Yes |
| Saved jobs (all boards) | Yes |
| Resumes | Yes |
| Cover letters | Yes |
| Connection notes | Yes |
| Mock interview history | Yes |
| Career tasks | Yes |
| Quota usage | Yes |
| Chat history (Shree) | Partial (extension + web) |

---

## 10. Feature Maturity & Placeholders

### 10.1 Fully Operational Areas

**B2B Admin Portal:**
- Dashboard, Jobs, Candidates, Job Pipeline (Kanban)
- Assessment Reports, Interview Recordings, Interview Setup
- Bulk Email, Inbox, Email Templates
- Clients, Vendors
- Users, Teams, ATS Roles
- Settings: Company, AI Scoring, Cross Questions, Google Meet, Panel
- College: Positions, Students, Attendance, Tasks, Departments, Branches, Subjects

**B2C Candidate Portal:**
- Dashboard, Hunt Hub, all job board integrations
- Application Tracker, Connections, Cover Letter, CAR, Negotiator, Influencer
- Resume Studio, Mock Interview, Coding Practice, Programming Courses
- Knowledge Base, Daily Quiz, Fake Offer Detection
- Billing, Profile, Settings, Shree Chat

**Super Admin Portal:**
- Dashboard, Admin Clients, Admin Credits, Candidate Plans/Credits
- Jobs Registry, Resume Templates
- Settings: AI, Email, Discounts, Credits, Coding Service, Google Meet, Notifications, Cron

**Assessment Portal:**
- Full 4-round flow with proctoring, recording, completion

**Browser Extension:**
- Full career copilot with all quick tools and board integrations

**AI Services:**
- Career copilot, resume intelligence, mock interviews, live assessments, reports, fake offer detection

### 10.2 Placeholder / Minimal UI Areas

| Area | Location | Status |
|------|----------|--------|
| Assigned Job Descriptions | Admin Frontend | Route exists; placeholder page |
| Reports | Admin Frontend | Placeholder page |
| Calendar (standalone) | Admin Frontend | Placeholder page *(Google Meet settings has functional calendar)* |
| Organizations | Super Admin Frontend | Placeholder page |
| Support / Help Center | Super Admin Frontend | Placeholder page |
| Payments | Super Admin Frontend | Backend ready; UI placeholder |
| My Tests | Candidate Frontend | Stub page |
| Bookmarks | Candidate Frontend | Minimal UI |

---

## 11. Complete Feature Index by User Type

### 11.1 B2B — Recruitment Agency Recruiter

| # | Feature | Primary Benefit |
|---|---------|-----------------|
| 1 | Executive Dashboard | See hiring KPIs at a glance |
| 2 | Job Management | Create and manage client job requisitions |
| 3 | Job Kanban Pipeline | Track applicants through custom stages |
| 4 | ATS Candidate Database | Single view of all talent across jobs |
| 5 | AI Resume Scoring | Shortlist faster with objective matching |
| 6 | Auto Invite/Reject | Automate pipeline based on score thresholds |
| 7 | Assessment Configuration | Build multi-round AI evaluations per job |
| 8 | Private/Public Assessment Links | Invite candidates securely |
| 9 | Assessment Progress Tracking | Monitor rounds 1–4 in real time |
| 10 | AI Assessment Reports | Evidence-based hiring recommendations |
| 11 | Interview Recordings | Review proctored test behavior |
| 12 | Google Meet Scheduling | Book video interviews with panel |
| 13 | Bulk Email Campaigns | Reach candidates at scale |
| 14 | Email Templates | Consistent professional outreach |
| 15 | Inbox / Activity Feed | Team activity visibility |
| 16 | Client Management | Organize hiring client companies |
| 17 | Vendor Management | Share jobs with staffing partners |
| 18 | Team Management | Organize recruiters by team |
| 19 | User Management | Onboard sub-users with roles |
| 20 | ATS Roles & Permissions | Granular access control |
| 21 | AI Scoring Settings | Tune hiring bar for automation |
| 22 | Company Profile Settings | Brand emails and candidate links |
| 23 | Panel Management | Interview panelist roster |
| 24 | Credit Tracking | Know remaining hiring capacity |
| 25 | Audit Logs | Accountability and compliance |
| 26 | Job/Candidate Export | Spreadsheet export for reporting |
| 27 | Bulk Job Upload | Import jobs via spreadsheet |
| 28 | Resume Bulk Upload | Mass candidate intake |

### 11.2 B2B — College Placement Admin

| # | Feature | Primary Benefit |
|---|---------|-----------------|
| 1 | Campus Positions | Manage placement openings |
| 2 | Student Registry | Track students by dept/branch/batch |
| 3 | Student Bulk Import | Onboard students at scale |
| 4 | Candidate Management | Placement candidate pipeline |
| 5 | Assessment Invitations | Send secure test links |
| 6 | Assessment Reports | Evaluate placement readiness |
| 7 | Departments/Branches/Subjects | Mirror college academic structure |
| 8 | Attendance Tracking | Subject-wise attendance sheets |
| 9 | Task Assignment | Assign work to students |
| 10 | Bulk Email to Students | Filtered mass communication |
| 11 | College Roles | Permission control for staff |
| 12 | College Profile Settings | Brand placement communications |
| 13 | AI Scoring Settings | Tune assessment thresholds |
| 14 | Credit Tracking | Manage assessment capacity |

### 11.3 B2C — Self-Registered Job Seeker

| # | Feature | Primary Benefit |
|---|---------|-----------------|
| 1 | Subscription Plans | Unlock career tools by tier |
| 2 | Personal Dashboard | One hub for job search progress |
| 3 | Shree AI Assistant | Instant career guidance |
| 4 | Fresh Jobs | Browse partner employer listings |
| 5 | KareerGrowth Hunt Hub | Launchpad for all career tools |
| 6 | LinkedIn Job Search | Find roles with resume keywords |
| 7 | Indeed Job Search | Broader job market coverage |
| 8 | Naukri Job Search | India-focused job discovery |
| 9 | Monster Job Search | Additional board coverage |
| 10 | Application Tracker | Kanban pipeline for applications |
| 11 | LinkedIn Connections | Network with AI notes |
| 12 | Cover Letter Generator | Role-specific letters instantly |
| 13 | CAR Tool | Achievement stories for interviews |
| 14 | Salary Negotiator | Offer negotiation playbooks |
| 15 | LinkedIn Influencer | Personal branding posts |
| 16 | Resume Studio | Build and manage resumes |
| 17 | ATS Resume Scoring | Check fit before applying |
| 18 | AI Resume Tailoring | Job-specific resume rewrite |
| 19 | Mock Interview (AI) | Practice full interview rounds |
| 20 | Coding Practice | Algorithm skill building |
| 21 | Programming Courses | Structured learning paths |
| 22 | Knowledge Base | Quick reference while learning |
| 23 | Daily Quiz | Bite-sized daily practice |
| 24 | Fake Offer Detection | Protect against job scams |
| 25 | Billing & Invoices | Payment history and receipts |
| 26 | Profile & Settings | Manage account and preferences |
| 27 | Browser Extension | In-browser career copilot |
| 28 | College Attendance *(if assigned)* | Track college requirements |
| 29 | College Tasks *(if assigned)* | Academic and placement tasks |

### 11.4 B2C — Employer-Invited Candidate (Assessment Only)

| # | Feature | Primary Benefit |
|---|---------|-----------------|
| 1 | Secure Email Entry | One-time verified access |
| 2 | Assessment Instructions | Clear rules before starting |
| 3 | Device & Proctoring Setup | Fair monitored environment |
| 4 | Round 1 — General | Foundational aptitude demonstration |
| 5 | Round 2 — Position-Specific | Role fit evaluation |
| 6 | Round 3 — Coding | Technical ability proof |
| 7 | Round 4 — Aptitude | Logical reasoning evaluation |
| 8 | Completion & Feedback | Confirm submission to employer |

### 11.5 Platform Super Admin

| # | Feature | Primary Benefit |
|---|---------|-----------------|
| 1 | Executive Dashboard | Platform business health |
| 2 | Admin Client Management | Tenant lifecycle control |
| 3 | Admin Credits Management | B2B monetization and provisioning |
| 4 | Candidate Plan Management | B2C pricing and entitlements |
| 5 | Candidate Credits Console | Per-user quota overrides |
| 6 | Aggregated Jobs Registry | Cross-tenant hiring visibility |
| 7 | AI Provider Configuration | Central AI control |
| 8 | Email & Notification Settings | Platform communications |
| 9 | Discount & Coupon Management | Promotions |
| 10 | Resume Template Library | Candidate template governance |
| 11 | Report Analysis Levels | Tiered report depth |
| 12 | Cron / Scheduled Tasks | Automated maintenance |
| 13 | Admin Plan Templates | B2B pricing standardization |
| 14 | Service Health Monitoring | Platform uptime awareness |

---

## Document Information

| Item | Detail |
|------|--------|
| **Document Title** | KareerGrowth / Systemmindz — Complete Platform Features |
| **Scope** | AdminBackend, AdminFrontend, CandidateBackend, CandidateFrontend, CandidateTest, StreamingAi, SuperadminBackend, SuperadminFrontend, LinkedInExtension |
| **Audience** | Business stakeholders, product, sales, and operations |
| **Excludes** | Technical stack, programming languages, implementation details |
| **Last Updated** | June 14, 2026 |

---

*End of document.*
