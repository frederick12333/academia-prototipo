import React from 'react';
import Layout from '../../components/layouts/Layout';
import StatsCard from "../../components/shared/StatsCard";
import ProfileHeader from "../../components/teacher/ProfileHeader";
import { useAuth } from '../../contexts/AuthContext';
import Table from '../../components/shared/Table';
import AnnouncementCard from "../../components/teacher/AnnouncementCard";


import { Monitor, ListChecks, LibraryBig, ChartNoAxesCombined } from 'lucide-react';
import { useLocation } from 'react-router-dom';

 const TeacherProfile  = () => {
const location = useLocation();
const { user: authUser } = useAuth();
const user = location.state?.teacher || authUser;

  const stats = [
    {
      value: '120',
      title: 'Alumnos',
      icon: <ListChecks  size={50} />,
    },
    {
      value: '05',
      title: 'Asignaturas',
      icon: <LibraryBig size={50} />,
    },
    {
      value: '500',
      title: 'Clases impartidas',
      icon: <Monitor size={50} />,
    },
    {
      value: '95%',
      title: 'Rendimiento',
      icon: <ChartNoAxesCombined size={50} />,
    }
  ];
  const courses = [
    { no: '01', title: 'Asignatura', type: 'En línea', resources: 'Enlace' },
    { no: '02', title: 'Asignatura', type: 'Presencial', resources: 'Enlace' },
    { no: '03', title: 'Asignatura', type: 'Presencial', resources: 'Enlace' },
    { no: '04', title: 'Asignatura', type: 'En línea', resources: 'Enlace' },
    { no: '05', title: 'Asignatura', type: 'En línea', resources: 'Enlace' },
    { no: '06', title: 'Asignatura', type: 'En línea', resources: 'Enlace' },
    { no: '07', title: 'Asignatura', type: 'En línea', resources: 'Enlace' }
  ];
  const coursesColumns = ['N.º', 'Título', 'Tipo', 'Recursos'];
  const schedule = [
    { day: 'Lun', from: '11:00', to: '14:00' },
    { day: 'Mar', from: '11:00', to: '14:00' },
    { day: 'Mié', from: '11:00', to: '14:00' },
    { day: 'Jue', from: '11:00', to: '14:00' },
    { day: 'Vie', from: '11:00', to: '14:00' },
    { day: 'Sáb', from: 'N/D', to: 'N/D' },
    { day: 'Dom', from: 'N/D', to: 'N/D' }
  ];
  const scheduleColumns = ['Día', 'Desde', 'Hasta'];

  return (
    <Layout currentPage={'UserProfile'}>
      <div className='px-12 w-full ' >
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
          {/* Courses Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
          <Table isActions={false} data={courses} title={'Classes Exams Performance'} columns={coursesColumns} user={authUser}/>
        
         {/*   Schedule Table  */}
          <Table isActions={false}  data={schedule} title={'Free Time Schedule'} columns={scheduleColumns} user={authUser}/>
      
        </div>
        
        <div className="mt-4 space-y-2 ">

          <AnnouncementCard 
            title="CO301 | Lista del aula de examen actualizada"
            content="Estimados alumnos: la lista adjunta contiene información sobre el aula donde realizarán el examen. Cada alumno debe realizar el examen en el aula indicada en la lista. No olviden traer lápices (no bolígrafo), gomas y su carné de estudiante el día del examen."
            fileName="CO301-Informacion-Aula-Examen-Parcial1.pdf"
            fileSize="169.5 KB"
            dateAdded="2025-04-10"
            lastUpdate="2025-04-10 19:38:52"
            isUpdated={true}
            userAuth={authUser}

          />
          
          <AnnouncementCard 
            title="CO301 | Lista del aula de examen"
            content="Estimados alumnos: la lista adjunta contiene información sobre el aula donde realizarán el examen. Cada alumno debe realizar el examen en el aula indicada en la lista. No olviden traer lápices (no bolígrafo), gomas y su carné de estudiante el día del examen."
            dateAdded="2025-04-10"
            lastUpdate="2025-04-10"
            isUpdated={false}
            userAuth={authUser}
          />
           {authUser?.role === 'teacher'&& 
          <div className="mt-2 flex justify-center">
          <button className=" w-full bg-gradient-to-br from-[#10062B] to-[#4F0129] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 ">
            Enviar nuevo anuncio
          </button>
        </div>}
          </div>
         
        
        
      </div>
      </div>
    </Layout>
  )
}
export default TeacherProfile;
