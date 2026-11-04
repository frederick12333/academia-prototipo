import React from 'react';

const AverageDisplay = ({ value, size = "md", showPercentage = true, className = "" }) => {
    if (value === null || value === undefined || value === " ") {
      return (
        <div className={`flex items-center justify-center ${getSizeClasses(size)} ${className}`}>
          <div className="bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs font-medium w-full h-full">
            N/D
          </div>
        </div>
      )
    }
  
    const getColorClass = (percentage) => {
      if (percentage >= 70) return "text-emerald-600 bg-emerald-100 border-emerald-200"
      if (percentage >= 50) return "text-yellow-600 bg-yellow-100 border-yellow-200"
      return "text-red-600 bg-red-100 border-red-200"
    }
  
    const getProgressColor = (percentage) => {
      if (percentage >= 70) return "#10b981"
      if (percentage >= 50) return "#eab308"
      return "#ef4444"
    }
  
    const radius = 15.9155
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference -(value / 100) * circumference
  
    return (
      <div className={`relative ${getSizeClasses(size)} ${className}`}>
        <div
          className={`
          rounded-full border-2 flex items-center justify-center font-medium text-xs w-full h-full
          ${getColorClass(value)}
        `}
        >
          {showPercentage ? `${value}%` : value}
        </div>
  
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path
            className="stroke-current text-gray-200"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            stroke={getProgressColor(value)}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>
    )
  }
  
  const getSizeClasses = (size) => {
    switch (size) {
      case "sm":
        return "w-8 h-8"
      case "lg":
        return "w-16 h-16"
      default:
        return "w-12 h-12"
    }
  }
  
  export default AverageDisplay
  