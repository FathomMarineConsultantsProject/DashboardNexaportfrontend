export interface Photo {
  id:string
  filname: string
  category: 'Hull & Structural' | 'Machinery' | 'Safety Equipment' | 'Critical Issues';
  uploadedAt: string;
  size: string;
}