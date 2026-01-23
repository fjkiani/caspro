# CrisPRO Outreach Database - Quick Usage Guide

## Column Reference

### Identification & Classification
- **Clinic Type**: `Integrative` or `Academic/Precision Medicine`
- **Priority**: `Tier 1A`, `Tier 1B`, `Tier 2`, `Tier 3`
- **Clinic Name**: Full clinic name
- **CrisPRO Fit Score (1-5)**: Numeric score (5 = best fit)

### Contact Information
- **Medical Director**: Primary physician contact
- **Primary Contact Name**: Best person to reach
- **Primary Contact Title**: Their role/title
- **Primary Email**: Main email address
- **Secondary Email**: Alternative email (if available)
- **Primary Phone**: Main phone number
- **Secondary Phone**: Alternative phone (if available)

### Location
- **Street Address**: Full street address
- **City**: City name
- **State**: State abbreviation (or country for international)
- **Country**: Country name
- **Website Domain**: Just the domain (e.g., `cancercenter.com`)
- **Website Full URL**: Complete URL

### Specialization & Capabilities
- **Specialization Tags**: Semicolon-separated list (e.g., "Integrative Oncology; RGCC Testing")
- **Key Differentiators**: Unique selling points
- **Key Technologies**: Technologies they use (e.g., "CAR-T; Genomic Profiling")

### Institutional Status
- **NCI Designation**: `Yes` or `No` (National Cancer Institute designation)
- **Caris Partnership**: `Caris POA`, `Caris COE`, `Unknown`, or `No`
- **Patient Volume**: Number of patients (where available)

### Outreach Tracking
- **Outreach Status**: `Pending`, `Contacted`, `Responded`, `Meeting Scheduled`, `Partnership`, `Declined`
- **Initial Contact Date**: First outreach date (YYYY-MM-DD)
- **Last Contact Date**: Most recent contact (YYYY-MM-DD)
- **Follow-up Date**: Next follow-up due (YYYY-MM-DD)
- **Response Received**: `Yes` or `No`
- **Response Type**: `Email`, `Phone`, `Meeting`, `No Response`
- **Partnership Level**: `None`, `Exploratory`, `Pilot`, `Active`, `Strategic`
- **Next Action**: Free text for next steps

### Data Quality
- **Data Quality**: `Complete`, `Needs Email`, `Needs Phone`, `Needs Contact Info`
- **Notes**: Additional context
- **Last Updated**: Date record was last modified (YYYY-MM-DD)

## Common Filtering Scenarios

### Top Priority Integrative Clinics
```
Clinic Type = "Integrative"
Priority = "Tier 1A" OR "Tier 1B"
CrisPRO Fit Score (1-5) >= 4
```

### High-Volume Academic Centers
```
Clinic Type = "Academic/Precision Medicine"
NCI Designation = "Yes"
Patient Volume >= 5000
```

### Caris Partnership Network
```
Caris Partnership = "Caris POA" OR "Caris COE"
```

### Ready for Outreach (Complete Data)
```
Data Quality = "Complete"
Outreach Status = "Pending"
```

### Needs Follow-up
```
Outreach Status = "Contacted"
Follow-up Date <= TODAY
Response Received = "No"
```

### Geographic Targeting (California)
```
State = "CA"
OR
City = "Los Angeles" OR "San Francisco" OR "San Diego" OR "Irvine"
```

### Technology Alignment (CAR-T Focus)
```
Key Technologies CONTAINS "CAR-T"
OR
Key Technologies CONTAINS "CAR"
```

### High-Value Targets
```
Priority = "Tier 1A"
CrisPRO Fit Score (1-5) = 5
Patient Volume >= 10000
```

## Outreach Sequence Recommendations

### Phase 1: Tier 1A Integrative (Week 1-2)
- Filter: `Clinic Type = "Integrative"`, `Priority = "Tier 1A"`, `Data Quality = "Complete"`
- Expected: 3 clinics
- Focus: Highest fit, complete contact info

### Phase 2: Tier 1A Academic (Week 3-4)
- Filter: `Clinic Type = "Academic/Precision Medicine"`, `Priority = "Tier 1A"`, `NCI Designation = "Yes"`
- Expected: 3 clinics
- Focus: Prestigious academic partnerships

### Phase 3: Tier 1B High-Volume (Week 5-6)
- Filter: `Priority = "Tier 1B"`, `Patient Volume >= 5000`
- Expected: ~15 clinics
- Focus: Scale and impact

