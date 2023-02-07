import React, { useState } from 'react';
import {
  Button,
  GridItem,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Tag,
} from '@chakra-ui/react';
import { POSSIBLE_COURSES } from '../types/gentrans';
import { useTranscriptsContext } from '../App';

export function NewGradeForm() {
  const transcripts = useTranscriptsContext();
  const [course, setCourse] = useState<string>('');
  const [grade, setGrade] = useState<number>();
  const [studentID, setStudentID] = useState<string>('');

  return (
    <>
      <GridItem w='100%' h='100%' colSpan={1}>
        <div>
          <Tag>Add Grade</Tag>
          <Stack spacing={6}>
            <Select
              placeholder='Select option'
              onChange={option => {
                console.log(`Selected option`, option.target.value);
                setCourse(option.target.value);
              }}>
              {POSSIBLE_COURSES.map(currentCourse => (
                <option value={currentCourse} key={currentCourse}>
                  {currentCourse}
                </option>
              ))}
            </Select>
            <Input
              variant='outline'
              placeholder='Student ID'
              onChange={e => {
                setStudentID(e.target.value);
              }}
            />
          </Stack>
        </div>
      </GridItem>
      <GridItem w='100%' h='100%' colSpan={1}>
        <br />
        <Stack spacing={6}>
          <NumberInput
            onChange={value => {
              console.log('Changed! New value', value);
              setGrade(parseInt(value));
            }}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            colorScheme='green'
            onClick={() => {
              if (course === '') {
                console.log('There is no course to add');
                return;
              }

              if (!grade) {
                console.log('There is no grade to add');
                return;
              }

              if (studentID === '') {
                console.log('Student ID is needed');
                return;
              }

              const foundTranscript = transcripts.find(
                transcript => transcript.student.studentID === parseInt(studentID),
              );
              if (!foundTranscript) {
                console.log(`Invalid student ID ${studentID}`);
                return;
              }

              foundTranscript.grades.push({ course: course, grade: grade });
              console.log(`Added ${course} with grade ${grade}`);
            }}>
            Add Grade
          </Button>
        </Stack>
      </GridItem>
    </>
  );
}
