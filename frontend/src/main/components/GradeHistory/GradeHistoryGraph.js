import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// List of all possible grades
const allGrades = [
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "F",
  "W",
  "NP",
];

const qtrNumToQuarter = {
  1: "Winter",
  2: "Spring",
  3: "Summer",
  4: "Fall",
};

//from an input YYYYQ, create a prettier formated output that I like
const yyyyqToPrettyStr = (yyyyq) => {
  const [year, qtr] = [yyyyq.slice(0, 4), yyyyq[4]];
  return `${qtrNumToQuarter[qtr]} ${year}`;
};

// Helper function to fill in for when 0 students got a grade
const createCompleteGradeData = (data) => {
  const gradeCounts = data.reduce((acc, item) => {
    acc[item.grade] = item.count;
    return acc;
  }, {});

  const totalCount = Object.values(gradeCounts).reduce(
    (acc, count) => acc + count,
    0,
  );

  return allGrades.map((grade) => ({
    grade,
    count: gradeCounts[grade] || 0,
    percentage:
      totalCount > 0 ? ((gradeCounts[grade] || 0) / totalCount) * 100 : 0,
  }));
};

// Helper function to group data by `yyyyq` and `instructor`
// This will allow different instructors in the same quarter to be displayed seperatly
const groupDataByQuarterAndInstructor = (data) => {
  const groupedData = {};

  // Added sort function to be able to display data by most recent quarter
  data.sort((a, b) => {
    const [yearA, qtrA] = [a.yyyyq.slice(0, 4), a.yyyyq[4]];
    const [yearB, qtrB] = [b.yyyyq.slice(0, 4), b.yyyyq[4]];

    if (yearA !== yearB) {
      return yearB - yearA;
    } else {
      return qtrB - qtrA;
    }
  });

  data.forEach((item) => {
    const key = `${item.yyyyq}-${item.instructor}`;
    if (!groupedData[key]) {
      groupedData[key] = [];
    }
    groupedData[key].push(item);
  });

  return groupedData;
};

// Component to render a single bar chart for a specific group of data
const GradeBarChart = ({ data, title }) => {
  const completeData = createCompleteGradeData(data);

  return (
    <div>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={completeData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="grade" />
          <YAxis />
          <Legend />
          <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
          <Bar dataKey="percentage" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const GradeHistoryGraphs = ({ gradeHistory }) => {
  const groupedData = useMemo(
    () => groupDataByQuarterAndInstructor(gradeHistory),
    [gradeHistory],
  );

  return (
    <div>
      {Object.keys(groupedData).map((key) => {
        const data = groupedData[key];
        const title = `${yyyyqToPrettyStr(data[0].yyyyq)} - ${
          data[0].instructor
        }`;
        return <GradeBarChart key={key} data={data} title={title} />;
      })}
    </div>
  );
};

export default GradeHistoryGraphs;
