import React from 'react';
import {
  Stat,
  StatLabel,
  StatNumber,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react';
import { CourseGrade } from '../types/transcript';

export function GradeView({ grade }: { grade: CourseGrade }) {
  return (
    <Stat>
      <StatLabel>{grade.course}</StatLabel>
      <StatNumber>
        <Editable defaultValue={`${grade.grade}`} onSubmit={newValue => newValue}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </StatNumber>
    </Stat>
  );
}
