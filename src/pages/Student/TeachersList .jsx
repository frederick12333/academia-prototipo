import React from 'react'
import Layout from '../../components/layouts/Layout';
import Table from '../../components/shared/Table';
import {courses} from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

export const TeachersList   = () => {
  const { user } = useAuth();

  
  const columns = ['Nombre', 'Asignatura','Estado', 'Horario de atención','Contacto'];

  const transformedData = courses
  .filter(course => course.students.some(student => student.id === user.id))
  .map(course => ({
    info: {
      name: course.teacher.name,
      avatar: course.teacher.avatar,
      fullTeacherData:course.teacher,
    },
    Course: course.code,
    Status: course.teacher.status === 'Active' ? 'Activo' : course.teacher.status,
    Office_Hours: 'Lun-Mié, 14:00–16:00',
    Contact: course.teacher.email,
   
  }));

  return (
    <Layout currentPage={'TeachersList'}>
        <Table
              data={transformedData}
              title="All Teachers"
              columns={columns}
              user={{ role: 'student' }}
            />
      
    </Layout>
  )
}
export default TeachersList ;