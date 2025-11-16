
// export const governmentSchemes = [
//   {
//     name: "PM-Kisan Samman Nidhi",
//     type: "Income Support",
//     description:
//       "Provides ₹6,000 per year to farmers through Direct Benefit Transfer.",
//     eligibility: ["Small and marginal farmers", "Own cultivable land"],
//     link: "https://pmkisan.gov.in/",
//   },
//   {
//     name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
//     type: "Crop Insurance",
//     description:
//       "Insurance protection against crop failure due to drought, floods, pests, or diseases.",
//     eligibility: ["All farmers", "Cropped land registered"],
//     link: "https://pmfby.gov.in/",
//   },
//   {
//     name: "Soil Health Card Scheme",
//     type: "Soil Testing",
//     description:
//       "Provides farmers with soil nutrient status and fertilizer recommendations.",
//     eligibility: ["All farmers"],
//     link: "https://soilhealth.dac.gov.in/",
//   },
//   {
//     name: "PM-KUSUM Yojana",
//     type: "Solar Energy",
//     description:
//       "Supports installation of solar-powered pumps and grid-connected solar plants.",
//     eligibility: ["Farmers", "Panchayats", "Cooperatives"],
//     link: "https://mnre.gov.in/solar/schemes/",
//   },
//   {
//     name: "National Agriculture Market (e-NAM)",
//     type: "Digital Platform",
//     description:
//       "Online trading platform enabling farmers to get better market prices.",
//     eligibility: ["Registered farmers"],
//     link: "https://enam.gov.in/",
//   },
//   {
//     name: "Rashtriya Krishi Vikas Yojana (RKVY)",
//     type: "Development",
//     description:
//       "Supports states to improve agricultural production and agri-infrastructure.",
//     eligibility: ["Farmers", "State agriculture departments"],
//     link: "https://rkvy.nic.in/",
//   },
//   {
//     name: "Paramparagat Krishi Vikas Yojana (PKVY)",
//     type: "Organic Farming",
//     description:
//       "Promotes organic crop cultivation with financial support and training.",
//     eligibility: ["Farmers willing for organic farming"],
//     link: "https://pgsindia-ncof.gov.in/",
//   },
//   {
//     name: "National Food Security Mission (NFSM)",
//     type: "Crop Production",
//     description:
//       "Increases productivity of rice, wheat, pulses, and millets.",
//     eligibility: ["Farmers growing major crops"],
//     link: "https://nfsm.gov.in/",
//   },
//   {
//     name: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
//     type: "Irrigation",
//     description:
//       "Promotes 'More crop per drop' with micro-irrigation support.",
//     eligibility: ["All farmers"],
//     link: "https://pmksy.gov.in/",
//   },
//   {
//     name: "Dairy Entrepreneurship Development Scheme (DEDS)",
//     type: "Livestock",
//     description:
//       "Supports dairy farm setup, chilling units, and milk processing.",
//     eligibility: ["Dairy farmers", "SHGs", "Cooperatives"],
//     link: "https://nabard.org/",
//   },
//   {
//     name: "National Livestock Mission (NLM)",
//     type: "Animal Husbandry",
//     description:
//       "Supports livestock breed improvement, fodder development, and training.",
//     eligibility: ["Livestock owners"],
//     link: "https://nlm.gov.in/",
//   },
//   {
//     name: "Mission for Integrated Development of Horticulture (MIDH)",
//     type: "Horticulture",
//     description:
//       "Subsidies for fruits, vegetables, floriculture, and spices.",
//     eligibility: ["Horticulture farmers"],
//     link: "https://midh.gov.in/",
//   },
//   {
//     name: "Agri-Clinics and Agri-Business Centres (ACABC)",
//     type: "Training & Entrepreneurship",
//     description:
//       "Trains agri-graduates to start businesses and provides subsidies.",
//     eligibility: ["Agriculture graduates"],
//     link: "https://agriclinics.net/",
//   },
//   {
//     name: "Kisan Credit Card (KCC)",
//     type: "Credit & Loans",
//     description:
//       "Helps farmers get crop loans at low interest rates.",
//     eligibility: ["All farmers", "Fishers", "Livestock owners"],
//     link: "https://pmkisan.gov.in/Documents/Kcc.pdf",
//   },
//   {
//     name: "PM-FME (Formalization of Micro Food Enterprises)",
//     type: "Food Processing",
//     description:
//       "Provides credit-linked subsidy for small food processing units.",
//     eligibility: ["Farmers", "FPOs", "Food processing units"],
//     link: "https://mofpi.gov.in/pmfme/",
//   },
// ];

