import React, { useState } from 'react';
import { GridItem, Tag, Stack, Input, Button } from '@chakra-ui/react';
import { useTranscriptsContext } from '../App';

export function NewStudentForm() {
  const transcripts = useTranscriptsContext();
  const [studentName, setStudentName] = useState<string>('');

  return (
    <GridItem w='100%' h='100%' colSpan={1}>
      <div>
        <Tag>Add Student</Tag>
        <Stack spacing={3}>
          <Input
            variant='outline'
            placeholder='Student Name'
            onChange={e => {
              console.log('Updated name,', e.target.value);

              setStudentName(e.target.value);
            }}
          />
        </Stack>
        <br />
        <Button
          colorScheme='green'
          onClick={() => {
            if (studentName === '') {
              console.log('There is no student to add');
              return;
            }

            const sortedTranscripts = transcripts.sort(
              (a, b) => a.student.studentID - b.student.studentID,
            );
            // Get the next available student ID or set the new ID to zero if no transcripts exist
            const newID =
              (sortedTranscripts.at(sortedTranscripts.length - 1)?.student.studentID ?? -1) + 1;
            transcripts.push({
              student: { studentID: newID, studentName: studentName },
              grades: [],
            });
            console.log(`Added Student ${studentName}`);
          }}>
          Add Student
        </Button>
      </div>
    </GridItem>
  );
}
