export type UserRole = 'viewer' | 'admin' | null;

export interface MemoryPhoto {
  id: string;
  title: string;
  date: string;
  caption: string;
  imageUrl: string;
  isCustom?: boolean;
}

export interface LoveReason {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface SecretLetter {
  id: string;
  title: string;
  recipient: string;
  salutation: string;
  paragraphs: string[];
  closing: string;
  sender: string;
  specialNote: string;
  waxInitials: string;
}

export interface PublicLetter {
  id: string;
  title: string;
  subtitle: string;
  meetingDateText: string;
  meetingDate: string; // ISO format: 2026-07-21
  birthdayDate: string; // ISO format: 2007-10-20
  paragraphs: string[];
  signature: string;
  heartbeatsSent: number;
}

export interface BirthdayCakeData {
  sectionTitle: string;
  sectionSubtitle: string;
  tier1Text: string;
  tier2Text: string;
  tier3Text: string;
  wishText: string;
  wishSender: string;
}

export interface UploadedSong {
  name: string;
  blob: Blob;
  size: number;
  uploadedAt: string;
}
