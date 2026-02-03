import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    en: {
        translation: {
            "welcome": "Welcome",
            "slogan": "The #1 Tendering Platform in Italy",
            "hero_title_1": "Build Better.",
            "hero_title_2": "Build Smarter.",
            "hero_desc": "Connect with verified contractors, streamline tenders, and manage construction projects with complete financial control.",
            "get_started": "Get Started",
            "start_project": "Start a Project",
            "contractor_cta": "I'm a Contractor",
            "nav_signin": "Sign In",
            "stats_project_value": "Project Value Managed",
            "stats_active_contracts": "Active Contracts",
            "stats_satisfaction": "Client Satisfaction",
            "stats_response_time": "Avg. Tender Response",
            "common": {
                "dashboard": "Dashboard",
                "logout": "Logout"
            },
            "admin": {
                "createTender": "Create Tender",
                "tendersList": "Tenders List",
                "dashboard": {
                    "subtitle": "Manage your tender requests and compare offers",
                    "totalTenders": "Total Tenders",
                    "activeTenders": "Active Tenders",
                    "totalBids": "Total Bids",
                    "contractors": "Contractors",
                    "recentTenders": "Recent Tenders",
                    "viewAll": "View All",
                    "tenderStatusDist": "Tender Status Distribution",
                    "recentActivity": "Recent Activity",
                    "quickActions": "Quick Actions",
                    "manageBids": "Manage Bids",
                    "viewContractors": "View Contractors",
                    "viewDocuments": "View Documents"
                },
                "create": {
                    "title": "Tender Details",
                    "clientName": "Name/Denomination",
                    "clientNamePlaceholder": "e.g. Condo Diamond or John Smith",
                    "address": "Address",
                    "addressPlaceholder": "Street, square...",
                    "object": "Object",
                    "objectPlaceholder": "Detailed description of works...",
                    "deadline": "Deadline",
                    "fixedDuration": "Fixed duration: 15 days from today",
                    "estimatedAmount": "Estimated Amount",
                    "selectRange": "Select range",
                    "mandatoryNote": "(mandatory as it determines participation credits)",
                    "urgent": "Mark as urgent",
                    "boq": "Bill of Quantities",
                    "uploadPdf": "Upload PDF (AI Extract)",
                    "manualEntry": "Manual Entry",
                    "clickUpload": "Click to upload PDF",
                    "description": "Description",
                    "unit": "Unit",
                    "quantity": "Quantity",
                    "addItem": "Add Item",
                    "manualNote": "Manually enter the items for bidding.",
                    "cancel": "Cancel",
                    "submit": "Create Tender",
                    "creating": "Creating..."
                },
                "list": {
                    "title": "Title",
                    "status": "Status",
                    "bids": "Bids",
                    "deadline": "Deadline",
                    "actions": "Actions",
                    "view": "View",
                    "searchPlaceholder": "Search tenders...",
                    "from": "From",
                    "to": "To"
                },
                "profile": {
                    "title": "My Profile",
                    "subtitle": "Manage your account settings and preferences",
                    "uploadPhoto": "Upload Photo",
                    "infoTitle": "Profile Information",
                    "edit": "Edit Profile",
                    "fullName": "Full Name",
                    "email": "Email",
                    "phone": "Phone",
                    "role": "Role",
                    "vat": "VAT Number",
                    "vat_placeholder": "11 digits required",
                    "studio": "Studio Address",
                    "address_ph": "Street Address...",
                    "city_ph": "City",
                    "province_ph": "Province",
                    "mandatory_note": "Mandatory fields for registration",
                    "cancel": "Cancel",
                    "save": "Save Changes",
                    "changePassword": "Change Password",
                    "currentPassword": "Current Password",
                    "newPassword": "New Password",
                    "confirmPassword": "Confirm New Password",
                    "updatePassword": "Update Password",
                    "accountActivity": "Account Activity",
                    "lastLogin": "Last Login",
                    "accountCreated": "Account Created",
                    "totalTenders": "Total Tenders Created",
                    "totalBids": "Total Bids Managed"
                },
                "bidManagement": {
                    "title": "Bid Management",
                    "subtitle": "Select a project to view and manage bids",
                    "searchPlaceholder": "Search projects...",
                    "noProjects": "No projects found",
                    "noProjectsDesc": "Try adjusting your search criteria.",
                    "backToProjects": "Back to Projects",
                    "allBids": "All Bids",
                    "totalBids": "Total Bids",
                    "bidsSealed": "Bids are Sealed",
                    "bidsSealedDesc": "Offers will become visible automatically after the deadline ({{deadline}}).",
                    "table": {
                        "contractor": "Contractor",
                        "tender": "Tender",
                        "amount": "Bid Amount",
                        "date": "Submission Date",
                        "status": "Status",
                        "actions": "Actions",
                        "techScore": "Tech Score",
                        "finScore": "Fin Score",
                        "award": "Award",
                        "awarded": "Awarded",
                        "approve": "Approve",
                        "reject": "Reject",
                        "view": "View"
                    },
                    "noBids": "No bids yet",
                    "noBidsDesc": "This project hasn't received any bids."
                },
                "contractorManagement": {
                    "title": "Contractor Management",
                    "subtitle": "View and manage all registered contractors.",
                    "searchPlaceholder": "Search by name, location, or expertise...",
                    "locationFilter": {
                        "all": "All Locations"
                    },
                    "stats": {
                        "total": "Total Contractors",
                        "bids": "Total Bids",
                        "awardRate": "Award Rate"
                    },
                    "card": {
                        "totalBids": "Total Bids",
                        "won": "Won",
                        "lost": "Lost",
                        "viewProfile": "View Profile"
                    },
                    "noResults": "No contractors found",
                    "noResultsDesc": "Try adjusting your search criteria or location filter."
                },
                "documentManagement": {
                    "title": "Document Management",
                    "subtitle": "Access and manage all BOQs and contractor bid documents.",
                    "searchPlaceholder": "Search by document, tender, or contractor...",
                    "types": {
                        "all": "All",
                        "boq": "BOQ",
                        "bid": "Bid"
                    },
                    "stats": {
                        "total": "Total Documents",
                        "boqFiles": "BOQ Files",
                        "bidDocs": "Bid Documents"
                    },
                    "table": {
                        "name": "Document Name",
                        "type": "Type",
                        "tender": "Tender",
                        "contractor": "Contractor",
                        "date": "Upload Date",
                        "size": "Size",
                        "action": "Action",
                        "download": "Download"
                    }
                }
            },
            "contractor": {
                "activeTenders": "Active Tenders",
                "myBids": "My Bids",
                "dashboard": {
                    "goodMorning": "Good Morning",
                    "goodAfternoon": "Good Afternoon",
                    "goodEvening": "Good Evening",
                    "welcome": "Welcome to your dashboard.",
                    "totalTenders": "Total Tenders",
                    "activeTenders": "Active Tenders",
                    "bidsSubmitted": "Bids Submitted",
                    "awardedLost": "Awarded / Lost",
                    "deadlineCalendar": "Deadline Calendar",
                    "bidsAnalysis": "Bids Analysis",
                    "upcomingDeadlines": "Upcoming Deadlines",
                    "recentActivity": "Recent Activity",
                    "won": "Won",
                    "pending": "Pending",
                    "notSelected": "Not Selected"
                },
                "tenders": {
                    "title": "Available Tenders",
                    "subtitle": "Browse and filter tenders assigned to you.",
                    "searchPlaceholder": "Search by title...",
                    "allLocations": "All Locations",
                    "clearFilters": "Clear Filters",
                    "locked": "Locked",
                    "urgent": "Urgent",
                    "open": "Open",
                    "hiddenLocation": "Hidden Location",
                    "deadline": "Deadline",
                    "budget": "Budget",
                    "viewDetails": "View Details",
                    "unlockDetails": "Unlock Details",
                    "noTenders": "No tenders found",
                    "tryAdjusting": "Try adjusting your filters or search criteria."
                },
                "bids": {
                    "tabs": {
                        "all": "All",
                        "pending": "Pending",
                        "won": "Won",
                        "lost": "Lost"
                    },
                    "table": {
                        "tender": "Tender",
                        "submissionDate": "Submission Date",
                        "bidAmount": "Bid Amount",
                        "status": "Status",
                        "action": "Action"
                    },
                    "details": "Details",
                    "noBids": "No bids in this category."
                },
                "profile": {
                    "title": "My Profile",
                    "viewPublic": "View Public Profile",
                    "edit": "Edit Profile",
                    "save": "Save Changes",
                    "details": "Details",
                    "mandatory": "Mandatory Fields",
                    "companyName": "Company Name",
                    "vat": "VAT Number",
                    "vat_ph": "11-digit code",
                    "headquarters": "Headquarters",
                    "address_ph": "Street address",
                    "city": "City",
                    "province": "Province",
                    "email": "Email",
                    "phone": "Phone",
                    "legalRep": "Legal Representative",
                    "legalRep_ph": "First and Last Name",
                    "fiscalCode": "Fiscal Code",
                    "fiscalCode_ph": "16-character alphanumeric code",
                    "uploadVisura": "Upload Chamber of Commerce Registration (PDF Required) *",
                    "uploadPresentation": "Upload Company Presentation / Brochure (PDF Optional)",
                    "verified": "Verified Contractor",
                    "expertise": "Areas of Expertise",
                    "memberSince": "Member Since",
                    "about": "About Me",
                    "noFile": "No file uploaded",
                    "upload": "Upload",
                    "cancel": "Cancel"
                }
            },
            "owner": {
                "dashboard": {
                    "title": "Platform Overview",
                    "subtitle": "Welcome back, Owner. Here is the system health check.",
                    "totalRevenue": "Total Revenue",
                    "lastMonth": "from last month",
                    "verifiedUsers": "Verified Users",
                    "newThisWeek": "new this week",
                    "activeTenders": "Active Tenders",
                    "waitingApproval": "waiting for mock approval"
                },
                "revenue": {
                    "title": "Revenue Dashboard",
                    "subtitle": "Track financial performance, credit sales, and success fee collections.",
                    "totalRevenueYtd": "Total Revenue (YTD)",
                    "lastYear": "from last year",
                    "creditSales": "Credit Sales",
                    "successFees": "Success Fees",
                    "pendingPayments": "Pending Payments",
                    "overdueInvoices": "overdue invoices",
                    "revenueOverview": "Revenue Overview",
                    "monthlyGrowthTrend": "Monthly Growth Trend",
                    "recentTransactions": "Recent Transactions",
                    "viewAll": "View All"
                },
                "tenderOversight": {
                    "title": "Tender Oversight",
                    "subtitle": "Monitor all platform tenders, detect risks, and intervene manually if required.",
                    "highRiskTenders": "High Risk Tenders",
                    "immediateAttention": "Immediate attention needed",
                    "stalledTenders": "Stalled Tenders",
                    "overdue": "Overdue > 30 days",
                    "totalActive": "Total Active",
                    "avgBids": "Avg Bids/Tender",
                    "searchPlaceholder": "Search title, client...",
                    "allStatus": "All Status"
                },
                "sidebar": {
                    "panelTitle": "OWNER PANEL",
                    "dashboard": "Dashboard",
                    "userManagement": "User Management",
                    "tenderOversight": "Tender Oversight",
                    "revenue": "Revenue",
                    "audit": "Audit Log",
                    "configuration": "Configuration",
                    "notifications": "Notifications",
                    "platformManagement": "Platform Management"
                },
                "configuration": {
                    "title": "Platform Configuration",
                    "subtitle": "Manage global system settings, pricing, and operational parameters.",
                    "financial": "Financial Parameters",
                    "financialDesc": "Set pricing for credits and fees.",
                    "basicCredit": "Basic Credit Pack (€)",
                    "proCredit": "Pro Credit Pack (€)",
                    "successFee": "Success Fee Percentage (%)",
                    "successFeeDesc": "Applies to awarded contract value.",
                    "operational": "Operational Defaults",
                    "operationalDesc": "Set default behaviors for tenders and users.",
                    "tenderDuration": "Default Tender Duration (Days)",
                    "aiModules": "AI Modules",
                    "autoBoq": "Auto-BOQ Extraction",
                    "smartMatching": "Smart Contractor Matching",
                    "autoApprove": "Auto-Approve Clients",
                    "autoApproveDesc": "Skip manual verification for new clients",
                    "save": "Save Configuration",
                    "saving": "Saving..."
                },
                "audit": {
                    "title": "Audit & Compliance Log",
                    "subtitle": "Immutable record of all critical system actions for legal and security traceability.",
                    "systemActivity": "System Activity",
                    "searchPlaceholder": "Search by action, user, or details...",
                    "timestamp": "Timestamp",
                    "action": "Action",
                    "user": "User",
                    "details": "Details",
                    "ip": "IP Address"
                },
                "notifications": {
                    "title": "Notification Control",
                    "subtitle": "Manage email templates, system alerts, and messaging policies.",
                    "emailTemplates": "Email Templates",
                    "emailTemplatesDesc": "Configure automated email content.",
                    "systemAlerts": "System Alerts",
                    "maintenanceMode": "Maintenance Mode",
                    "newUserAlerts": "New User Alerts",
                    "riskAlerts": "High Risk Tender Alerts",
                    "emailStatus": "Email Service Status",
                    "operational": "Operational",
                    "edit": "Edit",
                    "subject": "Subject",
                    "lastUpdated": "Last updated"
                },
                "users": {
                    "title": "User Management",
                    "subtitle": "Oversee and manage platform access for Clients and Contractors.",
                    "totalUsers": "Total Users",
                    "pendingVerifications": "Pending Verifications",
                    "suspendedUsers": "Suspended Users",
                    "clients": "Clients",
                    "contractors": "Contractors",
                    "searchPlaceholder": "Search users...",
                    "name": "Name",
                    "type": "Type",
                    "category": "Category",
                    "email": "Email",
                    "status": "Status",
                    "activeTenders": "Active Tenders",
                    "credits": "Credits",
                    "actions": "Actions",
                    "verify": "Verify",
                    "block": "Block",
                    "activate": "Activate"
                },
                "sidebar": {
                    "dashboard": "Dashboard",
                    "userManagement": "User Management",
                    "tenderOversight": "Tender Oversight",
                    "revenue": "Revenue",
                    "audit": "Audit & Compliance",
                    "configuration": "Configuration",
                    "notifications": "Notifications",
                    "platformManagement": "Platform Management"
                }
            },
            "tender": {
                "details": {
                    "title": "Tender Details",
                    "back": "Back",
                    "deadline": "Deadline",
                    "description": "Description",
                    "budget": "Estimated Budget",
                    "documents": "Documents",
                    "download": "Download",
                    "downloaded": "Downloaded",
                    "boq": "Bill of Quantities (BOQ)",
                    "locked": "Restricted Access",
                    "lockedDesc": "This tender requires {{cost}} credits based on the budget range.",
                    "balance": "Your Balance: {{credits}} Credits",
                    "unlock": "Unlock for {{cost}} Credits",
                    "unlockConfirm": "Unlock this tender for {{cost}} credits? (Balance: {{credits}})",
                    "insufficientCredits": "Insufficient credits! You need {{cost}} credits but have {{credits}}. Please purchase a credit package."
                },
                "boq": {
                    "manual": "Manual",
                    "ai": "Upload PDF (AI)",
                    "uploadPreventivo": "Upload Signed Quote (PDF) *",
                    "uploadDesc": "The AI compilation automatically fills the table below.",
                    "item": "Item",
                    "unit": "Unit",
                    "qty": "Qty",
                    "price": "Price (€)",
                    "total": "Total (€)",
                    "addItem": "+ Add Item",
                    "discount": "Discount / Rebate:",
                    "projectTotal": "Project Total:",
                    "feeAgreement": "I accept that in case of award, a success fee of 3% on the contract value ({{fee}}) will be due to the platform.",
                    "submit": "Submit Bid ({{amount}})",
                    "submitting": "Submitting...",
                    "submitted": "Bid Submitted!",
                    "submittedDesc": "Your offer has been sent successfully.",
                    "viewBids": "View My Bids"
                },
                "award": {
                    "successFeeTitle": "Action Required: Success Fee",
                    "successFeeDesc": "Congratulations! You have been awarded this tender. To finalize the procedure and receive the contact details of the client, please proceed with the payment of the success fee.",
                    "contractValue": "Contract Value:",
                    "successFee": "Success Fee (3%):",
                    "payButton": "Pay Success Fee",
                    "pendingRegularization": "Pending Regularization",
                    "pendingDesc": "The tender has been awarded. Waiting for the contractor to pay the success fee. Once paid, you will receive a notification.",
                    "modalTitle": "Award Tender",
                    "modalDesc": "You are awarding this tender to {{contractor}} for {{amount}}.",
                    "roleLabel": "I am acting as:",
                    "adminRole": "Condominium Administrator",
                    "techRole": "Delegated Technician",
                    "uploadLabel": "Upload Required Document:",
                    "assemblyMinutes": "Assembly Minutes (PDF)",
                    "signedQuote": "Signed Quotation Acceptance (PDF)",
                    "uploadHintAdmin": "Required: Minutes of the assembly assigning the contract.",
                    "uploadHintTech": "Required: Quotation signed by the client for acceptance.",
                    "cancel": "Cancel",
                    "confirm": "Confirm Award",
                    "processing": "Processing..."
                }
            },

            "sidebar": {
                "dashboard": "Dashboard",
                "createTender": "Create Tender",
                "tendersList": "Tenders List",
                "bidManagement": "Bid Management",
                "documents": "Documents",
                "notifications": "Notifications",
                "myProfile": "My Profile",
                "activeTenders": "Active Tenders",
                "myBids": "My Bids",
                "documentCenter": "Document Center",
                "billing": "Billing",
                "logout": "Logout"
            },
            "landing": {
                "nav": {
                    "signIn": "Sign In",
                    "getStarted": "Get Started"
                },
                "hero": {
                    "slogan": "The Future of Construction Tenders",
                    "title1": "Build Better,",
                    "title2": "Build Faster.",
                    "desc": "The first AI-powered platform connecting Property Owners with Verified Contractors. Automate tenders, ensure compliance, and secure payments.",
                    "startProject": "Start a Project",
                    "joinContractor": "Join as Contractor"
                },
                "stats": {
                    "projectValue": "Project Value Managed",
                    "activeContracts": "Active Contracts",
                    "clientSatisfaction": "Client Satisfaction",
                    "response": "Avg. Tender Response"
                },
                "market": {
                    "insights": "Market Insights",
                    "title": "Real-Time Visualizations",
                    "desc": "Gain unprecedented visibility into market trends. Track tender volumes, acceptance rates, and pricing fluctuations in your region instantly.",
                    "volume": "Tender Volume (YoY)",
                    "cost": "Avg. Project Cost",
                    "chartTitle": "Construction Tender Activity 2025"
                },
                "features": {
                    "forContractors": "For Contractors",
                    "title": "Win More Jobs, Less Paperwork.",
                    "desc": "Stop chasing leads. Appalto Smart brings high-quality, fully funded projects directly to you. Submit bids, manage compliance documents, and get paid faster.",
                    "list": {
                        "access": "Direct access to verified property owners",
                        "compliance": "Automated compliance & document management",
                        "payments": "Guaranteed payments via escrow integration",
                        "dashboard": "Mobile-friendly dashboard for on-site management"
                    },
                    "cta": "Join as Contractor"
                },
                "how": {
                    "title": "How Appalto Smart Works",
                    "subtitle": "Three simple steps to streamline your construction projects.",
                    "step1": {
                        "title": "1. Post a Tender",
                        "desc": "Define your project requirements, budget, and timeline using our AI-assisted tools."
                    },
                    "step2": {
                        "title": "2. Compare Bids",
                        "desc": "Receive proposals from verified contractors. Compare costs, expertise, and ratings side-by-side."
                    },
                    "step3": {
                        "title": "3. Manage & Build",
                        "desc": "Track progress, approve milestones, and handle payments securely through the platform."
                    }
                },
                "testimonials": {
                    "title": "Trusted by Industry Leaders",
                    "t1": "Appalto Smart transformed how we manage our construction projects. The tender process is 3x faster now.",
                    "t2": "Finally, a platform that respects contractors. Clear requirements, guaranteed payments, and easy communication.",
                    "t3": "The financial oversight tools are incredible. I know exactly where every cent is going in real-time."
                },
                "cta": {
                    "title": "Ready to transform your business?",
                    "subtitle": "Join thousands of property owners and contractors building the future with Appalto Smart.",
                    "button": "Get Started Now"
                },
                "footer": {
                    "desc": "The leading platform for construction tenders and project management.",
                    "platform": "Platform",
                    "owners": "For Owners",
                    "contractors": "For Contractors",
                    "pricing": "Pricing",
                    "company": "Company",
                    "about": "About Us",
                    "careers": "Careers",
                    "contact": "Contact",
                    "legal": "Legal",
                    "privacy": "Privacy Policy",
                    "terms": "Terms of Service"
                }
            },
            "auth": {
                "login": "Login",
                "email": "Email",
                "password": "Password",
                "select_dashboard": "Select Dashboard",
                "contractor": "Contractor Company",
                "client": "Client (Condo Admin / Tech Delegate)",
                "owner": "Platform Owner",
                "enter_dashboard": "Enter Dashboard",
                "entering": "Entering...",
                "simplified_auth": "Authentication is currently simplified for MVP demo.",
                "register": "Create Account",
                "haveAccount": "Already have an account?",
                "client_role": "Client",
                "client_sub": "(Admin/Technician)",
                "company_role": "Company",
                "company_sub": "(Contractor)",
                "creating": "Creating Account..."
            },
            "charts": {
                "impact_title": "The Appalto Smart Advantage",
                "impact_subtitle": "Data-driven insights showing why digital transformation is inevitable.",
                "efficiency_title": "Efficiency & Speed",
                "efficiency_desc": "Traditional methods stagnate. Our platform accelerates project velocity over time.",
                "resource_title": "Resource Allocation",
                "resource_desc": "Drastically reduce overhead. Reinvest savings into actual construction value.",
                "traditional": "Traditional",
                "platform": "Appalto Smart",
                "months": "Months",
                "velocity": "Project Velocity",
                "admin_cost": "Admin & Overhead",
                "project_value": "Project Value",
                "wasted_time": "Wasted Time"
            },
            "map": {
                "title": "Live National Network",
                "subtitle": "Connecting projects across Italy in real-time.",
                "active_tenders_live": "Active Tenders Live",
                "region_north": "North Italy",
                "region_center": "Central Italy",
                "region_south": "South Italy & Islands",
                "contractors_online": "Contractors Online"
            }
        }
    },
    it: {
        translation: {
            "welcome": "Benvenuto",
            "slogan": "La Piattaforma N.1 per Gare d'Appalto in Italia",
            "hero_title_1": "Costruisci Meglio.",
            "hero_title_2": "Costruisci Smart.",
            "hero_desc": "Connettiti con appaltatori verificati, ottimizza le gare e gestisci i progetti con controllo finanziario completo.",
            "get_started": "Inizia Ora",
            "start_project": "Nuovo Progetto",
            "contractor_cta": "Sono un Appaltatore",
            "nav_signin": "Accedi",
            "stats_project_value": "Valore Progetti Gestiti",
            "stats_active_contracts": "Contratti Attivi",
            "stats_satisfaction": "Soddisfazione Clienti",
            "stats_response_time": "Risposta Media Gare",
            "common": {
                "dashboard": "Dashboard",
                "logout": "Esci"
            },
            "admin": {
                "createTender": "Crea Nuova Gara",
                "tendersList": "Lista Gare",
                "dashboard": {
                    "subtitle": "Gestisci le tue richieste di gare e confronta le offerte",
                    "totalTenders": "Totale Gare",
                    "activeTenders": "Gare Attive",
                    "totalBids": "Totale Offerte",
                    "contractors": "Appaltatori",
                    "recentTenders": "Gare Recenti",
                    "viewAll": "Vedi Tutti",
                    "tenderStatusDist": "Distribuzione Stato Gare",
                    "recentActivity": "Attività Recente",
                    "quickActions": "Azioni Rapide",
                    "manageBids": "Gestisci Offerte",
                    "viewContractors": "Vedi Appaltatori",
                    "viewDocuments": "Vedi Documenti"
                },
                "create": {
                    "title": "Dettagli della gara",
                    "clientName": "Denominazione/nome",
                    "clientNamePlaceholder": "ad esempio Cond. Diamante o Mario Rossi",
                    "address": "Indirizzo",
                    "addressPlaceholder": "Via, piazza ...",
                    "object": "Oggetto",
                    "objectPlaceholder": "Descrizione dettagliata delle opere...",
                    "deadline": "Scadenza",
                    "fixedDuration": "Durata fissa: 15 giorni da oggi",
                    "estimatedAmount": "Importo stimato",
                    "selectRange": "Seleziona intervallo",
                    "mandatoryNote": "(obbligatorio perché in base a questa indicazione cambia n. crediti per sbloccare partecipazione da parte dell’impresa)",
                    "urgent": "Contrassegna come urgente",
                    "boq": "Bill of Quantities (Computo Metrico)",
                    "uploadPdf": "Carica PDF (AI Extract)",
                    "manualEntry": "Inserimento Manuale",
                    "clickUpload": "Clicca per caricare PDF",
                    "description": "Descrizione",
                    "unit": "Unità",
                    "quantity": "Quantità",
                    "addItem": "Aggiungi Voce",
                    "manualNote": "Inserisci manualmente le voci su cui le imprese faranno offerte.",
                    "cancel": "Annulla",
                    "submit": "Crea Gara",
                    "creating": "Creazione..."
                },
                "list": {
                    "title": "Titolo",
                    "status": "Stato",
                    "bids": "Offerte",
                    "deadline": "Scadenza",
                    "actions": "Azioni",
                    "view": "Vedi",
                    "searchPlaceholder": "Cerca gare...",
                    "from": "Da",
                    "to": "A"
                },
                "profile": {
                    "title": "Il mio profilo",
                    "subtitle": "Gestisci le impostazioni e le preferenze del tuo account",
                    "uploadPhoto": "Carica foto",
                    "infoTitle": "Informazioni sul profilo",
                    "edit": "Modifica profilo",
                    "fullName": "Nome e Cognome",
                    "email": "Email",
                    "phone": "Telefono",
                    "role": "Ruolo",
                    "vat": "P.iva",
                    "vat_placeholder": "Obbligo 11 numeri",
                    "studio": "Studio",
                    "address_ph": "Via, piazza...",
                    "city_ph": "città",
                    "province_ph": "provincia",
                    "mandatory_note": "Dati obbligatori per la registrazione",
                    "cancel": "Annulla",
                    "save": "Salva Modifiche",
                    "changePassword": "Cambia Password",
                    "currentPassword": "Password Attuale",
                    "newPassword": "Nuova Password",
                    "confirmPassword": "Conferma Password",
                    "updatePassword": "Aggiorna Password",
                    "accountActivity": "Attività Account",
                    "lastLogin": "Ultimo Accesso",
                    "accountCreated": "Account Creato",
                    "totalTenders": "Tgare Create",
                    "totalBids": "Offerte Gestite"
                },
                "bidManagement": {
                    "title": "Gestione Offerte",
                    "subtitle": "Seleziona un progetto per visualizzare e gestire le offerte",
                    "searchPlaceholder": "Cerca progetti...",
                    "noProjects": "Nessun progetto trovato",
                    "noProjectsDesc": "Prova a modificare i criteri di ricerca.",
                    "backToProjects": "Torna ai Progetti",
                    "allBids": "Tutte le Offerte",
                    "totalBids": "Totale Offerte",
                    "bidsSealed": "Le offerte sono sigillate",
                    "bidsSealedDesc": "Le offerte diventeranno visibili automaticamente dopo la scadenza ({{deadline}}).",
                    "table": {
                        "contractor": "Impresa",
                        "tender": "Gara",
                        "amount": "Importo Offerta",
                        "date": "Data Invio",
                        "status": "Stato",
                        "actions": "Azioni",
                        "techScore": "Punt. Tecnico",
                        "finScore": "Punt. Economico",
                        "award": "Assegna",
                        "awarded": "Assegnata",
                        "approve": "Approva",
                        "reject": "Rifiuta",
                        "view": "Vedi"
                    },
                    "noBids": "Nessuna offerta",
                    "noBidsDesc": "Questo progetto non ha ancora ricevuto offerte."
                },
                "contractorManagement": {
                    "title": "Gestione Imprese",
                    "subtitle": "Visualizza e gestisci tutte le imprese registrate.",
                    "searchPlaceholder": "Cerca per nome, luogo o competenza...",
                    "locationFilter": {
                        "all": "Tutte le Località"
                    },
                    "stats": {
                        "total": "Totale Imprese",
                        "bids": "Totale Offerte",
                        "awardRate": "Tasso Vincita"
                    },
                    "card": {
                        "totalBids": "Offerte Totali",
                        "won": "Vinte",
                        "lost": "Perse",
                        "viewProfile": "Vedi Profilo"
                    },
                    "noResults": "Nessuna impresa trovata",
                    "noResultsDesc": "Prova a modificare i criteri di ricerca o il filtro località."
                },
                "documentManagement": {
                    "title": "Gestione Documenti",
                    "subtitle": "Accedi e gestisci tutti i computi metrici e i documenti di offerta.",
                    "searchPlaceholder": "Cerca per documento, gara o impresa...",
                    "types": {
                        "all": "Tutti",
                        "boq": "Computo",
                        "bid": "Offerta"
                    },
                    "stats": {
                        "total": "Totale Documenti",
                        "boqFiles": "File Computo",
                        "bidDocs": "Doc. Offerta"
                    },
                    "table": {
                        "name": "Nome Documento",
                        "type": "Tipo",
                        "tender": "Gara",
                        "contractor": "Impresa",
                        "date": "Data Caricamento",
                        "size": "Dimensione",
                        "action": "Azione",
                        "download": "Scarica"
                    }
                }
            },
            "contractor": {
                "activeTenders": "Gare Attive",
                "myBids": "Le Mie Offerte",
                "dashboard": {
                    "goodMorning": "Buongiorno",
                    "goodAfternoon": "Buon Pomeriggio",
                    "goodEvening": "Buonasera",
                    "welcome": "Benvenuto nella tua dashboard.",
                    "totalTenders": "Totale Gare",
                    "activeTenders": "Gare Attive",
                    "bidsSubmitted": "Offerte Inviate",
                    "awardedLost": "Vinte / Perse",
                    "deadlineCalendar": "Calendario Scadenze",
                    "bidsAnalysis": "Analisi Offerte",
                    "upcomingDeadlines": "Scadenze Imminenti",
                    "recentActivity": "Attività Recente",
                    "won": "Vinte",
                    "pending": "In Attesa",
                    "notSelected": "Non Selezionate"
                },
                "tenders": {
                    "title": "Gare Disponibili",
                    "subtitle": "Sfoglia e filtra le gare assegnate a te.",
                    "searchPlaceholder": "Cerca per titolo...",
                    "allLocations": "Tutte le Sedi",
                    "clearFilters": "Cancella Filtri",
                    "locked": "Bloccato",
                    "urgent": "Urgente",
                    "open": "Aperta",
                    "hiddenLocation": "Posizione Nascosta",
                    "deadline": "Scadenza",
                    "budget": "Budget",
                    "viewDetails": "Vedi Dettagli",
                    "unlockDetails": "Sblocca Dettagli",
                    "noTenders": "Nessuna gara trovata",
                    "tryAdjusting": "Prova a modificare i filtri o i criteri di ricerca."
                },
                "bids": {
                    "tabs": {
                        "all": "Tutte",
                        "pending": "In Attesa",
                        "won": "Vinte",
                        "lost": "Perse"
                    },
                    "table": {
                        "tender": "Gara",
                        "submissionDate": "Data Invio",
                        "bidAmount": "Importo Offerta",
                        "status": "Stato",
                        "action": "Azione"
                    },
                    "details": "Dettagli",
                    "noBids": "Nessuna offerta in questa categoria."
                },
                "profile": {
                    "title": "Il mio profilo",
                    "viewPublic": "Visualizza il profilo pubblico",
                    "edit": "Modifica Profilo",
                    "save": "Salva Modifiche",
                    "details": "Dettagli",
                    "mandatory": "Campi obbligatori",
                    "companyName": "Denominazione impresa",
                    "vat": "P.IVA",
                    "vat_ph": "Codice 11 numeri",
                    "headquarters": "Sede",
                    "address_ph": "Via, piazza...",
                    "city": "Città",
                    "province": "Provincia",
                    "email": "Email",
                    "phone": "Telefono",
                    "legalRep": "Legale Rappresentante",
                    "legalRep_ph": "Nome e cognome",
                    "fiscalCode": "CODICE FISCALE",
                    "fiscalCode_ph": "codice alfanumerico di 16 cifre",
                    "uploadVisura": "Inserire Visura camerale (PDF obbligatorio) *",
                    "uploadPresentation": "Inserire altro file PDF per eventuale descrizione/presentazione della ditta (non obbligatorio)",
                    "verified": "Impresa Verificata",
                    "expertise": "Aree di competenza",
                    "memberSince": "Membro dal",
                    "about": "Su di me",
                    "noFile": "Nessun file caricato",
                    "upload": "Carica",
                    "cancel": "Annulla"
                }
            },
            "owner": {
                "dashboard": {
                    "title": "Panoramica Piattaforma",
                    "subtitle": "Bentornato, Proprietario. Ecco lo stato del sistema.",
                    "totalRevenue": "Entrate Totali",
                    "lastMonth": "rispetto al mese scorso",
                    "verifiedUsers": "Utenti Verificati",
                    "newThisWeek": "nuovi questa settimana",
                    "activeTenders": "Gare Attive",
                    "waitingApproval": "in attesa di approvazione"
                },
                "revenue": {
                    "title": "Dashboard Entrate",
                    "subtitle": "Traccia performance finanziarie, vendite crediti e commissioni di successo.",
                    "totalRevenueYtd": "Entrate Totali (YTD)",
                    "lastYear": "rispetto all'anno scorso",
                    "creditSales": "Vendite Crediti",
                    "successFees": "Commissioni Successo",
                    "pendingPayments": "Pagamenti In Sospeso",
                    "overdueInvoices": "fatture scadute",
                    "revenueOverview": "Panoramica Entrate",
                    "monthlyGrowthTrend": "Trend Crescita Mensile",
                    "recentTransactions": "Transazioni Recenti",
                    "viewAll": "Vedi Tutti"
                },
                "tenderOversight": {
                    "title": "Supervisione Gare",
                    "subtitle": "Monitora tutte le gare, rileva rischi e intervieni manualmente se necessario.",
                    "highRiskTenders": "Gare ad Alto Rischio",
                    "immediateAttention": "Richiesta attenzione immediata",
                    "stalledTenders": "Gare in Stallo",
                    "overdue": "Scadute > 30 giorni",
                    "totalActive": "Totale Attive",
                    "avgBids": "Media Offerte/Gara",
                    "searchPlaceholder": "Cerca titolo, cliente...",
                    "allStatus": "Tutti gli Stati"
                },
                "sidebar": {
                    "panelTitle": "PANNELLO PROPRIETARIO",
                    "dashboard": "Dashboard",
                    "userManagement": "Gestione Utenti",
                    "tenderOversight": "Supervisione Gare",
                    "revenue": "Entrate",
                    "audit": "Registro Audit",
                    "configuration": "Configurazione",
                    "notifications": "Notifiche",
                    "platformManagement": "Gestione Piattaforma"
                },
                "configuration": {
                    "title": "Configurazione Piattaforma",
                    "subtitle": "Gestisci impostazioni globali sistema, prezzi e parametri operativi.",
                    "financial": "Parametri Finanziari",
                    "financialDesc": "Imposta i prezzi per crediti e commissioni.",
                    "basicCredit": "Pacchetto Base (€)",
                    "proCredit": "Pacchetto Pro (€)",
                    "successFee": "Percentuale Success Fee (%)",
                    "successFeeDesc": "Applicato al valore del contratto aggiudicato.",
                    "operational": "Impostazioni Operative",
                    "operationalDesc": "Imposta comportamenti predefiniti per gare e utenti.",
                    "tenderDuration": "Durata Gara Default (Giorni)",
                    "aiModules": "Moduli AI",
                    "autoBoq": "Estrazione Auto-Computo",
                    "smartMatching": "Abbinamento Intelligente",
                    "autoApprove": "Approvazione Auto Clienti",
                    "autoApproveDesc": "Salta verifica manuale per nuovi clienti",
                    "save": "Salva Configurazione",
                    "saving": "Salvataggio..."
                },
                "audit": {
                    "title": "Registro Audit & Compliance",
                    "subtitle": "Registro immutabile di tutte le azioni critiche del sistema.",
                    "systemActivity": "Attività Sistema",
                    "searchPlaceholder": "Cerca per azione, utente o dettagli...",
                    "timestamp": "Data/Ora",
                    "action": "Azione",
                    "user": "Utente",
                    "details": "Dettagli",
                    "ip": "Indirizzo IP"
                },
                "notifications": {
                    "title": "Controllo Notifiche",
                    "subtitle": "Gestisci modelli email, avvisi di sistema e policy messaggistica.",
                    "emailTemplates": "Modelli Email",
                    "emailTemplatesDesc": "Configura contenuto email automatiche.",
                    "systemAlerts": "Avvisi di Sistema",
                    "maintenanceMode": "Modalità Manutenzione",
                    "newUserAlerts": "Avvisi Nuovi Utenti",
                    "riskAlerts": "Avvisi Gare Alto Rischio",
                    "emailStatus": "Stato Servizio Email",
                    "operational": "Operativo",
                    "edit": "Modifica",
                    "subject": "Oggetto",
                    "lastUpdated": "Ultimo agg."
                },
                "users": {
                    "title": "Gestione Utenti",
                    "subtitle": "Supervisiona e gestisci l'accesso alla piattaforma per Clienti e Appaltatori.",
                    "totalUsers": "Totale Utenti",
                    "pendingVerifications": "Verifiche In Attesa",
                    "suspendedUsers": "Utenti Sospesi",
                    "clients": "Clienti",
                    "contractors": "Appaltatori",
                    "searchPlaceholder": "Cerca utenti...",
                    "name": "Nome",
                    "type": "Tipo",
                    "category": "Categoria",
                    "email": "Email",
                    "status": "Stato",
                    "activeTenders": "Gare Attive",
                    "credits": "Crediti",
                    "actions": "Azioni",
                    "verify": "Verifica",
                    "block": "Blocca",
                    "activate": "Attiva"
                },
                "sidebar": {
                    "dashboard": "Dashboard",
                    "userManagement": "Gestione Utenti",
                    "tenderOversight": "Supervisione Gare",
                    "revenue": "Ricavi",
                    "audit": "Audit & Compliance",
                    "configuration": "Configurazione",
                    "notifications": "Notifiche",
                    "platformManagement": "Gestione Piattaforma"
                }
            },
            "tender": {
                "details": {
                    "title": "Dettagli Gara",
                    "back": "Indietro",
                    "deadline": "Scadenza",
                    "description": "Descrizione",
                    "budget": "Budget Stimato",
                    "documents": "Documenti",
                    "download": "Scarica",
                    "downloaded": "Scaricato",
                    "boq": "Computo Metrico (BOQ)",
                    "locked": "Accesso Limitato",
                    "lockedDesc": "Questa gara richiede {{cost}} crediti in base alla fascia di budget.",
                    "balance": "Il tuo Saldo: {{credits}} Crediti",
                    "unlock": "Sblocca per {{cost}} Crediti",
                    "unlockConfirm": "Sbloccare questa gara per {{cost}} crediti? (Saldo: {{credits}})",
                    "insufficientCredits": "Crediti insufficienti! Ti servono {{cost}} crediti ma ne hai {{credits}}. Acquista un pacchetto crediti."
                },
                "boq": {
                    "manual": "Manuale",
                    "ai": "Carica PDF (AI)",
                    "uploadPreventivo": "Carica Preventivo Firmato (PDF) *",
                    "uploadDesc": "L'IA compila automaticamente la tabella qui sotto.",
                    "item": "Voce",
                    "unit": "Unità",
                    "qty": "Q.tà",
                    "price": "Prezzo (€)",
                    "total": "Totale (€)",
                    "addItem": "+ Aggiungi Voce",
                    "discount": "Sconto / Ribasso:",
                    "projectTotal": "Totale Progetto:",
                    "feeAgreement": "Accetto che in caso di aggiudicazione, una commissione di successo del 3% sul valore del contratto ({{fee}}) sarà dovuta alla piattaforma.",
                    "submit": "Invia Offerta ({{amount}})",
                    "submitting": "Invio...",
                    "submitted": "Offerta Inviata!",
                    "submittedDesc": "La tua offerta è stata inviata con successo.",
                    "viewBids": "Vedi Le Mie Offerte"
                },
                "award": {
                    "successFeeTitle": "Azione Richiesta: Commissione di Successo",
                    "successFeeDesc": "Congratulazioni! Ti sei aggiudicato questa gara. Per finalizzare la procedura e ricevere i contatti del cliente, procedi con il pagamento della commissione.",
                    "contractValue": "Valore Contratto:",
                    "successFee": "Commissione (3%):",
                    "payButton": "Paga Commissione",
                    "pendingRegularization": "In Attesa di Regolarizzazione",
                    "pendingDesc": "La gara è stata assegnata. In attesa del pagamento della commissione da parte dell'impresa. Una volta pagata, riceverai una notifica.",
                    "modalTitle": "Aggiudica Gara",
                    "modalDesc": "Stai assegnando questa gara a {{contractor}} per {{amount}}.",
                    "roleLabel": "Agisco come:",
                    "adminRole": "Amministratore di Condominio",
                    "techRole": "Tecnico Delegato",
                    "uploadLabel": "Carica Documento Richiesto:",
                    "assemblyMinutes": "Verbale Assemblea (PDF)",
                    "signedQuote": "Preventivo Firmato per Accettazione (PDF)",
                    "uploadHintAdmin": "Richiesto: Verbale dell'assemblea che assegna l'appalto.",
                    "uploadHintTech": "Richiesto: Preventivo firmato dal cliente per accettazione.",
                    "cancel": "Annulla",
                    "confirm": "Conferma Assegnazione",
                    "processing": "Elaborazione..."
                }
            },

            "sidebar": {
                "dashboard": "Dashboard",
                "createTender": "Crea Gara",
                "tendersList": "Lista Gare",
                "bidManagement": "Gestione Offerte",
                "documents": "Documenti",
                "notifications": "Notifiche",
                "myProfile": "Il Mio Profilo",
                "activeTenders": "Gare Attive",
                "myBids": "Le Mie Offerte",
                "documentCenter": "Centro Documenti",
                "billing": "Fatturazione",
                "logout": "Esci"
            },
            "landing": {
                "nav": {
                    "signIn": "Accedi",
                    "getStarted": "Inizia Ora"
                },
                "hero": {
                    "slogan": "Il Futuro degli Appalti Edili",
                    "title1": "Costruisci Meglio,",
                    "title2": "Costruisci Veloce.",
                    "desc": "La prima piattaforma guidata dall'AI che connette Proprietari Immobiliari con Imprese Verificate. Automatizza gare, garantisci conformità e pagamenti sicuri.",
                    "startProject": "Avvia Progetto",
                    "joinContractor": "Unisciti come Impresa"
                },
                "stats": {
                    "projectValue": "Valore Progetti Gestiti",
                    "activeContracts": "Contratti Attivi",
                    "clientSatisfaction": "Soddisfazione Clienti",
                    "response": "Risp. Media Gare"
                },
                "market": {
                    "insights": "Analisi di Mercato",
                    "title": "Visualizzazioni in Tempo Reale",
                    "desc": "Ottieni visibilità senza precedenti sui trend di mercato. Traccia volumi gare, tassi di accettazione e fluttuazioni prezzi nella tua zona istantaneamente.",
                    "volume": "Volume Gare (Anno)",
                    "cost": "Costo Medio Prog.",
                    "chartTitle": "Attività Gare Edili 2025"
                },
                "features": {
                    "forContractors": "Per Imprese",
                    "title": "Vinci Più Lavori, Meno Burocrazia.",
                    "desc": "Smetti di inseguire lead. Appalto Smart porta progetti di alta qualità e finanziati direttamente da te. Invia offerte, gestisci documenti e vieni pagato velocemente.",
                    "list": {
                        "access": "Accesso diretto a proprietari verificati",
                        "compliance": "Gestione automatizzata documenti e conformità",
                        "payments": "Pagamenti garantiti via escrow",
                        "dashboard": "Dashboard mobile per gestione in cantiere"
                    },
                    "cta": "Unisciti come Impresa"
                },
                "how": {
                    "title": "Come Funziona Appalto Smart",
                    "subtitle": "Tre semplici passi per ottimizzare i tuoi progetti edili.",
                    "step1": {
                        "title": "1. Pubblica Gara",
                        "desc": "Definisci requisiti, budget e tempistiche usando i nostri tool AI."
                    },
                    "step2": {
                        "title": "2. Confronta Offerte",
                        "desc": "Ricevi proposte da imprese verificate. Confronta costi, competenze e rating."
                    },
                    "step3": {
                        "title": "3. Gestisci & Costruisci",
                        "desc": "Traccia progressi, approva milestone e gestisci pagamenti in sicurezza."
                    }
                },
                "testimonials": {
                    "title": "Scelto dai Leader del Settore",
                    "t1": "Appalto Smart ha trasformato la gestione dei nostri cantieri. Il processo di gara è 3 volte più veloce.",
                    "t2": "Finalmente una piattaforma che rispetta le imprese. Requisiti chiari, pagamenti garantiti e comunicazione facile.",
                    "t3": "Gli strumenti di controllo finanziario sono incredibili. So esattamente dove va ogni centesimo in tempo reale."
                },
                "cta": {
                    "title": "Pronto a trasformare il tuo business?",
                    "subtitle": "Unisciti a migliaia di proprietari e imprese che costruiscono il futuro con Appalto Smart.",
                    "button": "Inizia Subito"
                },
                "footer": {
                    "desc": "La piattaforma leader per gare d'appalto e gestione progetti.",
                    "platform": "Piattaforma",
                    "owners": "Per Proprietari",
                    "contractors": "Per Imprese",
                    "pricing": "Prezzi",
                    "company": "Azienda",
                    "about": "Chi Siamo",
                    "careers": "Lavora con Noi",
                    "contact": "Contatti",
                    "legal": "Legale",
                    "privacy": "Privacy",
                    "terms": "Termini di Servizio"
                }
            },
            "auth": {
                "login": "Accedi",
                "email": "Email",
                "password": "Password",
                "select_dashboard": "Seleziona Dashboard",
                "contractor": "Impresa Appaltatrice",
                "client": "Committente (Amm.re Condominio / Tecnico Delegato)",
                "owner": "Proprietario Piattaforma",
                "enter_dashboard": "Accedi alla Dashboard",
                "entering": "Accesso in corso...",
                "simplified_auth": "L'autenticazione è semplificata per la demo MVP.",
                "register": "Registrati",
                "haveAccount": "Hai già un account?",
                "client_role": "Cliente",
                "client_sub": "(Admin/Tecnico)",
                "company_role": "Impresa",
                "company_sub": "(Appaltatore)",
                "creating": "Creazione Account..."
            },
            "charts": {
                "impact_title": "Il Vantaggio Appalto Smart",
                "impact_subtitle": "Dati che dimostrano perché la trasformazione digitale è inevitabile.",
                "efficiency_title": "Efficienza e Velocità",
                "efficiency_desc": "I metodi tradizionali ristagnano. La nostra piattaforma accelera la velocità del progetto.",
                "resource_title": "Allocazione Risorse",
                "resource_desc": "Riduci drasticamente le spese generali. Reinvesti i risparmi nel valore reale della costruzione.",
                "traditional": "Tradizionale",
                "platform": "Appalto Smart",
                "months": "Mesi",
                "velocity": "Velocità Progetto",
                "admin_cost": "Amministrazione",
                "project_value": "Valore Progetto",
                "wasted_time": "Tempo Perso"
            },
            "map": {
                "title": "Rete Nazionale Live",
                "subtitle": "Connettiamo progetti in tutta Italia in tempo reale.",
                "active_tenders_live": "Gare Attive Live",
                "region_north": "Nord Italia",
                "region_center": "Centro Italia",
                "region_south": "Sud Italia e Isole",
                "contractors_online": "Appaltatori Online"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "it", // Set default language to Italian
        fallbackLng: "it", // Fallback to Italian
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
