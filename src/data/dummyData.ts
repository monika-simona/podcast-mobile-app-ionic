export interface Episode {
  id: number;
  title: string;
  description: string;
  audio_url: string;
  duration?: string;
  release_date?: string;
}

export interface Podcast {
  id: number;
  title: string;
  author: string;
  description: string;
  cover_image_url?: string;
  episodes: Episode[];
}

export const podcasts: Podcast[] = [
  {
    id: 1,
    title: "Tehno Podcast",
    author: "Milan",
    description: "Podcast o tehnologiji",
    cover_image_url: "/assets/cover1.jpg",
    episodes: [
      {
        id: 1,
        title: "Uvod u React",
        description: "Osnove React-a",
        audio_url: "/assets/episodes/react.mp3",
        duration: "15",
        release_date: "2025-09-01",
      },
      {
        id: 2,
        title: "Napredni React",
        description: "Hooks i Context API",
        audio_url: "/assets/episodes/react-advanced.mp3",
        duration: "20",
        release_date: "2025-09-05",
      },
    ],
  },
];
