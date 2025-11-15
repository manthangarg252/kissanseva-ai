# **App Name**: KissansevaAI

## Core Features:

- Crop Disease Detection: Allow farmers to upload crop images and use AI to predict disease type and confidence score, displaying treatment options and saving predictions to Firestore.
- Livestock Breed & Disease Detection: Enable farmers to upload animal photos, use AI to identify breed and detect diseases, integrating a voice chatbot for livestock care.
- AI Crop & Market Prediction: Use geolocation to recommend crops based on soil, data, and weather, predicting market price and profit. This tool helps refine the search for information.
- Trader/Buyer Directory: Create a directory of traders with crops, location and contact information, allowing farmers to view and filter nearby buyers.
- Government Schemes Integration: Show active agriculture schemes and use AI to recommend applicable schemes based on farmer profiles and crops.
- Carbon Credit & Sustainability System: Calculate carbon savings based on farmer input and display eco-tips, with carbon credit buyers/traders.
- AI Recommendations: Combine results from disease detection, soil analysis, and carbon data to suggest crop rotation, fertilizer optimization, irrigation, and diet plans.
- Multilingual + Voice Support: Offer multilingual support with voice input/output, auto-translating AI outputs using stored language preferences.
- Farmer Login & Farm Setup: Use Firebase Authentication to collect farmer information and save it to farm profiles.
- Offline & Free-Tier Optimization: Cache Firestore reads locally and optimize images, deleting stored images after 30 days and caching weather/scheme data.
- Notifications: Use FCM to alert farmers about new schemes, market prices, and high-risk diseases.

## Style Guidelines:

- Primary color: Green (#2E8B57) for agriculture.
- Secondary color: Light Yellow (#F0E68C) to complement the primary.
- Font: Open Sans, for readability across devices.
- Use flat, line-based icons related to farming.
- Responsive grid layout for different screen sizes.
- Subtle animations for loading and transitions.