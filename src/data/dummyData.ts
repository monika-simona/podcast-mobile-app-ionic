export interface Episode {
  id: number;
  title: string;
  description: string;
  duration?: number;
  release_date?: string;
  audio_url: string;
}

export interface Podcast {
  id: number;
  title: string;
  author: string;
  cover_image_url?: string;
  description?: string;
  episodes: Episode[];
}

export const podcasts: Podcast[] = [
  {
    id: 1,
    title: "Tech Talks",
    author: "John Doe",
    cover_image_url: "https://via.placeholder.com/200",
    description: "Podcast o tehnologiji i programiranju",
    episodes: [
      {
        id: 1,
        title: "React Tips",
        description: "Saveti za React",
        audio_url:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
      {
        id: 2,
        title: "TypeScript Deep Dive",
        description: "Sve o TS",
        audio_url:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      },
    ],
  },
  {
    id: 2,
    title: "Daily News",
    author: "Jane Smith",
    cover_image_url: "https://via.placeholder.com/200",
    description: "Najnovije vesti i aktuelnosti",
    episodes: [
      {
        id: 3,
        title: "Global Updates",
        description: "Vesti iz sveta",
        audio_url:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      },
    ],
  },
];
