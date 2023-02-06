import {
  ChakraProvider,
  Grid,
  GridItem,
  List,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Tag,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import './App.css';
import { NewGradeForm } from './components/NewGradeForm';
import { NewStudentForm } from './components/NewStudentForm';
import { TranscriptView } from './components/TranscriptView';
import { getAllTranscripts } from './lib/client';
import { Transcript } from './types/transcript';

const ITEMS_PER_PAGE = 20;

function App() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [pageNumber, setPageNumber] = useState<string>('1');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [sortCategory, setSortCategory] = useState<string>('id');

  useEffect(() => {
    async function fetchTranscripts() {
      setTranscripts(await getAllTranscripts());
    }
    fetchTranscripts();
  }, []);

  useEffect(() => {
    let newTranscript: Transcript[] = [];
    switch (sortCategory) {

      case 'name':
        newTranscript = transcripts.sort((a, b) => { return a.student.studentName.localeCompare(b.student.studentName) })
        break;

      case 'id':
        newTranscript = transcripts.sort((a, b) => { return a.student.studentID - b.student.studentID })
        break;

      default: newTranscript = transcripts.sort((a, b) => {
        return a.grades.reduce((acc, c) => c.grade + acc, 0) / a.grades.length
          - b.grades.reduce((acc, c) => c.grade + acc, 0) / b.grades.length
      })
        break;

    }
    if (sortOrder === 'desc') {
      newTranscript.reverse();
    }
    setTranscripts(newTranscript);
  }, [sortOrder, sortCategory]);

  const startIndex = 0 + ITEMS_PER_PAGE * (parseInt(pageNumber) - 1);
  const endIndex = ITEMS_PER_PAGE + ITEMS_PER_PAGE * (parseInt(pageNumber) - 1);

  const handlePageNumber = (newValue: string) => {
    const parsed: number | undefined = parseInt(newValue);
    if (!parsed || parsed < 1) {
      setPageNumber('');
    } else {
      setPageNumber(newValue);
    }
  };

  const transcriptView = transcripts.slice(startIndex, endIndex).map(eachTranscript => (
    <WrapItem key={eachTranscript.student.studentID}>
      <TranscriptView transcript={eachTranscript} />
    </WrapItem>
  ));



  return (
    <div className='App'>
      <ChakraProvider>
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
          <GridItem w='100%' h='100%' colSpan={2}>
            <div>
              <Tag>Sort by</Tag>
              <br />
              <Select
                placeholder='Select a sort order'
                onChange={option => {
                  console.log(`Selected sort order ${option.target.value}`);
                  setSortCategory(option.target.value);

                }}>
                <option value='id'>Student ID</option>
                <option value='name'>Student name</option>
                <option value='average'>Average Grade</option>
              </Select>
              <br />
              <Select
                onChange={option => {
                  console.log(`Selected sort order ${option.target.value}`);
                  setSortOrder(option.target.value);

                }}>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
              </Select>
            </div>
          </GridItem>
          <NewStudentForm />
          <NewGradeForm />
        </Grid>
        <br />
        <Tag>Page #</Tag>
        <NumberInput value={pageNumber} onChange={value => handlePageNumber(value)} min={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <br />
        <Wrap>
          <List spacing={6}>{transcriptView}</List>
        </Wrap>
      </ChakraProvider>
    </div>
  );
}

export default App;
