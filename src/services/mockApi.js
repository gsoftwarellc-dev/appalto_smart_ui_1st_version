/**
 * Mock API Service
 * 
 * Simulates a backend API using localStorage for persistence.
 * Handles Tenders, BOQs, Bids, and Users.
 */

const STORAGE_KEYS = {
    TENDERS: 'appalto_tenders',
    BIDS: 'appalto_bids',
    USERS: 'appalto_users'
};

const LATENCY = 600; // Simulated network delay in ms

// Helper to simulate delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const MockApiService = {
    // --- TENDERS ---

    async getTenders() {
        await delay(LATENCY);
        const tenders = JSON.parse(localStorage.getItem(STORAGE_KEYS.TENDERS) || '[]');
        return tenders;
    },

    async getTenderById(id) {
        await delay(LATENCY);
        const tenders = JSON.parse(localStorage.getItem(STORAGE_KEYS.TENDERS) || '[]');
        const tender = tenders.find(t => t.id === parseInt(id) || t.id === id);

        if (!tender) {
            throw new Error('Tender not found');
        }
        return tender;
    },

    async createTender(tenderData) {
        await delay(LATENCY);
        const tenders = JSON.parse(localStorage.getItem(STORAGE_KEYS.TENDERS) || '[]');
        const newTender = {
            ...tenderData,
            id: Date.now().toString(),
            status: 'Draft',
            createdAt: new Date().toISOString(),
            boqItems: []
        };
        tenders.push(newTender);
        localStorage.setItem(STORAGE_KEYS.TENDERS, JSON.stringify(tenders));
        return newTender;
    },

    async updateTenderStatus(id, status) {
        await delay(LATENCY);
        const tenders = JSON.parse(localStorage.getItem(STORAGE_KEYS.TENDERS) || '[]');
        const index = tenders.findIndex(t => t.id === parseInt(id) || t.id === id);

        if (index === -1) throw new Error('Tender not found');

        tenders[index].status = status;
        if (status === 'Awarded') {
            tenders[index].awardedDate = new Date().toISOString();
        }

        localStorage.setItem(STORAGE_KEYS.TENDERS, JSON.stringify(tenders));
        return tenders[index];
    },

    // --- BOQ & EXTRACTION ---

    async uploadTenderBoq(tenderId, file, extractionType) {
        await delay(LATENCY * 2); // Longer delay for "processing"

        // In a real app, this would send the file to a backend for OCR/Extraction.
        // Here we simulate extraction based on our previous logic, but purely data-driven.

        // Mock Item Generation based on Type
        let items = [];
        if (extractionType === 'type_a') {
            items = [
                { id: 1, source_file_id: 'file_123', description: 'Demolizione pavimenti', unit: 'mq', quantity: 150, item_type: 'unit_priced', confidence: 0.95, warnings: [] },
                { id: 2, source_file_id: 'file_123', description: 'Rimozione detriti', unit: 'mc', quantity: 20, item_type: 'unit_priced', confidence: 0.88, warnings: [] },
                { id: 3, source_file_id: 'file_123', description: 'Impianto Elettrico (a corpo)', unit: 'ls', quantity: 1, item_type: 'lump_sum', confidence: 0.75, warnings: ['Check "a corpo" description'] },
            ];
        } else {
            // Type B (Estimativo)
            items = [
                { id: 101, source_file_id: 'file_456', description: 'Scavi a sezione obbligata', unit: 'mc', quantity: 300, item_type: 'unit_priced', confidence: 0.98, warnings: [] },
                { id: 102, source_file_id: 'file_456', description: 'Fondazioni in c.a.', unit: 'mc', quantity: 150, item_type: 'unit_priced', confidence: 0.92, warnings: [] },
                { id: 103, source_file_id: 'file_456', description: 'Impermeabilizzazione', unit: 'mq', quantity: 500, item_type: 'unit_priced', confidence: 0.60, warnings: ['Low confidence scan'] },
                { id: 104, source_file_id: 'file_456', description: 'VARIANTE: Guaina bituminosa 4mm', unit: 'mq', quantity: 500, item_type: 'unit_priced', confidence: 0.90, warnings: [], group_id: 'group_waterproof', is_optional: true },
                { id: 105, source_file_id: 'file_456', description: 'VARIANTE: Resina poliuretanica', unit: 'mq', quantity: 500, item_type: 'unit_priced', confidence: 0.90, warnings: [], group_id: 'group_waterproof', is_optional: true },
            ];
        }

        // Update Tender with these items
        const tenders = JSON.parse(localStorage.getItem(STORAGE_KEYS.TENDERS) || '[]');
        const index = tenders.findIndex(t => t.id === parseInt(tenderId) || t.id === tenderId);
        if (index !== -1) {
            tenders[index].boqItems = items;
            // Also store the "file" metadata if needed
            tenders[index].boqFile = { name: file.name, size: file.size, type: extractionType, uploadedAt: new Date().toISOString() };
            localStorage.setItem(STORAGE_KEYS.TENDERS, JSON.stringify(tenders));
        }

        return items;
    },

    async updateTenderBoqItems(tenderId, items) {
        await delay(LATENCY);
        const tenders = JSON.parse(localStorage.getItem(STORAGE_KEYS.TENDERS) || '[]');
        const index = tenders.findIndex(t => t.id === parseInt(tenderId) || t.id === tenderId);

        if (index === -1) throw new Error('Tender not found');

        tenders[index].boqItems = items;
        localStorage.setItem(STORAGE_KEYS.TENDERS, JSON.stringify(tenders));
        return items;
    },

    // --- BIDS ---

    async getBidsForTender(tenderId) {
        await delay(LATENCY);
        const bids = JSON.parse(localStorage.getItem(STORAGE_KEYS.BIDS) || '[]');
        return bids.filter(b => b.tenderId === parseInt(tenderId) || b.tenderId === tenderId);
    },

    async getContractorBid(tenderId, contractorId) {
        await delay(LATENCY);
        const bids = JSON.parse(localStorage.getItem(STORAGE_KEYS.BIDS) || '[]');
        const bid = bids.find(b => (b.tenderId === parseInt(tenderId) || b.tenderId === tenderId) && b.contractorId === contractorId);

        // If no official bid, check for draft? 
        // For simplicity, we'll return null or the bid object.
        return bid || null;
    },

    async saveBidDraft(tenderId, contractorId, items) {
        // We can just store drafts in a separate key or strictly mark them as status: 'draft' in BIDS
        // Let's use the BIDS array but with status 'Draft'
        await delay(LATENCY / 2); // Faster save
        const bids = JSON.parse(localStorage.getItem(STORAGE_KEYS.BIDS) || '[]');
        const existingIndex = bids.findIndex(b => (b.tenderId === parseInt(tenderId) || b.tenderId === tenderId) && b.contractorId === contractorId);

        const draftData = {
            id: existingIndex !== -1 ? bids[existingIndex].id : Date.now().toString(),
            tenderId: tenderId,
            contractorId: contractorId,
            contractorName: "Current Contractor", // In real app, fetch from User
            items: items,
            status: 'Draft',
            updatedAt: new Date().toISOString()
        };

        if (existingIndex !== -1) {
            bids[existingIndex] = { ...bids[existingIndex], ...draftData };
        } else {
            bids.push(draftData);
        }

        localStorage.setItem(STORAGE_KEYS.BIDS, JSON.stringify(bids));
        return draftData;
    },

    async submitBid(tenderId, contractorId, bidData) {
        await delay(LATENCY);
        const bids = JSON.parse(localStorage.getItem(STORAGE_KEYS.BIDS) || '[]');
        const existingIndex = bids.findIndex(b => (b.tenderId === parseInt(tenderId) || b.tenderId === tenderId) && b.contractorId === contractorId);

        const submittedBid = {
            ...bidData, // Should contain items, totals, etc.
            id: existingIndex !== -1 ? bids[existingIndex].id : Date.now().toString(),
            tenderId: tenderId,
            contractorId: contractorId,
            status: 'Submitted',
            submittedAt: new Date().toISOString()
        };

        if (existingIndex !== -1) {
            bids[existingIndex] = submittedBid;
        } else {
            bids.push(submittedBid);
        }

        localStorage.setItem(STORAGE_KEYS.BIDS, JSON.stringify(bids));
        return submittedBid;
    },

    // --- AWARDING ---
    async awardBid(tenderId, bidId) {
        await delay(LATENCY);

        // 1. Mark Tender as Awarded
        await this.updateTenderStatus(tenderId, 'Awarded');

        // 2. Mark Bid as Accepted (and others as Rejected?) - simplified for now
        const bids = JSON.parse(localStorage.getItem(STORAGE_KEYS.BIDS) || '[]');
        const updatedBids = bids.map(b => {
            if (b.tenderId === tenderId || b.tenderId === parseInt(tenderId)) {
                if (b.id === bidId) return { ...b, status: 'Accepted' };
                return { ...b, status: 'Rejected' };
            }
            return b;
        });
        localStorage.setItem(STORAGE_KEYS.BIDS, JSON.stringify(updatedBids));

        return { success: true };
    },

    // --- SEEDING (Admin Use) ---
    seedInitialData() {
        const existingTenders = JSON.parse(localStorage.getItem(STORAGE_KEYS.TENDERS) || '[]');

        // Define Required Tenders
        const requiredTenders = [
            {
                id: 1,
                title: "Ristrutturazione Facciata Condominio",
                description: "Rifacimento completo intonaci e tinteggiatura. Lavoro stimato di 3 mesi.",
                location: "Milano, Via Dante 1",
                deadline: "2026-12-31", // Future
                status: "Published",
                budget: 150000,
                boqItems: [
                    { id: 1, description: "Ponteggi", unit: "mq", quantity: 1000, item_type: "unit_priced" },
                    { id: 2, description: "Picchettatura intonaco", unit: "mq", quantity: 500, item_type: "unit_priced" },
                ]
            },
            {
                id: 2,
                title: "Manutenzione Ascensori",
                description: "Contratto annuale manutenzione ordinaria",
                location: "Roma, Via Giulia 5",
                deadline: "2026-06-30",
                status: "Draft", // Needs review
                budget: 5000,
                boqItems: []
            },
            {
                id: 4,
                title: "Ristrutturazione Tetto",
                description: "Impermeabilizzazione e sostituzione tegole",
                location: "Torino, Via Po 10",
                deadline: "2026-10-15",
                status: "Published",
                budget: 45000,
                boqItems: [
                    { id: 1, description: "Rimozione tegole", unit: "mq", quantity: 200, item_type: "unit_priced" },
                    { id: 2, description: "Nuova guaina", unit: "mq", quantity: 200, item_type: "unit_priced" }
                ]
            }
        ];

        let tendersToSave = [...existingTenders];
        let hasChanges = false;

        requiredTenders.forEach(required => {
            const exists = tendersToSave.some(t => t.id === required.id);
            if (!exists) {
                console.log(`Seeding missing tender: ${required.title}`);
                tendersToSave.push(required);
                hasChanges = true;
            }
        });

        if (hasChanges || tendersToSave.length === 0) {
            localStorage.setItem(STORAGE_KEYS.TENDERS, JSON.stringify(tendersToSave));
        }
    }

    // Clean up old non-service keys to avoid confusion?
    // localStorage.removeItem('boq_review_data'); 
    // etc.
};

export default MockApiService;
