# PDF Export Utility

This utility provides an easy way to add PDF download capability to any presentation or slide deck.

## Quick Start

### 1. Import the component
```typescript
import { PDFDownloadButton } from '../utils/pdfExport';
```

### 2. Use in your component
```typescript
<PDFDownloadButton
  title="My Presentation"
  subtitle="Optional subtitle"
  slides={[
    {
      title: "Slide 1",
      subtitle: "Optional subtitle",
      content: [
        { text: "This is a heading", type: "heading", color: "#06b6d4" },
        { text: "This is a paragraph", type: "paragraph" },
        { text: "This is a bullet point", type: "bullet" }
      ]
    },
    {
      title: "Slide 2",
      content: [
        { text: "Another slide content", type: "paragraph" }
      ]
    }
  ]}
  author="Your Name"
  company="Your Company"
  buttonText="Download PDF"
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | Yes | Main title of the presentation |
| `slides` | SlideData[] | Yes | Array of slide data |
| `subtitle` | string | No | Optional subtitle |
| `fileName` | string | No | Custom filename (auto-generated if not provided) |
| `author` | string | No | Author name |
| `company` | string | No | Company name |
| `buttonText` | string | No | Text for the download button |
| `className` | string | No | Additional CSS classes |

## Slide Data Format

Each slide object should have:

```typescript
interface SlideData {
  title: string;           // Required: Slide title
  subtitle?: string;       // Optional: Slide subtitle
  content: Array<{         // Required: Array of content items
    text: string;          // The text content
    type: 'heading' | 'paragraph' | 'bullet' | string;  // Content type
    color?: string;        // Optional: Hex color code
  }>;
}
```

## Content Types

- **heading**: Large, bold text for section headers
- **paragraph**: Regular body text
- **bullet**: Bullet point items
- **Other**: Falls back to paragraph styling

## Example Usage in Different Components

### In a React Component
```typescript
const MyPresentation = () => {
  const slidesData = [
    {
      title: "Introduction",
      content: [
        { text: "Welcome to our presentation", type: "heading" },
        { text: "This is an example slide", type: "paragraph" },
        { text: "Key points:", type: "bullet" },
        { text: "Point 1", type: "bullet" },
        { text: "Point 2", type: "bullet" }
      ]
    }
  ];

  return (
    <div>
      <h1>My Presentation</h1>
      <PDFDownloadButton
        title="My Presentation"
        slides={slidesData}
        author="John Doe"
      />
    </div>
  );
};
```

### Converting Existing Slide Data
```typescript
// If you have existing slide data in different format
const convertToPDFSlides = (existingSlides) => {
  return existingSlides.map(slide => ({
    title: slide.title,
    subtitle: slide.subtitle,
    content: [
      ...slide.bullets.map(text => ({ text, type: 'bullet' })),
      ...slide.paragraphs.map(text => ({ text, type: 'paragraph' }))
    ]
  }));
};
```

## Styling

The PDF uses a dark theme by default:
- Background: Dark blue (#1e293b)
- Headings: Cyan (#06b6d4)
- Body text: Light gray (#cbd5e1)
- Accent colors: Purple (#8b5cf6), Green (#10b981), etc.

## Features

✅ **Easy to use** - Just provide title and slides array
✅ **Customizable** - All props are optional except title and slides
✅ **Professional styling** - Dark theme with clean typography
✅ **Reusable** - Works with any presentation component
✅ **TypeScript support** - Full type safety
✅ **Responsive button** - Hover effects and loading states

## Integration Examples

This PDF export system can be easily integrated into:
- Presentation decks
- Documentation viewers
- Report generators
- Tutorial systems
- Any React component that displays content

Just import, provide your data, and you're ready to download PDFs!




