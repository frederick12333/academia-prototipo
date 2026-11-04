import React from 'react'
import Layout from '../../components/layouts/Layout';
import Table from '../../components/shared/Table';
import {courses} from '../../data/mockData';
import AverageDisplay from '../../components/shared/AverageDisplay';

export const SubjectsList   = () => {
  
  const columns = ['Asignatura', 'Código',  'Nota', 'Asistencia', 'Créditos','Docente'];

  const transformedData = courses.map(course => ({
    Course: course.name,
    'Code': course.code ,
    'Grade': course.grade ,
    Attendance: course.attendance  ? <AverageDisplay value={course.attendance.slice(0,2)} size="md" /> : <AverageDisplay value={null} size="md" />,
    Credits: course.credits ,
    teacher : {
      name: course.teacher.name,
      avatar:course.teacher.avatar,
    },

  }));

  return (
    <Layout currentPage={'Courses List'}>
       <Table
              data={transformedData}
              title="Courses"
              columns={columns}
              user={{ role: 'student' }}
            />
      
    </Layout>
  )
}
export default SubjectsList;
