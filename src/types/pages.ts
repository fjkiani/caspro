export interface PageHeaderData {
    type: 'header';
    title: string;
    introduction: string;
}

export interface TextSectionData {
    type: 'text';
    headline: string;
    body: string;
}

export interface BulletPoint {
    title: string;
    text: string;
}

export interface BulletedListSectionData {
    type: 'bulleted-list';
    headline: string;
    bullets: BulletPoint[];
}

export type PageSectionData = PageHeaderData | TextSectionData | BulletedListSectionData;

export interface PageData {
    sections: PageSectionData[];
}
 