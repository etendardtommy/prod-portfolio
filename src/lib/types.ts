export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  technologies: string | null;
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  created_at: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  image_url: string | null;
  category: string | null;
  tags: string | null;
  created_at: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string | null;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  technologies: string | null;
}

export interface About {
  id: number;
  photo_url: string | null;
  bio: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  cv_url: string | null;
}

export interface Skill {
  id: number;
  name: string;
  logo_url: string | null;
  category: string | null;
  description: string | null;
  sort_order: number;
}
