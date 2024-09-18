import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

/**
 * Configuration object for Appwrite service
 */
export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '66d01cfe002c04a98728',
    databaseId: '66d01e7a00157762c860',
    userCollectionId: '66d01ead0031ecd89e37',
    videoCollectionId: '66d01ee500051c039cfb',
    storageId: '66d020c400392076a764'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = appwriteConfig

// Init your React Native Software Development Kit (SDK)
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Set the Appwrite API endpoint
    .setProject(appwriteConfig.projectId) // Set the project ID
    .setPlatform(appwriteConfig.platform) // Set the application ID or bundle ID
;

// Create instances for Appwrite services
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

/**
 * Creates a new user in the Appwrite database and registers the account.
 * 
 * @param {string} email - The email of the user.
 * @param {string} password - The password for the user account.
 * @param {string} username - The username of the user.
 * @returns {Promise<Object>} The created user document.
 * @throws Will throw an error if the user creation or database entry fails.
 */
export const createUser = async (email, password, username) => {
    // Register User
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        // Generate avatar URL based on the user's initials
        const avatarUrl = avatars.getInitials(username)

        // Sign in the new user to create a session
        await signIn(email, password);

        // Store the new user data in the database
        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

/**
 * Signs in a user with email and password.
 * 
 * @param {string} email - The email of the user.
 * @param {string} password - The password for the user account.
 * @returns {Promise<Object>} The session data for the user.
 * @throws Will throw an error if the sign-in fails.
 */
export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session;
    } catch (error) {
        throw new Error(error)
    }
}

/**
 * Retrieves the current logged-in user's data from the Appwrite database.
 * 
 * @returns {Promise<Object>} The current user's document data.
 * @throws Will throw an error if the user data retrieval fails.
 */
export const getCurrentUser = async () => {
    try {
        // Get the current logged-in account
        const currentAccount = await account.get();
        
        if(!currentAccount) throw Error;

        // Retrieve the user document from the database using the account ID
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch(error) {
        console.log(error)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )

        return posts.documents
    } catch(error) {
        throw new Error(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        return posts.documents
    } catch(error) {
        throw new Error(error)
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search('title', query)]
        )

        return posts.documents
    } catch(error) {
        throw new Error(error)
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal('users', userId), Query.orderDesc('$createdAt')]
        )

        return posts.documents
    } catch(error) {
        throw new Error(error)
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')
    } catch(error) {
        throw new Error(error)
    }
}

export const getFilePreview = async (fileId, type) => {
    try {
      if(type === 'video') {
        fileUrl = storage.getFileView(storageId, fileId)
      } else if (type === 'image') {
        fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
      } else {
        throw new Error('Invalid file type')
      }

      if(!fileUrl) throw Error;

      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
}

export const uploadFile = async (file, type) => {
    if(!file) return;

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    }

    try {
      const uploadedFile = await storage.createFile(
        storageId,
        ID.unique(),
        asset
      );

      const fileUrl = await getFilePreview(uploadedFile.$id, type);

      return fileUrl;
    } catch {
      throw new Error(error);
    }
}

export const createVideo =  async (form) => {
    try {
      const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(form.thumbnail, 'image'),
        uploadFile(form.video, 'image')
      ])

      const newPost = await databases.createDocument(
        databaseId, videoCollectionId, ID.unique(), {
            title: form.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            prompt: form.prompt,
            users: form.userId
        }
      )

      return newPost;
    } catch (error) {
      throw new Error(error);
    }
}