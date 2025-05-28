// src/lib/firestore.ts
import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc
} from 'firebase/firestore';

// Collection name for storing tokens
const TOKENS_COLLECTION = 'notification_tokens';

/**
 * Save a notification token to Firestore
 * @param token FCM token for the device
 * @returns boolean indicating success
 */
export const saveToken = async (token: string): Promise<boolean> => {
  try {
    // Check if token already exists
    const tokenQuery = query(
      collection(db, TOKENS_COLLECTION), 
      where('token', '==', token)
    );
    
    const querySnapshot = await getDocs(tokenQuery);
    
    // If token doesn't exist, add it
    if (querySnapshot.empty) {
      await addDoc(collection(db, TOKENS_COLLECTION), {
        token,
        createdAt: new Date(),
        platform: getPlatformInfo()
      });
      console.log('Token saved to Firestore');
      return true;
    } else {
      console.log('Token already exists in Firestore');
      return true;
    }
  } catch (error) {
    console.error('Error saving token to Firestore:', error);
    return false;
  }
};

/**
 * Delete a notification token from Firestore
 * @param token FCM token to delete
 * @returns boolean indicating success
 */
export const deleteToken = async (token: string): Promise<boolean> => {
  try {
    const tokenQuery = query(
      collection(db, TOKENS_COLLECTION), 
      where('token', '==', token)
    );
    
    const querySnapshot = await getDocs(tokenQuery);
    
    if (!querySnapshot.empty) {
      // Delete all matching documents (should be only one)
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      console.log('Token deleted from Firestore');
      return true;
    } else {
      console.log('Token not found in Firestore');
      return false;
    }
  } catch (error) {
    console.error('Error deleting token from Firestore:', error);
    return false;
  }
};

/**
 * Get all tokens from Firestore
 * @returns Array of FCM tokens
 */
export const getAllTokens = async (): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, TOKENS_COLLECTION));
    const tokens = querySnapshot.docs.map(doc => doc.data().token as string);
    return tokens;
  } catch (error) {
    console.error('Error getting tokens from Firestore:', error);
    return [];
  }
};

/**
 * Get device platform information for analytics
 * @returns Object with platform information
 */
const getPlatformInfo = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  
  let deviceType = 'unknown';
  let os = 'unknown';
  
  // Detect device type
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    deviceType = 'iOS';
  } else if (/android/i.test(userAgent)) {
    deviceType = 'Android';
  } else if (/Windows/.test(platform)) {
    deviceType = 'Desktop';
    os = 'Windows';
  } else if (/Mac/.test(platform)) {
    deviceType = 'Desktop';
    os = 'MacOS';
  } else if (/Linux/.test(platform)) {
    deviceType = 'Desktop';
    os = 'Linux';
  }
  
  return {
    deviceType,
    os,
    userAgent,
    platform,
    timestamp: new Date().toISOString()
  };
};