export const governmentSchemes = [
  {
    name: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
    type: "Irrigation",
    description:
      "Enhances water-use efficiency by promoting micro irrigation such as drip and sprinkler systems.",
    eligibility: ["Area < 5 acres", "Drip Irrigation", "Access to water source"],
    link: "https://pmksy.gov.in",
  },

  {
    name: "Paramparagat Krishi Vikas Yojana (PKVY)",
    type: "Organic Farming",
    description:
      "Supports organic farming through cluster-based certification and organic village adoption.",
    eligibility: ["Farmers in a cluster", "Willingness to adopt organic practices"],
    link: "https://pgsindia-ncof.gov.in",
  },

  {
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    type: "Crop Insurance",
    description:
      "Provides insurance coverage and financial support to farmers in case of crop failure.",
    eligibility: ["All farmers growing notified crops", "Loanee and non-loanee farmers"],
    link: "https://pmfby.gov.in",
  },

  {
    name: "Kisan Credit Card (KCC) Scheme",
    type: "Financial",
    description:
      "Offers farmers timely access to credit for cultivation, equipment, and household needs.",
    eligibility: ["All farmers", "Tenant farmers", "Oral lessees & sharecroppers"],
    link: "https://pmkisan.gov.in",
  },

  // -------- 11 MORE NEW SCHEMES BELOW -------- //

  {
    name: "Soil Health Card Scheme",
    type: "Soil",
    description:
      "Provides farmers with soil nutrient status and fertilizer recommendations.",
    eligibility: ["Farmers with cultivable land"],
    link: "https://soilhealth.dac.gov.in",
  },

  {
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    type: "Income Support",
    description:
      "Provides ₹6000 annual financial support to eligible farmers.",
    eligibility: ["Small & marginal farmers", "Land ownership required"],
    link: "https://pmkisan.gov.in",
  },

  {
    name: "National Mission for Sustainable Agriculture (NMSA)",
    type: "Climate",
    description:
      "Promotes climate-resilient practices and efficient resource management.",
    eligibility: ["Rainfed area farmers", "Sustainable farming adopters"],
    link: "https://nmsa.dac.gov.in",
  },

  {
    name: "Rashtriya Krishi Vikas Yojana (RKVY)",
    type: "Development",
    description:
      "Enhances farmer income by promoting new technology, innovations and infrastructure.",
    eligibility: ["All registered farmers"],
    link: "https://rkvy.nic.in",
  },

  {
    name: "e-NAM (National Agriculture Market)",
    type: "Market",
    description:
      "Provides an online trading platform to sell crops at better prices.",
    eligibility: ["Farmers registered in APMC mandis"],
    link: "https://enam.gov.in",
  },

  {
    name: "National Beekeeping & Honey Mission (NBHM)",
    type: "Livestock",
    description:
      "Supports beekeeping training, equipment, and honey production.",
    eligibility: ["Beekeepers", "Farmers willing to adopt beekeeping"],
    link: "https://nbb.gov.in",
  },

  {
    name: "Dairy Entrepreneurship Development Scheme (DEDS)",
    type: "Dairy",
    description:
      "Provides financial support for dairy units, storage, and value-added products.",
    eligibility: ["Dairy farmers", "Self-help groups"],
    link: "https://nabard.org",
  },

  {
    name: "PM Formalization of Micro Food Enterprises (PM-FME)",
    type: "Food Processing",
    description:
      "Helps small food processing units with credit, branding and marketing support.",
    eligibility: ["Small food processors", "Local entrepreneurs"],
    link: "https://mofpi.gov.in",
  },

  {
    name: "Agriculture Infrastructure Fund (AIF)",
    type: "Infrastructure",
    description:
      "Provides loans for storage, cold chains, and agri-infrastructure development.",
    eligibility: ["Farmers", "FPOs", "Agri startups"],
    link: "https://agriinfra.dac.gov.in",
  },

  {
    name: "National Livestock Mission (NLM)",
    type: "Animal Husbandry",
    description:
      "Supports goat farming, sheep farming, poultry, and feed infrastructure.",
    eligibility: ["Livestock farmers", "FPOs"],
    link: "https://nlm.gov.in",
  },

  {
    name: "Blue Revolution – Integrated Fisheries Scheme",
    type: "Fisheries",
    description:
      "Promotes fish farming, aquaculture and value-added marine products.",
    eligibility: ["Fish farmers", "Aqua farmers"],
    link: "https://nfdb.gov.in",
  },
];
