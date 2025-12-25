import { useState, useEffect, useCallback } from "react";

export interface LearningRecord {
  character: string;
  learnedAt: string; // ISO date string
  reviewCount: number;
  lastReviewAt: string;
  mastered: boolean;
}

const STORAGE_KEY = "hanzi_learning_progress";

export const useLearningProgress = () => {
  const [records, setRecords] = useState<Record<string, LearningRecord>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecords(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load learning progress:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever records change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      } catch (e) {
        console.error("Failed to save learning progress:", e);
      }
    }
  }, [records, isLoaded]);

  // Mark a character as learned
  const markAsLearned = useCallback((character: string) => {
    const now = new Date().toISOString();
    setRecords((prev) => {
      const existing = prev[character];
      if (existing) {
        return {
          ...prev,
          [character]: {
            ...existing,
            reviewCount: existing.reviewCount + 1,
            lastReviewAt: now,
          },
        };
      }
      return {
        ...prev,
        [character]: {
          character,
          learnedAt: now,
          reviewCount: 1,
          lastReviewAt: now,
          mastered: false,
        },
      };
    });
  }, []);

  // Toggle mastered status
  const toggleMastered = useCallback((character: string) => {
    setRecords((prev) => {
      const existing = prev[character];
      if (!existing) return prev;
      return {
        ...prev,
        [character]: {
          ...existing,
          mastered: !existing.mastered,
        },
      };
    });
  }, []);

  // Remove a character from learned list
  const removeCharacter = useCallback((character: string) => {
    setRecords((prev) => {
      const next = { ...prev };
      delete next[character];
      return next;
    });
  }, []);

  // Clear all progress
  const clearAllProgress = useCallback(() => {
    setRecords({});
  }, []);

  // Check if a character is learned
  const isLearned = useCallback(
    (character: string) => !!records[character],
    [records]
  );

  // Check if a character is mastered
  const isMastered = useCallback(
    (character: string) => records[character]?.mastered ?? false,
    [records]
  );

  // Get all learned characters
  const getLearnedCharacters = useCallback(() => {
    return Object.values(records).sort(
      (a, b) => new Date(b.lastReviewAt).getTime() - new Date(a.lastReviewAt).getTime()
    );
  }, [records]);

  // Get statistics
  const getStats = useCallback(() => {
    const all = Object.values(records);
    return {
      totalLearned: all.length,
      totalMastered: all.filter((r) => r.mastered).length,
      totalReviews: all.reduce((sum, r) => sum + r.reviewCount, 0),
    };
  }, [records]);

  return {
    records,
    isLoaded,
    markAsLearned,
    toggleMastered,
    removeCharacter,
    clearAllProgress,
    isLearned,
    isMastered,
    getLearnedCharacters,
    getStats,
  };
};
