# Careers Capability

Complete careers/job posting system integrated into the CrisPRO.ai application.

## Structure

```
src/
├── data/
│   └── careers/
│       ├── jobs.ts          # Job listings data structure
│       └── README.md        # This file
├── components/
│   └── careers/
│       ├── JobCard.tsx      # Job listing card component
│       ├── JobDetail.tsx    # Detailed job view component
│       └── index.ts         # Component exports
└── app/
    └── careers/
        ├── page.tsx         # Main careers listing page
        └── [slug]/
            └── page.tsx     # Individual job detail page
```

## Data Structure

Jobs are defined in `src/data/careers/jobs.ts` using the `JobListing` interface:

```typescript
interface JobListing {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'co-founder';
  level: 'founding' | 'senior' | 'mid' | 'junior';
  description: string;
  responsibilities: JobResponsibility[];
  requirements: JobRequirement[];
  niceToHave?: JobRequirement[];
  benefits?: string[];
  applicationLink?: string;
  postedDate: string;
  active: boolean;
  tags: string[];
}
```

## Adding New Jobs

1. Open `src/data/careers/jobs.ts`
2. Add a new `JobListing` object to the `CAREER_JOBS` array
3. Ensure `active: true` to display the job
4. The job will automatically appear on `/careers` and be accessible at `/careers/[slug]`

## Helper Functions

- `getActiveJobs()` - Returns all active job listings
- `getJobBySlug(slug)` - Returns a specific job by slug
- `getJobsByDepartment(department)` - Filter jobs by department
- `getJobsByTag(tag)` - Filter jobs by tag

## Components

### JobCard
Displays a job listing in card format with:
- Job title, type, level, location
- Brief description
- Key responsibilities (first 3)
- Key requirements (first 2)
- Links to detail page and application

### JobDetail
Full job detail view with:
- Complete job information
- All responsibilities
- All requirements
- Nice-to-have items
- Benefits
- Tags
- Apply button

## Routes

- `/careers` - Main careers page with all active jobs
- `/careers/[slug]` - Individual job detail page

## Integration with Product Doctrine

All job descriptions, responsibilities, and requirements are aligned with:
- S/P/E Framework (Sequence/Pathway/Evidence)
- Evo2 Foundation Model
- Clinical Decision Support capabilities
- Multi-modal AI validation
- Precision oncology focus

Jobs reference specific capabilities from `product.mdc`:
- Will It Work For Me (WIWFM)
- Synthetic Lethality Analysis
- Unified Care Plans
- Gene Essentiality Scoring
- VUS Resolution
- And more...