### Phase 4: Caris Network (Week 7-8)
- Filter: `Caris Partnership = "Caris POA" OR "Caris COE"`
- Expected: ~20 clinics
- Focus: Ecosystem alignment

### Phase 5: Remaining Tier 2 (Week 9+)
- Filter: `Priority = "Tier 2"`, `CrisPRO Fit Score (1-5) >= 4`
- Expected: ~25 clinics
- Focus: Broader market coverage

## Data Entry Best Practices

### When Adding New Records:
1. Always fill `Clinic Type` first
2. Assign `Priority` based on fit and volume
3. Set `CrisPRO Fit Score (1-5)` (1-5 scale)
4. Mark `Data Quality` appropriately
5. Set `Last Updated` to today's date

### When Updating Outreach:
1. Update `Outreach Status` immediately
2. Set `Initial Contact Date` on first outreach
3. Update `Last Contact Date` on each interaction
4. Set `Follow-up Date` for next touchpoint
5. Mark `Response Received` when they reply
6. Update `Next Action` with concrete next steps

### When Enriching Data:
1. Prioritize `Data Quality = "Needs Email"` or `"Needs Phone"`
2. Use `Notes` field for context (don't put in other fields)
3. Update `Last Updated` when making changes
4. Verify `Website Domain` and `Website Full URL` match

## Excel/Google Sheets Tips

### Sorting:
- Primary: `Priority` (custom sort: Tier 1A, Tier 1B, Tier 2, Tier 3)
- Secondary: `CrisPRO Fit Score (1-5)` (descending)
- Tertiary: `Patient Volume` (descending)

### Conditional Formatting:
- **Green**: `CrisPRO Fit Score (1-5) = 5`
- **Yellow**: `CrisPRO Fit Score (1-5) = 4`
- **Red**: `Data Quality = "Needs Contact Info"`
- **Blue**: `Outreach Status = "Partnership"`

### Pivot Tables:
- **Rows**: `Clinic Type`, `Priority`
- **Values**: Count of clinics, Average `CrisPRO Fit Score (1-5)`, Sum `Patient Volume`
- **Filters**: `NCI Designation`, `Caris Partnership`, `Outreach Status`

### Data Validation:
- `Priority`: Dropdown (Tier 1A, Tier 1B, Tier 2, Tier 3)
- `Clinic Type`: Dropdown (Integrative, Academic/Precision Medicine)
- `NCI Designation`: Dropdown (Yes, No)
- `Caris Partnership`: Dropdown (Caris POA, Caris COE, Unknown, No)
- `Outreach Status`: Dropdown (Pending, Contacted, Responded, Meeting Scheduled, Partnership, Declined)
- `Data Quality`: Dropdown (Complete, Needs Email, Needs Phone, Needs Contact Info)

## CRM Integration Notes

### Salesforce Fields Mapping:
- `Clinic Name` → Account Name
- `Primary Contact Name` → Contact Name
- `Primary Email` → Email
- `Primary Phone` → Phone
- `City`, `State`, `Country` → Address fields
- `CrisPRO Fit Score (1-5)` → Custom field (Number)
- `Outreach Status` → Status picklist
- `Priority` → Priority picklist

### HubSpot Fields Mapping:
- `Clinic Name` → Company Name
- `Primary Contact Name` → Contact Name
- `Primary Email` → Email
- `Primary Phone` → Phone
- `CrisPRO Fit Score (1-5)` → Custom property (Number)
- `Outreach Status` → Deal Stage
- `Priority` → Custom property (Text)

## Reporting Queries

### Outreach Pipeline Report:
```
SELECT 
  Outreach Status,
  COUNT(*) as Clinic Count,
  AVG(CrisPRO Fit Score (1-5)) as Avg Fit Score,
  SUM(Patient Volume) as Total Patients
GROUP BY Outreach Status
ORDER BY Clinic Count DESC
```

### Geographic Distribution:
```
SELECT 
  State,
  COUNT(*) as Clinic Count,
  AVG(CrisPRO Fit Score (1-5)) as Avg Fit Score
GROUP BY State
ORDER BY Clinic Count DESC
```

### Partnership Opportunities:
```
SELECT 
  Caris Partnership,
  COUNT(*) as Clinic Count,
  AVG(Patient Volume) as Avg Patient Volume
WHERE Caris Partnership != "No"
GROUP BY Caris Partnership
```
