/**
 * Mock BOQ Extraction Logic
 * Simulates AI extraction from PDF files for the MVP.
 * 
 * Enhanced Data Model:
 * - id: string/number
 * - source_item_no: string
 * - source_code: string
 * - description: string
 * - unit: string
 * - quantity: number
 * - is_optional: boolean
 * - group_id: string (nullable) (Renamed from optional_group_id)
 * - notes_raw: string
 * - item_type: 'unit_priced' | 'lump_sum' (NEW)
 * - confidence: number (0.0 - 1.0) (NEW)
 * - warnings: string[] (NEW)
 */

export const extractItemsFromPDF = async (file, extractionType) => {
    // This is a MOCK function. In a real app, this would send the file to a backend
    // or use a library like pdf.js to extract text and parse it.

    console.log(`Extracting from ${file.name} using method: ${extractionType}`);

    return new Promise((resolve) => {
        setTimeout(() => {
            let extractedItems = [];

            if (extractionType === 'type_a') {
                // Mock logic for Type A (Standard/Simple)
                extractedItems = [
                    {
                        id: Date.now() + 1,
                        source_item_no: "1.01",
                        description: "Demolition of existing flooring",
                        unit: "mq",
                        quantity: 120.50,
                        price: 0,
                        confidence: 0.98,
                        warnings: [],
                        item_type: 'unit_priced',
                        source_code: "DEM-01",
                        notes_raw: "Mq. 120.50 x €/Mq. ____"
                    },
                    {
                        id: Date.now() + 2,
                        source_item_no: "1.02",
                        description: "Disposal of debris",
                        unit: "mc",
                        quantity: 15.00,
                        price: 0,
                        confidence: 0.95,
                        warnings: [],
                        item_type: 'unit_priced',
                        source_code: "DIS-02",
                        notes_raw: ""
                    },
                    {
                        id: Date.now() + 3,
                        source_item_no: "2.01",
                        description: "Site Safety Costs (Fixed)",
                        unit: "ls",
                        quantity: 1,
                        price: 2500.00,
                        confidence: 0.85,
                        warnings: ["Fixed Price detected"],
                        item_type: 'lump_sum',
                        source_code: "SAFE-01",
                        notes_raw: "a corpo € 2.500,00"
                    },
                ];
            } else {
                // Mock logic for Type B (Complex/Estimativo)
                extractedItems = [
                    {
                        id: Date.now() + 1,
                        source_item_no: "PAV-01",
                        description: "Supply and installation of ceramic tiles 60x60",
                        unit: "mq",
                        quantity: 500.00,
                        price: 0,
                        confidence: 0.92,
                        warnings: [],
                        item_type: 'unit_priced',
                        source_code: "CER-01",
                        notes_raw: "SOMMANO mq 500,00"
                    },
                    // Alternative Item Example
                    {
                        id: Date.now() + 2,
                        source_item_no: "PAV-01-ALT",
                        description: "VOCE ALTERNATIVA: Supply and installation of resin flooring",
                        unit: "mq",
                        quantity: 500.00,
                        price: 0,
                        confidence: 0.85,
                        warnings: ["Detected as Alternative Option"],
                        is_optional: true,
                        group_id: 'floor_options',
                        item_type: 'unit_priced',
                        source_code: "RES-01",
                        notes_raw: "VOCE ALTERNATIVA"
                    },
                    {
                        id: Date.now() + 3,
                        source_item_no: "PNT-EXT",
                        description: "External painting (siloxane)",
                        unit: "mq",
                        quantity: 1200.00,
                        price: 0,
                        confidence: 0.88,
                        warnings: [],
                        item_type: 'unit_priced',
                        source_code: "PNT-01",
                        notes_raw: "SOMMANO mq 1.200,00"
                    },
                ];
            }

            resolve(extractedItems);
        }, 1500); // Simulate processing time
    });
};

// Keep existing function signature for compatibility if needed, but redirect
export const mockExtractFromPdf = async (style) => {
    return extractItemsFromPDF({ name: 'mock.pdf' }, style === 'styleA' ? 'type_a' : 'type_b');
};
