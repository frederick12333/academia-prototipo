import { useState } from "react"
import AverageDisplay from "../shared/AverageDisplay"

export const ExamGradesTable = ({ onClose, exam: examData }) => {
  const [selectedClass, setSelectedClass] = useState("All Classes")
  const [editScores, setEditScores] = useState(false)
  const [exam, setExam] = useState(structuredClone(examData))


  // Combine student data with grades data for display and get unique classes from students with grades
  const gradesWithStudentInfo = exam.grades.map((grade) => {
    const student = exam.course.students.find((s) => s.id === grade.studentId)

    return {
      ...grade,
      studentName: student?.name || "Alumno desconocido",
      studentId: student?.id || "N/D",
      avatar: student?.avatar || "",
      className: student?.class || "",
      email: student?.email || "",
    }
  })

  const uniqueStudentClasses = [...new Set(gradesWithStudentInfo.map(grade => grade.className).filter(Boolean))];
  const availableClasses = ["All Classes", ...uniqueStudentClasses];

  // Filter grades by selected class
  const filteredGrades =
    selectedClass === "All Classes"
      ? gradesWithStudentInfo
      : gradesWithStudentInfo.filter((grade) => grade.className === selectedClass);

  const handleGradeChange = (index, field, value) => {
        const updatedGrades = [...exam.grades]
        updatedGrades[index][field] = value
      
        // If score or attendance is changed, recalculate percentage and passed status
        if (field === 'score' || field === 'attended') {
          const score = updatedGrades[index].score || 0
          const attended = updatedGrades[index].attended
      
          const percentage = attended ? (score / exam.Total_Points) * 100 : 0
          const passed = attended && percentage >= exam.PassingGrade
      
          updatedGrades[index].percentage = percentage.toFixed(1)
          updatedGrades[index].passed = passed
        }
      
        setExam((prev) => ({
          ...prev,
          grades: updatedGrades
        }))
      }
      
      const handleScoreInput = (index, value) => {
        const score = parseFloat(value)
        if (!isNaN(score)) {
          handleGradeChange(index, 'score', score)
        }
      }
      
  return (
    <>
      <div className="max-w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-6 mb-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-center flex-1">Lista de notas del examen</h2>
        </div>

        {/* Exam Details */}
        <div className="mb-4 bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Título:</span> {exam.title}
            </div>
            <div>
              <span className="font-medium">Asignatura:</span> {exam.course.name} ({exam.course.code})
            </div>
            <div>
              <span className="font-medium">Número de preguntas:</span> {exam.number_of_questions}
            </div>
            <div>
              <span className="font-medium">Fecha:</span> {exam.date}
            </div>
            <div>
              <span className="font-medium">Hora:</span> {exam.time}
            </div>
            <div>
              <span className="font-medium">Duración:</span> {exam.duration} minutos
            </div>
            <div>
              <span className="font-medium">Ubicación:</span> {exam.location}
            </div>

            <div>
              <span className="font-medium">Puntos totales:</span> {exam.Total_Points}
            </div>
          </div>
        </div>

        {/* Class Filter */}
        <div className="mb-4 flex items-center gap-4">
          <label htmlFor="classFilter" className="font-medium text-gray-700">
            Filtrar por clase:
          </label>
          <select
            id="classFilter"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableClasses.map((className) => (
              <option key={className} value={className}>
                {className === "All Classes" ? "Todas las clases" : className}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">
            Mostrando {filteredGrades.length} alumno{filteredGrades.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        <div className="max-h-[60vh] text-sm">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 rounded-lg sticky top-0 z-5">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Alumno</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Clase</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Asistencia</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Puntuación</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Porcentaje</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Estado</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Comentarios</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrades.length > 0 ? (
                filteredGrades.map((grade, index) => (
                  <tr
                    key={grade.studentId}
                    className={
                      !grade.attended
                        ? "bg-red-50 hover:bg-blue-100"
                        : index % 2 === 0
                          ? "bg-white hover:bg-blue-100"
                          : "hover:bg-blue-100 bg-blue-50"
                    }
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {grade.avatar ? (
                          <img
                            src={grade.avatar || "/placeholder.svg"}
                            alt={grade.studentName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-medium">
                            {grade.studentName
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "U"}
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{grade.studentName}</div>
                          <div className="text-xs text-gray-500">{grade.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">{grade.className}</td>
                  
                    <td className="px-6 py-4">
                      {editScores ? (
                        <input
                          type="checkbox"
                          checked={grade.attended}
                          onChange={(e) => handleGradeChange(index, 'attended', e.target.checked)}
                        />
                      ) : (
                        <span className={grade.attended ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {grade.attended ? "Presente" : "Ausente"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                        {editScores ? (
                          <input
                            type="number"
                            value={grade.score}
                            min={0}
                            max={exam?.Total_Points}
                            onChange={(e) => handleScoreInput(index, e.target.value>exam.Total_Points?exam.Total_Points:e.target.value)}
                            className="w-16 border border-gray-300 rounded px-2 py-1"
                          />
                        ) : (
                          grade.score !== null ? `${grade.score}/${exam.Total_Points}` : "----"
                        )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <AverageDisplay value={grade.percentage} size="md" showPercentage={true} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={grade.passed ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {grade.passed ? "Aprobado" : "Reprobado"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
  {editScores ? (
    <input
      type="text"
      value={grade.feedback || ""}
      onChange={(e) => handleGradeChange(index, 'feedback', e.target.value)}
      className="w-full border border-gray-300 rounded px-2 py-1"
    />
  ) : (
    grade.feedback || "Sin comentarios"
  )}
</td>         
         </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No se encontraron alumnos para la clase seleccionada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-4 -mb-4">
      
       
        {editScores ?
          <button
            type="button"
            onClick={() => setEditScores(false)}
            className="w-full bg-green-500 hover:opacity-90 rounded-lg text-white py-2"
          >
            Guardar cambios 
          </button>
          :
          <button
            type="button"
            onClick={() => setEditScores(true)}
            className="w-full bg-blue-500 hover:opacity-90 rounded-lg text-white py-2"
          >
            Editar
          </button>}
          {editScores ?
          <button
            type="button"
            onClick={() => {
              setExam(structuredClone(examData))

              setEditScores(false)}}
            className="w-full bg-red-500 hover:opacity-90 rounded-lg text-white py-2"
          >
            Cancelar cambios 
          </button>
          :
          <button
          type="button"
          className="w-full bg-gradient-to-br from-[#10062B] to-[#4F0129] hover:opacity-90 rounded-lg text-white py-2"
        >
          Descargar lista de notas
        </button>}
       {!editScores &&
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-red-500 hover:opacity-90 rounded-lg text-white py-2"
        >
          Cerrar
        </button>}
      </div>
    </>
  )
}

export default ExamGradesTable
