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
            "auth": {
                "login": "Login",
                "email": "Email",
                "password": "Password",
                "select_dashboard": "Select Dashboard",
                "contractor": "Contractor Company",
                "client": "Client (Principal/Professional)",
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
            "auth": {
                "login": "Accedi",
                "email": "Email",
                "password": "Password",
                "select_dashboard": "Seleziona Dashboard",
                "contractor": "Impresa Appaltatrice",
                "client": "Cliente (Committente/Professionista)",
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
