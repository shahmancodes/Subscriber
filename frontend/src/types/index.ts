export interface SocialMediaData {
  platform: string;
  username: string;
  followers: number;
}

export interface SocialMediaResponse {
  instagram?: SocialMediaData | { error: string };
  linkedin?: SocialMediaData | { error: string };
  twitter?: SocialMediaData | { error: string };
}

export interface SocialMediaRequest {
  instagram_username?: string;
  linkedin_username?: string;
  twitter_username?: string;
}

export interface WaitlistEntry {
  email: string;
  platform: string;
  timestamp: string;
}

export interface SavedUsername {
  username: string;
  timestamp: string;
}

export interface SavedUsernames {
  instagram: SavedUsername[];
  linkedin: SavedUsername[];
  twitter: SavedUsername[];
} 