import React, { createContext, useContext, useEffect, useState } from 'react';
import { firestore } from '@common/firebase';
import { useAuth } from './AuthContext';
import { EventItem } from '@common/types';

interface FavoritesContextType {
  favorites: EventItem[];
  isLoading: boolean;
  isFavorite: (eventId: string) => boolean;
  addToFavorites: (event: EventItem) => Promise<void>;
  removeFromFavorites: (eventId: string) => Promise<void>;
  toggleFavorite: (event: EventItem) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    setIsLoading(true);
    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('favorites')
      .onSnapshot(
        snapshot => {
          const favoritesData: EventItem[] = [];
          snapshot.forEach(doc => {
            favoritesData.push(doc.data() as EventItem);
          });
          setFavorites(favoritesData);
          setIsLoading(false);
        },
        error => {
          console.error('Error loading favorites:', error);
          setIsLoading(false);
        },
      );

    return unsubscribe;
  }, [user]);

  const isFavorite = (eventId: string): boolean => {
    return favorites.some(fav => fav.id === eventId);
  };

  const addToFavorites = async (event: EventItem): Promise<void> => {
    if (!user) {
      throw new Error('User must be logged in to add favorites');
    }

    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('favorites')
        .doc(event.id)
        .set({
          ...event,
          addedAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  };

  const removeFromFavorites = async (eventId: string): Promise<void> => {
    if (!user) {
      throw new Error('User must be logged in to remove favorites');
    }

    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('favorites')
        .doc(eventId)
        .delete();
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  };

  const toggleFavorite = async (event: EventItem): Promise<void> => {
    if (isFavorite(event.id)) {
      await removeFromFavorites(event.id);
    } else {
      await addToFavorites(event);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
