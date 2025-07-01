export interface Subtopic {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface Topic {
  title: string;
  description: string;
  subtopics?: Subtopic[];
} 