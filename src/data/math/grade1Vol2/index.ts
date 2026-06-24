// 一年级下册 1-3 单元复习模块入口
import { unit1 } from './lessons/unit1';
import { unit2 } from './lessons/unit2';
import { unit3 } from './lessons/unit3';
import type { Lesson, Unit } from './types';

export const G1V2_UNITS: Unit[] = [unit1, unit2, unit3];

export const getUnitById = (id: string): Unit | undefined =>
  G1V2_UNITS.find((u) => u.id === id);

export const getLessonById = (id: string): { unit: Unit; lesson: Lesson } | undefined => {
  for (const unit of G1V2_UNITS) {
    const lesson = unit.lessons.find((l) => l.id === id);
    if (lesson) return { unit, lesson };
  }
  return undefined;
};

export type { Unit, Lesson } from './types';
export * from './types';
