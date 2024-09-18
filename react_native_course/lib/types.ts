interface User {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: any[];
    $tenant: string;
    $updatedAt: string;
    accountId: string;
    avatar: string;
    email: string;
    username: string;
  }
  
export interface VideoPost {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: any[];
    $tenant: string;
    $updatedAt: string;
    prompt: string;
    thumbnail: string;
    title: string;
    users: User;
    video: string;
  }

export type VideoPostsResponse = VideoPost[];