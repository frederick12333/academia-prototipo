
export const mockStudents = [
    { id: '1', name: 'Yusuf Arslan', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
    { id: '3', name: 'Carol Williams', email: 'carol@example.com' },
    { id: '4', name: 'David Brown', email: 'david@example.com' },
    { id: '5', name: 'Emma Davis', email: 'emma@example.com' },
    { id: '6', name: 'Frank Miller', email: 'frank@example.com' },
    { id: '7', name: 'Grace Wilson', email: 'grace@example.com' },
    { id: '8', name: 'Henry Moore', email: 'henry@example.com' },
  ];
  
  export const mockCourses = [
    {
      id: '1',
      name: 'Matemáticas 101',
      students: mockStudents
    },
    {
      id: '2',
      name: 'Física 201',
      students: mockStudents
    },
    {
      id: '3',
      name: 'Química 301',
      students: mockStudents
    },
    {
      id: '4',
      name: 'Informática 101',
      students: mockStudents
    }
  ];
  
  export const mockMessages = [
    {
      id: '1',
      senderId: '3',
      senderName: 'Yusuf Arslan',
      senderRole: 'student',
      receiverId: 'teacher',
      receiverName: 'Docente: Zack Kaya',

      subject: 'Pregunta sobre la tarea 3',
      content: 'Hola, docente: intenté resolver el problema 2 pero tengo dificultades con la parte de integración. ¿Podrías ayudarme a entender los pasos?',
      timestamp: '2025-02-26 18:48:40',
      courseId: '1',
      courseName: 'Mathematics 101',
      isRead: false,
      type: 'incoming'
    },
    {
      id: '2',
      senderId: 'teacher',
      senderName: 'Zack Kaya',
      senderRole: 'teacher',
      receiverId: '3',
      receiverName: 'Yusuf Arslan',
      subject: 'Re: Pregunta sobre la tarea 3',
      content: 'Estimado alumno: entiendo tu preocupación por la integración. Déjame explicarte el proceso paso a paso...',
      timestamp: '2025-02-27 10:03:48',
      courseId: '1',
      courseName: 'Mathematics 101',
      isRead: true,
      type: 'outgoing'
    },
    {
      id: '3',
      senderId: '3',
      senderName: 'Yusuf Arslan',
      senderRole: 'student',
      receiverId: 'teacher',
      receiverName: 'Docente: Zack Kaya',

      subject: 'Entrega del informe de laboratorio',
      content: 'Hola, profesor: terminé el informe de laboratorio de física, pero tengo problemas para subirlo al portal. ¿Puedes ayudarme?',
      timestamp: '2025-02-26 14:22:15',
      courseId: '2',
      courseName: 'Physics 201',
      isRead: true,
      type: 'incoming'
    },
    {
      id: '4',
      senderId: 'teacher',
      senderName: 'Zack Kaya',
      senderRole: 'teacher',
      receiverId: '3',
      receiverName: 'Yusuf Arslan',
      subject: 'Re: Entrega del informe de laboratorio',
      content: 'Hola, Bob: intenta actualizar la página y comprueba que tu archivo esté en formato PDF. Si el problema continúa, envíamelo directamente por correo.',
      timestamp: '2025-02-26 15:30:22',
      courseId: '2',
      courseName: 'Physics 201',
      isRead: true,
      type: 'outgoing'
    },
    {
      id: '5',
      senderId: '3',
      senderName: 'Yusuf Arslan',
      senderRole: 'student',
      receiverId: 'teacher',
      receiverName: 'Docente: Zack Kaya',

      subject: 'Clase perdida hoy',
      content: 'Estimado profesor: no pude asistir a la clase de química de hoy por enfermedad. ¿Podrías compartir los apuntes o la grabación si está disponible?',
      timestamp: '2025-02-25 16:45:30',
      courseId: '3',
      courseName: 'Chemistry 301',
      isRead: true,
      type: 'incoming'
    },
    {
      id: '6',
      senderId: 'teacher',
      senderName: 'Zack Kaya',
      senderRole: 'teacher',
      receiverId: '3',
      receiverName: 'Yusuf Arslan',
      subject: 'Re: Clase perdida hoy',
      content: 'Hola, Carol: espero que te encuentres mejor. He subido los apuntes de la clase al portal del curso. Consulta la sección de materiales.',
      timestamp: '2025-02-25 18:12:45',
      courseId: '3',
      courseName: 'Chemistry 301',
      isRead: true,
      type: 'outgoing'
    },
    {
      id: '7',
      senderId: '3',
      senderName: 'Yusuf Arslan',
      senderRole: 'student',
      receiverId: 'teacher',
      receiverName: 'Docente: Zack Kaya',

      subject: 'Formación de grupos para el proyecto',
      content: 'Hola: necesito ayuda para encontrar un grupo para el proyecto final. La mayoría de los grupos ya están formados. ¿Qué debo hacer?',
      timestamp: '2025-02-24 12:30:18',
      courseId: '4',
      courseName: 'Computer Science 101',
      isRead: false,
      type: 'incoming'
    },
    {
      id: '8',
      senderId: '3',
      senderName: 'Yusuf Arslan',
      senderRole: 'student',
      receiverId: 'teacher',
      receiverName: 'Docente: Zack Kaya',

      subject: 'Oportunidades de crédito extra',
      content: 'Hola, profesor: ¿hay tareas de crédito extra disponibles? Quiero mejorar mi nota en la asignatura.',
      timestamp: '2025-02-23 09:15:42',
      courseId: '1',
      courseName: 'Mathematics 101',
      isRead: true,
      type: 'incoming'
    },
    {
      id: '9',
      senderId: 'teacher',
      senderName: 'Zack Kaya',
      senderRole: 'teacher',
      receiverId: '3',
      receiverName: 'Yusuf Arslan',
      subject: 'Re: Oportunidades de crédito extra',
      content: 'Estimada Emma: agradezco tu dedicación. Publicaré algunos problemas de crédito extra antes de que acabe la semana.',
      timestamp: '2025-02-23 14:20:30',
      courseId: '1',
      courseName: 'Mathematics 101',
      isRead: true,
      type: 'outgoing'
    },
    {
      id: '10',
      senderId: '6',
      senderName: 'Frank Miller',
      senderRole: 'student',
      receiverId: 'teacher',
      receiverName: 'Docente: Zack Kaya',

      subject: 'Conflicto de horario del examen',
      content: 'Estimado profesor: tengo un conflicto de horario con el examen parcial. ¿Sería posible acordar otra fecha?',
      timestamp: '2025-02-22 11:45:20',
      courseId: '2',
      courseName: 'Physics 201',
      isRead: true,
      type: 'incoming'
    }
  ];
  export const mockMessagesStudent = [
    {
      id: '1',
      senderId: '3',
      senderName: 'Yusuf Arslan',
      senderRole: 'student',
      receiverId: 'teacher',
      receiverName: 'Docente: Zack Kaya',

      subject: 'Pregunta sobre la tarea 3',
      content: 'Hola, docente: intenté resolver el problema 2 pero tengo dificultades con la parte de integración. ¿Podrías ayudarme a entender los pasos?',
      timestamp: '2025-02-26 18:48:40',
      courseId: '1',
      courseName: 'Mathematics 101',
      isRead: false,
      type: 'outgoing'
    },
    {
      id: '2',
      senderId: 'teacher',
      senderName: 'Zack Kaya',
      senderRole: 'teacher',
      receiverId: '3',
      receiverName: 'Yusuf Arslan',
      subject: 'Re: Pregunta sobre la tarea 3',
      content: 'Estimado alumno: entiendo tu preocupación por la integración. Déjame explicarte el proceso paso a paso...',
      timestamp: '2025-02-27 10:03:48',
      courseId: '1',
      courseName: 'Mathematics 101',
      isRead: true,
      type: 'incoming'
    },
    {
      id: '3',
      senderId: '3',
      senderName: 'Yusuf Arslan',
      senderRole: 'student',
      receiverId: 'teacher',
      receiverName: 'Docente: Zack Kaya',

      subject: 'Entrega del informe de laboratorio',
      content: 'Hola, profesor: terminé el informe de laboratorio de física, pero tengo problemas para subirlo al portal. ¿Puedes ayudarme?',
      timestamp: '2025-02-26 14:22:15',
      courseId: '2',
      courseName: 'Physics 201',
      isRead: true,
      type: 'outgoing'
    },
    {
      id: '4',
      senderId: 'teacher',
      senderName: 'Zack Kaya',
      senderRole: 'teacher',
      receiverId: '3',
      receiverName: 'Yusuf Arslan',
      subject: 'Re: Entrega del informe de laboratorio',
      content: 'Hola, Bob: intenta actualizar la página y comprueba que tu archivo esté en formato PDF. Si el problema continúa, envíamelo directamente por correo.',
      timestamp: '2025-02-26 15:30:22',
      courseId: '2',
      courseName: 'Physics 201',
      isRead: true,
      type: 'incoming'
    },
    {
      id: '5',
      senderId: '3',
      senderName: 'Yusuf Arslan',
      senderRole: 'student',
      receiverId: 'teacher',
      receiverName: 'Docente: Zack Kaya',

      subject: 'Clase perdida hoy',
      content: 'Estimado profesor: no pude asistir a la clase de química de hoy por enfermedad. ¿Podrías compartir los apuntes o la grabación si está disponible?',
      timestamp: '2025-02-25 16:45:30',
      courseId: '3',
      courseName: 'Chemistry 301',
      isRead: true,
      type: 'outgoing'
    },
    {
      id: '6',
      senderId: 'teacher',
      senderName: 'Zack Kaya',
      senderRole: 'teacher',
      receiverId: '3',
      receiverName: 'Yusuf Arslan',
      subject: 'Re: Clase perdida hoy',
      content: 'Hola, Carol: espero que te encuentres mejor. He subido los apuntes de la clase al portal del curso. Consulta la sección de materiales.',
      timestamp: '2025-02-25 18:12:45',
      courseId: '3',
      courseName: 'Chemistry 301',
      isRead: true,
      type: 'incoming'
    },
    {
      id: '7',
      senderId: '3',
      senderName: 'Yusuf Arslan',
      senderRole: 'student',
      receiverId: 'teacher',
      receiverName: 'Docente: Zack Kaya',

      subject: 'Formación de grupos para el proyecto',
      content: 'Hola: necesito ayuda para encontrar un grupo para el proyecto final. La mayoría de los grupos ya están formados. ¿Qué debo hacer?',
      timestamp: '2025-02-24 12:30:18',
      courseId: '4',
      courseName: 'Computer Science 101',
      isRead: false,
      type: 'outgoing'
    },
    {
      id: '8',
      senderId: '3',
      senderName: 'Yusuf Arslan',
      senderRole: 'student',
      receiverId: 'teacher',
      receiverName: 'Docente: Zack Kaya',

      subject: 'Oportunidades de crédito extra',
      content: 'Hola, profesor: ¿hay tareas de crédito extra disponibles? Quiero mejorar mi nota en la asignatura.',
      timestamp: '2025-02-23 09:15:42',
      courseId: '1',
      courseName: 'Mathematics 101',
      isRead: true,
      type: 'outgoing'
    },
    {
      id: '9',
      senderId: 'teacher',
      senderName: 'Zack Kaya',
      senderRole: 'teacher',
      receiverId: '3',
      receiverName: 'Yusuf Arslan',
      subject: 'Re: Oportunidades de crédito extra',
      content: 'Estimada Emma: agradezco tu dedicación. Publicaré algunos problemas de crédito extra antes de que acabe la semana.',
      timestamp: '2025-02-23 14:20:30',
      courseId: '1',
      courseName: 'Mathematics 101',
      isRead: true,
      type: 'incoming'
    },
    {
      id: '10',
      senderId: '6',
      senderName: 'Frank Miller',
      senderRole: 'student',
      receiverId: 'teacher',
      receiverName: 'Docente: Zack Kaya',

      subject: 'Conflicto de horario del examen',
      content: 'Estimado profesor: tengo un conflicto de horario con el examen parcial. ¿Sería posible acordar otra fecha?',
      timestamp: '2025-02-22 11:45:20',
      courseId: '2',
      courseName: 'Physics 201',
      isRead: true,
      type: 'outgoing'
    }
  ];