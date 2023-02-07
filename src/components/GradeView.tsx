import React from 'react';
import {
  Stat,
  StatLabel,
  StatNumber,
  Editable,
  EditablePreview,
  EditableInput,
  useToast,
} from '@chakra-ui/react';
import { CourseGrade } from '../types/transcript';

export function GradeView({ grade }: { grade: CourseGrade }) {
  const toast = useToast();

  return (
    <Stat>
      <StatLabel>{grade.course}</StatLabel>
      <StatNumber>
        <Editable
          defaultValue={`${grade.grade}`}
          onSubmit={newValue => {
            console.log(newValue);
            toast({
              title: 'Updated grade!',
              description: `Grade is now ${newValue}`,
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
            return newValue;
          }}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </StatNumber>
    </Stat>
  );
}
