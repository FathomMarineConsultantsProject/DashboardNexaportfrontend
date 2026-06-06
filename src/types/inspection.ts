export interface InspectionItem {
  id: string;
  question: string;
  status: 'compliant' | 'non-compliant' | 'pending' | 'n/a';
  comments: string;
}

export interface InspectionSection {
  id: string;
  title: string;
  items: InspectionItem[];
}