import { Eye } from "lucide-react";

const grades = [
  {
    subject: "Matemáticas",
    assignments: 92,
    midterm: 88,
    final: 90,
    overall: "B+",
    status: "Aprobado",
  },
  {
    subject: "Física",
    assignments: 95,
    midterm: 94,
    final: null,
    overall: "A-",
    status: "Aprobado",
  },
  {
    subject: "Química",
    assignments: 87,
    midterm: 82,
    final: null,
    overall: "B",
    status: "Aprobado",
  },
  {
    subject: "Literatura Turca",
    assignments: 98,
    midterm: 96,
    final: null,
    overall: "A",
    status: "Aprobado",
  },
  {
    subject: "Historia",
    assignments: 90,
    midterm: 92,
    final: null,
    overall: "B+",
    status: "Aprobado",
  },
];

const GradeCircle = ({ value }) => {
  if (value === null || isNaN(value)) {
    return (
      <div className="relative w-8 h-8 sm:w-10 sm:h-10">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            className="text-[#BCCCBF]"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[8px] sm:text-[10px] font-medium">
          N/D
        </div>
      </div>
    );
  }

  const filledSegments = Math.min(10, Math.ceil(value / 10));
  const segmentDegrees = 36;
  const gapDegrees = 2;
  const radius = 15.9155;
  const center = 18;

  return (
    <div className="relative w-8 h-8 sm:w-10 sm:h-10">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={`unfilled-${i}`}
            className="text-[#BCCCBF]"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            d={describeArc(
              center,
              center,
              radius,
              -90 + i * segmentDegrees,
              -90 + (i + 1) * segmentDegrees - gapDegrees
            )}
          />
        ))}
        {Array.from({ length: filledSegments }).map((_, i) => (
          <path
            key={`filled-${i}`}
            className="text-[#16A799]"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            d={describeArc(
              center,
              center,
              radius,
              -90 + i * segmentDegrees,
              -90 + (i + 1) * segmentDegrees - gapDegrees
            )}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[8px] sm:text-[10px] font-medium">
        {value}%
      </div>
    </div>
  );
};

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export default function GradesPage() {
  return (
    <div className="bg-white rounded-md p-2 sm:p-4 m-2 sm:m-4 mt-0">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 ml-2 sm:ml-4">
        Notas
      </h1>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {" "}
          {/* Minimum width to prevent squeezing */}
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Asignatura
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider">
                  1.º
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider">
                  2.º
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Final
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Promedio
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((grade, index) => (
                <tr
                  key={index}
                  className={index % 2 !== 0 ? "bg-[#D9D9D9]" : "bg-white"}
                >
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                    {grade.subject}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    <GradeCircle value={grade.assignments} />
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    <GradeCircle value={grade.midterm} />
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    <GradeCircle value={grade.final} />
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    {grade.overall}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    {grade.status}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap">
                    <button className="p-1 sm:p-2 rounded-full bg-gradient-to-br from-[#10062B] to-[#4F0129]">
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
