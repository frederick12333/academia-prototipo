import React, { useEffect } from 'react';
import Layout from '../../components/layouts/Layout';
import StatsCard from "../../components/shared/StatsCard";
import ProfileHeader from "../../components/student/ProfileHeader";
import { useAuth } from '../../contexts/AuthContext';
import Table from '../../components/shared/Table';
import AverageDisplay from "../../components/shared/AverageDisplay"
import {mockGrades} from '../../data/mockData';

import { useLocation } from 'react-router-dom';

import { Monitor, ChartNoAxesCombined, Phone, LibraryBig, Award, Eye } from 'lucide-react';

 const StudentProfile  = () => {
  const location = useLocation();
  const { user: authUser } = useAuth();
  const user = location.state?.student || authUser;
 
  const stats = [
    {
      value: '95%',
      title: 'Promedio de notas',
      icon: <Award size={50} />,
    },
    {
      value: '05',
      title: 'Asignaturas',
      icon: <LibraryBig size={50} />,
    },
    {
      value: '89%',
      title: 'Promedio de asistencia  ',
      icon: <Monitor size={50} />,
    },
    {
      value: '95%',
      title: 'Rendimiento',
      icon: <ChartNoAxesCombined  size={50} />,
    }
  ];
  
  const courses = [
    {
      course: "Cálculo",
      attended: 85,
      absence: 10,
      approvedAbsence: 3,
      teacher: {
        name: 'Zehra Özkan',
        avatar: 'https://cdn.pixabay.com/photo/2023/12/15/17/13/woman-8451051_1280.jpg',
      },
      status: "Normal"
    },
    {
      course: "Cálculo",
      attended: 85,
      absence: 10,
      approvedAbsence: 3,
      teacher: {
        name: 'Zehra Özkan',
        avatar: 'https://cdn.pixabay.com/photo/2023/12/15/17/13/woman-8451051_1280.jpg',
      },      
      status: "Normal"
    },
    {
      course: "Cálculo",
      attended: 67,
      absence: 28,
      approvedAbsence: 0,
      teacher: {
        name: 'Zehra Özkan',
        avatar: 'https://cdn.pixabay.com/photo/2023/12/15/17/13/woman-8451051_1280.jpg',
      },      
      status: "Bajo el promedio"
    },
    {
      course: "Cálculo",
      attended: 85,
      absence: 10,
      approvedAbsence: 3,
      teacher: {
        name: 'Zehra Özkan',
        avatar: 'https://cdn.pixabay.com/photo/2023/12/15/17/13/woman-8451051_1280.jpg',
      },      
      status: "Normal"
    },
    {
      course: "Cálculo",
      attended: 85,
      absence: 10,
      approvedAbsence: 3,
      teacher: {
        name: 'Zehra Özkan',
        avatar: 'https://cdn.pixabay.com/photo/2023/12/15/17/13/woman-8451051_1280.jpg',
      },
      status: "Normal"
    },
  ];
  const coursesColumns = ['Asignatura', 'Asistencias', 'Ausencias', 'Ausencias justificadas', 'Docente', 'Estado'];
  const parents = [
    {
      name: "Nombre del familiar",
      contactNumber: "+905070406000",
      email: "email@example.com",
      preferredContact: "Llamada telefónica",
      occupation: "Docente",
      status: "Activo"
    },
    {
      name: "Nombre del familiar",
      contactNumber: "+905070406000",
      email: "email@example.com",
      preferredContact: "Llamada telefónica",
      occupation: "N/D",
      status: "N/D"
    }
  ];
  const parentsColumns = ['Nombre', 'Número de contacto', 'Correo electrónico', 'Contacto preferido', 'Ocupación', 'Estado'];
  const columns = ['Asignatura', '1.º', '2.º','Tareas' ,'Final', 'Promedio', 'Estado'];
  
  const transformedData = mockGrades.map(grade => ({
    Course: grade.course,
    '1st': grade.first ? <AverageDisplay value={grade.first} size="md" /> : <AverageDisplay value={null} size="md" />,
    '2nd': grade.second ? <AverageDisplay value={grade.second} size="md" /> : <AverageDisplay value={null} size="md" />,
    'Assignments': grade.assignment ? <AverageDisplay value={grade.assignment} size="md" /> : <AverageDisplay value={null} size="md" />,
    Final: grade.final ? <AverageDisplay value={grade.final} size="md" /> : <AverageDisplay value={null} size="md" />,
    Average: grade.average ? <AverageDisplay value={grade.average} size="md" /> : <AverageDisplay value={null} size="md" />,
    Status: grade.status,
  }));
  const actionComponent = (
    <button className="p-2 hover:bg-gray-100 -ml-4 rounded-full transition-colors">
      <div className="bg-gradient-to-br from-[#10062B] to-[#4F0129] flex justify-center items-center h-8 w-8 rounded-full hover:opacity-90">
        <Eye size={16} color="white" />
      </div>
    </button>
  );

  return (
    <Layout currentPage={'StudentProfile'}>
      <div className='w-full px-12 ' >
      <ProfileHeader user={user}/>
      {/* Status Cards */}
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 h-fit gap-2 my-4">   
      {stats.map((stat, index) => (
        <div key={index} >
        <StatsCard
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color="bg-gradient-to-br from-[#10062B] to-[#4F0129] min-h-32"
        />
        </div>
      ))}
        </div>
      {/* Tables  */}
      <div className=" px-0">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-2 ">
         {/*   Schedule Table  */}
         <Table data={parents} title={'Parents'} columns={parentsColumns} user={user} 
         actionChil={
                    <div 
                        className="w-7 h-7 cursor-pointer transition-colors bg-gradient-to-br from-[#10062B] to-[#4F0129] rounded-full flex items-center justify-center hover:opacity-80">
                        <Phone color='white' size={15}/>
                     </div>
                  }
         />
         {/* Courses Table */}
         <Table data={courses} title={'Courses '} columns={coursesColumns} user={user}/>
        
        </div>
         {/* Grades Table */}
        <div className="mt-2 space-y-2  ">
      <Table 
          data={transformedData}
          title="Grades"
          columns={columns}
          user={{ role: 'student' }}
        />
          </div>
         
        
        
      </div>
      </div>
    </Layout>
  )
}
export default StudentProfile ;